import React from 'react';
import {ActivityIndicator} from 'react-native';
import {LoadingCenter, TextMedium} from '~/components/styles/Mixin';
import styled from 'styled-components/native';
import Theme from '~/components/styles/theme';

interface IProps {
  loadingText: string;
}

const Loading = ({loadingText}: IProps) => {
  return (
    <LoadingCenter>
      <IndocatorWrapper>
        <ActivityIndicator />
      </IndocatorWrapper>
      <Title>{loadingText}</Title>
    </LoadingCenter>
  );
};

export default Loading;

const Title = styled(TextMedium)`
  color: ${Theme.colors.black};
  font-size: ${Theme.fontSize(16)}px;
  line-height: ${Theme.fontSize(27)}px;
`;

const IndocatorWrapper = styled.View`
  margin: ${Theme.height(16)}px;
`;
