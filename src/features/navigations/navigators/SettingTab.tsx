import React, {useEffect} from 'react';
import {Features, GoToButton} from '.';
import {createStackNavigator} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';

import Setting from '~/features/setting';
import SettingNotice from '~/features/setting/section/SettingNotice';
import SettingNotification from '~/features/setting/section/SettingNotification';
import SettingInquiry from '~/features/setting/section/SettingInquiry';
import SettingAddInquiry from '~/features/setting/section/SettingAddInquiry';

import SettingAddr from '~/features/setting/section/SettingAddr';
import PlaceHolder from '~/assets/images/placeholder.svg';
import Theme from '~/components/styles/theme';
import {GoToButtonWrapper} from '~/components/styles/Mixin';
import IconCloseImg from '~/assets/images/icon_navigation_close.svg';

import NavigationModal from '~/components/atoms/Modal/NavigationModal';
import ErrorModal from '~/components/atoms/Modal/ErrorModal';

const Stack = createStackNavigator();

const InquiryCancelModal = ({navigation}) => {
  return (
    <NavigationModal
      isTwoBtn
      isSubTitle
      label="확인"
      navigation={navigation}
      modalTextLabel={'문의 등록을 중단하고 나가시겠어요?'}
    />
  );
};

export const InquiryTab = (navigation, screen) => {
  return (
    <>
      {Features({
        name: `${screen}Inquiry`,
        screen: SettingInquiry,
        customOptions: {
          title: '1:1 문의',
          headerRight: () => (
            <NotificationButtonWrapper
              activeOpacity={0.6}
              onPress={() => navigation.navigate(`${screen}AddInquiry`)}>
              <PlaceHolder
                width={Theme.fontSize(24)}
                height={Theme.fontSize(24)}
              />
            </NotificationButtonWrapper>
          ),
        },
        isDepth: true,
      })}

      {Features({
        name: `${screen}AddInquiry`,
        screen: SettingAddInquiry,
        customOptions: {
          title: '1:1 문의 등록',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <GoToButtonWrapper activeOpacity={0.6}>
              <IconCloseImg
                width={Theme.fontSize(24)}
                height={Theme.fontSize(24)}
                onPress={(e) => {
                  e.preventDefault();
                  navigation.navigate(`${screen}InquiryCancelModal`);
                }}
              />
            </GoToButtonWrapper>
          ),
          presentation: 'transparentModal',
        },
        isDepth: true,
        isModal: true,
      })}

      {Features({
        name: `${screen}InquiryCancelModal`,
        screen: InquiryCancelModal,
        customOptions: {
          title: '1:1 문의 등록',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <GoToButtonWrapper activeOpacity={0.6}>
              <IconCloseImg
                width={Theme.fontSize(24)}
                height={Theme.fontSize(24)}
                onPress={(e) => {
                  e.preventDefault();
                  navigation.pop();
                }}
              />
            </GoToButtonWrapper>
          ),
          presentation: 'transparentModal',
        },
        isDepth: true,
      })}
    </>
  );
};

export const SettingTab = ({navigation, route}: any) => {
  const isLocker = route.params && route.params.isLocker;

  useEffect(() => {
    if (route.params) {
      navigation.dispatch(
        CommonActions.navigate({
          name: 'SettingNotice',
          params: {
            seq: route.params.seq,
          },
        }),
      );
    }
  }, [route.params]);

  return (
    <Stack.Navigator>
      {Features({
        name: 'Setting',
        screen: Setting,
        customOptions: {
          title: '설정',
          headerLeft: () => null,
        },
        initialParams: {isLocker: isLocker},
      })}

      {Features({
        name: 'SettingAddr',
        screen: SettingAddr,
        customOptions: {
          title: '자택 주소 검색',
          headerTitleAlign: 'center',
          headerLeft: () => <GoToButton screenName="SettingResetAccountInfo" />,
          headerRight: () => null,
        },
        isDepth: true,
        isRight: true,
      })}

      {Features({
        name: 'SettingNotice',
        screen: SettingNotice,
        customOptions: {
          title: '공지사항',
        },
        isDepth: true,
      })}

      {Features({
        name: 'SettingNotification',
        screen: SettingNotification,
        customOptions: {
          title: '알림설정',
        },
        isDepth: true,
      })}

      {InquiryTab(navigation, 'Setting')}
      <Stack.Screen
        name="ServerErrorModalSetting"
        component={ErrorModal}
        options={{presentation: 'transparentModal', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const NotificationButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-right: ${Theme.width(16)}px;
`;
