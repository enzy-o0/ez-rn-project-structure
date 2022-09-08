import React, {useState, useCallback, useEffect} from 'react';
import {Button} from '~/components/atoms/Button';
import PasswordCommon from './PasswordCommon';

interface IProps {
  passwordCurrentLabelText?: string;
  passwordCurrentPlaceholder?: string;
  currentPassword?: boolean;
  passwordLabelText: string;
  passwordPlaceholder: string;
  passwordCheckLabelText: string;
  passwordCheckPlaceholder: string;
  buttonLabel: string;
  id: string;
  handleNavigate(): void;
  setUserPassword: string;
}

const PasswordComponent = ({
  passwordCurrentLabelText,
  passwordCurrentPlaceholder,
  passwordLabelText,
  passwordPlaceholder,
  passwordCheckLabelText,
  passwordCheckPlaceholder,
  buttonLabel,
  currentPassword,
  id,
  handleNavigate,
  setUserPassword,
  setUserCurrentPassword,
}: IProps) => {
  const [isValidPassword, setValidPassword] = useState(false);
  const [isCurrentValue, setIsCurrentValue] = useState(false);
  const [isLength, setIsLength] = useState(false);
  const [isMix, setIsMix] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [correctPassword, setCorrectPassword] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  useEffect(() => {
    if (currentPassword) {
      setIsCorrect(
        isCheck && isLength && isMix && isCurrentValue && isValidPassword,
      );
    } else {
      setIsCorrect(isCheck && isLength && isMix && isValidPassword);
    }
  }, [
    isCheck,
    isLength,
    isMix,
    isCurrentValue,
    isValidPassword,
    currentPassword,
  ]);

  return (
    <>
      {currentPassword && (
        <PasswordCommon
          currentPassword
          passwordLabelText={passwordCurrentLabelText}
          passwordPlaceholder={passwordCurrentPlaceholder}
          setIsCurrentValue={setIsCurrentValue}
          setUserCurrentPassword={setUserCurrentPassword}
        />
      )}
      <PasswordCommon
        currentPassword={false}
        passwordLabelText={passwordLabelText}
        passwordPlaceholder={passwordPlaceholder}
        setValidPassword={setValidPassword}
        setIsLength={setIsLength}
        setIsMix={setIsMix}
        setCorrectPassword={setCorrectPassword}
        id={id}
      />

      <PasswordCommon
        setUserPassword={setUserPassword}
        currentPassword={false}
        correctPassword={correctPassword}
        passwordLabelText={passwordCheckLabelText}
        passwordPlaceholder={passwordCheckPlaceholder}
        setIsCheck={setIsCheck}
      />

      <Button
        label={buttonLabel}
        bgColor={!isCorrect ? 'disable' : 'bgMain'}
        onPress={(): void => {
          if (isCorrect) {
            handleNavigate();
          }
        }}
      />
    </>
  );
};

export default PasswordComponent;
