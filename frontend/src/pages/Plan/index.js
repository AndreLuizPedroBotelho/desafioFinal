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

export default function Student() {
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
          <tr>
            <td>Peter</td>
            <td>Griffin</td>
            <td>$100</td>
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
            <td>$150</td>
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
            <td>$300</td>
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
            <td>$250</td>
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
