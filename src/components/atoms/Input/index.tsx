import React from 'react';
import {
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import styled from 'styled-components/native';
import Theme from '../../styles/theme';
import {TextRegular} from '~/components/styles/Mixin';

interface IProps extends Partial<TextInputProps> {
  ref?: any;
  isTextarea?: boolean;
  year?: string;
  month?: string;
  day?: string;
  isValue?: boolean;
  onPressIn?: any;
  secureTextEntry?: boolean;
  isLabel?: boolean;
  clearMode?: boolean;
  labelText?: string;
  isAddress?: boolean;
  isDatePicker?: boolean;
  isCorrect?: boolean;
  isRequired?: boolean;
  innerIcon?: JSX.Element;
  innerText?: string;
  maxLength?: number;
  innerTextIsNumber?: boolean;
  placeholder?: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  value?: string | number | null | undefined;
  onBlur?(): void;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad';
}

const Input: React.FC<IProps> = ({
  isTextarea,
  year,
  month,
  day,
  isValue,
  isLabel = true,
  onPressIn,
  clearMode,
  isAddress = false,
  isDatePicker = false,
  labelText,
  isCorrect = false,
  isRequired = false,
  innerIcon,
  innerText,
  innerTextIsNumber,
  placeholder,
  onChangeText,
  editable,
  value,
  onBlur,
  maxLength,
  keyboardType,
  secureTextEntry = false,
  onSubmitEditing,
  returnKeyType,
  autoFocus,
  ref,
  blurOnSubmit,
  ...props
}) => {
  return (
    <Container {...props}>
      <InputField
        blurOnSubmit={blurOnSubmit}
        ref={ref}
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        isTextarea={isTextarea}
        onPressIn={onPressIn}
        keyboardType={keyboardType}
        placeholder={placeholder}
        onChangeText={onChangeText}
        editable={editable}
        value={value}
        maxLength={maxLength}
        onBlur={onBlur}
        isIcon={!!innerIcon}
        isCorrect={isCorrect}
        isAddress={isAddress}
        selectionColor="#1e2022"
        placeholderTextColor="#d6d6d6"
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        clearButtonMode={clearMode ? 'while-editing' : 'never'}
        secureTextEntry={secureTextEntry}
      />
      {isDatePicker && (
        <InputDivider>
          <DividerText isValue={isValue}>{year}</DividerText>
          <Divider />
          <DividerText isValue={isValue}>{month}</DividerText>
          <Divider />
          <DividerText isValue={isValue}>{day}</DividerText>
        </InputDivider>
      )}
      <IconWrapper>
        {innerIcon ? (
          innerIcon
        ) : (
          <IconText isNumber={innerTextIsNumber}>{innerText}</IconText>
        )}
      </IconWrapper>
    </Container>
  );
};

export const Textarea: React.FC<IProps> = ({
  isTextarea,
  isLabel = true,
  onPressIn,
  clearMode,
  isAddress = false,
  labelText,
  isCorrect = false,
  isRequired = false,
  innerIcon,
  innerText,
  innerTextIsNumber,
  placeholder,
  onChangeText,
  editable,
  value,
  onBlur,
  ...props
}) => {
  return (
    <Container {...props}>
      {isLabel && (
        <InputLabelWrapper isAddress={isAddress}>
          <InputLabel isCorrect={isCorrect}>
            {labelText}
            {isRequired && (
              <InputLabel style={{color: Theme.colors.error}}>*</InputLabel>
            )}
          </InputLabel>
        </InputLabelWrapper>
      )}
      <InputField
        style={{textAlignVertical: 'top'}}
        multiline={true}
        numberOfLines={100}
        isTextarea={isTextarea}
        onPressIn={onPressIn}
        placeholder={placeholder}
        onChangeText={onChangeText}
        editable={editable}
        value={value}
        onBlur={onBlur}
        isIcon={!!innerIcon}
        isCorrect={isCorrect}
        selectionColor="#1e2022"
        placeholderTextColor="#d6d6d6"
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        clearButtonMode={clearMode ? 'while-editing' : 'never'}
      />
      <IconWrapper>
        {innerIcon ? (
          innerIcon
        ) : (
          <IconText isNumber={innerTextIsNumber}>{innerText}</IconText>
        )}
      </IconWrapper>
    </Container>
  );
};

export default React.memo(Input);

interface InputProps {
  isCorrect: boolean;
  isAddress: boolean;
  isIcon?: boolean;
  isTextarea?: boolean;
}

const Container = styled.View`
  position: relative;
`;

const InputLabelWrapper = styled.View<{isAddress: boolean}>`
  position: absolute;
  top: ${Theme.fontSize(-10)}px;
  left: ${Theme.fontSize(16)}px;
  padding: 0 ${Theme.fontSize(4)}px;
  z-index: 1;
  background-color: ${(props) =>
    props.isAddress ? Theme.colors.bg : Theme.colors.white};
`;

const InputLabel = styled(TextRegular)<{isCorrect?: boolean}>`
  color: ${(props) =>
    props.isCorrect ? Theme.colors.error : Theme.colors.subText};
  font-size: ${Theme.fontSize(12)}px;
`;

const InputField = styled.TextInput<InputProps>`
  padding: ${({isIcon, isTextarea}) =>
    isIcon
      ? `${Theme.height(12)}px ${Theme.width(44)}px ${Theme.height(
          12,
        )}px ${Theme.width(16)}px`
      : isTextarea
      ? `${Theme.height(16)}px ${Theme.width(16)}px`
      : `${Theme.height(12)}px ${Theme.width(16)}px`};
  width: 100%;
  height: ${({isTextarea}) => (isTextarea ? `${Theme.height(300)}px` : 'auto')};
  border-radius: ${Theme.fontSize(4)}px;
  color: ${Theme.colors.black};
  border: ${(props) =>
    props.isCorrect
      ? `solid 1px ${Theme.colors.error}`
      : `solid 1px ${Theme.colors.line}`};
  font-size: ${Theme.fontSize(16)}px;
  background-color: ${(props) =>
    props.isAddress ? Theme.colors.bg : Theme.colors.white};
`;

const IconWrapper = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${Theme.width(16)}px;
  justify-content: center;
  align-items: center;
`;

const InputDivider = styled.View`
  width: 100%;
  top: 0;
  bottom: 0;
  position: absolute;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 ${Theme.width(16)}px;
`;

const Divider = styled.View`
  width: 1px;
  height: ${Theme.fontSize(16)}px;
  background-color: ${Theme.colors.disable};
`;

const DividerText = styled(TextRegular)<{isValue?: boolean}>`
  font-size: ${Theme.fontSize(16)}px;
  color: ${({isValue}) =>
    isValue ? Theme.colors.black : Theme.colors.disable};
`;

const IconText = styled(TextRegular)<{isNumber?: boolean}>`
  font-size: ${Theme.fontSize(14)}px;
  letter-spacing: ${({isNumber}) => (!isNumber ? '-0.4px' : '0px')};
  color: ${({isNumber}) =>
    !isNumber ? Theme.colors.mainColor : Theme.colors.point};
`;
