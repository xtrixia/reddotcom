/**
 * @file Timeline
 * @summary A reusable component act as cards of thread
 */

import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Card, CardContent } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Home from '.';
import { database } from '../../configs/firebase';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: '1.5rem',
    cursor: 'pointer'
  },
  content: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px'
    }
  }
}));

type TimelineProps = {} & RouteComponentProps;

function Timeline({ history }: TimelineProps) {
  const classes = useStyles();

  /** State: all current threads */
  const [threads, setThreads] = useState<Array<{ [key: string]: any }>>([]);

  /* Get all thread from database */
  const readDatabase = () => {
    const currentThread = database.read('/posts/');

    currentThread.on('value', (data: any) => {
      const list = data.val() || {};

      if (Object.keys(list).length > 0) {
        const getDataKeys = Object.keys(data.val()).map((key: string) => {
          return {
            id: key,
            ...list[key]
          };
        });
        setThreads(getDataKeys);
      }
    });
  };

  /* Unsubscribe database */
  const unsubscribeDatabase = () => {
    const currentThread = database.read('/posts/');
    currentThread.off();
  };

  useEffect(() => {
    readDatabase();

    return () => {
      unsubscribeDatabase();
    };
  }, []);

  return (
    <Home>
      <React.Fragment>
        <Button size='small' style={{ marginTop: '2rem' }} disabled>
          Beranda
        </Button>

        {threads.length > 0 ? (
          threads.map((data: any, index: number) => (
            <Card
              key={index}
              raised
              className={classes.container}
              onClick={() => history.push(`/thread/${data.id}`)}
            >
              <CardContent className={classes.content}>
                <p>
                  {data.content}
                  <br />
                  <br />
                  Klik untuk melihat <i>thread</i>
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>
            Tidak ada <i>thread</i> saat ini
          </p>
        )}
      </React.Fragment>
    </Home>
  );
}
export default withRouter(Timeline);
