import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PastWeather from './section/PastWeather';
import TodayWeather from './section/TodayWeather';
import ForecastWeather from './section/ForecastWeather';
import Theme from '~/components/styles/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
const Tab = createMaterialTopTabNavigator();

const Weather = ({route}) => {
  return (
    <Tab.Navigator
      initialRouteName={route.params.pastDate ? '지난 날씨' : '오늘 날씨'}
      screenOptions={{
        swipeEnabled: false,
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
      <Tab.Screen name="지난 날씨" component={PastWeather} />
      <Tab.Screen name="오늘 날씨" component={TodayWeather} />
      <Tab.Screen name="다음 날씨" component={ForecastWeather} />
    </Tab.Navigator>
  );
};

export default Weather;
