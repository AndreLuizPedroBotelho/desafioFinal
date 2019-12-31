import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

import {
  Container,
  Table,
  LinkHref,
  Button,
  ContainerTitle,
  Wrapper,
} from './styles';

export default function Register() {
  const [registers, setRegisters] = useState([]);
  const [registerChange, setRegisterChange] = useState();

  useEffect(() => {
    async function loadRegister() {
      const { data } = await api.get('registrations');

      await data.map(value => {
        value.start_date = format(
          utcToZonedTime(value.start_date, 'UTC'),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt, timeZone: 'UTC' }
        );
        value.end_date = format(
          utcToZonedTime(value.end_date, 'UTC'),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt }
        );
        value.active = value.active ? 'SIM' : 'NÃO';
        return value;
      });

      setRegisters(data);
    }

    loadRegister();
  }, [registerChange]);

  async function handleDelete(register) {
    Swal.fire({
      title: 'Confirmação',
      text: `Você gostaria de deletar a matrícula do aluno ${register.student.name}?`,
      icon: 'question',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      preConfirm: async () => {
        await api.delete(`registrations/${register.id}`, {});
        toast.success('Matrícula deletada com sucesso');
        setRegisterChange(true);
      },
    });
  }
  return (
    <Container>
      <ContainerTitle>
        <span>Gerenciando matrículas</span>
        <Wrapper>
          <Link to="/register/save">CADASTRAR</Link>
        </Wrapper>
      </ContainerTitle>

      <Table>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>PLANO</th>
            <th>INÍCIO</th>
            <th>TÉRMINO</th>
            <th>ATIVA</th>
            <th width="20" />
          </tr>
        </thead>
        <tbody>
          {registers.map(register => (
            <tr key={register.id}>
              <td>{register.student.name}</td>
              <td>{register.plan.title}</td>
              <td>{register.start_date}</td>
              <td>{register.end_date}</td>
              <td>{register.active}</td>
              <td className="actions">
                <LinkHref
                  to={`/register/save/${register.id}`}
                  light="true"
                  color="blue"
                >
                  editar
                </LinkHref>
                <Button color="red" onClick={() => handleDelete(register)}>
                  apagar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
