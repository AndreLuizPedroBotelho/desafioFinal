import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Button,
  LinkHref,
  FormDiv,
  FormDivLine,
  ContainerTitle,
  Wrapper,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .typeError('Insira uma idade válida')
    .required('A idade é obrigatória'),
  weight: Yup.number()
    .typeError('Insira um peso (em kg) válido')
    .required('o peso é obrigatório'),
  height: Yup.number()
    .typeError('Insira uma altura válida')
    .required('A altura é obrigatório'),
});

export default function RegisterCreate(props) {
  console.log(props.match.params.id);
  const [students, setStudent] = useState([]);

  async function handleSubmit(data, { resetForm }) {
    try {
      await api.post('student', data);
      toast.success('Aluno cadastrado');
      history.push('/student');
    } catch (err) {
      toast.error('Falha no cadastro, verifique seus dados');
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <ContainerTitle>
          <span>Cadastro de matrícula</span>
          <Wrapper>
            <LinkHref to="/register/">VOLTAR</LinkHref>
            <Button type="submit">SALVAR</Button>
          </Wrapper>
        </ContainerTitle>

        <FormDiv>
          <FormDivLine>
            <label>NOME COMPLETO</label>
            <Input name="name" />
          </FormDivLine>

          <FormDivLine>
            <label>ENDEREÇO DE E-MAIL</label>
            <Input name="email" type="email" />
          </FormDivLine>
          <FormDivLine width={100} divFather>
            <FormDivLine width={30}>
              <label>IDADE</label>
              <Input name="age" />
            </FormDivLine>

            <FormDivLine width={30}>
              <label>PESO (em kg)</label>
              <Input name="weight" />
            </FormDivLine>

            <FormDivLine width={30}>
              <label>Altura</label>
              <Input name="height" />
            </FormDivLine>
          </FormDivLine>
        </FormDiv>
      </Form>
    </Container>
  );
}
