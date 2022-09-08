import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '~/features/navigations/@types';
import Addr from '~/components/organisms/Addr';

type NavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAddr'>;

interface Props {
  navigation: NavigationProp;
}

const SignUpAddr = ({navigation}: Props) => {
  return (
    <>
      <Addr label="자택 주소" navigation={navigation} navigate="SignUpInfo" />
    </>
  );
};

export default SignUpAddr;
