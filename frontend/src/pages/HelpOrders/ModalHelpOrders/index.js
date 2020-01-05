import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import Modal from '~/components/Modal';
import { Button, Container } from './styles';

export default function ModalHelpOrders({
  question,
  show,
  setShow,
  schema,
  handleSubmit,
}) {
  return (
    <Modal title="" show={show} setShow={setShow}>
      <Container>
        <strong>PERGUNTA DO ALUNO</strong>
        <p>{question}</p>
        <strong>SUA RESPOSTA</strong>
        <Form onSubmit={handleSubmit} schema={schema}>
          <Input multiline name="answer" />
          <Button type="submit">Responder aluno</Button>
        </Form>
      </Container>
    </Modal>
  );
}

ModalHelpOrders.propTypes = {
  question: PropTypes.string.isRequired,
  show: PropTypes.element.isRequired,
  setShow: PropTypes.func.isRequired,
  schema: PropTypes.element.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
