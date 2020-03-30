import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import Navigations from './Navigations';

describe('Navigations Testing', () => {
  const history = createMemoryHistory();

  it('simulates click on each navigation', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Navigations />
      </MemoryRouter>,
    );

    // simulates click `kembali`
    const buttonBack = wrapper.find('button').first();
    buttonBack.simulate('click');

    // simulates click `beranda`
    const buttonHome = wrapper.find('button').at(1);
    buttonHome.simulate('click');
    expect(history.location.pathname).toBe('/');
  });
});
