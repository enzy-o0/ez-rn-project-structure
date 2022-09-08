import React from 'react';
import {Features} from './navigators';
import {createStackNavigator} from '@react-navigation/stack';
import {GoToButton} from './navigators';
import {RootStackParamList} from './@types';
import {userClear} from '~/reducers/SignUpSlice';
import {useNavigation} from '@react-navigation/native';
import {GoToButtonWrapper} from '~/components/styles/Mixin';
import PlaceHolder from '~/assets/images/placeholder.svg';
import Theme from '~/components/styles/theme';

import LogIn from '../user/LogIn';
import SignUpId from '../user/signup/SignUpId';
import SignUpPw from '../user/signup/SignUpPw';
import SignUpInfo from '../user/signup/SignUpInfo';
import SignUpAddr from '../user/signup/SignUpAddr';
import FindIdPw from '../user/find';
import ResetPw from '~/features/user/find/section/ResetPw';
import NavigationModal from '~/components/atoms/Modal/NavigationModal';
import ErrorModal from '~/components/atoms/Modal/ErrorModal';

const Stack = createStackNavigator<RootStackParamList>();

const SignUpModal = ({navigation}) => {
  return (
    <NavigationModal
      isTwoBtn
      isSubTitle
      label="확인"
      navigation={navigation}
      modalTextLabel={'회원가입을 중단하고 나가시겠어요?'}
      clearDispatch={userClear()}
      navigationScreen={'LogIn'}
    />
  );
};

const SignUpHeaderRight = () => {
  const navigation = useNavigation<any>();

  return {
    title: '회원가입',
    headerBackTitleVisible: false,
    headerTitleAlign: 'left',
    headerRight: () => (
      <GoToButtonWrapper
        activeOpacity={0.6}
        onPress={(e) => {
          e.preventDefault();
          navigation.navigate('SignUpModal');
        }}>
        <PlaceHolder width={Theme.fontSize(24)} height={Theme.fontSize(24)} />
      </GoToButtonWrapper>
    ),
    presentation: 'transparentModal',
  };
};

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      {Features({
        name: 'LogIn',
        screen: LogIn,
        customOptions: {headerShown: false},
      })}
      {Features({
        name: 'SignUpModal',
        screen: SignUpModal,
        customOptions: SignUpHeaderRight(),
        isDepth: true,
        isRight: true,
      })}
      {Features({
        name: 'SignUpId',
        screen: SignUpId,
        customOptions: SignUpHeaderRight(),
        isDepth: true,
        isRight: true,
      })}
      {Features({
        name: 'SignUpPw',
        screen: SignUpPw,
        customOptions: SignUpHeaderRight(),
        isDepth: true,
        isRight: true,
      })}
      {Features({
        name: 'SignUpInfo',
        screen: SignUpInfo,
        customOptions: SignUpHeaderRight(),
        isDepth: true,
        isRight: true,
      })}
      {Features({
        name: 'SignUpAddr',
        screen: SignUpAddr,
        customOptions: {
          title: '자택 주소 검색',
          headerTitleAlign: 'center',
          headerLeft: () => <GoToButton screenName="SignUpInfo" />,
          headerRight: () => null,
        },
        isDepth: true,
        isRight: true,
      })}
      {Features({
        name: 'FindIdPw',
        screen: FindIdPw,
        customOptions: {
          headerBackTitleVisible: false,
          title: '',
          headerTitleAlign: 'center',
        },
        isDepth: true,
      })}
      {Features({
        name: 'ResetPw',
        screen: ResetPw,
        customOptions: {
          headerBackTitleVisible: false,
          title: '비밀번호 재설정',
        },
        isDepth: true,
      })}
      <Stack.Screen
        name="ServerErrorModalAuth"
        component={ErrorModal}
        options={{presentation: 'transparentModal', headerShown: false}}
      />
    </Stack.Navigator>
  );
};
