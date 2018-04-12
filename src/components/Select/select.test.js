import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Select from './select';

chai.use(sinonChai);

describe('<Select />', () => {
  let wrapper;
  const initObj = {
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

  beforeEach(() => {
    const { id, name, values, value, onChanged } = initObj;
    wrapper = shallow(<Select id={id} name={name} values={values} value={value} onChanged={onChanged} />);
  });

  it('renders component', () => {
    expect(wrapper.find('.input-container__label')).to.have.length(1);
    expect(wrapper.find('.input-container__select')).to.have.length(1);
    expect(wrapper.find('option')).to.have.length(3);
  });

  it('simulate change value and called onChanged', () => {
    wrapper.find('.input-container__select').simulate('change', {
      target: {
        value: 'ES'
      }
    });
    expect(initObj.onChanged).to.have.been.calledWith({
      target: {
        value: 'ES'
      }
    });
  });
});