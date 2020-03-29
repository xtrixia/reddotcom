/**
 * @file Wrapper
 * @summary Wrapper that wrap all children's component
 */

import React from 'react';
import { Grid } from '@material-ui/core';

type WrapperProps = {
  children?: React.ReactNode;
};

function Wrapper({ children }: WrapperProps) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        {children}
      </Grid>

      <Grid item xs={12}>
        <footer style={{ textAlign: 'center' }}>
          <strong>© 2020 Annisa Feryannie Widya</strong>
        </footer>
      </Grid>
    </Grid>
  );
}

export default Wrapper;
