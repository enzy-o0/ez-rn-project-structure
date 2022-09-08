import React, {useState} from 'react';
import {Keyboard, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import {UsersSelector, userLogIn} from '~/reducers/UsersSlice';
import {RootStackNavigationProp} from '~/features/navigations/@types';

import {Layout, CommonMain, TextMedium} from '~/components/styles/Mixin';
import Input from '~/components/atoms/Input';
import {Button} from '~/components/atoms/Button';
import Theme from '~/components/styles/theme';
import PlaceHolder from '~/assets/images/placeholder.svg';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();
  const {isLogInLoading} = useSelector(UsersSelector);
  const [userId, setUserId] = useState('');
  const [userPswd, setUserPswd] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleFindId = () =>
    navigation.navigate({
      name: 'FindIdPw',
      params: {name: '아이디 찾기'},
    });

  const handleFindPw = () =>
    navigation.navigate({
      name: 'FindIdPw',
      params: {name: '비밀번호 찾기'},
    });

  const handleToggleIconPassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleSubmit = () => {
    dispatch(
      userLogIn({
        userId: userId,
        userPswd: userPswd,
      }),
    );
  };

  return (
    <Layout isBgWhite>
      <ScrollView>
        <Pressable onPress={Keyboard.dismiss}>
          <Main>
            <LogoSection>
              <PlaceHolder
                width={Theme.width(240)}
                height={Theme.height(248)}
              />
            </LogoSection>
            <LogInInput
              labelText="아이디"
              value={userId}
              placeholder="아이디를 입력해주세요"
              keyboardType="default"
              onChangeText={setUserId}
            />
            <LogInInput
              labelText="비밀번호"
              value={userPswd}
              placeholder="비밀번호를 입력해주세요"
              onChangeText={setUserPswd}
              secureTextEntry={hidePassword}
              innerIcon={
                <PlaceHolder
                  width={Theme.width(24)}
                  height={Theme.width(24)}
                  onPress={handleToggleIconPassword}
                />
              }
            />
            <Button
              label="로그인"
              bgColor="bgMain"
              isPending={isLogInLoading}
              onPress={() => {
                handleSubmit();
              }}
            />
            <ContentDivider>
              <Divider isPaddingLeft={false}>
                <TouchableOpacity activeOpacity={0.6} onPress={handleFindId}>
                  <FindText>아이디 찾기</FindText>
                </TouchableOpacity>
              </Divider>
              <Divide />
              <Divider isPaddingLeft>
                <TouchableOpacity activeOpacity={0.6} onPress={handleFindPw}>
                  <FindText>비밀번호 찾기</FindText>
                </TouchableOpacity>
              </Divider>
            </ContentDivider>
          </Main>
        </Pressable>
      </ScrollView>
    </Layout>
  );
};

export default LogIn;

const Main = styled(CommonMain)`
  margin-top: ${Theme.height(40)}px;
`;

const LogInInput = styled(Input)`
  margin-bottom: ${Theme.height(17)}px;
`;

const ContentDivider = styled.View`
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  margin-top: ${Theme.height(16)}px;
`;

const FindText = styled(TextMedium)`
  font-size: ${Theme.fontSize(14)}px;
  color: ${Theme.colors.subText};
`;

const Divider = styled.View<{isPaddingLeft: boolean}>`
  padding: ${({isPaddingLeft}) =>
    isPaddingLeft ? `0 0 0 ${Theme.width(6)}px` : `0 ${Theme.width(6)}px 0 0`};
`;

const Divide = styled.View`
  width: ${Theme.width(2)}px;
  height: ${Theme.fontSize(16)}px;
  border-style: solid;
  border-width: ${Theme.width(0.5)}px;
  border-color: #fff;
  background-color: ${Theme.colors.subText};
  margin: ${Theme.height(4)}px 0 0 0;
`;

const LogoSection = styled.View`
  margin-bottom: ${Theme.height(30)}px;
  justify-content: center;
  align-items: center;
`;
