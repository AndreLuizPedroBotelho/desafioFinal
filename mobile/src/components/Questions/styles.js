import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: #fff;
  height: 120px;
  margin-bottom: 15px;
  border-radius: 4px;
  width: 100%;
  margin-right:20px;
  display: flex;
  flex-direction: column;
  border:1px solid #fff;
`;

export const Wraper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Question = styled.View`
  margin-left:10px;
  margin-top:10px;
  line-height:18px;
  text-align: left;
`;

export const QuestionText = styled.Text`
  line-height:18px;
  text-align: left;
  width:100%;
  color: #666666;
`;

export const Left = styled.View`
  font-size: 14px;
  margin-left:30px;
`;

export const Title = styled.Text`
  color: ${props => (props.answer ? '#42CB59' : '#999999')};
`;

export const TitleDate = styled.Text`
  color: #666666;
`;

export const Right = styled.View`
  font-size: 14px;
  color: #666666;
  margin-right: 10px;
`;







