import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-header.svg';
import { Container, Content, Profile, LinkHref, Button } from './styles';
import history from '~/services/history';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const routesArray = [
    { url: '/student', text: 'ALUNOS' },
    { url: '/plan', text: 'PLANOS' },
    { url: '/register', text: 'MATRÍCULAS' },
    { url: '/helpOrders', text: 'PEDIDOS DE AUXÌLIO' },
  ];

  function handleSignOut() {
    dispatch(signOut());
  }

  // eslint-disable-next-line no-unused-vars
  const [routes, setRoutes] = useState(routesArray);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />

          {routes.map(route => (
            <LinkHref
              key={route.url}
              to={route.url}
              active={
                history.location.pathname.indexOf(route.url) >= 0
                  ? '#444444'
                  : '#999999'
              }
            >
              {route.text}
            </LinkHref>
          ))}
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Button onClick={handleSignOut}>sair do sistema</Button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
