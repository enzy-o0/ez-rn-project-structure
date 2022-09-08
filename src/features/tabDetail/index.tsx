import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TodoTab2 from './section/TodoTab2';
import TodoTab1 from './section/TodoTab1';
import TodoTab3 from './section/TodoTab3';
import Theme from '~/components/styles/theme';

const Tab = createMaterialTopTabNavigator();

const TabDetail = ({route}) => {
  return (
    <Tab.Navigator
      initialRouteName="탭1"
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
      <Tab.Screen name="탭1" component={TodoTab1} />
      <Tab.Screen name="탭2" component={TodoTab2} />
      <Tab.Screen name="탭3" component={TodoTab3} />
    </Tab.Navigator>
  );
};

export default TabDetail;
