import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {instance} from '~/api';
import * as Keychain from 'react-native-keychain';

type LoginType = {
  id: string;
  pswd: string;
};

export const userLogIn = createAsyncThunk(
  'user/logIn',
  async (data: LoginType | undefined, {rejectWithValue}) => {
    // try {
    // if (data) {
    //// 자동 로그인이 아닐 경우,
    // const {userId, userPswd} = data;

    // const res = await instance({
    //   url: '/login',
    //   method: 'POST',
    //   data: {
    //     user_id: id,
    //     user_pswd: pswd,
    //   },
    // });

    //// session Cookie 처리로 session 유지 위함
    // const headers = res.headers;
    // if (res.data.success) {
    // let sessionCookie = headers['set-cookie'];
    // if (!sessionCookie) {
    //   axios.interceptors.request.eject(instance);
    //   const isATLogin = await getAccessToken();
    //   if (isATLogin) {
    //     sessionCookie = isATLogin.setCookie;
    //   } else {

    //// 로그인 api에서 세션 쿠키를 제공하지 않을 경우,
    //     return rejectWithValue({
    //       errorMsg: '[EWB901] 예기치 않은 오류가 발생하였습니다',
    //     });
    //   }
    // }

    //// 로그인 후, access token, seq, session cookie EncryptedStorage에 저장
    // const jsonValue = JSON.stringify({
    //   at: res.data.at,
    //   seq: res.data.seq,
    //   setCookie: sessionCookie,
    // });
    // await EncryptedStorage.setItem('AAWT', jsonValue);
    // await Keychain.setGenericPassword(
    //   String(res.data.seq),
    //   res.data.rt,
    // );

    //// instance에 access token, session cookie 세팅
    // instance.defaults.headers.common.authorization = res.data.at;
    // instance.defaults.headers.Cookies = sessionCookie;

    //// instance에 refrest token, seq 세팅
    // interceptor({
    //   rt: res.data.rt,
    //   seq: res.data.seq,
    // });

    return {
      //// axios login api 성공일 경우, seq return
      // seq: res.data.seq,
      seq: 0,
    };
    //// axios login api 실피인 경우, errorMessage return
    // } else {
    // const errorMessage = res.data.message;
    // return rejectWithValue({errorMsg: 'errorMessage'});
    // }
    // } else {
    //// 자동 로그인 일 경우, access token, refresh token 불러와서 instance에 세팅
    //   const isATLogin = await getAccessToken();
    //   const isRTLogin = await getRefreshToken();

    //   if (isRTLogin) {
    //     if (isATLogin) {
    //       instanceAuth.defaults.headers.Cookies = isATLogin.setCookie;
    //       instanceAuth.defaults.headers.common.authorization = isATLogin.at;

    //       interceptor({
    //         rt: isRTLogin,
    //         seq: isATLogin.seq,
    //       });

    //       return {
    //         seq: isATLogin.seq,
    //       };
    //     } else {
    //       SplashScreen.hide();
    //       return rejectWithValue({errorMsg: null});
    //     }
    //   } else {
    //     SplashScreen.hide();
    //     return rejectWithValue({errorMsg: null});
    //   }
    // }
    // } catch (e) {
    //   return rejectWithValue({errorMsg: `${e.message}`});
    // }
  },
);

export const userLogout = createAsyncThunk(
  'user/logout',
  async (_, {rejectWithValue}) => {
    try {
      // const res = await userApi.postLogout();
      // if (res.data.success) {
      await AsyncStorage.removeItem('@FATW');
      await EncryptedStorage.clear();
      await Keychain.resetGenericPassword();
      instanceAuth.interceptors.request.eject(instanceAuth);
      return '로그아웃 되었습니다';
      // }
    } catch (e) {
      return rejectWithValue('로그아웃에 실패했습니다');
    }
  },
);

export const UsersSlice = createSlice({
  name: 'users',
  initialState: {
    seq: null,
    hasFarmlands: false,
    isLogInLoading: false,
    isLogInSuccess: null,
    isLogInError: false,
    errorMsg: '',
    errorSubMsg: '',
    isLogoutLoading: false,
    isLogoutSuccess: false,
    isLogoutError: null,
    changePasswordLogoutMsg: null,
  },
  reducers: {
    clearState: (state) => {
      state.seq = null;
      state.hasFarmlands = false;
      state.isLogInSuccess = false;
      state.isLogInError = false;
      state.errorMsg = '';
      state.errorSubMsg = '';
      return state;
    },
    setHasFarmlands: (state) => {
      state.hasFarmlands = true;
      return state;
    },
    setNoFarmlands: (state) => {
      state.hasFarmlands = false;
      return state;
    },
    setIsNotFirst: (state) => {
      state.isLogInSuccess = false;
      return state;
    },
    setIsFirst: (state) => {
      state.isLogInSuccess = null;
      return state;
    },
    setIsLoginSuccess: (state, action) => {
      state.isLogInSuccess = true;
      state.isLogInLoading = false;
      state.seq = action.payload.seq;
      // return state;
    },
    setIsLogout: (state) => {
      state.isLogoutLoading = false;
      state.isLogoutSuccess = true;
      state.isLogInSuccess = false;
      state.seq = null;
      state.hasFarmlands = false;
      state.isLogInError = false;
      state.errorMsg = '';
      state.errorSubMsg = '';
      state.changePasswordLogoutMsg =
        '비밀번호 변경, 로그인 유효기간 만료 등으로 로그아웃 되었습니다. 보안을 위해 다시 로그인해주세요.';
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogIn.pending, (state) => {
        state.isLogInLoading = true;
        state.isLogInSuccess = false;
      })
      .addCase(userLogIn.fulfilled, (state, action) => {
        state.errorMsg = '';
        state.isLogInLoading = false;
        state.isLogInSuccess = true;
        state.isLogInError = false;
        state.seq = action.payload.seq;
      })
      .addCase(userLogIn.rejected, (state, action: any) => {
        state.isLogInLoading = false;
        state.isLogInSuccess = false;
        state.isLogInError = true;
        state.errorMsg = action.payload.errorMsg;
        state.errorSubMsg = action.payload.errorSubMsg;
      })
      .addCase(userLogout.pending, (state) => {
        state.isLogoutLoading = true;
        state.isLogoutSuccess = false;
        state.isLogoutError = '로그아웃 중입니다';
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLogoutLoading = false;
        state.isLogoutSuccess = true;
        state.isLogInSuccess = false;
        state.seq = null;
        state.hasFarmlands = false;
        state.isLogInError = false;
        state.errorMsg = '';
        state.errorSubMsg = '';
        state.isLogoutError = '로그아웃 중입니다';

        return state;
      })
      .addCase(userLogout.rejected, (state, action: any) => {
        state.isLogoutLoading = false;
        state.isLogoutError = true;
        state.errorMsg = '로그아웃에 실패했습니다. ' + action.payload;
        return state;
      });
  },
});

export const {
  clearState,
  setHasFarmlands,
  setNoFarmlands,
  setIsNotFirst,
  setIsFirst,
  setIsLogout,
  setIsLoginSuccess,
} = UsersSlice.actions;
export const UsersSelector = (state: any) => state.users;
