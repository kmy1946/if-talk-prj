import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth:'90%',
    height:'100%',
    margin:'0 auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 32,
  },
});

const OutlinedCard3 = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          About
        </Typography>
        <Typography variant="h5" component="h2">
          やってる事
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          What's doing?
        </Typography>
        <Typography variant="body2" component="p">
          Web系のプログラミングに関する事を掲載していきます。
          <br />
          {'　'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => dispatch(push('/'))}>To Home</Button>
      </CardActions>
    </Card>
  );
}
export default OutlinedCard3;