import React, {useState, useEffect, useCallback} from 'react';
import {Keyboard, ScrollView, Pressable, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {errorHandler} from '~/common/common';
import styled from 'styled-components/native';
import {Layout, CommonMain} from '~/components/styles/Mixin';
import Input from '~/components/atoms/Input';
import InputPhone from '~/components/atoms/Input/InputPhone';
import {Button} from '~/components/atoms/Button';
import Theme from '~/components/styles/theme';
import {CommonModal} from '~/components/atoms/Modal';
import userApi from '~/api/userApi';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const FindUserId = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userBirth, setUserBirth] = useState({
    year: '연도',
    month: '월',
    day: '일',
  });
  const {year, month, day} = userBirth;
  const [date, setDate] = useState(new Date('1971-01-01'));
  const [isBirth, setIsBirth] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState<null | boolean>(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetryPhone, setIsRetryPhone] = useState(false);
  const [responseData, setResponseData] = useState({
    code: null,
    id: '',
    message: '',
  });

  const onChangeName = useCallback((name) => {
    setUserName(name);
    const regex = /^[가-힣a-zA-Z]{0,13}$/g;
    setIsValidName(regex.test(name));
  }, []);

  const handleBirthChange = (
    event: DateTimePickerEvent,
    changedDate?: Date | undefined,
  ) => {
    hideDatePicker();

    if (event.type === 'set') {
      setDate(changedDate);
      setIsBirth(true);
      handleBirth(changedDate);
    }
  };

  const handleBirth = (dataValue: any) => {
    const dateFormat = dayjs(dataValue).format('YYYY MM DD').split(' ');
    setUserBirth({
      ...userBirth,
      year: dateFormat[0],
      month: dateFormat[1],
      day: dateFormat[2],
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    if (!isValidPhone || !isValidName || !userBirth || !userName) {
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
    }
  }, [isValidPhone, isValidName, userBirth, userPhone, userName]);

  const handleSubmit = useCallback(async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const res = await userApi.postFindId(
        userName,
        userPhone?.replaceAll('-', ''),
        year + month + day,
      );

      if (res.data.success) {
        setResponseData({...responseData, id: res.data.data.id, code: 200});
      } else {
        setResponseData({
          ...responseData,
          message: res.data.data.message,
          code: res.status,
        });
      }

      setIsModalVisible(true);
    } catch (e: any) {
      errorHandler(e.code, e.message, dispatch, navigation);
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    userName,
    userPhone,
    year,
    month,
    day,
    responseData,
    dispatch,
    navigation,
  ]);

  return (
    <Layout isBgWhite>
      <ScrollView>
        <Pressable onPress={Keyboard.dismiss}>
          <Main>
            <FindIdInput
              labelText="이름"
              value={userName}
              placeholder="이름을 입력해주세요"
              onChangeText={onChangeName}
            />
            <TouchableOpacity activeOpacity={0.6} onPress={showDatePicker}>
              <FindIdInput
                isValue={isBirth}
                year={year}
                month={month}
                day={day}
                labelText="생년월일"
                isDatePicker
                editable={false}
              />
            </TouchableOpacity>
            {isDatePickerVisible && (
              <RNDateTimePicker
                value={date}
                display={'spinner'}
                mode={'date'}
                is24Hour={true}
                onChange={handleBirthChange}
                maximumDate={dayjs().subtract(1, 'day').toDate()}
                minimumDate={new Date(1900, 0, 1)}
              />
            )}
            <FindIdInputPhone
              setIsValidPhone={setIsValidPhone}
              userPhone={userPhone}
              setUserPhone={setUserPhone}
              isRetryPhone={isRetryPhone}
            />
            <Button
              label="아이디 찾기"
              bgColor={!isCorrect ? 'disable' : 'bgMain'}
              onPress={(): void => {
                if (isCorrect) {
                  handleSubmit();
                }
              }}
            />
          </Main>
        </Pressable>
        {isModalVisible && (
          <CommonModal
            isSubTitle={responseData.code === 200 ? true : false}
            label={responseData.code === 200 ? '로그인 하러가기' : '확인'}
            modalTextLabel={
              responseData.code === 200
                ? '아이디 찾기를 완료했습니다'
                : responseData.message
            }
            modalSubTextLabel={
              responseData.code === 200 &&
              `${userName}님의 아이디는${'\n'}${
                responseData.id
              }입니다${'\n'}${'\n'}아이디가 기억나지 않으실 경우${'\n'}고객센터(070-5158-5952)로 문의주세요`
            }
            handleConfirm={() => {
              setIsModalVisible(false);
              if (responseData.code === 200) {
                setIsRetryPhone(false);
                navigation.navigate('LogIn');
              } else {
                setUserName('');
                setUserPhone('');
                setIsValidPhone(false);
                setDate(new Date('1971-01-01'));
                setUserBirth({
                  ...userBirth,
                  year: '연도',
                  month: '월',
                  day: '일',
                });
                setIsBirth(false);
                setIsRetryPhone(true);
              }
            }}
          />
        )}
      </ScrollView>
    </Layout>
  );
};

export default FindUserId;

const Main = styled(CommonMain)`
  margin-top: ${Theme.height(49)}px;
`;

const FindIdInput = styled(Input)`
  margin-bottom: ${Theme.height(17)}px;
`;

const FindIdInputPhone = styled(InputPhone)`
  margin-bottom: ${Theme.height(17)}px;
`;
