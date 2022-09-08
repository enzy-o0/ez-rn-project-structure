import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/core';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  LogIn: undefined;
  SignUpTerms: undefined;
  SignUpId: undefined;
  SignUpPw: undefined;
  SignUpInfo: {jibun: string} | undefined;
  SignUpAddr: undefined;
  FindIdPw: {name: '비밀번호 찾기' | '아이디 찾기'};
  FindUserId: undefined;
  ResetPw: undefined;
} & WeatherTabStackParamList &
  SettingTabStackParamList;

export type BottomTabParamList = {
  HomeTab: undefined;
  WeatherTab: undefined;
  SettingTab: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<RootStackParamList>
>;

export type TermsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export type WeatherTabStackParamList = {
  PastWeather: {pastDate: string};
  TodayWeather: {today: string};
  ForecastWeather: {tomorrow: string};
};

export type SettingTabStackParamList = {
  Setting: undefined;
  SettingInquiry: undefined;
  SettingAddInquiry: undefined;
  SettingChangePhone: undefined;
  SettingResetAccountInfo: undefined;
  SettingNotice: undefined;
  SettingNotification: undefined;
};
