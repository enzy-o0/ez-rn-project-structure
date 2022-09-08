import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler, Appearance} from 'react-native';
import styled from 'styled-components/native';
import {CommonMain} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';
import Input, {Textarea} from '~/components/atoms/Input';
import {useDispatch, useSelector} from 'react-redux';
import {errorHandler, isNetworkConnect, debounce} from '~/common/common';

const SettingAddInquiry = ({navigation}) => {
  const dispatch = useDispatch();
  const colorScheme = Appearance.getColorScheme();
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [inquiryCategory, setInquiryCategory] = useState();
  const [inquiryTitle, setInquiryTitle] = useState<string>('');
  const [inquiryContent, setInquiryContent] = useState<string>('');
  const [isStopInquiry, setIsStopInquiry] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPickerModalVisible, setIsPickerModalVisible] = useState(false);
  const [inquiryCategoryList, setInquiryCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {seq} = useSelector((state) => state.users);
  const [isFetch, setIsFetch] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);

  const [responseData, setResponseData] = useState({
    code: null,
    message: '',
  });

  useEffect(() => {
    if (inquiryTitle.length === 0 || inquiryContent.length === 0) {
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
    }
  }, [inquiryCategory, inquiryTitle, inquiryContent]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!isModalVisible) {
          setIsStopInquiry(true);
          setIsModalVisible(true);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isModalVisible]),
  );

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});
  }, [navigation]);

  const getInquiryCategoryList = useCallback(async () => {
    setIsLoading(true);

    try {
      // const res = await settingApi.getInquiryCategory();

      // if (res.data.success) {
      //   let categoryKeyChange = res.data.data.map(
      //     ({title: label, seq: value, ...rest}) => ({
      //       label,
      //       value,
      //       color: colorScheme === 'dark' ? 'white' : 'black',
      //       ...rest,
      //     }),
      //   );

      let categoryKeyChange = [
        {
          label: '카테고리1',
          value: '카테고리1',
        },
        {
          label: '카테고리2',
          value: '카테고리2',
        },
        {
          label: '카테고리3',
          value: '카테고리3',
        },
        {
          label: '카테고리4',
          value: '카테고리4',
        },
      ];
      setInquiryCategoryList(categoryKeyChange);
      setInquiryCategory(categoryKeyChange[0].value);
    } catch (e) {
      errorHandler(e.code, e.message, dispatch, navigation);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigation]);

  useEffect(() => {
    getInquiryCategoryList();
  }, []);

  useEffect(() => {
    if (isFetch) {
      setIsLoading(true);
      isNetworkConnect(setIsNetworkRefresh);
      getInquiryCategoryList();
    }
  }, [isFetch]);

  const handleSubmit = useCallback(
    debounce(() => {
      if (isCorrect) {
        postInquiryData(inquiryCategory, inquiryTitle, inquiryContent);
      }
    }, 2000),
    [inquiryTitle, inquiryContent],
  );

  return (
    <Layout isBgWhite>
      {isNetworkRefresh === false ? (
        <NavigateNetworkCard
          isMainColor
          title={'데이터를 불러오지 못했습니다'}
          subTitle={'인터넷 연결 확인 후 다시 시도해주세요'}
          label={'다시 시도하기'}
          handleNavigate={() => setIsFetch(true)}
        />
      ) : isLoading && Object.keys(responseData).length > 0 ? (
        <Loading loadingText="정보를 불러오는 중입니다" />
      ) : (
        <ScrollView>
          <Pressable onPress={Keyboard.dismiss}>
            <Main>
              {inquiryCategoryList.length > 0 && (
                <PickerContainer
                  activeOpacity={0.6}
                  onPress={() => {
                    setIsPickerModalVisible(true);
                  }}>
                  <InquiryInput
                    isTextarea={false}
                    labelText={'문의 항목'}
                    value={
                      inquiryCategoryList?.filter(
                        (e) => e.value === inquiryCategory,
                      )[0].label
                    }
                    editable={false}
                    innerIcon={
                      <Icon
                        width={Theme.fontSize(24)}
                        height={Theme.fontSize(24)}
                      />
                    }
                  />
                </PickerContainer>
              )}
              <InquiryInput
                isTextarea={false}
                labelText="제목"
                value={inquiryTitle}
                onChangeText={(title) => setInquiryTitle(title)}
                placeholder="제목은 20자까지 입력할 수 있습니다"
                maxLength={20}
              />
              <InquiryTextarea
                maxLength={3000}
                isTextarea
                labelText="문의 내용"
                value={inquiryContent}
                onChangeText={(content) => setInquiryContent(content)}
                placeholder={`문의 내용을 상세히 작성해주실수록${'\n'}빠르고 정확하게 해결할 수 있습니다${'\n'}${'\n'}*폭언 및 비방 등${'\n'}부적절한 표현을 사용하실 경우${'\n'}관련 법령에 의해 제재를 받거나${'\n'}서비스 이용이 제한될 수 있습니다`}
              />
              <Button
                label="문의 등록"
                bgColor={!isCorrect ? 'disable' : 'bgMain'}
                onPress={() => {
                  isCorrect && handleSubmit();
                }}
              />
            </Main>
          </Pressable>
        </ScrollView>
      )}
      {isModalVisible && (
        <CommonModal
          label="확인"
          modalTextLabel={
            isStopInquiry
              ? '문의 등록을 중단하고 나가시겠어요?'
              : responseData.message
          }
          handleConfirm={() => {
            if (responseData.code === 200 || isStopInquiry) {
              setIsModalVisible(false);
              dispatch(setInquiryIsRefreshed());
              navigation.pop();
            } else {
              setIsModalVisible(false);
            }
          }}
          isTwoBtn={isStopInquiry}
          handleCancel={() => setIsModalVisible(false)}
          cancelLabel="취소"
          isSubTitle={isStopInquiry}
          modalSubTextLabel="작성하신 정보는 저장되지 않습니다"
        />
      )}
      {isPickerModalVisible && (
        <PickerModal
          handlePressOverlay={() => setIsPickerModalVisible(false)}
          pickerItems={inquiryCategoryList}
          onValueChange={(value) => {
            setInquiryCategory(value);
          }}
          handleCancel={() => setIsPickerModalVisible(false)}
        />
      )}
    </Layout>
  );
};

export default SettingAddInquiry;

const Main = styled(CommonMain)`
  margin-top: ${Theme.height(49)}px;
`;

const PickerContainer = styled.TouchableOpacity`
  width: 100%;
`;

const InquiryInput = styled(Input)`
  margin-bottom: ${Theme.height(17)}px;
`;

const InquiryTextarea = styled(Textarea)`
  margin-bottom: ${Theme.height(20)}px;
`;
