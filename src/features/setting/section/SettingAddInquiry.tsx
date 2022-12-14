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
          label: '????????????1',
          value: '????????????1',
        },
        {
          label: '????????????2',
          value: '????????????2',
        },
        {
          label: '????????????3',
          value: '????????????3',
        },
        {
          label: '????????????4',
          value: '????????????4',
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
          title={'???????????? ???????????? ???????????????'}
          subTitle={'????????? ?????? ?????? ??? ?????? ??????????????????'}
          label={'?????? ????????????'}
          handleNavigate={() => setIsFetch(true)}
        />
      ) : isLoading && Object.keys(responseData).length > 0 ? (
        <Loading loadingText="????????? ???????????? ????????????" />
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
                    labelText={'?????? ??????'}
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
                labelText="??????"
                value={inquiryTitle}
                onChangeText={(title) => setInquiryTitle(title)}
                placeholder="????????? 20????????? ????????? ??? ????????????"
                maxLength={20}
              />
              <InquiryTextarea
                maxLength={3000}
                isTextarea
                labelText="?????? ??????"
                value={inquiryContent}
                onChangeText={(content) => setInquiryContent(content)}
                placeholder={`?????? ????????? ????????? ?????????????????????${'\n'}????????? ???????????? ????????? ??? ????????????${'\n'}${'\n'}*?????? ??? ?????? ???${'\n'}???????????? ????????? ???????????? ??????${'\n'}?????? ????????? ?????? ????????? ?????????${'\n'}????????? ????????? ????????? ??? ????????????`}
              />
              <Button
                label="?????? ??????"
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
          label="??????"
          modalTextLabel={
            isStopInquiry
              ? '?????? ????????? ???????????? ???????????????????'
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
          cancelLabel="??????"
          isSubTitle={isStopInquiry}
          modalSubTextLabel="???????????? ????????? ???????????? ????????????"
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
