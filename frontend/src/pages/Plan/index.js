import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import Swal from 'sweetalert2';

import {
  Container,
  Table,
  LinkHref,
  Button,
  ContainerTitle,
  Wrapper,
} from './styles';

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [plansChange, setPlansChange] = useState();

  useEffect(() => {
    async function loadPlan() {
      const { data } = await api.get('plans');
      const formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }

      await data.map((value, index) => {
        value.price = parseFloat(value.price).toLocaleString('pt-BR', formato)
      })

      setPlans(data);
    }

    loadPlan();
  }, [plansChange]);

  async function handleDelete(plan) {
    Swal.fire({
      title: 'Confirmação',
      text: `Você gostaria de deletar o plano ${plan.title}?`,
      icon: 'question',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      preConfirm: async () => {
        await api.delete(`plans/${plan.id}`, {});
        setPlansChange(true);
      }

    })
  }

  return (
    <Container>
      <ContainerTitle>
        <span>Gerenciando planos</span>
        <Wrapper>
          <Link to="/plan/save">CADASTRAR</Link>
        </Wrapper>
      </ContainerTitle>

      <Table>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR p/ MÊS</th>
            <th width="20" />
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td>{plan.duration}</td>
              <td>{plan.price}</td>
              <td className="actions">
                <LinkHref to={`/plan/save/${plan.id}`} light="true" color="blue">
                  editar
                  </LinkHref>
                <Button color="red" onClick={() => handleDelete(plan)}>apagar</Button>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>
    </Container>
  );
}
