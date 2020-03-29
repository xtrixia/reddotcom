/**
 * @file Login
 * @summary Handle login process
 */

import React, { useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import {
  database,
  authentication,
  googleProvider,
  twitterProvider,
  AuthProviderType
} from '../../configs/firebase';
import { AuthContext } from '../../context';

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    justifyItems: 'center',
    gridGap: '1rem',
    padding: '5rem 4rem 0'
  },
  wrapper: {
    borderRadius: '15px',
    border: 'solid 1px #b5b5b5',
    padding: '2rem',
    textAlign: 'center'
  },
  buttonGoogle: {
    margin: '0.5rem',
    '&:hover': {
      background: '#E94235'
    }
  },
  buttonTwitter: {
    margin: '0.5rem',
    '&:hover': {
      background: '#1B91DA'
    }
  }
}));
type LoginProps = {} & RouteComponentProps;

function Login({ history }: LoginProps) {
  const classes = useStyles();

  const currentUser = useContext(AuthContext);

  const handleLogin = (provider: AuthProviderType) => {
    authentication
      .signInWithPopup(provider)
      .then(async data => {
        // check accounts in database
        let accounts = await database.read(`/accounts/`).once('value');
        accounts = accounts.val();

        // generate custom uid if `data.user.uid` is null
        const uid: string =
          data.user?.uid ||
          `acc-${Math.random()
            .toString(36)
            .substring(2) + Date.now().toString(36)}`;

        // create new session
        await database.create(
          `/sessions/${data.user?.uid}`,
          {
            username: data.user?.displayName
          },
          (error: any) => {
            if (error) {
              alert(error.message);
            }
          }
        );

        // add current user if not in database yet
        if (accounts === null || Object.keys(accounts).indexOf(uid) === -1) {
          await database.create(
            `/accounts/${uid}`,
            {
              username: data.user?.displayName,
              email: data.user?.email,
              verified: data.user?.emailVerified,
              photoURL: data.user?.photoURL
            },
            (error: any) => {
              if (error) {
                alert(error.message);
              }
            }
          );
        }

        history.push('/');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return !currentUser ? (
    <Grid item xs={12} className={classes.container}>
      <h3>Reddot[com]</h3>

      <div className={classes.wrapper}>
        <p>Masuk menggunakan sosial media</p>

        <Button
          className={classes.buttonGoogle}
          onClick={() => handleLogin(googleProvider)}
        >
          Google
        </Button>
        <Button
          className={classes.buttonTwitter}
          onClick={() => handleLogin(twitterProvider)}
        >
          Twitter
        </Button>
      </div>
    </Grid>
  ) : (
    <Redirect to='/' />
  );
}

export default Login;
