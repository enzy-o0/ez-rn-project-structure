import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import Input from '~/components/atoms/Input';
import {Button} from '~/components/atoms/Button';
import Theme from '~/components/styles/theme';
import InputPhone from '~/components/atoms/Input/InputPhone';
import {useSmsUserConsent} from '@eabdullazyanov/react-native-sms-user-consent';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

interface IProps {
  handleCheckIdAndPhone: any;
  setIsAllValid: React.Dispatch<React.SetStateAction<boolean>>;
  userPhone: string;
  setUserPhone: any;
  sms: string;
  setSms: any;
  isMatchIdAndPhone?: boolean;
  isRetryPhone: boolean;
}

const Certification = ({
  handleCheckIdAndPhone,
  setIsAllValid,
  setUserPhone,
  sms,
  setSms,
  isRetryPhone,
}: IProps) => {
  const dispatch = useDispatch();

  const VALIDTIME = 300;
  const retrievedCode = useSmsUserConsent();

  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [isValidCertNum, setIsValidCertNum] = useState<boolean>(false);

  const [min, setMin] = useState<number>(5);
  const [sec, setSec] = useState<number>(0);

  let intervalRef: {current: NodeJS.Timeout | null} = useRef(null);
  const time = useRef<number>(VALIDTIME);

  const onPressTimer = () => {
    intervalRef.current = setInterval(decreaseNum, 1000);
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      };
    }, []),
  );

  const decreaseNum = () => {
    time.current -= 1;

    setMin(Math.floor(time.current / 60));
    setSec(time.current % 60);
  };

  useEffect(() => {
    if (time.current <= 0) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
  }, [sec, certificationCounter, dispatch]);

  const timerReset = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    time.current = VALIDTIME;
    setMin(Math.floor(VALIDTIME / 60));
    setSec(VALIDTIME % 60);
  };

  const checkCertNum = (text: string) => {
    setSms(text);
    const regex = /^[0-9]/;
    if (!regex.test(text)) {
      return false;
    } else {
      if (text.length === 6) {
        setIsValidCertNum(true);
      } else {
        setIsValidCertNum(false);
      }
    }
  };

  useEffect(() => {
    if (isValidPhone && isValidCertNum) {
      setIsAllValid(true);
    } else {
      setIsAllValid(false);
    }
  }, [isValidPhone, isValidCertNum, setIsAllValid, sms]);

  useEffect(() => {
    if (retrievedCode) {
      setSms(retrievedCode);
      setIsValidCertNum(true);
    }
  }, [retrievedCode]);

  return (
    <>
      <CertificationWrapper certification={isCertification}>
        <InputPhoneWrapper
          setUserPhone={setUserPhone}
          setIsValidPhone={setIsValidPhone}
          isRetryPhone={isRetryPhone}
        />
        <ButtonPhoneWrapper
          isSmall={true}
          onPress={(): void => {
            timerReset();
            handleCheckIdAndPhone();
          }}
        />
      </CertificationWrapper>
      <InputWrapper>
        <Input
          textContentType="oneTimeCode"
          value={sms}
          labelText="인증번호"
          placeholder="인증번호 6자리를 입력해주세요"
          onChangeText={(text) => checkCertNum(text)}
          keyboardType="numeric"
          maxLength={6}
          innerTextIsNumber={time.current === 0}
          innerText={
            time.current === 0
              ? '시간 초과'
              : `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
          }
        />
      </InputWrapper>
    </>
  );
};

export default Certification;

const CertificationWrapper = styled.View<{certification: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({certification}) =>
    certification ? `${Theme.height(20)}px` : `${Theme.height(17)}px`};
`;

const InputPhoneWrapper = styled(InputPhone)`
  width: ${Theme.width(236)}px;
`;

const ButtonPhoneWrapper = styled(Button)`
  width: ${Theme.width(84)}px;
`;

const InputWrapper = styled.View`
  margin-bottom: ${Theme.height(17)}px;
`;
