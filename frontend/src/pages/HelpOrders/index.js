/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '~/services/api';
import ModalHelpOrders from './ModalHelpOrders';

import { Container, Table, Button, ContainerTitle } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required(),
});

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState('');
  const [idHelpOrder, setIdHelpOrder] = useState('');
  const [helpOrderChange, setHelpOrderChange] = useState();

  useEffect(() => {
    async function loadHelpOrders() {
      const { data } = await api.get('help-orders/answers');

      setHelpOrders(data);
      setHelpOrderChange(false);
    }

    loadHelpOrders();
  }, [helpOrderChange]);

  async function handleAnswer(helpOrder) {
    setQuestion(helpOrder.question);
    setIdHelpOrder(helpOrder.id);
    setShow(true);
  }

  async function handleSubmit(data, { resetForm }) {
    try {
      await api.put(`answer/${idHelpOrder}`, data);
      toast.success('Resposta Salva');
      setShow(false);
      setHelpOrderChange(true);
      resetForm();
    } catch (err) {
      toast.error('Erro ao salvar');
    }
  }

  return (
    <Container>
      <ContainerTitle>
        <span>Pedidos de auxílio</span>
      </ContainerTitle>

      <ModalHelpOrders
        handleSubmit={handleSubmit}
        question={question}
        show={show}
        schema={schema}
        setShow={setShow}
      />
      <Table>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th width="20" />
          </tr>
        </thead>

        <tbody>
          {helpOrders.length > 0 ? (
            helpOrders.map(helpOrder => (
              <tr key={helpOrder.id}>
                <td>{helpOrder.student.name}</td>
                <td className="actions">
                  <Button
                    light="true"
                    color="blue"
                    onClick={() => handleAnswer(helpOrder)}
                  >
                    responder
                </Button>
                </td>
              </tr>
            ))
          ) : (<tr><td className="notFound">Não existe nenhum pedido de auxílio no momento</td></tr>)}
        </tbody>
      </Table>
    </Container>
  );
}
