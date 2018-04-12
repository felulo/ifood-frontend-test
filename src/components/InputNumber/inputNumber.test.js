import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import InputNumber from './inputNumber';

chai.use(sinonChai);

describe('<InputNumber />', () => {
  let wrapper;
  const initObj = {
    id: 'limit',
    name: 'Quantidade',
    validation: {
      min: 1,
      max: 20
    },
    value: '',
    onChanged: sinon.spy()
  };

  beforeEach(() => {
    const { id, name, validation, value, onChanged } = initObj;
    wrapper = shallow(<InputNumber id={id} name={name} min={validation.min} max={validation.max} value={value} onChanged={onChanged}/>);
  });

  it('renders component', () => {
    expect(wrapper.find('.input-container__label')).to.have.length(1);
    expect(wrapper.find('.input-container__input')).to.have.length(1);
  });

  it('simulate change value and called onChanged', () => {
    wrapper.find('.input-container__input').simulate('change', {
      target: {
        value: 5
      }
    });
    expect(initObj.onChanged).to.have.been.calledWith({
      target: {
        value: 5
      }
    });
  });
});