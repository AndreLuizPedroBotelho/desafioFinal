import React, { useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function ReactSelect({
  name,
  label,
  loadOptions,
  multiple,
  placeholder,
  set,
  value,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <AsyncSelect
        isClearable
        cacheOptions
        defaultOptions
        ref={ref}
        placeholder={placeholder}
        onChange={option => set(option.id)}
        loadOptions={loadOptions}
        getOptionValue={option => option.title}
        getOptionLabel={option => option.title}
      />

      {error && <span>{error}</span>}
    </>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
  multiple: PropTypes.element.isRequired,
  placeholder: PropTypes.string.isRequired,
  set: PropTypes.func.isRequired,
  value: PropTypes.element.isRequired,
};
