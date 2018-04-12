import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Message from './message';

chai.use(sinonChai);

describe('<Message />', () => {
  let wrapper;
  const message = 'Quantidade inválida.';

  beforeEach(() => {
    wrapper = shallow(<Message message={message} />);
  });

  it('renders component', () => {
    expect(wrapper.find('.message')).to.have.length(1);
  });

  it('renders text with message', () => {
    expect(wrapper.find('.message').text()).to.equal(message);
  });
});