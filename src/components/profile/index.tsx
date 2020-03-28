/**
 * @file Profile
 * @summary Handle user profile
 */

import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  fonts: {
    '@media all and (max-width: 540px)': {
      fontSize: '10px'
    }
  }
}));

interface RouteParams {
  id?: string;
}

type ProfileProps = {} & RouteComponentProps<RouteParams>;

function Profile({ history, match }: ProfileProps) {
  const classes = useStyles();
console.log(match)
  if (match.params.id) {
    // TO DO: get data from db by selected accountId
  }

  // TO DO: get data from db by current accountId
  const userProfile = {
    name: 'Annisa Feryannie',
    username: 'pew',
    email: 'aferyannie@gmail.com'
  };

  return (
    <React.Fragment>
      <Button
        size='small'
        style={{ marginTop: '2rem', marginBottom: '0.15rem' }}
        onClick={() => history.push('/')}
      >
        Beranda
      </Button>

      <h3>@{userProfile.username}</h3>

      <p className={classes.fonts}>{userProfile.name}</p>
      <p className={classes.fonts}>{userProfile.email}</p>
    </React.Fragment>
  );
}

export default withRouter(Profile);
