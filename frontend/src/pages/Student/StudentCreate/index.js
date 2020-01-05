/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
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

const maskHeight = /\d{1},\d{2}/g;

const schema = Yup.object().shape({
  name: Yup.string()
    .max(255, 'O limte máximo é 255!')
    .required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .integer()
    .typeError('Insira uma idade válida')
    .required('A idade é obrigatória'),
  weight: Yup.number()
    .integer()
    .typeError('Insira um peso (em kg) válido')
    .required('o peso é obrigatório'),
  height: Yup.string()
    .matches(maskHeight, 'Insira uma altura válida')
    .required('A altura é obrigatório'),
});

export default function StudentCreate({ match }) {
  const [student, setStudent] = useState([]);
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [height, setHeight] = useState();

  const idStudent = match.params.id;

  useEffect(() => {
    async function loadStudent() {
      const { data } = await api.get(`student/${idStudent}`, {});
      setStudent(data);

      const heightChange = String(data.height.toFixed(2)).replace('.', ',');

      setWeight(data.weight);
      setAge(data.age);
      setHeight(heightChange);
    }

    if (idStudent) {
      loadStudent();
    }
  }, [idStudent]);

  async function handleSubmit(data) {
    try {
      data.height = data.height.replace(',', '.');

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
          <span>{idStudent ? 'Edição' : 'Cadastro'} de aluno</span>
          <Wrapper>
            <LinkHref to="/student/">
              <MdChevronLeft size={20} color="#fff" />
              VOLTAR
            </LinkHref>
            <Button type="submit">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </Button>
          </Wrapper>
        </ContainerTitle>

        <FormDiv>
          <FormDivLine>
            <label>NOME COMPLETO</label>
            <Input name="name" maxLength="255" />
          </FormDivLine>

          <FormDivLine>
            <label>ENDEREÇO DE E-MAIL</label>
            <Input name="email" type="email" />
          </FormDivLine>

          <FormDivLine width={100} divFather>
            <FormDivLine width={30}>
              <label>IDADE</label>
              <InputMask
                mask="999"
                maskChar=""
                value={age}
                onChange={e => setAge(e.target.value)}
              >
                {() => <Input name="age" type="text" />}
              </InputMask>
            </FormDivLine>

            <FormDivLine width={30}>
              <label>PESO (em kg)</label>
              <InputMask
                mask="999"
                maskChar=""
                value={weight}
                onChange={e => setWeight(e.target.value)}
              >
                {() => <Input name="weight" type="text" />}
              </InputMask>
            </FormDivLine>

            <FormDivLine width={30}>
              <label>Altura</label>
              <InputMask
                mask="9,99"
                maskChar=""
                value={height}
                onChange={e => setHeight(e.target.value)}
              >
                {() => <Input name="height" type="text" />}
              </InputMask>
            </FormDivLine>
          </FormDivLine>
        </FormDiv>
      </Form>
    </Container>
  );
}

StudentCreate.propTypes = {
  match: PropTypes.element.isRequired,
};
