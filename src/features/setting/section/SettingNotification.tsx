import React, {useState, useEffect, useCallback} from 'react';
import {View, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styled from 'styled-components/native';
import {
  Layout,
  CommonMain,
  TextRegular,
  TextMedium,
} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';
import Loading from '~/components/atoms/Loading';
import {useSelector, useDispatch} from 'react-redux';
import {errorHandler, isNetworkConnect, showToast} from '~/common/common';
import {useNavigation} from '@react-navigation/core';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';

const SettingNotification = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isNotiEnabled, setNotiIsEnabled] = useState(false);
  const [isWorkEnabled, setIsWorkEnabled] = useState(false);
  const [isEventEnabled, setIsEventEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fcmToken, setFcmToken] = useState('');
  const {seq} = useSelector((state) => state.users);
  const [isFetch, setIsFetch] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);

  useEffect(() => {
    if (!isWorkEnabled && !isEventEnabled) {
      setNotiIsEnabled(false);
    } else {
      setNotiIsEnabled(true);
    }
  }, [isWorkEnabled, isEventEnabled]);

  const toggleNotiSwitch = async (previousState: boolean) => {
    if (previousState) {
      await setNotiIsEnabled(true);
      await setIsWorkEnabled(true);
      await setIsEventEnabled(true);
      await postPushAll('Y');
    } else {
      await setNotiIsEnabled(false);
      await setIsWorkEnabled(false);
      await setIsEventEnabled(false);
      await postPushAll('N');
    }
  };

  const toggleWorkSwitch = async (category: string) => {
    await setIsWorkEnabled((previousState) => !previousState);
    const pushKey = !isWorkEnabled ? 'Y' : 'N';
    await postPush(category, pushKey);
  };

  const toggleEventSwitch = async (category: string) => {
    await setIsEventEnabled((previousState) => !previousState);
    const pushKey = !isEventEnabled ? 'Y' : 'N';
    await postPush(category, pushKey);
  };

  const categoryToggle = (category: string, isAllowed: string) => {
    switch (category) {
      case 'F':
        return isAllowed === 'Y'
          ? setIsWorkEnabled(true)
          : setIsWorkEnabled(false);
      case 'E':
        return isAllowed === 'Y'
          ? setIsEventEnabled(true)
          : setIsEventEnabled(false);
    }
  };

  const getPushToken = async () => {
    try {
      const result = await AsyncStorage.getItem('@FATW');

      if (result !== null) {
        setFcmToken(result);
      }
    } catch (e) {}
  };

  const setInitData = useCallback(() => {
    setIsLoading(true);
    isNetworkConnect(setIsNetworkRefresh);

    getUserPush();
    getPushToken();
  }, []);

  useEffect(() => {
    setInitData();
  }, []);

  useEffect(() => {
    if (isFetch) {
      setInitData();
    }
  }, [isFetch]);

  useEffect(() => {
    if (!isWorkEnabled && !isEventEnabled) {
      setNotiIsEnabled(false);
    } else {
      setNotiIsEnabled(true);
    }
  }, [isWorkEnabled, isEventEnabled, fcmToken]);

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
      ) : isLoading ? (
        <Loading loadingText="알림정보를 가져오고 있습니다" />
      ) : (
        <Main>
          <NotifiRow>
            <MainTitle>알림</MainTitle>
            <Switch
              trackColor={{
                false: 'rgba(60, 60, 67, 0.3)',
                true: Theme.colors.mainOpacity10Color,
              }}
              thumbColor={isNotiEnabled ? Theme.colors.mainColor : '#fefefe'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotiSwitch}
              value={isNotiEnabled}
            />
          </NotifiRow>
          <Content>
            <View>
              <NotifiRow isBorder>
                <Title>이벤트 알림</Title>
                <Switch
                  trackColor={{
                    false: 'rgba(60, 60, 67, 0.3)',
                    true: 'rgb(183, 206, 183)',
                  }}
                  thumbColor={isEventEnabled ? 'rgb(117, 160, 117)' : '#ffffff'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleEventSwitch('E')}
                  value={isEventEnabled}
                />
              </NotifiRow>
              <NotifiText>
                진행 중인 이벤트 및 특가 등{'\n'}
                <NotifiText isHighlight>다양한 이벤트 소식</NotifiText>을
                받아보실 수 있습니다
              </NotifiText>
            </View>
          </Content>
        </Main>
      )}
    </Layout>
  );
};

export default SettingNotification;

const Main = styled(CommonMain)`
  padding-top: ${Theme.height(24)}px;
`;

const Content = styled.View`
  padding: 0 ${Theme.width(16)}px;
  border-color: ${Theme.colors.line};
  border-width: 1px;
  border-radius: ${Theme.fontSize(4)}px;
  justify-content: space-between;
  margin-top: ${Theme.height(4)}px;
`;

const NotifiRow = styled.View<{isBorder?: boolean}>`
  padding: ${({isBorder}) =>
    isBorder
      ? `${Theme.height(14)}px 0`
      : `${Theme.height(14)}px ${Theme.width(16)}px`};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({isBorder}) => (isBorder ? `${Theme.height(4)}px` : '0px')};
`;

const MainTitle = styled(TextMedium)`
  color: ${Theme.colors.black};
  font-size: ${Theme.fontSize(18)}px;
`;

const Title = styled(TextRegular)`
  color: ${Theme.colors.black};
  font-size: ${Theme.fontSize(16)}px;
`;

const NotifiText = styled(TextRegular)<{isHighlight?: boolean}>`
  color: ${({isHighlight}) =>
    isHighlight ? `${Theme.colors.mainColor}` : `${Theme.colors.subText}`};
  font-size: ${Theme.width(14)}px;
  margin-bottom: ${Theme.height(12)}px;
`;
