import React from 'react';
import {TextProps, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Theme from '~/components/styles/theme';
import {TextRegular} from '~/components/styles/Mixin';

interface IProps extends Partial<TextProps> {
  text: string;
  textColor?: string;
  textSize?: number;
  underlineHeight?: number;
  underlineColor?: string;
  onPress?(): void;
}

const UnderlineText: React.FC<IProps> = ({
  text,
  textColor,
  textSize,
  underlineColor,
  underlineHeight,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <TextWrapper textColor={textColor} textSize={textSize}>
        {text}
      </TextWrapper>
      <Divider
        underlineColor={underlineColor}
        underlineHeight={underlineHeight}
      />
    </TouchableOpacity>
  );
};

export default UnderlineText;

const TextWrapper = styled(TextRegular)<{
  textColor?: string;
  textSize?: number;
}>`
  font-size: ${(props) =>
    props.textSize ? `${props.textSize}px` : `${Theme.fontSize(14)}px`};
  color: ${(props) =>
    props.textColor ? `${props.textColor}` : `${Theme.colors.black}`};
`;

const Divider = styled.View<{
  underlineHeight?: number;
  underlineColor?: string;
}>`
  width: 100%;
  height: ${(props) =>
    props.underlineHeight ? `${props.underlineHeight}px` : '1.5px'};
  background-color: ${(props) =>
    props.underlineColor ? `${props.underlineColor}` : Theme.colors.subText};
`;
