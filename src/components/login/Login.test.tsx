import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { mount } from 'enzyme';

import Login from './Login';

describe('Login Testing', () => {
  // mock attributes RouteComponentProps
  const mockRouteProps: RouteComponentProps = {
    history: {} as any,
    location: {} as any,
    match: {} as any
  };

  it('simulates click login with google', () => {
    const wrapper = mount(<Login {...mockRouteProps} />);
    const buttonGoogle = wrapper.find('button').first();

    buttonGoogle.simulate('click');

    // mock window.alert
    window.alert = jest.fn().mockImplementation(() => true);

    expect(buttonGoogle.text()).toEqual('Google');
  });

  it('simulates click login with twitter', () => {
    const wrapper = mount(<Login {...mockRouteProps} />);
    const buttonTwitter = wrapper.find('button').at(1);

    buttonTwitter.simulate('click');

    // mock window.alert
    window.alert = jest.fn().mockImplementation(() => true);

    expect(buttonTwitter.text()).toEqual('Twitter');
  });
});
