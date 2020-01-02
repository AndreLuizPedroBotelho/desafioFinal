import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '~/assets/logo-header.png';
import { Image, Alert } from 'react-native';

import { ButtonClick, Container, Background, List } from './styles';

import api from '~/services/api';

import Checkins from '~/components/Checkins';

export default function Checkin() {
  const [student, setStudent] = useState();
  const [checkins, setCheckins] = useState([]);
  const [checkinsChange, setCheckinsChange] = useState();

  useEffect(() => {
    AsyncStorage.getItem('student').then(student => {
      setStudent(student)
      setCheckinsChange(true)
    });
  }, []);

  useEffect(() => {
    async function loadCheckin() {
      if (student) {
        const { data } = await api.get(`/students/${student}/checkins`);
        setCheckins(data);
        setCheckinsChange(false);
      }
    }
    loadCheckin()
  }, [checkinsChange]);


  async function handleClick() {
    try {
      await api.post(`/students/${student}/checkins`);

      Alert.alert(
        'Confirmação!',
        'Checkin realizado com sucesso!'
      );

      setCheckinsChange(true);
    } catch (err) {
      Alert.alert(
        '',
        'Não é possivel fazer check-in no momento!'
      );
    }
  }


  return (
    <Background>
      <Container >
        <ButtonClick onPress={handleClick}>
          Novo check-in
        </ButtonClick>

        <List
          vertical
          inverted
          data={checkins}
          keyExtrator={item => String(item.id)}
          renderItem={({ item, index }) => (
            <Checkins index={index} data={item} />
          )}
        />

      </Container>
    </Background>
  );
}

Checkin.navigationOptions = {
  headerTitle: <Image resizeMode="contain" source={logo} />,
}