import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import styled from 'styled-components/native';
import Theme from '~/components/styles/theme';
import {TextMedium} from '~/components/styles/Mixin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setIsNotFirst} from '~/reducers/UsersSlice';

import PlaceHolder from '~/assets/images/placeholder.svg';

const slides = [
  {
    index: 1,
    svgImage: (
      <PlaceHolder width={Theme.width(219)} height={Theme.width(437)} />
    ),
  },
  {
    index: 2,
    svgImage: (
      <PlaceHolder width={Theme.width(219)} height={Theme.width(437)} />
    ),
  },
  {
    index: 3,
    svgImage: (
      <PlaceHolder width={Theme.width(219)} height={Theme.width(437)} />
    ),
  },
];

const renderItem = ({item}) => {
  return (
    <OnboardingWrapper>
      <TextWrapper>{item.textImage}</TextWrapper>
      <BgWrapper>{item.svgImage}</BgWrapper>
    </OnboardingWrapper>
  );
};

const OnBoarding = () => {
  const dispatch = useDispatch();

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      dotStyle={{
        width: Theme.width(8),
        height: Theme.width(8),
        borderRadius: Theme.width(4),
        backgroundColor: '#C4C4C4',
      }}
      activeDotStyle={{
        width: Theme.width(8),
        height: Theme.width(8),
        borderRadius: Theme.width(4),
        backgroundColor: Theme.colors.mainColor,
      }}
      renderDoneButton={() => (
        <ButtonText
          onPress={async () => {
            await AsyncStorage.setItem('@OnB', 'Y');
            dispatch(setIsNotFirst());
          }}>
          로그인
        </ButtonText>
      )}
      renderNextButton={() => <ButtonText>다음</ButtonText>}
      nextLabel="다음"
      doneLabel="로그인"
    />
  );
};

export default OnBoarding;

const ButtonText = styled(TextMedium)`
  color: ${Theme.colors.mainColor};
  font-size: ${Theme.fontSize(18)}px;
  line-height: ${Theme.fontSize(27)}px;
  text-align: center;
`;

const OnboardingWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.View`
  height: ${Theme.fontSize(98)}px;
  margin-top: ${Theme.fontSize(60)}px;
  margin-bottom: ${Theme.fontSize(20)}px;
`;

const BgWrapper = styled.View`
  width: ${Theme.width(219)}px;
  height: ${Theme.height(437)}px;
  align-items: center;
`;
