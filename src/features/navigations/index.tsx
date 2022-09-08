import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootTab} from './RootTab';
import {toastConfig} from '~/common/common';
import Toast from 'react-native-toast-message';
// import analytics from '@react-native-firebase/analytics';

const Stack = createStackNavigator();

const RootStackNavigation = () => {
  // const navigationRef = useNavigationContainerRef();
  // const routeNameRef = useRef();

  return (
    <>
      <NavigationContainer
      // ref={navigationRef}
      // onReady={() => {
      //   routeNameRef.current = navigationRef.getCurrentRoute().name;
      // }}
      // onStateChange={async () => {
      //   const previousRouteName = routeNameRef.current;
      //   const currentRouteName = navigationRef?.getCurrentRoute().name;

      //   if (previousRouteName !== currentRouteName) {
      //     // The line below uses the expo-firebase-analytics tracker
      //     // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
      //     // Change this line to use another Mobile analytics SDK
      //     await analytics().logScreenView({
      //       screen_name: currentRouteName,
      //       screen_class: currentRouteName,
      //     });
      //   }

      //   // Save the current route name for later comparison
      //   routeNameRef.current = currentRouteName;
      // }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="RootTab" component={RootTab} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default RootStackNavigation;
