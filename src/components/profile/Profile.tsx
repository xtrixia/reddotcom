/**
 * @file Profile
 * @summary Handle user profile
 */

import React, { useEffect, useState, useContext } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Home from '../home';
import Navigations from '../home/Navigations';
import { AuthContext } from '../../context';

import { database } from '../../configs/firebase';
import { ProfileType } from './types';

const useStyles = makeStyles(() => ({
  fonts: {
    '@media all and (max-width: 540px)': {
      fontSize: '10px',
    },
  },
  shortcut: {
    padding: '0 0.5rem',
  },
}));

function Profile() {
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
      verified: detailProfile?.verified,
    });
  };

  useEffect(() => {
    getProfileById();
    // eslint-disable-next-line
  }, []);

  return (
    <Home>
      <>
        <Button size="small" style={{ marginTop: '2rem' }} disabled>
          Profile
        </Button>

        <Navigations />

        <h3>{profile.username}</h3>

        <p className={classes.fonts}>{profile.email}</p>

        <p className={classes.fonts}>
          {profile.verified ? 'Email sudah terverifikasi' : 'Email belum terverifikasi'}
        </p>
      </>
    </Home>
  );
}

export default Profile;
