import React, {useCallback, useState} from 'react';
import {Keyboard, ScrollView, Pressable} from 'react-native';
import {Layout, CommonMain} from '~/components/styles/Mixin';
import styled from 'styled-components/native';
import Theme from '~/components/styles/theme';
import PasswordComponent from '~/components/organisms/Password';
import {CommonModal} from '~/components/atoms/Modal';
import userApi from '~/api/userApi';
import {useDispatch} from 'react-redux';
import {errorHandler} from '~/common/common';

const ResetPw = ({navigation, route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [responseData, setResponseData] = useState({
    code: null,
    message: '',
    subMessage: '',
  });

  const onSubmit = useCallback(async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const res = await userApi.putPasswordInit(id, userPassword);
      const statusCode = res.status;
      const message = res.data.data.message;

      setResponseData({
        ...responseData,
        message: message,
        code: statusCode,
      });

      setIsModalVisible(true);
    } catch (e) {
      errorHandler(e.code, e.message, dispatch, navigation);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, id, userPassword, dispatch]);

  return (
    <Layout isBgWhite>
      <ScrollView>
        <Pressable onPress={Keyboard.dismiss}>
          <Main>
            <PasswordComponent
              setUserPassword={setUserPassword}
              passwordLabelText="새 비밀번호"
              passwordCheckLabelText="새 비밀번호 확인"
              passwordCheckPlaceholder="비밀번호를 한번 더 입력해주세요"
              passwordPlaceholder="비밀번호를 입력해주세요"
              buttonLabel="비밀번호 재설정"
              navigation={navigation}
              setNavigate={'LogIn'}
              id={id}
              handleNavigate={() => {
                onSubmit();
              }}
            />
          </Main>
          {isModalVisible && (
            <CommonModal
              label="확인"
              modalTextLabel={responseData.message}
              handleConfirm={() => {
                if (responseData.code === 200) {
                  setIsModalVisible(false);
                  navigation.navigate('LogIn');
                } else {
                  setIsModalVisible(false);
                }
              }}
            />
          )}
        </Pressable>
      </ScrollView>
    </Layout>
  );
};

export default ResetPw;

const Main = styled(CommonMain)`
  margin-top: ${Theme.height(49)}px;
`;
