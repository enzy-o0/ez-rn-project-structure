import React, {useEffect, useState} from 'react';
import Input from '..';

interface IProps {
  userPhone: string;
  isRetryPhone: boolean;
  setIsValidPhone: React.Dispatch<React.SetStateAction<boolean>>;
  setUserPhone: any;
}

const InputPhone = ({
  setIsValidPhone,
  setUserPhone,
  userPhone,
  isRetryPhone,
  ...props
}: IProps) => {
  const [formatPhone, setFormatPhone] = useState<string>('');

  const checkPhone = (text: string) => {
    const regex = /^[0-9]{0,12}$/;
    const id = text.replace(/-/g, '');

    if (!regex.test(id)) {
      return false;
    }

    if (id.length >= 10) {
      const phoneFormat = id.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
      setFormatPhone(phoneFormat);
    } else {
      setFormatPhone(id);
    }
  };

  useEffect(() => {
    const regex = /^01([0|1|6|7|8|9])-?(\d{3,4})-?(\d{4})$/;
    if (regex.test(formatPhone)) {
      setIsValidPhone(true);
      setUserPhone(formatPhone);
    } else {
      setIsValidPhone(false);
    }
  }, [formatPhone, setIsValidPhone, setUserPhone, userPhone]);

  useEffect(() => {
    if (isRetryPhone) {
      setFormatPhone('');
    }
  }, [isRetryPhone]);

  return (
    <>
      <Input
        {...props}
        labelText="전화번호"
        value={formatPhone}
        placeholder="숫자만 입력해주세요"
        onChangeText={(text) => {
          checkPhone(text);
        }}
        keyboardType="number-pad"
        maxLength={13}
      />
    </>
  );
};

export default InputPhone;
