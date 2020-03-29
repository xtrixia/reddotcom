import React from 'react';
import { createMemoryHistory } from 'history';
import { mount } from 'enzyme';

import Router from './router';

describe('Router Testing', () => {
  const history = createMemoryHistory();

  it('if `currentUser` exist must be on /', () => {
    mount(<Router />);

    expect(history.location.pathname).toBe('/');
  });
});
