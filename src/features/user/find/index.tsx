import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import FindUserId from '~/features/user/find/section/FindUserId';
import Theme from '~/components/styles/theme';
import {RootStackParamList} from '~/features/navigations/@types';

const Tab = createMaterialTopTabNavigator();

type FindScreenRouteProp = RouteProp<RootStackParamList, 'FindIdPw'>;

interface Props {
  route: FindScreenRouteProp;
}

const FindIdPw = ({route}: Props) => {
  return (
    <Tab.Navigator
      initialRouteName={route.params.name}
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: Theme.colors.mainColor,
        },
        tabBarPressColor: 'transparent',
        tabBarActiveTintColor: Theme.colors.mainColor,
        tabBarInactiveTintColor: Theme.colors.disable,
        tabBarLabelStyle: {
          fontSize: Theme.fontSize(16),
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen name="아이디 찾기" component={FindUserId} />
    </Tab.Navigator>
  );
};

export default FindIdPw;
