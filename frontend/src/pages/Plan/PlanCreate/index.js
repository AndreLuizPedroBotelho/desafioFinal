import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import CurrencyFormat from 'react-currency-format';
import PropTypes from 'prop-types';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import history from '~/services/history';
import api from '~/services/api';

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
  title: Yup.string().required('O título do plano é obrigatório'),
  duration: Yup.number().required('O título do plano é obrigatório'),
  price: Yup.string().required('O título do plano é obrigatório'),
});

export default function PlanCreate({ match }) {
  const [plan, setPlan] = useState([]);
  const [price, setPrice] = useState(0);

  const [duration, setDuration] = useState();
  const [priceDuration, setPriceDuration] = useState(0);

  const idPlan = match.params.id;

  useEffect(() => {
    async function loadPlan() {
      const { data } = await api.get(`plans/${idPlan}`, {});
      setPlan(data);

      setPrice(data.price);
      setDuration(data.duration);
    }

    if (idPlan) {
      loadPlan();
    }
  }, [idPlan]);

  useEffect(() => {
    const priceCalc = parseFloat(price) || 0;
    const durationCalc = Number(duration) || 0;

    const formato = {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL',
    };

    const total = priceCalc * durationCalc || 0;

    setPriceDuration(total.toLocaleString('pt-BR', formato));
  }, [price, duration]);

  async function handleSubmit(data) {
    try {
      if (idPlan) {
        await api.put(`plans/${idPlan}`, data);
        toast.success('Plano atualizado');
      } else {
        await api.post('plans', data);
        toast.success('Plano cadastrado');
      }

      history.push('/plan');
    } catch (err) {
      toast.error('Falha no cadastro, verifique seus dados');
    }
  }

  const handleChangePrice = e => {
    e.preventDefault();

    let priceChange = e.target.value;
    priceChange = priceChange
      .replace('R$ ', '')
      .split('.')
      .join('')
      .replace(',', '.');

    setPrice(priceChange);
  };

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit} initialData={plan}>
        <ContainerTitle>
          <span>{idPlan ? 'Edição' : 'Cadastro'} de plano</span>
          <Wrapper>
            <LinkHref to="/plan/">
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
            <label>TÍTULO DO PLANO</label>
            <Input name="title" maxlength="255" />
          </FormDivLine>

          <FormDivLine width={100} divFather>
            <FormDivLine width={30}>
              <label>DURAÇÃO (em meses)</label>
              <Input
                name="duration"
                type="number"
                min="0"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </FormDivLine>

            <FormDivLine width={30}>
              <label>PREÇO MENSAL</label>
              <CurrencyFormat
                value={parseFloat(price)}
                decimalSeparator=","
                fixedDecimalScale
                decimalScale={2}
                thousandSeparator="."
                prefix="R$ "
                onChange={e => handleChangePrice(e)}
              />
              <Input name="price" value={price} style={{ display: 'none' }} />
            </FormDivLine>

            <FormDivLine width={30}>
              <label>PREÇO TOTAL</label>
              <Input name="priceDuration" value={priceDuration} disabled />
            </FormDivLine>
          </FormDivLine>
        </FormDiv>
      </Form>
    </Container>
  );
}

PlanCreate.propTypes = {
  match: PropTypes.element.isRequired,
};
