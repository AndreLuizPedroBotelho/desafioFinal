import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '~/assets/logo-header.png';
import { Image, Alert, Text } from 'react-native';

import { ButtonClick, Container, Loading, Background, List } from './styles';
import { NavigationEvents } from 'react-navigation'

import api from '~/services/api';
import Questions from '~/components/Questions';

export default function HelpOrderList({ navigation }) {
  const [student, setStudent] = useState();

  const [helpOrderListChange, setHelpOrderListChange] = useState(true);
  const [helpOrderList, setHelpOrderList] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('student').then(student => {
      setStudent(student);
      setHelpOrderListChange(true);
    });
  }, []);

  useEffect(() => {
    async function loadHelpOrderAnswer() {
      if (student) {
        const { data } = await api.get(`/students/${student}/help-orders`);
        setHelpOrderList(data);
        setHelpOrderListChange(false);
        setLoading(false);
      }
    }
    loadHelpOrderAnswer()
  }, [helpOrderListChange, student]);

  function handlePress(data) {
    navigation.navigate('HelpOrderAnswer', { data });
  }

  function handleChange(data) {
    setLoading(true);
    setHelpOrderListChange(true);
  }

  return (
    <Background>
      <Container >
        <NavigationEvents
          onDidFocus={payload => handleChange()}
        />
        <ButtonClick onPress={() => navigation.navigate('HelpOrderQuestion')}>
          Novo pedido de auxílio
        </ButtonClick>

        {loading ? (
          <Loading size="large" color="#EE4E62" />
        ) : (
            <List
              loading={loading}
              vertical
              inverted
              data={helpOrderList}
              keyExtrator={item => String(item.id)}
              renderItem={({ item }) => (
                <Questions data={item} handlePress={handlePress} />
              )}
            />
          )}
      </Container>
    </Background >
  );
}

HelpOrderList.navigationOptions = {
  headerTitle: <Image resizeMode="contain" source={logo} />,
}