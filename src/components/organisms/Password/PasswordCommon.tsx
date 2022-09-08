import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Input from '~/components/atoms/Input';
import Theme from '~/components/styles/theme';
import InputCondition from '~/components/atoms/Input/InputCondition';
import PlaceHolder from '~/assets/images/placeholder.svg';

interface IProps {
  currentPassword?: boolean;
  passwordLabelText: string;
  passwordPlaceholder: string;
  setIsCurrentValue?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLength?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMix?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheck?: React.Dispatch<React.SetStateAction<boolean>>;
  correctPassword?: string;
  setCorrectPassword?: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setUserPassword: any;
}

const PasswordCommon = ({
  currentPassword,
  passwordLabelText,
  passwordPlaceholder,
  setIsCurrentValue,
  setIsLength,
  setIsMix,
  correctPassword,
  setIsCheck,
  setCorrectPassword,
  id,
  setUserPassword,
  setValidPassword,
  setUserCurrentPassword,
}: IProps) => {
  const [password, setPassword] = useState<undefined | string>(undefined);
  const [hidePassword, setHidePassword] = useState(true);
  const [focusedPassword, setFocusedPassword] = useState(false);

  const handleFocusPassword = () => {
    setFocusedPassword(true);
  };

  const handleToggleIconPassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleChangePassword = (text: string) => {
    setPassword(text);
    setIsCurrentValue && setIsCurrentValue(!!text);
    setCorrectPassword && setCorrectPassword(text);
    setIsLength && setIsLength(isPasswordOverMinMaxLength(text));
    setIsMix && setIsMix(isPasswordMix(text));
    setValidPassword && setValidPassword(isNotSameIdPassword(text));
    setUserCurrentPassword && setUserCurrentPassword(text);
  };

  const handleChangeCheckPassword = (text: string) => {
    setPassword(text);

    isPasswordCheck(text) && setUserPassword && setUserPassword(text);
  };

  const isNotSameIdPassword = (idPswd: string): boolean => {
    return !!idPswd && id !== idPswd;
  };

  const isPasswordOverMinMaxLength = (pswdMinMax: string): boolean => {
    const PASSWORD_MIN_LENGTH = 8;
    const PASSWORD_MAX_LENGTH = 32;
    return (
      !!pswdMinMax &&
      pswdMinMax.length >= PASSWORD_MIN_LENGTH &&
      pswdMinMax.length <= PASSWORD_MAX_LENGTH
    );
  };

  const isPasswordMix = (pswd: string): boolean => {
    const specialChar = '~!@#$%^&*()_|+\\-=?;:\'",.<>\\{\\}\\[\\]\\/\\|';
    const regExp = new RegExp(
      `(((?=.*[a-zA-Z])(?=.*[0-9]))|((?=.*[${specialChar}])(?=.*[0-9]))|((?=.*[a-zA-Z])(?=.*[${specialChar}])))(^[a-zA-Z0-9${specialChar}]*$)`,
    );

    return regExp.test(pswd);
  };

  const isPasswordCheck = (passwordCheck: string): boolean => {
    return passwordCheck === correctPassword;
  };

  useEffect(() => {
    setIsCheck && setIsCheck(isPasswordCheck(password));
  }, [correctPassword, password]);

  return (
    <>
      <>
        <PasswordInput
          currentPassword={currentPassword}
          isFocus={focusedPassword}
          onFocus={handleFocusPassword}
          secureTextEntry={hidePassword}
          labelText={passwordLabelText}
          value={password}
          placeholder={passwordPlaceholder}
          onChangeText={
            correctPassword === undefined
              ? handleChangePassword
              : handleChangeCheckPassword
          }
          innerIcon={
            <PlaceHolder
              width={Theme.fontSize(24)}
              height={Theme.fontSize(24)}
              onPress={handleToggleIconPassword}
            />
          }
        />
      </>

      {focusedPassword && !currentPassword && (
        <InputConditionsWrapper>
          {correctPassword === undefined ? (
            <>
              <InputCondition
                condition={!!password && isNotSameIdPassword(password)}
                title={'아이디와 동일한 비밀번호 사용불가'}
                isNull={password === undefined}
              />
              <InputCondition
                condition={!!password && isPasswordOverMinMaxLength(password)}
                title={'8자리 이상 32자리 이하'}
                isNull={password === undefined}
              />
              <InputCondition
                condition={!!password && isPasswordMix(password)}
                title={'영문, 숫자, 특수문자(공백 제외) 중 2개 이상 조합'}
                isNull={password === undefined}
              />
            </>
          ) : (
            <InputCondition
              condition={!!password && isPasswordCheck(password)}
              title={'동일한 비밀번호를 입력해주세요'}
              isNull={password === undefined}
            />
          )}
        </InputConditionsWrapper>
      )}
    </>
  );
};

export default React.memo(PasswordCommon);

const PasswordInput = styled(Input)<{
  isFocus: boolean;
  currentPassword?: boolean;
}>`
  margin-bottom: ${({isFocus, currentPassword}) =>
    isFocus && !currentPassword
      ? `${Theme.height(11)}px`
      : `${Theme.height(20)}px`};
`;

const InputConditionsWrapper = styled.View`
  margin-bottom: ${Theme.height(23)}px;
`;
