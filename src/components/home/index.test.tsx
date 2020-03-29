import React from 'react';
import toJSON from 'enzyme-to-json';

import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import Home from '.';
import Profile from '../profile';

describe('Home Testing', () => {
  it('render successfully', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Home>
          <Profile />
        </Home>
      </MemoryRouter>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('simulates click one of the navigations', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Home>
          <Profile />
        </Home>
      </MemoryRouter>
    );

    /* Button: add new thread */
    const buttonNewThread = wrapper.find('button').first();
    /* Button: profile section */
    const buttonProfile = wrapper.find('button').at(1);
    /* Button: logout */
    const buttonLogout = wrapper.find('button').at(2);

    buttonNewThread.simulate('click');
    expect(buttonNewThread.props()['aria-label']).toEqual('add');

    buttonProfile.simulate('click');
    expect(buttonProfile.props()['aria-label']).toEqual('profile');

    buttonLogout.simulate('click');
    expect(buttonLogout.props()['aria-label']).toEqual('logout');
  });
});
