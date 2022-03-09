import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import PersonPinSharpIcon from '@material-ui/icons/PersonPinSharp';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import MailOutlineSharpIcon from '@material-ui/icons/MailOutlineSharp';

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
    color:'#2a8de9'
  },
  pos: {
    marginBottom: 32,
  },
});

const OutlinedCard2 = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          <PersonPinSharpIcon/>
        </Typography>
        <Typography variant="h5" component="h2">
          管理人について
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Manager
        </Typography>
        <Typography variant="body2" component="p">
          普通の大学生です。
          <br/>
        </Typography>
        <Typography variant="body2" component="p" style={{textAlign:'center'}}>
          <br/>
            できる事：          
        </Typography>
        <Typography style={{textAlign:'left', marginLeft:'2vw'}}>
          ・言語：Python, Javascript, Typescript(勉強中)
          <br/>
          ・フレームワーク：Django, Flask, React.js, Next.js(勉強中)
          <br/>
          ・ソフトウェア：Inkscape
          <br/>
          ・その他：material-ui, bootstrap, HTML, CSS
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => dispatch(push('/contact'))}>
          <MailOutlineSharpIcon/>
          Contact
        </Button>
      </CardActions>
    </Card>
  );
}
export default OutlinedCard2;