import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Text, View } from 'react-native';

import { Container, Left, Right } from './styles';

export default function Checkins({ data, index }) {
  console.log(data)
  const dateParsed = useMemo(() => {
    const dateFormated = formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });

    return dateFormated.charAt(0).toUpperCase() + dateFormated.slice(1)
  }, [data.date]);

  return (
    <Container >
      <Left>
        <Text>
          Check-in #{index}
        </Text>
      </Left>
      <Right>
        <Text>
          {dateParsed}
        </Text>
      </Right>
    </Container >
  );
}
