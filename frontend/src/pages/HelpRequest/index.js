import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Table, Button, ContainerTitle } from './styles';

export default function Student() {
  return (
    <Container>
      <ContainerTitle>
        <span>Pedidos de auxílio</span>
      </ContainerTitle>

      <Table>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th width="20" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Peter</td>
            <td className="actions">
              <Button light="true" color="blue">
                responder
              </Button>
            </td>
          </tr>
          <tr>
            <td>Lois</td>
            <td className="actions">
              <Button light="true" color="blue">
                responder
              </Button>
            </td>
          </tr>
          <tr>
            <td>Joe</td>
            <td className="actions">
              <Button light="true" color="blue">
                responder
              </Button>
            </td>
          </tr>
          <tr>
            <td>Cleveland</td>
            <td className="actions">
              <Button light="true" color="blue">
                responder
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
