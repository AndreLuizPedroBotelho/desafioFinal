import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';
import InputMask from 'react-input-mask';
import IntlCurrencyInput from "react-intl-currency-input"
import CurrencyFormat from 'react-currency-format';

import {
  Container,
  Button,
  LinkHref,
  FormDiv,
  FormDivLine,
  ContainerTitle,
  Wrapper,
} from './styles';

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

const schema = Yup.object().shape({
  title: Yup.string().required('O título do plano é obrigatório'),
  duration: Yup.number().required('O título do plano é obrigatório'),
  price: Yup.string().required('O título do plano é obrigatório'),
});

export default function PlanCreate(props) {
  const [plan, setPlan] = useState([]);
  const [price, setPrice] = useState(0);

  const [duration, setDuration] = useState();
  const [priceDuration, setPriceDuration] = useState(0);

  const idPlan = props.match.params.id;

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
  }, []);

  useEffect(() => {
    const priceCalc = parseFloat(price) || 0;
    const durationCalc = parseInt(duration) || 0;

    const formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }

    const total = (priceCalc * durationCalc) || 0

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

  const handleChangePrice = (e) => {
    e.preventDefault();

    let price = e.target.value;
    price = price.replace('R$ ', '').split(".").join("").replace(',', '.');

    setPrice(price)
  };

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit} initialData={plan}  >
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
              <Input name="duration" type="number" value={duration} onChange={e => setDuration(e.target.value)}
              />
            </FormDivLine>

            <FormDivLine width={30}>
              <label>PREÇO MENSAL</label>
              <CurrencyFormat value={parseFloat(price)} decimalSeparator={','} fixedDecimalScale={true} decimalScale={2}
                thousandSeparator={'.'} prefix={'R$ '} onChange={e => handleChangePrice(e)} />
              <Input name="price" value={price} style={{ display: 'none' }} />
            </FormDivLine>


            <FormDivLine width={30}>
              <label>PREÇO TOTAL</label>
              <Input name="priceDuration" value={priceDuration} disabled />
            </FormDivLine>

          </FormDivLine>
        </FormDiv>
      </Form>
    </Container >
  );
}
