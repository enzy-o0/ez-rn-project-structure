import React from 'react';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';
import {setIsVisibleModal, setErrorMsg} from '~/reducers/ErrorSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setIsLogout} from '~/reducers/UsersSlice';
import {instance} from '~/api';
import {ToastView, ToastContent} from '~/components/styles/Mixin';

interface IProps {
  props: string;
}

export const getAccessToken = async () => {
  const result = await EncryptedStorage.getItem('AAWT');
  const at = result != null ? JSON.parse(result) : null;
  return at ? at : null;
};

export const getRefreshToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  const rt = credentials != null ? credentials : null;

  return rt ? rt.password : null;
};

export const toastConfig = {
  selectedToast: ({props}: IProps) => (
    <ToastView>
      <ToastContent>{props}</ToastContent>
    </ToastView>
  ),
};

export const errorHandler = async (
  code: string,
  message: string,
  dispatch: any,
  navigation: any,
  screenName?: string,
) => {
  if (code) {
    await dispatch(setIsVisibleModal());
    await dispatch(setErrorMsg(`[${code}] ${message}`));

    if (screenName) {
      await navigation.navigate(`ServerErrorModal${screenName}`);
    } else {
      await navigation.navigate(
        `ServerErrorModal${navigation.getState().index}`,
      );
    }
  } else {
      await AsyncStorage.removeItem('@FATW');
      await EncryptedStorage.clear();
      await Keychain.resetGenericPassword();
      await instance.interceptors.request.eject(instance);
      await dispatch(setIsLogout());
};

const isNetwork = async () => {
  const {isConnected, isInternetReachable} = await NetInfo.fetch();

  return isConnected && isInternetReachable;
};

export const isNetworkConnect = async (
  setIsRefresh: React.Dispatch<React.SetStateAction<null | boolean>>,
) => {
  const nt = await isNetwork();
  setIsRefresh(nt);
};

export const graphLeftLocation = (
  dp: number,
  ddp: number,
  fdp: number,
  fp: number,
  value: number,
) => {
  const standard = 100 / 6;
  let returnValue = 0;
  if (value === 0) {
    returnValue = 1;
  } else if (dp >= value) {
    const percent = standard * value;
    returnValue = percent / dp;
  } else if (dp < value && ddp >= value) {
    const percent = standard * 2 * value;
    returnValue = percent / ddp;
  } else if (ddp < value && fdp >= value) {
    const percent = standard * 4 * value;
    returnValue = percent / fdp;
  } else if (fdp < value && fp >= value) {
    const percent = standard * 5 * value;
    returnValue = percent / fp;
  } else if (fp < value && fp + dp >= value) {
    const percent = standard * 6 * value;
    returnValue = percent / (fp + dp);
  } else {
    returnValue = 98;
  }

  return returnValue;
};

export const debounce = (func, delay) => {
  var timer = 0;
  return function debouncedFn() {
    if (Date.now() - timer > delay) {
      func();
    }
    timer = Date.now();
  };
};
