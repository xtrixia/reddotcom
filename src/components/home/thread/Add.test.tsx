import React from 'react';
import { mount } from 'enzyme';

import AddThread from './Add';

describe('AddThread Testing', () => {
  it('simulates change input', () => {
    const wrapper = mount(<AddThread onCancel={jest.fn()} />);

    const inputText = wrapper.find('textarea').first();
    inputText.simulate('change', { target: { value: 'a new thread' } });

    expect(inputText.text()).toEqual('a new thread');
  });

  it('simulates click cancel', () => {
    const wrapper = mount(<AddThread onCancel={jest.fn()} />);

    // simulates change input first
    const inputText = wrapper.find('textarea').first();
    inputText.simulate('change', { target: { value: 'a new thread' } });

    // simulates click cancel after typing
    const buttonCancel = wrapper.find('button').first();
    buttonCancel.simulate('click');

    expect(wrapper.props().onCancel).toHaveBeenCalled();
  });

  it('simulates send new thread', () => {
    const wrapper = mount(<AddThread onCancel={jest.fn()} />);

    // simulates change input first
    const inputText = wrapper.find('textarea').first();
    inputText.simulate('change', { target: { value: 'a new thread' } });

    // simulates click send after typing
    const buttonSubmit = wrapper.find('button').at(1);
    buttonSubmit.simulate('click');
    expect(buttonSubmit.props()['aria-label']).toEqual('add-thread');
  });
});
