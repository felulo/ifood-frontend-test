import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import InputDate from '../InputDate/inputDate';
import InputNumber from '../InputNumber/inputNumber';
import Select from '../Select/select';
import Filter from './index';

chai.use(sinonChai);

describe('<Filter />', () => {
  let wrapper;
  const selectInitObj = {
    id: 'country',
    name: 'País',
    values: [{
      value: 'BR',
      name: 'Brasil'
    }, {
      value: 'DE',
      name: 'Alemanha'
    }, {
      value: 'ES',
      name: 'Espanha'
    }],
    value: '',
    onChanged: sinon.spy()
  };

  const inputDateInitObj = {
    id: 'date',
    name: 'Data e Horário',
    validation: {
      primitiveType: 'STRING',
      entityType: 'DATE_TIME',
      pattern: 'yyyy-MM-ddTHH:mm:ss'
    },
    value: '',
    onChanged: sinon.spy()
  };

  const inputNumberInitObj = {
    id: 'limit',
    name: 'Quantidade',
    validation: {
      primitiveType: 'INTEGER',
      min: 1,
      max: 20
    },
    value: '',
    onChanged: sinon.spy()
  };

  it('render an InputDate', () => {
    wrapper = shallow(<Filter {...inputDateInitObj} />);

    expect(wrapper.find(InputDate)).to.have.length(1);
  });

  it('render an InputNumber', () => {
    wrapper = shallow(<Filter {...inputNumberInitObj} />);

    expect(wrapper.find(InputNumber)).to.have.length(1);
  });

  it('render an Select', () => {
    wrapper = shallow(<Filter {...selectInitObj} />);

    expect(wrapper.find(Select)).to.have.length(1);
  });
});