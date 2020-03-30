/**
 * @file Navigations
 * @summary Navigate to homepage or back to the previous route
 */

import React from 'react';
import { Button } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';

function Navigations({ history }: RouteComponentProps) {
  return (
    <div>
      <Button
        style={{ padding: '0 0.5rem' }}
        onClick={() => history.goBack()}
      >
        Kembali
      </Button>
      |
      <Button
        style={{ padding: '0 0.5rem' }}
        onClick={() => history.push('/')}
      >
        Beranda
      </Button>
    </div>
  );
}

export default withRouter(Navigations);
