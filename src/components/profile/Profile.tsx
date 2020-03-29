/**
 * @file Profile
 * @summary Handle user profile
 */

import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { database } from '../../configs/firebase';
import { AuthContext } from '../../context';
import Home from '../home';

import { ProfileType } from './types';

const useStyles = makeStyles(() => ({
  fonts: {
    '@media all and (max-width: 540px)': {
      fontSize: '10px',
    },
  },
}));

interface RouteParams {
  id?: string;
}

type ProfileProps = {} & RouteComponentProps<RouteParams>;

function Profile({ history }: ProfileProps) {
  const classes = useStyles();

  const currentUser = useContext(AuthContext);

  const INITIAL_PROFILE: ProfileType = {
    email: '',
    username: '',
  };

  const [profile, setProfile] = useState<ProfileType>(INITIAL_PROFILE);

  const getProfileById = async () => {
    const getProfile = await database
      .read(`/accounts/${currentUser?.uid}`)
      .once('value');
    const detailProfile = getProfile.val();

    setProfile({
      email: detailProfile?.email,
      username: detailProfile?.username,
    });
  };

  useEffect(() => {
    getProfileById();
    // eslint-disable-next-line
  }, []);

  return (
    <Home>
      <>
        <Button
          size="small"
          style={{ marginTop: '2rem', marginBottom: '2rem' }}
          onClick={() => history.push('/')}
        >
          Beranda
        </Button>

        <h3>{profile.username}</h3>

        <p className={classes.fonts}>{profile.email}</p>
      </>
    </Home>
  );
}

export default withRouter(Profile);
