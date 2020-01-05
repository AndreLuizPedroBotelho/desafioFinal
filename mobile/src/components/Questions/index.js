import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import {
  Container,
  QuestionText,
  TitleDate,
  Wraper,
  Title,
  Left,
  Right,
  Question,
} from './styles';

export default function Questions({ data, handlePress }) {
  const dateParsed = useMemo(() => {
    const dateShow = data.answer_at ? data.answer_at : data.updatedAt;
    const dateFormated = formatRelative(parseISO(dateShow), new Date(), {
      locale: pt,
      addSuffix: true,
    });

    return dateFormated.charAt(0).toUpperCase() + dateFormated.slice(1);
  }, [data.answer_at, data.updatedAt]);

  return (
    <Container onPress={() => handlePress(data)}>
      <Wraper>
        <Left>
          <Title answer={data.answer_at}>
            {data.answer_at ? 'Respondido' : 'Sem resposta'}
          </Title>
        </Left>
        <Right>
          <TitleDate>{dateParsed}</TitleDate>
        </Right>
      </Wraper>
      <Question>
        <QuestionText numberOfLines={3}>{data.question}</QuestionText>
      </Question>
    </Container>
  );
}

Questions.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer_at: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  handlePress: PropTypes.func,
};

Questions.defaultProps = {
  data: {},
  handlePress: () => {},
};
