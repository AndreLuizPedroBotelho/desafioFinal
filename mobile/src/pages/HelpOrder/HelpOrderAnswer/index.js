import React, { useMemo } from 'react';
import { Image, View } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import logo from '~/assets/logo-header.png';

import {
  Container,
  Left,
  TextDate,
  Title,
  Right,
  Content,
  Background,
  TextDescription,
  Wraper,
} from './styles';

export default function HelpOrderAnswer({ navigation }) {
  const data = navigation.getParam('data');

  const dateParsed = useMemo(() => {
    const dateShow = data.answer_at ? data.answer_at : data.updatedAt;
    const dateFormated = formatRelative(parseISO(dateShow), new Date(), {
      locale: pt,
      addSuffix: true,
    });

    return dateFormated.charAt(0).toUpperCase() + dateFormated.slice(1);
  }, [data.answer_at, data.updatedAt]);

  return (
    <Background>
      <Container>
        <Content>
          <Wraper>
            <Left>
              <Title answer={data.answer_at}>PERGUNTA</Title>
            </Left>
            <Right>
              <TextDate>{dateParsed}</TextDate>
            </Right>
          </Wraper>
          <View>
            <TextDescription>{data.question}</TextDescription>
          </View>
          <Wraper className="wrapperText">
            <Left>
              <Title answer={data.answer_at}>RESPOSTA</Title>
            </Left>
            <Right>
              <TextDate />
            </Right>
          </Wraper>
          <View>
            <TextDescription>{data.answer}</TextDescription>
          </View>
        </Content>
      </Container>
    </Background>
  );
}

HelpOrderAnswer.navigationOptions = {
  headerTitle: <Image resizeMode="contain" source={logo} />,
};

HelpOrderAnswer.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
