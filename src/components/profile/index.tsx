/**
 * @file Profile
 * @summary Handle user profile
 */

import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { database } from '../../configs/firebase';

import { ProfileType } from './types';

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

  // TO DO: ambil from login
  const accountId = 'acc-v8rjrmsu2vck8bu1xe5';

  const INITIAL_PROFILE: ProfileType = {
    email: '',
    username: ''
  };

  const [profile, setProfile] = useState<ProfileType>(INITIAL_PROFILE);

  const getProfileById = async () => {
    const getProfile = await database
      .read(`/accounts/${accountId}`)
      .once('value');
    const detailProfile = getProfile.val();

    setProfile({
      name: detailProfile?.name || '',
      email: detailProfile?.email,
      username: detailProfile?.username,
      password: detailProfile?.password || ''
    });
  };

  useEffect(() => {
    getProfileById();
  }, []);

  return (
    <React.Fragment>
      <Button
        size='small'
        style={{ marginTop: '2rem', marginBottom: '0.15rem' }}
        onClick={() => history.push('/')}
      >
        Beranda
      </Button>

      <h3>@{profile.username}</h3>

      <p className={classes.fonts}>{profile.name}</p>
      <p className={classes.fonts}>{profile.email}</p>
    </React.Fragment>
  );
}

export default withRouter(Profile);
