import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';
import InputMask from 'react-input-mask';

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

export default function StudentCreate(props) {
  const [student, setStudent] = useState([]);

  const idStudent = props.match.params.id;

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`student/${idStudent}`, {});
      setStudent(response.data);
    }

    if (idStudent) {
      loadStudent();
    }
  }, []);

  async function handleSubmit(data) {
    try {
      if (idStudent) {
        await api.put(`student/${idStudent}`, data);
        toast.success('Aluno atualizado');
      } else {
        await api.post('student', data);
        toast.success('Aluno cadastrado');
      }

      history.push('/student');
    } catch (err) {
      toast.error('Falha no cadastro, verifique seus dados');
    }
  }

  return (

    <Container>
      <Form schema={schema} onSubmit={handleSubmit} initialData={student}>
        <ContainerTitle>
          <span>Cadastro de aluno</span>
          <Wrapper>
            <LinkHref to="/student/">VOLTAR</LinkHref>
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
              <InputMask mask='999'>
                {() => <Input name="age" />}
              </InputMask>
            </FormDivLine>

            <FormDivLine width={30}>
              <label>PESO (em kg)</label>
              <InputMask mask='999'>
                {() => <Input name="weight" />}
              </InputMask>
            </FormDivLine>

            <FormDivLine width={30}>
              <label>Altura</label>
              <InputMask mask='9,99'>
                {() => <Input name="height" />}
              </InputMask>
            </FormDivLine>
          </FormDivLine>
        </FormDiv>
      </Form>
    </Container >
  );
}
