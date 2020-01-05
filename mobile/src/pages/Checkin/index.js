import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import logo from '~/assets/logo-header.png';

import { ButtonClick, Container, Loading, Background, List } from './styles';

import api from '~/services/api';

import Checkins from '~/components/Checkins';

export default function Checkin() {
  const [student, setStudent] = useState();
  const [checkins, setCheckins] = useState([]);
  const [checkinsChange, setCheckinsChange] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('student').then(newStudent => {
      setStudent(newStudent);
      setCheckinsChange(true);
    });
  }, []);

  useEffect(() => {
    async function loadCheckin() {
      if (student) {
        const { data } = await api.get(`/students/${student}/checkins`);
        setCheckins(data);
        setCheckinsChange(false);
        setLoading(false);
      }
    }
    loadCheckin();
  }, [checkinsChange, student]);

  async function handleClick() {
    try {
      await api.post(`/students/${student}/checkins`);

      Alert.alert('Confirmação!', 'Checkin realizado com sucesso!');

      setCheckinsChange(true);
    } catch (err) {
      Alert.alert('', 'Não é possivel fazer check-in, limite máximo excedido!');
    }
  }

  return (
    <Background>
      <Container>
        <ButtonClick onPress={handleClick}>Novo check-in</ButtonClick>

        {loading ? (
          <Loading size="large" color="#EE4E62" />
        ) : (
          <List
            vertical
            inverted
            data={checkins}
            keyExtrator={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <Checkins index={index} data={item} />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Checkin.navigationOptions = {
  headerTitle: <Image resizeMode="contain" source={logo} />,
};

Checkin.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
