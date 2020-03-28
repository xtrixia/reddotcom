/**
 * @file Register
 * @summary Handle register process
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
  }
}));

function Register() {
  const classes = useStyles();

  const handleSubmit = () => {
    alert('Daftar akun berhasil!');
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

        <button type='submit'>Daftar</button>

        <p>
          Sudah punya akun?{' '}
          <a href='/login' target='_self'>
            Masuk
          </a>{' '}
          dengan akun anda
        </p>
      </Grid>
    </form>
  );
}

export default Register;
