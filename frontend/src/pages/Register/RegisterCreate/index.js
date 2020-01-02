import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { format, parseISO, addMonths, addHours } from 'date-fns';

import PropTypes from 'prop-types';
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

export default function RegisterCreate({ match }) {
  const [plans, setPlans] = useState([]);
  const [plansAll, setPlansAll] = useState([]);

  const [registration, setRegistration] = useState([]);

  const [student, setStudent] = useState([]);

  const [studentId, setStudentId] = useState([]);
  const [planId, setPlanId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [price, setPrice] = useState();

  const idRegistration = match.params.id;

  useEffect(() => {
    async function loadRegistration() {
      const { data } = await api.get(`registrations/${idRegistration}`, {});

      setPlanId(data.plan.id);
      setStudentId(data.student.id);

      const studentSelected = {
        id: data.student.id,
        title: data.student.name,
      };

      setStudent(studentSelected);
      // Because
      setStartDate(addHours(parseISO(data.start_date), 3));

      setRegistration(data);
    }

    async function loadPlans() {
      const { data } = await api.get('plans');
      const planSelec = [];

      await data.map(({ id, title }) => {
        return planSelec.push({
          id,
          title,
        });
      });

      setPlans(planSelec);
      setPlansAll(data);
    }

    if (idRegistration) {
      loadRegistration();
    }

    loadPlans();
  }, [idRegistration, studentId]);

  useEffect(() => {
    if (planId) {
      const planSelected = plansAll.find(plan => plan.id === Number(planId));

      if (planSelected) {
        const formato = {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'BRL',
        };
        setPrice(
          Number(planSelected.priceDuration).toLocaleString('pt-BR', formato)
        );

        if (startDate) {
          const newDate = addMonths(
            parseISO(format(new Date(startDate), 'yyyy-MM-dd')),
            planSelected.duration
          );
          setEndDate(format(newDate, 'dd/MM/yyyy'));
        }
      }
    }
  }, [startDate, planId, plansAll]);

  async function handleSubmit(data) {
    try {
      data.start_date = format(new Date(data.start_date), 'yyyy-MM-dd');

      if (idRegistration) {
        await api.put(`registrations/${idRegistration}`, data);
        toast.success('Matrículas cadastrada');
      } else {
        await api.post('registrations', data);
        toast.success('Matrículas cadastrada');
      }

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

  const setSelectStudent = async optionStudent => {
    setStudent(optionStudent);
    setStudentId(optionStudent.id);
  };

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit} initialData={registration}>
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
              name="student_id"
              placeholder="Digite o nome de um Aluno"
              loadOptions={loadOptions}
              noOptionsMessage="Nenhum Aluno"
              value={student}
              set={setSelectStudent}
            />

            <Input
              name="student_id"
              value={studentId}
              style={{ display: 'none' }}
            />
          </FormDivLine>

          <FormDivLine width={100} divFather>
            <FormDivLine width={35}>
              <label>PLANO</label>
              <Select
                name="plan_id"
                options={plans}
                value={planId}
                onChange={e => setPlanId(e.target.value)}
              />
            </FormDivLine>

            <FormDivLine width={22}>
              <label>DATA DE INÍCIO</label>
              <Datepicker
                value={startDate}
                name="start_date"
                onChange={date => setStartDate(date)}
              />
            </FormDivLine>

            <FormDivLine width={22}>
              <label>DATA DE TÉRMINO</label>
              <Input
                name="end_date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                disabled
              />
            </FormDivLine>

            <FormDivLine width={20}>
              <label>VALOR FINAL</label>
              <Input
                name="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                disabled
              />
            </FormDivLine>
          </FormDivLine>
        </FormDiv>
      </Form>
    </Container>
  );
}

RegisterCreate.propTypes = {
  match: PropTypes.element.isRequired,
};
