/**
 * @file Home
 * @summary Handle homepage after login
 */

import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid, Button, IconButton } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AddCircleOutline, ExitToApp, Person } from '@material-ui/icons';

import AddThread from './thread/Add';
import { AuthContext } from '../../context';

import { authentication, database } from '../../configs/firebase';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'grid',
    justifyItems: 'center',
    gridGap: '1rem',
    padding: '5rem 4rem 0',
    [theme.breakpoints.down('xs')]: {
      padding: '5rem 0 0'
    }
  },
  content: {
    width: '55%',
    border: 'solid 1px #b5b5b5',
    height: '30rem',
    overflow: 'scroll',
    textAlign: 'center'
  },
  toolbar: {
    width: '55%',
    justifySelf: 'center'
  },
  navigations: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > button:nth-child(2)': {
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    }
  },
  rightbar: {
    display: 'flex',
    width: '15%',
    justifyContent: 'space-between'
  },
  button: {
    width: 'max-content',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
      width: 'auto'
    }
  },
  icon: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
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
  children: React.ReactElement;
} & RouteComponentProps;

function Home({ children, history }: HomeProps) {
  const classes = useStyles();

  const currentUser = useContext(AuthContext);

  const [toggleAdd, setToggleAdd] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <Grid item xs={12} className={classes.container}>
      <Grid className={classes.toolbar}>
        <nav className={classes.navigations}>
          <Button
            variant='contained'
            className={classes.button}
            startIcon={<AddCircleOutline className={classes.icon} />}
            aria-label='add'
            size='small'
            onClick={() => setToggleAdd(!toggleAdd)}
          >
            New thread
          </Button>
          <div className={classes.rightbar}>
            <IconButton
              aria-label='profile'
              size='small'
              className={classes.icon}
              onClick={() => history.push('/profile')}
            >
              <Person />
            </IconButton>
            <IconButton
              aria-label='logout'
              size='small'
              onClick={() => {
                authentication
                  .signOut()
                  .then(() => {
                    database.delete(`/sessions/${currentUser?.uid}`);
                  })
                  .catch(error => {
                    alert(error.message);
                  });
              }}
            >
              <ExitToApp />
            </IconButton>
          </div>
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
