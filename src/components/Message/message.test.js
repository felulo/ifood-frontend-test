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
  const onClick = sinon.spy();

  beforeEach(() => {
    wrapper = shallow(<Message message={message} onClose={onClick}/>);
  });

  it('renders component', () => {
    expect(wrapper.find('.message')).to.have.length(1);
  });

  it('renders text with message', () => {
    expect(wrapper.find('.message__text').text()).to.equal(message);
  });

  it('simulate click close', () => {
    wrapper.find('.message__button').simulate('click');

    expect(onClick).to.have.been.called;
  });
});