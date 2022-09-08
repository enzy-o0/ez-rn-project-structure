import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components/native';

import {Features, GoToBack} from '.';

import Weather from '~/features/weather';
import {TextMedium} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';
import {TextRegular} from '~/components/styles/Mixin';
import {InquiryTab} from './SettingTab';
import PastWeather from '~/features/weather/section/PastWeather';

import Arrow from '~/assets/images/icon_setting_notice_arrow.svg';
import ErrorModal from '~/components/atoms/Modal/ErrorModal';
import {CommonActions} from '@react-navigation/native';

const Stack = createStackNavigator();

export const WeatherTab = ({navigation, route}: any) => {
  useEffect(() => {
    if (route.params) {
      navigation.dispatch(
        CommonActions.navigate({
          name: '과거 날씨',
          params: {
            pastDate: route.params.pastDate,
          },
        }),
      );
    }
  }, [route.params]);
  return (
    <Stack.Navigator>
      {Features({
        name: 'Weather',
        screen: Weather,
        customOptions: {
          headerLeft: () => (
            <TextMedium
              style={{
                fontWeight: 'bold',
                color: '#000',
                fontSize: Theme.fontSize(18),
                marginLeft: Theme.width(16),
              }}>
              날씨
            </TextMedium>
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <FarmLandSelectorWrapper
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('WeatherFarmlandsSelector');
              }}>
              <FarmLandSelectorName>테스트</FarmLandSelectorName>
              <Arrow width={Theme.fontSize(24)} height={Theme.fontSize(24)} />
            </FarmLandSelectorWrapper>
          ),
        },
        initialParams: {pastDate: route.params?.pastDate},
      })}

      {Features({
        name: 'PastWeatherTutorial',
        screen: PastWeather,
        customOptions: {
          title: '과거 날씨',
          headerTitleAlign: 'center',
          headerLeft: () => <GoToBack isModal />,
        },
        isDepth: true,
      })}

      {InquiryTab(navigation, 'Weather')}
    </Stack.Navigator>
  );
};

const FarmLandSelectorWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FarmLandSelectorName = styled(TextRegular)`
  font-size: ${Theme.fontSize(16)}px;
  color: ${Theme.colors.subText};
`;
