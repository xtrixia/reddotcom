import React from 'react';
import toJSON from 'enzyme-to-json';

import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import Timeline from './Timeline';

describe('Timeline Testing', () => {
  it('render successfully', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Timeline />
      </MemoryRouter>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('simulates logout from timeline', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Timeline />
      </MemoryRouter>,
    );

    // simulates click send after typing
    const buttonLogout = wrapper.find('button').at(2);
    buttonLogout.simulate('click');
    expect(buttonLogout.props()['aria-label']).toEqual('logout');
  });
});
