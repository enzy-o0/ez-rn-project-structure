import React from 'react';
import Addr from '~/components/organisms/Addr';

const SettingAddr = ({navigation}) => {
  return (
    <>
      <Addr
        label="자택 주소"
        navigation={navigation}
        navigate="SettingResetAccountInfo"
      />
    </>
  );
};

export default SettingAddr;
