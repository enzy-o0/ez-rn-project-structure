import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled, {css} from 'styled-components/native';
import Theme from '~/components/styles/theme';
import {TextRegular, TextMedium} from '~/components/styles/Mixin';

interface IProps extends Partial<BottomProps> {
  label: string;
  labelBold?: string;
  bgColor?: 'disable' | 'bgWhite' | 'bgMain';
  isSmall?: boolean;
  isFontColorMain?: boolean;
  isPending?: boolean;
}

interface BottomProps {
  onPress?: () => void;
  isCorrect: boolean;
  label: string;
}

export const Button: React.FC<IProps> = ({
  label,
  labelBold,
  bgColor,
  isSmall = false,
  isFontColorMain = false,
  isPending,
  ...props
}) => {
  return (
    <ButtonWrapper
      activeOpacity={0.6}
      {...props}
      bgColor={bgColor}
      isFontColorMain={isFontColorMain}
      isSmall={isSmall}>
      {isPending ? (
        <Indicator
          color={isFontColorMain ? Theme.colors.mainColor : Theme.colors.white}
        />
      ) : (
        <ButtonLabel isFontColorMain={isFontColorMain}>
          {label}
          <ButtonLabelBold>{labelBold}</ButtonLabelBold>
        </ButtonLabel>
      )}
    </ButtonWrapper>
  );
};

export const BooleanButton = ({isYes, setIsYes, ...props}) => {
  return (
    <BooleanButtonsWrapper {...props}>
      <BooleanButtons
        activeOpacity={0.6}
        isLeft
        isSelected={isYes}
        onPress={() => setIsYes(true)}>
        <ButtonLabel isFontColorMain={!isYes}>예</ButtonLabel>
      </BooleanButtons>
      <BooleanButtons
        activeOpacity={0.6}
        isSelected={!isYes}
        onPress={() => setIsYes(false)}>
        <ButtonLabel isFontColorMain={isYes}>아니오</ButtonLabel>
      </BooleanButtons>
    </BooleanButtonsWrapper>
  );
};

const getButtonColor = (bgColor: string) => {
  switch (bgColor) {
    case 'disable':
      return css`
        border: none;
        background-color: ${Theme.colors.disable};
      `;
    case 'bgWhite':
      return css`
        border: 1px solid ${Theme.colors.mainColor};
        background-color: ${Theme.colors.white};
      `;
    case 'bgMain':
      return css`
        border: 1px solid ${Theme.colors.mainColor};
        background-color: ${Theme.colors.mainColor};
      `;
  }
};

interface StyledButtonProps {
  bgColor?: string;
  isSmall?: boolean;
  isFontColorMain?: boolean;
}

interface StyledButtonLabelProps {
  isFontColorMain?: boolean;
}

interface StyledBooleanButton {
  isSelected?: boolean;
  bgColor?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}

const ButtonWrapper = styled.TouchableOpacity<StyledButtonProps>`
  padding: ${Theme.height(12)}px 0;
  ${(props) => getButtonColor(props.bgColor || '')};
  border-radius: ${Theme.fontSize(4)}px;
  justify-content: center;
  align-items: center;
`;

const BooleanButtonsWrapper = styled.View`
  flex-direction: row;
`;

const BooleanButtons = styled.TouchableOpacity<StyledBooleanButton>`
  width: 50%;
  padding: ${Theme.height(12)}px;
  background-color: ${({isSelected}) =>
    isSelected ? Theme.colors.mainColor : Theme.colors.white};
  overflow: hidden;
  border: 1px solid ${Theme.colors.mainColor};
  border-top-left-radius: ${({isLeft}) => (isLeft ? '4px' : '0px')};
  border-bottom-left-radius: ${({isLeft}) => (isLeft ? '4px' : '0px')};
  border-top-right-radius: ${({isLeft}) => (isLeft ? '0px' : '4px')};
  border-bottom-right-radius: ${({isLeft}) => (isLeft ? '0px' : '4px')};
`;

const Indicator = styled(ActivityIndicator)`
  width: ${Theme.fontSize(23)}px;
  height: ${Theme.fontSize(23)}px;
`;

const ButtonLabel = styled(TextRegular)<StyledButtonLabelProps>`
  font-size: ${Theme.fontSize(16)}px;
  text-align: center;
  color: ${(props) =>
    props.isFontColorMain ? Theme.colors.mainColor : Theme.colors.white};
  margin: auto;
`;

const ButtonLabelBold = styled(TextMedium)`
  color: ${Theme.colors.mainColor};
`;
