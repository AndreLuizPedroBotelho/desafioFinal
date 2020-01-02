import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '~/assets/logo.png';
import api from '~/services/api';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
} from './styles';

export default function SignIn({ navigation }) {
  const [idStudent, setIdStudent] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleSubmit() {
    try {
      const { data } = await api.get(`/student/${idStudent}`);
      setLoading(true);
      await AsyncStorage.setItem('student', String(data.id));

      navigation.navigate('Checkin')
    } catch (err) {
      console.log(err)
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