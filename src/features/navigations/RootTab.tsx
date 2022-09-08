import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {BottomTab} from './BottomTab';
import {AuthStack} from './AuthStack';
import {userLogIn, UsersSelector} from '~/reducers/UsersSlice';
import OnBoarding from '~/components/organisms/OnBoarding';
import {showToast} from '~/common/common';
import Loading from '~/components/atoms/Loading';
import store from '~/app/store';

const Stack = createStackNavigator();

export const RootTab = () => {
  const dispatch = useDispatch();
  const {
    isLogInSuccess,
    isLogoutSuccess,
    isLogoutLoading,
    changePasswordLogoutMsg,
  } = useSelector(UsersSelector);
  const [isGetOnB, setIsGetOnB] = useState(null);
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    if (isLogoutSuccess) {
      store.dispatch({type: 'LOGOUT'});
      if (changePasswordLogoutMsg) {
        showToast(changePasswordLogoutMsg);
      } else {
        showToast('로그아웃 되었습니다');
      }
    }
  }, [isLogoutSuccess, changePasswordLogoutMsg]);

  const getOnB = async () => {
    const checkOB = await AsyncStorage.getItem('@OnB');
    const check = checkOB != null ? checkOB : null;
    return check === 'Y' ? true : false;
  };

  const isOnB = async () => {
    const checkOB = await getOnB();
    if (checkOB) {
      await dispatch(userLogIn());
      await setIsGetOnB(checkOB);
      await SplashScreen.hide();
    } else {
      await setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    }

    setIsSetting(true);
  };

  useEffect(() => {
    isOnB();
  }, []);

  return isLogoutLoading ? (
    <Loading loadingText={'로그아웃 중입니다'} />
  ) : (
    isSetting && (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLogInSuccess ? (
          <Stack.Screen name="BottomTab" component={BottomTab} />
        ) : isGetOnB === null && isLogInSuccess === null ? (
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    )
  );
};
