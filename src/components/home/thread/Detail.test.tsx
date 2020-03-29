import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import DetailThread from './Detail';

describe('DetailThread Testing', () => {
  it('simulates click back to homepage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <DetailThread />
      </MemoryRouter>,
    );

    const buttonHome = wrapper.find('button').at(3);
    buttonHome.simulate('click');
  });

  it('simulates comment on a thread', () => {
    const wrapper = mount(
      <MemoryRouter>
        <DetailThread />
      </MemoryRouter>,
    );

    // simulates change input
    const inputText = wrapper.find('textarea').first();
    inputText.simulate('change', { target: { value: 'a comment' } });
    expect(inputText.text()).toEqual('a comment');

    // simulates click submit
    const buttonSubmit = wrapper.find('button').at(4);
    buttonSubmit.simulate('click');
    expect(buttonSubmit.props()['aria-label']).toEqual('add-comment');
  });
});
