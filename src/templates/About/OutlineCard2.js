import React from 'react';
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

const OutlinedCard2 = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          About
        </Typography>
        <Typography variant="h5" component="h2">
          管理人について
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          The Manager
        </Typography>
        <Typography variant="body2" component="p">
          普通の大学生です。
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">　</Button>
      </CardActions>
    </Card>
  );
}
export default OutlinedCard2;