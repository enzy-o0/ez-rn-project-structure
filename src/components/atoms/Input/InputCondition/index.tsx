import React from 'react';
import styled from 'styled-components/native';
import Theme from '~/components/styles/theme';
import PlaceHolder from '~/assets/images/placeholder.svg';
import {TextRegular} from '~/components/styles/Mixin';

interface IProps {
  isNull: boolean;
  condition: boolean;
  title: string;
}

const InputCondition = ({isNull, condition, title}: IProps) => {
  return (
    <InputConditionWrapper>
      <PlaceHolder width={Theme.width(20)} height={Theme.width(20)} />
      <InputConditionText condition={isNull ? null : condition}>
        {title}
      </InputConditionText>
    </InputConditionWrapper>
  );
};

export default InputCondition;

const InputConditionWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Theme.height(6)}px;
`;

const InputConditionText = styled(TextRegular)<{condition?: boolean | null}>`
  font-size: ${Theme.fontSize(12)}px;
  color: ${(props) =>
    props.condition
      ? Theme.colors.mainColor
      : props.condition === null
      ? Theme.colors.subText
      : Theme.colors.point};
`;
