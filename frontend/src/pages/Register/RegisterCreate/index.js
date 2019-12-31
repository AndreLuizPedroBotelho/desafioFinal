import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { format } from 'date-fns';
import api from '~/services/api';
import history from '~/services/history';

import Datepicker from '~/components/Datepicker';
import ReactSelect from '~/components/ReactSelect';

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
  student_id: Yup.number().required('O aluno é obrigatório'),
  plan_id: Yup.number().required('O plano é obrigatório'),
  start_date: Yup.string().required('A data de início é obrigatorio'),
});

export default function RegisterCreate() {
  const [plans, setPlans] = useState([]);
  const [student, setStudent] = useState([]);

  useEffect(() => {
    async function loadRegistration() {
      const { data } = await api.get('plans');
      const planSelec = [];

      await data.map(({ id, title }) => {
        return planSelec.push({
          id,
          title,
        });
      });

      setPlans(planSelec);
    }

    loadRegistration();
  }, []);

  async function handleSubmit(data) {
    try {
      data.start_date = format(new Date(data.start_date), 'yyyy-MM-dd');
      await api.post('registrations', data);
      toast.success('Matrículas cadastrada');

      history.push('/register');
    } catch (err) {
      toast.error('Falha no cadastro, verifique seus dados');
    }
  }

  const filterStudents = async inputValue => {
    const { data } = await api.get('student', {
      params: { q: inputValue },
    });

    const options = [];

    await data.map(({ id, name }) => {
      return options.push({
        id,
        title: name,
      });
    });

    return options;
  };

  const loadOptions = async (inputValue, callback) => {
    callback(await filterStudents(inputValue));
  };

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <ContainerTitle>
          <span>Cadastro de Matrícula</span>
          <Wrapper>
            <LinkHref to="/register/">VOLTAR</LinkHref>
            <Button type="submit">SALVAR</Button>
          </Wrapper>
        </ContainerTitle>

        <FormDiv>
          <FormDivLine divHeight>
            <label>Aluno</label>

            <ReactSelect
              name="studentSelect"
              placeholder="Selecione o Aluno"
              loadOptions={loadOptions}
              value={student}
              set={setStudent}
            />

            <Input
              name="student_id"
              value={student}
              style={{ display: 'none' }}
            />
          </FormDivLine>

          <FormDivLine width={100} divFather>
            <FormDivLine width={35}>
              <label>PLANO</label>
              <Select name="plan_id" options={plans} />
            </FormDivLine>

            <FormDivLine width={22}>
              <label>DATA DE INÍCIO</label>
              <Datepicker name="start_date" />
            </FormDivLine>

            <FormDivLine width={22}>
              <label>DATA DE TÉRMINO</label>
              <Input name="end_date" disabled />
            </FormDivLine>

            <FormDivLine width={20}>
              <label>VALOR FINAL</label>
              <Input name="name" disabled />
            </FormDivLine>
          </FormDivLine>
        </FormDiv>
      </Form>
    </Container>
  );
}
