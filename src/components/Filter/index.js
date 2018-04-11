import React, { Component } from 'react';
import PropType from 'prop-types';

import Select from '../Select';
import InputNumber from '../InputNumber';
import InputDate from '../InputDate';
class Filter extends Component {
  render() {
    const { values, validation, name, id, value, onChanged } = this.props;
    let filter = <span></span>;

    if (values) {
      filter = <Select id={id} name={name} values={values} value={value} onChanged={onChanged} />
    } else if (validation && validation.primitiveType) {
      switch (validation.primitiveType) {
        case 'STRING':
          if (validation.entityType === 'DATE_TIME') {
            filter = <InputDate id={id} name={name} pattern={validation.pattern} value={value} onChanged={onChanged}/>
          }
        break;
        case 'INTEGER':
          filter = <InputNumber id={id} name={name} min={validation.min} max={validation.max} value={value} onChanged={onChanged}/>
        break;
      }
    }

    return filter;
  }
}

const { string, number, shape } = PropType;

Filter.propType = {
  name: string.isRequired,
  id: string.isRequired,
  values: shape({
    value: string,
    name: string
  }),
  validation: shape({
    primitiveType: string,
    pattern: string,
    min: number,
    max: number,
    entityType: string
  })
}

export default Filter;