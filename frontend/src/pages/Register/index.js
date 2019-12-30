import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          <tr>
            <td>Peter</td>
            <td>Griffin</td>
            <td>30 de Abril de 2019</td>
            <td>30 de Maio de 2019</td>
            <td />
            <td className="actions">
              <LinkHref to="/profile" light="true" color="blue">
                editar
              </LinkHref>
              <Button color="red">apagar</Button>
            </td>
          </tr>
          <tr>
            <td>Lois</td>
            <td>Griffin</td>
            <td>30 de Abril de 2019</td>
            <td>30 de Maio de 2019</td>
            <td />
            <td className="actions">
              <LinkHref to="/profile" light="true" color="blue">
                editar
              </LinkHref>
              <Button color="red">apagar</Button>
            </td>
          </tr>
          <tr>
            <td>Joe</td>
            <td>Swanson</td>
            <td>30 de Abril de 2019</td>
            <td>30 de Maio de 2019</td>
            <td />
            <td className="actions">
              <LinkHref to="/profile" light="true" color="blue">
                editar
              </LinkHref>
              <Button color="red">apagar</Button>
            </td>
          </tr>
          <tr>
            <td>Cleveland</td>
            <td>Brown</td>
            <td>30 de Abril de 2019</td>
            <td>30 de Maio de 2019</td>
            <td />
            <td className="actions">
              <LinkHref to="/profile" light="true" color="blue">
                editar
              </LinkHref>
              <Button color="red">apagar</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
