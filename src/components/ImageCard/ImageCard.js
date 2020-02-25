import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Route, Switch } from "react-router-dom";

import { NavRight } from 'aws-amplify-react';
//pages
import Login from "../../pages/login/Login";

//images:
import exp from '../../images/expense.png'
import task from '../../images/task.png'
import chat from '../../images/chat.png'
import calendar from '../../images/calendar.png'
//icons from react
//import { FaDollarSign } from "react-icons/fa";


const useStyles = makeStyles({
  
  title: {
    text: props => props.text,
  },

  container: {
    justifyContent: 'space-evenly',
    

  },

  root: {
    background: 'linear-gradient(45deg, #c0d6b9 30%, #d6ebd7 90%)',
    border: 0,
    borderRadius: 5,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 300,
    width: 450,
    padding: '0 30px'
  
  
  },
  
  

});

const handlegotoExp = async () => {
  
};

export default function ImgMediaCard() {
  const classes = useStyles();
  const props = {}

return (
  <div>
  <Grid container className={classes.container}>
  <Grid item>
      <Card className={classes.root} align="right" onClick={handlegotoExp}> 
      <CardActionArea>
        <CardMedia
          component="img"
          alt="dollar sign"
          height="200"
          src ={exp}
          title="dollar sign"
        />
        <CardContent>
          <Typography variant="h2">
            Expenses
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
</Grid>
<Grid item> 
    <Card className={classes.root}> 
      <CardActionArea>
        <CardMedia
          component="img"
          alt="dollar sign"
          height="200"
          src ={task}
          title="dollar sign"
        />
        <CardContent>
          <Typography variant="h2">
            Tasks
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
</Grid>
</Grid>
<Grid container className={classes.container}>
  <Grid item>
      <Card className={classes.root}> 
      <CardActionArea>
        <CardMedia
          component="img"
          alt="dollar sign"
          height="200"
          src ={chat}
          title="dollar sign"
        />
        <CardContent>
          <Typography variant="h2">
            ChatRoom
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
</Grid>
<Grid item>  
    <Card className={classes.root} > 
      <CardActionArea>
        <CardMedia
          component="img"
          alt="dollar sign"
          height="200"
          src ={calendar}
          title="dollar sign"
        />
        <CardContent>
          <Typography variant="h2">
            Calendar
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
</Grid>
</Grid>
  </div>

 
  );
}
