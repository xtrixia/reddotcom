/**
 * @file Home
 * @summary Handle homepage after login/register
 */

import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircleOutline, ExitToApp, Person } from '@material-ui/icons';

import AddThread from './Add';

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    justifyItems: 'center',
    gridGap: '1rem',
    padding: '5rem 4rem 0'
  },
  content: {
    width: '50%',
    border: 'solid 1px #b5b5b5',
    height: '20.25rem',
    overflow: 'scroll',
    textAlign: 'center'
  },
  toolbar: {
    width: '50%',
    justifySelf: 'center'
  },
  navigations: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: '1rem',
    justifySelf: 'left',
    '& > *:last-child': {
      gridColumnStart: 4
    }
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid #b5b5b5'
    }
  }
}));

type HomeProps = {
  children: React.ReactChildren;
} & RouteComponentProps;

function Home({ children, match, history }: HomeProps) {
  const classes = useStyles();

  console.log(match);
  const [toggleAdd, setToggleAdd] = useState<boolean>(false);

  return (
    <Grid item xs={12} className={classes.container}>
      <Grid className={classes.toolbar}>
        <nav className={classes.navigations}>
          <IconButton
            aria-label='add'
            size='small'
            onClick={() => setToggleAdd(!toggleAdd)}
          >
            <AddCircleOutline />
          </IconButton>
          <IconButton
            aria-label='profile'
            size='small'
            onClick={() => history.push('/profile')}
          >
            <Person />
          </IconButton>
          <IconButton
            aria-label='logout'
            size='small'
            onClick={() => alert('logout')}
          >
            <ExitToApp />
          </IconButton>
        </nav>
      </Grid>

      <Grid className={classes.content}>
        {toggleAdd && <AddThread onCancel={() => setToggleAdd(false)} />}

        {children}
      </Grid>
    </Grid>
  );
}

export default withRouter(Home);
