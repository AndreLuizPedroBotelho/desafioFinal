import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

import Button from '~/components/Button';

export const ButtonClick = styled(Button)`
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;

  width: 90%;
`;

export const Loading = styled(ActivityIndicator)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.View`
  background-color:#f5f5f5;
  height:100%;
`;

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
})`
    margin-top: 5%;
    width: 90%;
`;