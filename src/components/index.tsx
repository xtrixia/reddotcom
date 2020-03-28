/**
 * @file Wrapper
 * @summary Wrap all children's component
 */

import React from 'react';
import { Grid } from '@material-ui/core';

type LoungeProps = {
  children?: React.ReactChildren;
};

function Lounge({ children }: LoungeProps) {
  return (
    <Grid container spacing={4} xs={12}>
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

export default Lounge;
