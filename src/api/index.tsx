import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';

// auth O
export const instance = axios.create({
  baseURL: Config.API_URL,
  withCredentials: true,
  validateStatus: function (status) {
    return status < 300;
  },
  params: {
    t: new Date().getTime(),
  },
  timeout: 30000,
});

export const interceptor = (store) => {
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response) {
        const {
          config,
          response: {status},
        } = error;

        if (status === 404 || status === 0) {
          return Promise.reject({
            code: 'CODE404',
            message: '예기치 않은 오류가 일어났습니다',
          });
        } else if (status === 401 || status === 403) {
          const originalRequest = config;

          instance.interceptors.request.eject(instance);

          const {headers, data} = await instance({
            url: '/token/access',
            method: 'POST',
            data: {
              refresh_token: store.rt,
            },
          });

          const resHeaders = headers;

          if (data.accessToken) {
            let sessionCookie = resHeaders['set-cookie'];
            const jsonValue = JSON.stringify({
              at: data.accessToken,
            });
            await EncryptedStorage.setItem('AAWT', jsonValue);

            axios.defaults.headers.Cookies = sessionCookie;
            instance.defaults.headers.common.authorization =
              data.accessToken;
            originalRequest.headers.authorization = data.accessToken;
            return axios(originalRequest);
          } else {
            return Promise.reject({
              code: error.response.data.code,
              message: error.response.data.message,
            });
          }
        } else {
          return Promise.reject({
            code: error.response.data.code,
            message: error.response.data.message,
          });
        }
      } else {
        return Promise.reject({
          message:
            '네트워크 연결이 원활하지 않습니다\n네트워크 상태를 확인해주세요',
        });
      }
    },
  );
};
