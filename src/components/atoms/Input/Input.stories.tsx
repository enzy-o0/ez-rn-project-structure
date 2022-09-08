import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {
  text,
  boolean,
  color,
  number,
  radios,
  object,
} from '@storybook/addon-knobs';
import Input from '.';
import styled from 'styled-components/native';

const options = {
  default: 'default',
  emailAddress: 'email-address',
  numeric: 'numeric',
  phonePad: 'phone-pad',
};

const defaultValue = 'default';

storiesOf('Input', module)
  .addDecorator(getStory => <Container>{getStory()}</Container>)
  .add('default', () => (
    <Input
      labelText={text('labelText', '라벨')}
      placeholder={text('placeholder', '입력해주세요')}
      keyboardType={radios('keyboardType', options, defaultValue)}
      secureTextEntry={boolean('isSecure', true)}
      onChange={action('onChange')}
      onChangeText={action('onChangeText')}
      editable={boolean('isEditable', true)}
      maxLength={number('maxLength', 8)}
      isRequired={boolean('isRequired', true)}
      isCorrect={boolean('isCorrect', true)}
      labelBgColor={color('labelBgColor', '#fff')}
      inputBgColor={color('inputBgColor', '#fff')}
      onFocus={action('onFocus')}
    />
  ));

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;
