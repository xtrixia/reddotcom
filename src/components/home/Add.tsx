/**
 * @file Add
 * @summary Handle add new Add
 */

import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  Grid,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  actions: {
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

type AddProps = {
  onCancel: () => void;
} & RouteComponentProps;

function Add({ onCancel }: AddProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h3>
        <i>New Thread</i>
      </h3>
      <TextField
        fullWidth
        multiline
        autoComplete='off'
        name='comments'
        id='comments'
        variant='outlined'
        type='text'
        style={{ padding: '1rem 2rem', maxWidth: 'calc(100% - 70px)' }}
      />
      <Grid className={classes.actions}>
        <Button aria-label='add' size='small' onClick={onCancel}>
          Batal
        </Button>
        <IconButton aria-label='add' size='small'>
          <Send />
        </IconButton>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(Add);
