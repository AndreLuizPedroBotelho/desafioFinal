import React, { useState } from 'react';
import { Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import PropTypes from 'prop-types';
import logo from '~/assets/logo.png';
import api from '~/services/api';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn({ navigation }) {
  const [idStudent, setIdStudent] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      const { data } = await api.post('/sessionStudent/', {
        id: idStudent,
      });

      setLoading(true);
      await AsyncStorage.setItem('student', String(data.id));

      navigation.navigate('Checkin');
    } catch (err) {
      Alert.alert(
        'Falha na autenticação!',
        'Verifique se o ID de cadastro esta correto, se o erro persistir entre em contato com a equipe gympoint!'
      );
    }
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          value={idStudent}
          onChangeText={setIdStudent}
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
