import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, Title, TitleDate, Left, Right } from './styles';

export default function Checkins({ data, index }) {
  const dateParsed = useMemo(() => {
    const dateFormated = formatRelative(parseISO(data.updatedAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });

    return dateFormated.charAt(0).toUpperCase() + dateFormated.slice(1);
  }, [data.updatedAt]);

  return (
    <Container>
      <Left>
        <Title>Check-in #{String(index)}</Title>
      </Left>
      <Right>
        <TitleDate>{dateParsed}</TitleDate>
      </Right>
    </Container>
  );
}

Checkins.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer_at: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  index: PropTypes.string,
};

Checkins.defaultProps = {
  data: {},
  index: '',
};
