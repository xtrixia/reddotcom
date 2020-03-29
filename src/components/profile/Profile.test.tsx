import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import Profile from './Profile';

describe('Profile Testing', () => {
  beforeEach(() => {
    jest.mock('firebase/app', () => ({
      initializeApp: jest.fn(),
      database: jest.fn(() => ({
        ref: jest.fn()
      }))
    }));
  });

  it('simulates click to homepage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const buttonHome = wrapper.find('button').at(3);
    buttonHome.simulate('click');
  });
});
