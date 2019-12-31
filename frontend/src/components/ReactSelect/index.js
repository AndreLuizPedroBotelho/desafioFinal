import React, { useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';

import { useField } from '@rocketseat/unform';

export default function ReactSelect({
  name,
  label,
  options,
  loadOptions,
  multiple,
  placeholder,
  set,
  value,
  ...rest
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
        onChange={option => set(option.id)}
        loadOptions={loadOptions}
        getOptionValue={option => option.title}
        getOptionLabel={option => option.title}
      />

      {error && <span>{error}</span>}
    </>
  );
}
