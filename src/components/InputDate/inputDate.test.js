import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import InputDate from './inputDate';

chai.use(sinonChai);

describe('<InputDate />', () => {
  let wrapper;
  const initObj = {
    id: 'date',
    name: 'Data e Horário',
    validation: {
      pattern: 'yyyy-MM-ddTHH:mm:ss'
    },
    value: '',
    onChanged: sinon.spy()
  };

  beforeEach(() => {
    const { id, name, validation, value, onChanged } = initObj;
    wrapper = shallow(<InputDate id={id} name={name} pattern={validation.pattern} value={value} onChanged={onChanged}/>);
  });

  it('renders component', () => {
    expect(wrapper.find('.input-container__label')).to.have.length(1);
    expect(wrapper.find('.input-container__input')).to.have.length(1);
  });

  it('simulate change value and called onChanged', () => {
    wrapper.find('.input-container__input').simulate('change', {
      target: {
        value: '2018-02-12T20:02:00'
      }
    });
    expect(initObj.onChanged).to.have.been.calledWith({
      target: {
        value: '2018-02-12T20:02:00'
      }
    });
  });
});