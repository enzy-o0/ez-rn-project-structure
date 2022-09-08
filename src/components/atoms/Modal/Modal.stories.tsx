import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {CommonModal} from '.';
import styled from 'styled-components/native';

const defaultValue = 'default';

storiesOf('CommonModal', module)
  .addDecorator(getStory => <Container>{getStory()}</Container>)
  .add('default', () => (
    <CommonModal
      label={text('Buttonlabel', '확인')}
      ModalTitleLabel={text('title', '입력해주세요')}
      modalTextLabel={text('content', '입력해주세요')}
    />
  ));

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;
