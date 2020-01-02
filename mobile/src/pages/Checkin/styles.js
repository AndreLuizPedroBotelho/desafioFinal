import styled from 'styled-components/native';
import { Platform, ActivityIndicator } from 'react-native';

import Button from '~/components/Button';

export const ButtonClick = styled(Button)`
  margin-top: 20px;
  width: 90%;
`;

export const Loading = styled(ActivityIndicator)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
})`
    margin-top: 5%;
    width: 90%;  
`;

export const Background = styled.View`
  background-color:#f5f5f5;
  height:100%;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.Os === 'ios',
  behavior: 'padding',
})`
  align-items: center;
  padding: 0 20px;
`;

