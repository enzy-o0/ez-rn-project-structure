import React from 'react';
import Addr from '~/components/organisms/Addr';

const SettingAddr = ({navigation}) => {
  return (
    <>
      <Addr
        label="μν μ£Όμ"
        navigation={navigation}
        navigate="SettingResetAccountInfo"
      />
    </>
  );
};

export default SettingAddr;
