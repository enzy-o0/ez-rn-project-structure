import React, {useState} from 'react';
import {Keyboard, ScrollView, Pressable} from 'react-native';
import {Layout, CommonMain} from '~/components/styles/Mixin';
import PasswordComponent from '~/components/organisms/Password';
import styled from 'styled-components/native';
import Theme from '~/components/styles/theme';
import {useDispatch} from 'react-redux';
import {saveUserId, saveUserPassword} from '~/reducers/SignUpSlice';

const SignUpPw = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {id} = route.params;
  const [userPassword, setUserPassword] = useState('');

  return (
    <>
      <Layout isBgWhite>
        <ScrollView>
          <Pressable onPress={Keyboard.dismiss}>
            <Main>
              <PasswordComponent
                setUserPassword={setUserPassword}
                passwordLabelText="비밀번호"
                passwordPlaceholder="비밀번호를 입력해주세요"
                passwordCheckLabelText="비밀번호 확인"
                passwordCheckPlaceholder="비밀번호를 한번 더 입력해주세요"
                buttonLabel="다음"
                id={id}
                handleNavigate={() => {
                  dispatch(saveUserId(id));
                  dispatch(saveUserPassword(userPassword));
                }}
              />
            </Main>
          </Pressable>
        </ScrollView>
      </Layout>
    </>
  );
};

export default SignUpPw;

const Main = styled(CommonMain)`
  margin-top: ${Theme.height(49)}px;
`;
