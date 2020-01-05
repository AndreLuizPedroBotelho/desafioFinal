import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import logo from '~/assets/logo-header.png';

import { SubmitButton, Form, FormInput, Container, Background } from './styles';

import api from '~/services/api';

export default function HelpOrderQuestion({ navigation }) {
  const [question, setQuestion] = useState();
  const [student, setStudent] = useState();

  useEffect(() => {
    AsyncStorage.getItem('student').then(newStudent => {
      setStudent(newStudent);
    });
  }, [student]);

  async function handleSubmit() {
    try {
      await api.post(`/students/${student}/help-orders`, {
        question,
      });

      Alert.alert('Confirmação!', 'Pedido de Auxílio cadastrado com sucesso!');

      navigation.navigate('HelpOrderList');
    } catch (err) {
      Alert.alert('', 'Não foi possível cadastrar o Pedido de Auxílio!');
    }
  }

  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            textAlignVertical="top"
            multiline
            numberOfLines={12}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Inclua seu pedido de auxílio"
            returnKeyType="send"
            value={question}
            onChangeText={setQuestion}
          />

          <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

HelpOrderQuestion.navigationOptions = {
  headerTitle: <Image resizeMode="contain" source={logo} />,
};

HelpOrderQuestion.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
