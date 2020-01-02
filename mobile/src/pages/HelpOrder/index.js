import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '~/assets/logo-header.png';
import { Image, Alert } from 'react-native';

import { ButtonClick, Container, Background, List } from './styles';

import api from '~/services/api';

export default function HelpOrder() {
  const [student, setStudent] = useState();
  const [checkinsChange, setCheckinsChange] = useState();

  useEffect(() => {
    AsyncStorage.getItem('student').then(student => {
      setStudent(student)
      setCheckinsChange(true)
    });
  }, []);



  async function handleClick() {
    try {
      await api.post(`/students/${student}/checkins`);

      Alert.alert(
        'Confirmação!',
        'Checkin realizado com sucesso!'
      );

      setCheckinsChange(true);
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Background>
      <Container >
        <ButtonClick onPress={handleClick}>
          Novo pedido de auxílio
        </ButtonClick>



      </Container>
    </Background>
  );
}

HelpOrder.navigationOptions = {
  headerTitle: <Image resizeMode="contain" source={logo} />,
}