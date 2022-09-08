import React, {useState, useEffect, useCallback} from 'react';
import {Keyboard, ScrollView, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {Layout, CommonMain} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';
import Input from '~/components/atoms/Input';
import {Button} from '~/components/atoms/Button';
import InputCondition from '~/components/atoms/Input/InputCondition';
import {CommonModal} from '~/components/atoms/Modal';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '~/features/navigations/@types';
import userApi from '~/api/userApi';
import {useDispatch} from 'react-redux';
import {errorHandler} from '~/common/common';

const SignUpId = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();

  const [userId, setUserId] = useState<null | string>(null);
  const [isIdUnique, setIsIdUnique] = useState(false);
  const [isCheckDuplicate, setIsCheckDuplicate] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [idFocused, setIdFocused] = useState(false);
  const [isIdValid, setIsIdValid] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleFocusId = () => {
    setIdFocused(true);
  };

  const handleChangeId = useCallback((text) => {
    setUserId(text);
  }, []);

  const isIdOverMinMaxLength = (idMinMax: string) => {
    const ID_MIN_LENGTH = 6;
    const ID_MAX_LENGTH = 15;

    return (
      !!idMinMax &&
      idMinMax.length >= ID_MIN_LENGTH &&
      idMinMax.length <= ID_MAX_LENGTH
    );
  };

  const isIdMixCharAndNumber = (id: string) => {
    const regExp = /(?=.*[a-z])(^[a-z\d]*$)/g;

    return regExp.test(id);
  };

  const handleIdDuplicate = async (checkUserId) => {
    try {
      const res = await userApi.postIdDuplicateCheck(checkUserId);

      if (res.data.success) {
        const response = res.data.data;
        if (response) {
          setIsIdUnique(true);
        } else {
          setIsIdUnique(false);
        }

        setisModalVisible(true);
      }
    } catch (e) {
      errorHandler(e.code, e.message, dispatch, navigation);
      setIsIdUnique(false);
    }
  };

  useEffect(() => {
    if (
      !isIdOverMinMaxLength(userId) ||
      !isIdMixCharAndNumber(userId) ||
      !userId
    ) {
      setIsIdValid(false);
    } else {
      setIsIdValid(true);
    }
  }, [userId]);

  useEffect(() => {
    if (
      !isIdOverMinMaxLength(userId) ||
      !isIdMixCharAndNumber(userId) ||
      !isCheckDuplicate
    ) {
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
    }
  }, [userId, isCheckDuplicate]);

  const handleSignUpPw = () => navigation.navigate('SignUpPw', {id: userId});

  return (
    <>
      <Layout isBgWhite>
        <ScrollView>
          <Pressable onPress={Keyboard.dismiss}>
            <Main>
              <ContentRow isFocus={idFocused}>
                <IdInput
                  onFocus={handleFocusId}
                  labelText="아이디"
                  value={userId}
                  placeholder="아이디를 입력해주세요"
                  onChangeText={(text) => handleChangeId(text)}
                />
                <ButtonWrapper
                  label="중복확인"
                  isSmall
                  isPending={isIdUnique === null}
                  bgColor={isIdValid ? 'bgMain' : 'disable'}
                  onPress={(): any => {
                    if (isIdValid && userId) {
                      setIsIdUnique(null);
                      handleIdDuplicate(userId);
                    }
                  }}
                />
              </ContentRow>
              {idFocused && (
                <InputPasswordWrapper>
                  <InputCondition
                    condition={!!userId && isIdOverMinMaxLength(userId)}
                    title={'6자리 이상 15자리 이하'}
                    isNull={userId === null}
                  />
                  <InputCondition
                    condition={!!userId && isIdMixCharAndNumber(userId)}
                    title={'영문(소문자) 혹은 영문과 숫자를 조합'}
                    isNull={userId === null}
                  />
                </InputPasswordWrapper>
              )}
              <ButtonWrapper
                onPress={(): any => {
                  if (isCorrect) {
                    handleSignUpPw();
                  }
                }}
                label="다음"
                bgColor={isCorrect ? 'bgMain' : 'disable'}
              />
            </Main>
          </Pressable>
          {isModalVisible && (
            <CommonModal
              label={'확인'}
              modalTextLabel={
                isIdUnique
                  ? '사용 가능한 아이디입니다'
                  : '이미 사용 중인 아이디입니다'
              }
              handleConfirm={() => {
                if (isIdUnique) {
                  setIsCheckDuplicate(true);
                } else {
                  setUserId('');
                  setIsCheckDuplicate(false);
                }
                setisModalVisible(false);
              }}
            />
          )}
        </ScrollView>
      </Layout>
    </>
  );
};

export default SignUpId;

const Main = styled(CommonMain)`
  margin-top: ${Theme.height(49)}px;
`;

const ContentRow = styled.View<{isFocus: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({isFocus}) =>
    isFocus ? `${Theme.height(11)}px` : `${Theme.height(20)}px`};
`;

const IdInput = styled(Input)`
  width: ${Theme.width(236)}px;
`;

const ButtonWrapper = styled(Button)`
  width: ${(props) => (props.isSmall ? `${Theme.width(84)}px` : '100%')};
  justify-content: center;
`;

const InputPasswordWrapper = styled.View`
  margin-bottom: ${Theme.height(23)}px;
`;
