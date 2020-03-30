/* eslint-disable no-alert */
// This is intentional because have no alternative way to throw error for now

/**
 * @file Detail
 * @summary Handle detail per thread
 */

import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';

import Home from '..';
import Navigations from '../Navigations';

import { database } from '../../../configs/firebase';
import { ThreadType } from './types';

type RouteParams = {
  id?: string;
};

type ThreadProps = {} & RouteComponentProps<RouteParams>;

function Thread({ match }: ThreadProps) {
  const INITIAL_DETAIL: ThreadType = {
    author: '',
    content: '',
  };

  /** State: current detail thread */
  const [detail, setDetail] = useState<ThreadType>(INITIAL_DETAIL);

  /** State: input comment value */
  const [comment, setComment] = useState<string>('');

  /** Get username by accountId from database */
  const getAuthorById = async () => {
    const post = await database.read(`/posts/${match.params.id}`).once('value');
    const author = await database
      .read(`/accounts/${post.val().accountId}`)
      .once('value');

    return author.val()?.username || '';
  };

  /* Get detail thread by ID from database */
  const getThreadById = async () => {
    const selectedThread = database.read(`/posts/${match.params.id}`);
    const author = await getAuthorById();

    selectedThread.on('value', (data) => {
      const currentThread = data.val();

      if (Object.keys(currentThread).length > 0) {
        const getComments = currentThread.comments
          ? Object.values(currentThread.comments).map(
            (threadComment: any) => threadComment.value,
          )
          : [];

        setDetail({
          author: author.length === 0 ? 'anonymous' : author,
          comments: getComments,
          content: currentThread?.content,
        });
      }
    });
  };


  /* Unsubscribe database */
  const unsubscribeDatabase = () => {
    const selectedThread = database.read(`/posts/${match.params.id}`);
    selectedThread.off();
  };

  useEffect(() => {
    getThreadById();
    getAuthorById();

    return () => {
      unsubscribeDatabase();
    };
    // eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    const uid = `comm-${Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36)}`;

    database.create(
      `/posts/${match.params.id}/comments/${uid}`,
      {
        value: comment,
      },
      (error: any) => {
        if (error) {
          alert(error.message);
        } else {
          setComment('');
        }
      },
    );
  };

  return (
    <Home>
      <>
        <Button size="small" style={{ marginTop: '2rem' }} disabled>
          A Thread
        </Button>

        <Navigations />

        <p>
          @
          {detail.author}
        </p>

        <p style={{ padding: '0  1rem 1rem' }}>{detail.content}</p>

        <hr style={{ margin: '0 2rem' }} />
        <h5>Komentar</h5>

        <TextField
          fullWidth
          multiline
          type="text"
          variant="outlined"
          autoComplete="off"
          aria-label="add new comment"
          style={{ padding: '1rem 2rem', maxWidth: 'calc(100% - 70px)' }}
          value={comment}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setComment(event.target.value)}
        />

        <IconButton
          aria-label="add-comment"
          size="small"
          onClick={handleSubmit}
        >
          <Send />
        </IconButton>

        {detail?.comments
          && detail.comments.map((threadComment: string) => (
            <Card key={threadComment} style={{ margin: '1rem' }}>
              <CardContent>
                <p>{threadComment}</p>
              </CardContent>
            </Card>
          ))}
      </>
    </Home>
  );
}

export default withRouter(Thread);
