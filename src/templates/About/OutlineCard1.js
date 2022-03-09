import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import LiveHelpSharpIcon from '@material-ui/icons/LiveHelpSharp';
import HomeIcon from '@material-ui/icons/Home';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth:'95%',
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
    color:'rgba(48, 192, 43, 0.5)'
  },
  pos: {
    marginBottom: 32,
  },
});

const OutlinedCard1 = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <LiveHelpSharpIcon/>
        </Typography>
        <Typography variant="h5" component="h2">
          当サイトについて
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          This Web Site
        </Typography>
        <Typography variant="body2" component="p">
          使用技術
          <br />
          Javascript(React.js), Firebase, Python 
          <br/>
          material-ui, bootstrap, Inkscape
          ,_etc.
        </Typography>
      </CardContent>
      <br/>
      <br/>
      <br/>
      <br/>
      <CardActions>
        <Button size="small" onClick={() => dispatch(push('/contact'))}>
          <HomeIcon/>
          To Top Page !!
        </Button>
      </CardActions>
    </Card>
  );
}
export default OutlinedCard1;