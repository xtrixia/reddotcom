import React from 'react';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';

import App from '.';

describe('Footer Testing', () => {
  it('render successfully', () => {
    const wrapper = mount(<App />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
