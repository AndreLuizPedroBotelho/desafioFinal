import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: #fff;
  margin-bottom: 15px;
  border-radius: 4px;
  width: 90%;
  margin-right: 20px;
  display: flex;
  height: 300px;
  flex-direction: column;
  border: 1px solid #fff;
  margin-top: 8%;
  margin-left: 5%;
  margin-right: 5%;
`;

export const Content = styled.TouchableOpacity`
  margin: 20px;
`;

export const Wraper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  &.wrapperText {
    margin-top: 15px;
  }
`;

export const Background = styled.View`
  background-color: #f5f5f5;
  height: 100%;
`;

export const Left = styled.View`
  font-size: 14px;
`;

export const Title = styled.Text`
  color: #444444;
  font-weight: bold;
  margin-top: 8%;
`;

export const TextDescription = styled.Text`
  color: #666666;
`;

export const TextDate = styled.Text`
  color: #666666;
`;

export const Right = styled.View`
  font-size: 14px;
  color: #666666;
`;
