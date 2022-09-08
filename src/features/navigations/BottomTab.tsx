import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeTab} from '~/features/navigations/navigators/HomeTab';
import {SettingTab} from '~/features/navigations/navigators/SettingTab';
import {WeatherTab} from '~/features/navigations/navigators/WeatherTab';
import {useSelector} from 'react-redux';
import Theme from '~/components/styles/theme';

import PlaceHolder from '~/assets/images/placeholder.svg';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  const {hasFarmlands} = useSelector((state) => state.users);

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: Theme.fontSize(14),
        },
        tabBarStyle: {
          height: Theme.fontSize(60),
          paddingTop: Theme.fontSize(5),
          paddingBottom: Theme.fontSize(5),
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Theme.colors.main,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: () => (
            <PlaceHolder
              width={Theme.fontSize(24)}
              height={Theme.fontSize(24)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WeatherTab"
        component={WeatherTab}
        listeners={({navigation}) => ({
          tabPress: (e) => {},
        })}
        options={{
          tabBarLabel: '날씨',
          tabBarIcon: ({focused}) => (
            <PlaceHolder
              width={Theme.fontSize(24)}
              height={Theme.fontSize(24)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingTab}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: ({focused}) => (
            <PlaceHolder
              width={Theme.fontSize(24)}
              height={Theme.fontSize(24)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
