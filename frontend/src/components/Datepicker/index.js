import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, value, onChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        autoComplete="off"
        name={fieldName}
        locale={pt}
        selected={selected}
        onChange={onChange}
        ref={ref}
        dateFormat="dd/MM/yyyy"
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.element.isRequired,
  onChange: PropTypes.func.isRequired,
};
