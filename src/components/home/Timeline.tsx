/**
 * @file Timeline
 * @summary A reusable component act as cards of thread
 */

import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    margin: '1.5rem',
    cursor: 'pointer'
  }
}));

type TimelineProps = {} & RouteComponentProps;

function Timeline({ history }: TimelineProps) {
  const classes = useStyles();

  // TO DO: get data from db
  const DUMMY_DATA = [
    {
      id: 'post1',
      username: 'pew',
      title: 'BODY Weight',
      content: 'I hate the fact that I am fat FAT'
    },
    {
      id: 'post3',
      username: 'pauljasonklein',
      content:
        'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus orbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi.'
    }
  ];

  return (
    <React.Fragment>
      {DUMMY_DATA.length > 0 &&
        DUMMY_DATA.map((data: any, index: number) => (
          <Card
            key={index}
            raised
            className={classes.container}
            onClick={() => history.push(`/thread/${data.id}`)}
          >
            <CardContent>
              <h5>@{data.username}</h5>

              <p>{data.content}</p>
            </CardContent>
            <CardActions>
              <a>Comment</a>
            </CardActions>
          </Card>
        ))}
    </React.Fragment>
  );
}
export default withRouter(Timeline);
