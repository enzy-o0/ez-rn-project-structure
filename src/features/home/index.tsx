import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {useFocusEffect} from '@react-navigation/native';
import Theme from '~/components/styles/theme';
import {Layout} from '~/components/styles/Mixin';
import {useDispatch, useSelector} from 'react-redux';
import {BackHandler} from 'react-native';

import HomeList from './HomeList';
import {RefreshSelector} from '~/reducers/RefreshSlice';
import Loading from '~/components/atoms/Loading';
import {errorHandler, isNetworkConnect, showToast} from '~/common/common';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';

import EventModal from '~/components/atoms/Modal/EventModal';
import dayjs from 'dayjs';

type HomeProps = [
  {
    seq: number;
    nickname: string;
    address: string;
  },
];

const Home = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {isRefresh} = useSelector(RefreshSelector);
  const [listData, setListData] = useState<HomeProps>();
  const [isFetch, setIsFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);
  const [isExit, setIsExit] = useState(false);

  const {isLogInSuccess} = useSelector((state) => state.users);

  const getListData = async () => {
    try {
      setListData([
        {
          seq: 0,
          nickname: '심호흡이 필요한 날',
          address: '퇴근 후 (18:00 ~ 24:00)',
        },
      ]);
    } catch (e: any) {
      errorHandler(e.code, e.message, dispatch, navigation);
    } finally {
      setIsLoading(false);
      setIsFetch(false);
    }
  };

  // 기기 고유 UniqueId 값과 fcm token 매핑
  const postSetPushToken = async (token) => {
    try {
      const uniqueId = DeviceInfo.getUniqueId();
      // await pushApi.postSetPushToken(seq, uniqueId, token);
      console.log(uniqueId);
    } catch (e) {
      errorHandler(e.code, e.message, dispatch, navigation);
    } finally {
      setIsLoading(false);
      setIsFetch(false);
    }
  };

  // useEffect(() => {
  //   isLogInSuccess && handlePushToken();
  // }, [isLogInSuccess]);

  // 로그인 할 때 마다 fcm token 가져오기
  // AsyncStorage에 담기
  // const handlePushToken = useCallback(async () => {
  //   const enabled = await messaging().hasPermission();

  //   if (enabled) {
  //     const token = await messaging().getToken();
  //     postSetPushToken(token);

  //     const jsonValue = JSON.stringify('atok');
  //     AsyncStorage.setItem('@FATW', jsonValue);
  //   }
  // }, []);

  // 일정 주기로 fcm refresh (token 신선도 유지를 위함)
  // AsyncStorage에 담기
  // const handleRefreshPushToken = useCallback(async () => {
  //   const enabled = await messaging().hasPermission();

  //   if (enabled) {
  //     const token = await messaging().onTokenRefresh();
  //     postSetPushToken(token);
  //     await AsyncStorage.removeItem('@FATW');
  //     const jsonValue = JSON.stringify('atok');
  //     await AsyncStorage.setItem('@FATW', jsonValue);
  //   }
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    getListData();
  }, []);

  useEffect(() => {
    if (isRefresh || isFetch) {
      setIsLoading(true);
      isNetworkConnect(setIsNetworkRefresh);
      getListData();
    }
  }, [isRefresh, isFetch]);

  const setUnvisibleWeeklyEventModal = async () => {
    await AsyncStorage.setItem('@UWEM', dayjs().format('YYYY-MM-DD'));
    setIsEventModalVisible(false);
  };

  // 일주일간 보지 않기 누르지 않을 경우,
  // 이벤트 발생일로 부터 7일간만 modal 띄움
  // 이벤트 발생일 asyncstorage에 담음
  useEffect(() => {
    const getUnvisibleWeeklyEventModalAsync = async () => {
      const checkWeeklyEventModal = await getUnvisibleWeeklyEventModal();

      if (checkWeeklyEventModal) {
        let today = dayjs();
        let expired_at = dayjs(checkWeeklyEventModal);
        let result = today.diff(expired_at, 'day');

        if (result > 7) {
          await AsyncStorage.removeItem('@UWEM');
        }
      }

      if (!checkWeeklyEventModal) {
        setIsEventModalVisible(true);
      }
    };

    getUnvisibleWeeklyEventModalAsync();
  }, []);

  const getUnvisibleWeeklyEventModal = async () => {
    const result = await AsyncStorage.getItem('@UWEM');
    const checkWeekly = result != null ? result : null;
    return checkWeekly ? checkWeekly : null;
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!isExit) {
          showToast("'뒤로' 버튼을 한 번 더 누르면 종료됩니다");
          setIsExit(true);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isExit]),
  );

  return (
    <Layout isBgWhite>
      {isNetworkRefresh === false ? (
        <NavigateNetworkCard
          isMainColor
          title={'데이터를 불러오지 못했습니다'}
          subTitle={'인터넷 연결 확인 후 다시 시도해주세요'}
          label={'다시 시도하기'}
          handleNavigate={() => {
            setIsFetch(true);
          }}
        />
      ) : isLoading ? (
        <Loading loadingText="오늘 할 일을 가져오고 있습니다" />
      ) : (
        <Main>
          <HomeList
            listData={listData}
            navigation={navigation}
            setIsFetch={setIsFetch}
            isFetch={isFetch}
          />
        </Main>
      )}
      {isEventModalVisible && (
        <EventModal
          handlePressOverlay={() => setIsEventModalVisible(false)}
          handleCancel={() => {
            setUnvisibleWeeklyEventModal();
          }}
          eventData={[
            {
              seq: 0,
              content: '',
            },
          ]}
          handleConfirm={() => {
            setIsEventModalVisible(false);
          }}
        />
      )}
    </Layout>
  );
};

export default Home;

const Main = styled.View`
  padding-right: ${Theme.width(16)}px;
  padding-left: ${Theme.width(16)}px;
`;
