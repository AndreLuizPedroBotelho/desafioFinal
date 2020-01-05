import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import api from '~/services/api';

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
      const formato = {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL',
      };

      await data.map((value, _) => {
        value.price = parseFloat(value.price).toLocaleString('pt-BR', formato);
        return value;
      });

      setPlans(data);
      setPlansChange(false);
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
        try {
          await api.delete(`plans/${plan.id}`, {});
          toast.success('Plano deletado com sucesso');
          setPlansChange(true);
          return;
        } catch (err) {
          toast.error(
            'Não é possível deletar, existe matrícula vinculada a esse plano'
          );
        }
      },
    });
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
            <th className="actions" />
          </tr>
        </thead>
        <tbody>
          {plans.length > 0 ? (
            plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>{plan.price}</td>
                <td className="actions">
                  <LinkHref
                    to={`/plan/save/${plan.id}`}
                    light="true"
                    color="blue"
                  >
                    editar
                </LinkHref>
                  <Button color="red" onClick={() => handleDelete(plan)}>
                    apagar
                </Button>
                </td>
              </tr>
            ))
          ) : (<tr><td>Não existe nenhum plano</td></tr>)}
        </tbody>
      </Table>
    </Container>
  );
}
