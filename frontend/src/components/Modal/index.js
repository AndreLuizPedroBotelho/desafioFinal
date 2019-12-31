import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, Content, Wrapper, Body } from './styles';

export default function Modal({ children, show, title, setShow }) {
  const ref = useRef(null);

  function handleClick(event) {
    if (!ref.current.contains(event.target)) {
      setShow(false);
    }
  }

  useEffect(() => {
    setShow(show);
  }, [setShow, show]);

  return (
    <Container show={show} onClick={handleClick}>
      <Wrapper>
        <Content ref={ref}>
          <div className="c-modal__title">
            <h4>{title}</h4>
          </div>
          <Body>{children}</Body>
        </Content>
      </Wrapper>
    </Container>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.element.isRequired,
  show: PropTypes.element.isRequired,
  setShow: PropTypes.func.isRequired,
};
