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

export default function PlanCreate(props) {
  console.log(props.match.params.id);
  const [students, setStudent] = useState([]);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

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
          <span>Cadastro de plano</span>
          <Wrapper>
            <LinkHref to="/plan/">VOLTAR</LinkHref>
            <Button type="submit">SALVAR</Button>
          </Wrapper>
        </ContainerTitle>

        <FormDiv>
          <FormDivLine>
            <label>TÍTULO DO PLANO</label>
            <Input name="title" />
          </FormDivLine>

          <FormDivLine width={100} divFather>
            <FormDivLine width={30}>
              <label>DURAÇÃO (em meses)</label>
              <Input name="duration" value={duration} onChange={e => setDuration(e.target.value)}
              />
            </FormDivLine>

            <FormDivLine width={30}>
              <label>PREÇO MENSAL</label>
              <Input name="price" value={price} onChange={e => setPrice(e.target.value)} />
            </FormDivLine>


            <FormDivLine width={30}>
              <label>PREÇO TOTAL</label>
              <Input name="height" value={price * duration} disabled />
            </FormDivLine>
          </FormDivLine>
        </FormDiv>
      </Form>
    </Container>
  );
}
