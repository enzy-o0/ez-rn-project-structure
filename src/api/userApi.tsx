import {instance} from './';

export default {
  postSignUp(
    id: string,
    pswd: string,
    phoneNumber: string,
    name: string,
  ) {
    return instance({
      method: 'POST',
      url: '/signup',
      data: {
        id: id,
        pswd: pswd,
        phoneNumber: phoneNumber,
        name: name,
      },
    });
  },
  postLogout() {
    return instance({
      url: '/logout',
      method: 'POST',
    });
  },
};
