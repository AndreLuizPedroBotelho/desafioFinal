import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 4px;
  width:100%;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  flex: 1;
  font-size: 15px;
  color: #999999;
  border:1px solid #999999;

`;
