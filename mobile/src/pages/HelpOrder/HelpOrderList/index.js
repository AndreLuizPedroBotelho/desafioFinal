import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '~/assets/logo-header.png';
import { Image } from 'react-native';

import { ButtonClick, Container, Loading, Background, List } from './styles';

import api from '~/services/api';
import Questions from '~/components/Questions';

export default function HelpOrderList({ navigation }) {
  const [student, setStudent] = useState();

  const change = navigation.getParam('change');
  const [helpOrderListChange, setHelpOrderListChange] = useState();
  const [helpOrderList, setHelpOrderList] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('student').then(student => {
      setStudent(student)
      setHelpOrderListChange(true)
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
  }, [helpOrderListChange, change]);

  function handlePress(data) {
    navigation.navigate('HelpOrderAnswer', { data })
  }

  return (
    <Background>
      <Container >
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