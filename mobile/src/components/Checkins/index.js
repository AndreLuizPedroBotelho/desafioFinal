import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Text, View } from 'react-native';

import { Container, Title, TitleDate, Left, Right } from './styles';

export default function Checkins({ data, index }) {
  const dateParsed = useMemo(() => {
    const dateFormated = formatRelative(parseISO(data.updatedAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });

    return dateFormated.charAt(0).toUpperCase() + dateFormated.slice(1)
  }, [data.date]);

  return (
    <Container >
      <Left>
        <Title>
          Check-in #{String(index)}
        </Title>
      </Left>
      <Right>
        <TitleDate>
          {dateParsed}
        </TitleDate>
      </Right>
    </Container >
  );
}
