/**
 * @file Login
 * @summary Handle login process
 */

import React, { useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    justifyItems: 'center',
    gridGap: '1rem',
    padding: '5rem 5rem 0'
  },
  divider: {
    border: 'solid 1px #b5b5b5',
    width: '5rem'
  }
}));

function Login() {
  const classes = useStyles();

  const handleSubmit = () => {
    alert('Berhasil masuk!');
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete='off'>
      <Grid item className={classes.container}>
        <TextField
          id='outlined-basic'
          label='Email'
          variant='outlined'
          type='email'
        />
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          type='password'
        />

        <button type='submit'>Masuk</button>

        <p>
          Belum memiliki akun? Klik{' '}
          <a href='/register' target='_self'>
            disini
          </a>{' '}
          untuk daftar akun
        </p>
      </Grid>
    </form>
  );
}

export default Login;
