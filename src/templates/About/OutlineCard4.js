import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import FunctionsSharpIcon from '@material-ui/icons/FunctionsSharp';
import UnfoldMoreSharpIcon from '@material-ui/icons/UnfoldMoreSharp';

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
    color:'rgba(121, 184, 39, 0.5)'
  },
  pos: {
    marginBottom: 32,
  },
});

const OutlinedCard4 = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <FunctionsSharpIcon/>
        </Typography>
        <Typography variant="h5" component="h2">
          機能
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Features
        </Typography>
        <Typography variant="body2" component="p" style={{textAlign:'left', marginLeft:'2vw'}}>
            ・プログラミング言語、アーカイブ _etc.の絞り込み機能
            <br/>
            ・問い合わせページ
        </Typography>
      </CardContent>
    </Card>
  );
}
export default OutlinedCard4;