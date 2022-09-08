import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Theme from '~/components/styles/theme';
import IconBack from '~/assets/images/icon_navigation_back.svg';
import IconCloseImg from '~/assets/images/icon_navigation_close.svg';
import {GoToButtonWrapper} from '~/components/styles/Mixin';

const Stack = createStackNavigator();

export const GoToButton = ({screenName}: any) => {
  const navigation = useNavigation<any>();
  return (
    <GoToButtonWrapper
      activeOpacity={0.6}
      onPress={() => navigation.navigate(screenName)}>
      <IconCloseImg width={Theme.fontSize(24)} height={Theme.fontSize(24)} />
    </GoToButtonWrapper>
  );
};

export const GoToBack = ({isModal}: {isModal?: boolean}) => {
  const navigation = useNavigation<any>();
  return (
    <GoToButtonWrapper activeOpacity={0.6} onPress={() => navigation.pop()}>
      {isModal ? (
        <IconCloseImg width={Theme.fontSize(24)} height={Theme.fontSize(24)} />
      ) : (
        <IconBack width={Theme.fontSize(24)} height={Theme.fontSize(24)} />
      )}
    </GoToButtonWrapper>
  );
};

interface Iprops {
  name: string;
  screen: any;
  customOptions: any;
  isDepth?: boolean;
  isRight?: boolean;
  isModal?: boolean;
  listeners?: any;
  initialParams?: any;
}

export const Features = ({
  name,
  screen,
  customOptions,
  isDepth,
  isRight,
  isModal,
  listeners,
  initialParams,
}: Iprops) => {
  return (
    <Stack.Screen
      name={name}
      component={screen}
      listeners={listeners}
      initialParams={initialParams}
      options={() => ({
        headerStyle: {
          height: Theme.fontSize(60),
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: Theme.fontSize(18),
        },
        headerLeft: () => (isDepth ? <GoToBack isModal={isModal} /> : null),
        headerRight: () => isRight && <GoToButton screenName="LogIn" />,
        ...customOptions,
      })}
    />
  );
};
