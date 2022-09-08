/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import RootStackNavigation from './features/navigations';

import store from './app/store';
import {Provider} from 'react-redux';

import {ThemeProvider} from 'styled-components';
import theme from './components/styles/theme';
import {Dimensions} from 'react-native';

const App = () => {
  useEffect(() => {
    const updateLayout = () => {
      // 추후 가로모드 대응 시 필요
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootStackNavigation />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
