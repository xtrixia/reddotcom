/**
 * @file Add
 * @summary Handle add new Add
 */

import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  Grid,
  Button,
  IconButton,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';

import { database } from '../../../configs/firebase';

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

  const [content, setContent] = useState<string>('');

  const createNewThread = async () => {
    const uid = `post-${Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36)}`;

    database.create(
      `/posts/${uid}`,
      {
        content: content,
        // TO DO: ambil from login
        accountId: 'acc-v8rjrmsu2vck8bu1xe5'
      },
      (error: any) => {
        if (error) {
          alert(error.message);
        } else {
          setContent('');
          onCancel()
        }
      }
    );
  };

  const handleSubmit = () => {
    createNewThread();
  };

  return (
    <React.Fragment>
      <h3>
        <i>New Thread</i>
      </h3>
      <TextField
        fullWidth
        multiline
        type='text'
        variant='outlined'
        autoComplete='off'
        aria-label='add new thread'
        style={{ padding: '1rem 2rem', maxWidth: 'calc(100% - 70px)' }}
        value={content}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setContent(event.target.value)
        }
      />

      <Grid className={classes.actions}>
        <Button aria-label='add' size='small' onClick={onCancel}>
          Batal
        </Button>
        <IconButton
          aria-label='add'
          size='small'
          type='submit'
          onClick={handleSubmit}
        >
          <Send />
        </IconButton>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(Add);
