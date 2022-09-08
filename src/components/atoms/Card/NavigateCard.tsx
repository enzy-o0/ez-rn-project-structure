import React from 'react';
import styled from 'styled-components/native';
import Theme from '~/components/styles/theme';
import {Button} from '~/components/atoms/Button';
import {TextMedium} from '~/components/styles/Mixin';

interface IProps {
  title: string;
  label?: string;
  handleNavigate?: any;
  subTitle: string | Element;
  isMainColor: boolean;
  navigation?: any;
  isExperience: boolean;
  isFreeAndFinishedCnt: boolean;
}

const NavigateCard = ({
  title,
  label,
  handleNavigate,
  subTitle,
  isMainColor,
  navigation,
  isExperience = false,
  isFreeAndFinishedCnt = false,
  ...props
}: IProps) => {
  return (
    <Main {...props}>
      <Title isMainColor={isMainColor}>{title}</Title>
      <SubTitle subTitle={!!subTitle}>{subTitle}</SubTitle>
      {label && (
        <Button label={label} bgColor="bgMain" onPress={handleNavigate} />
      )}
    </Main>
  );
};

export const NavigateNetworkCard = ({
  title,
  label,
  handleNavigate,
  subTitle,
  isMainColor,
  ...props
}) => {
  return (
    <NetworkSection>
      <Main {...props}>
        <Title isMainColor={isMainColor}>{title}</Title>
        <SubTitle subTitle={!!subTitle}>{subTitle}</SubTitle>
        {label && (
          <Button label={label} bgColor="bgMain" onPress={handleNavigate} />
        )}
      </Main>
    </NetworkSection>
  );
};

const NetworkSection = styled.View`
  margin-top: ${Theme.height(40)}px;
  padding: ${Theme.height(16)}px ${Theme.width(16)}px;
`;

const Main = styled.View`
  padding: ${Theme.height(30)}px ${Theme.width(16)}px;
  border-radius: ${Theme.fontSize(4)}px;
  border: 1px solid ${Theme.colors.line};
`;

const Title = styled(TextMedium)<{isMainColor?: boolean}>`
  color: ${({isMainColor}) =>
    isMainColor ? Theme.colors.mainColor : Theme.colors.black};
  text-align: center;
  margin-bottom: ${Theme.height(18)}px;
  font-size: ${Theme.fontSize(18)}px;
  line-height: ${Theme.fontSize(26)}px;
`;

const SubTitle = styled(TextMedium)<{subTitle: boolean}>`
  text-align: center;
  margin-bottom: ${({subTitle}) =>
    subTitle ? `${Theme.height(14)}px` : `${Theme.height(0)}px`};
`;

export default NavigateCard;
