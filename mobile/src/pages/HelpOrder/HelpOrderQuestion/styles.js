import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Background = styled.View`
  background-color: #f5f5f5;
  height: 100%;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.Os === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  justify-content: flex-start;
  background-color: #fff;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
