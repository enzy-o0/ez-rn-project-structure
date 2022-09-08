import React, {useState} from 'react';
import styled from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Features} from '.';
import HomeList from '~/features/home/HomeList';

import TabDetail from '~/features/tabDetail';
import HomeTodo from '~/features/home/HomeTodo';

import PlaceHolder from '~/assets/images/placeholder.svg';

import Theme from '~/components/styles/theme';
import {GoToButtonWrapper} from '~/components/styles/Mixin';

import {TextRegular} from '~/components/styles/Mixin';
import Home from '~/features/home/index';
import ErrorModal from '~/components/atoms/Modal/ErrorModal';

const Stack = createStackNavigator();

export const HomeTab = ({navigation}: any) => {
  const [userInitData, setUserInitData] = useState(null);

  return (
    <Stack.Navigator>
      {Features({
        name: 'Home',
        screen: Home,
        initialParams: {
          event: userInitData?.isEventPush,
        },
        customOptions: {
          title: '홈',
          headerLeft: () => null,
          headerRight: () => (
            <NotificationButtonWrapper activeOpacity={0.6}>
              <PlaceHolder
                width={Theme.fontSize(24)}
                height={Theme.fontSize(24)}
              />
            </NotificationButtonWrapper>
          ),
        },
      })}

      {Features({
        name: 'HomeTodo',
        screen: HomeTodo,
        initialParams: {
          event: userInitData?.isEventPush,
        },
        customOptions: {
          title: '홈',
          headerLeft: () => null,
          headerRight: () => (
            <NotificationButtonWrapper activeOpacity={0.6}>
              <PlaceHolder
                width={Theme.fontSize(24)}
                height={Theme.fontSize(24)}
              />
            </NotificationButtonWrapper>
          ),
        },
      })}

      {Features({
        name: 'HomeList',
        screen: HomeList,
        customOptions: {
          title: '홈',
          headerRight: () => (
            <GoToButtonWrapper
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Notification')}>
              <PlaceHolder
                width={Theme.fontSize(24)}
                height={Theme.fontSize(24)}
              />
            </GoToButtonWrapper>
          ),
        },
      })}

      {Features({
        name: 'TabDetail',
        screen: TabDetail,
        customOptions: {
          title: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <FarmLandSelectorWrapper activeOpacity={0.6}>
              <FarmLandSelectorName>테스트</FarmLandSelectorName>
            </FarmLandSelectorWrapper>
          ),
        },
        isDepth: true,
      })}

      <Stack.Screen
        name="ServerErrorModalHome"
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
  padding-right: ${Theme.fontSize(16)}px;
`;

const FarmLandSelectorWrapper = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const FarmLandSelectorName = styled(TextRegular)`
  font-size: ${Theme.fontSize(16)}px;
  color: ${Theme.colors.textSubColor};
`;
