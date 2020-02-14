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

//icons from react
//import { FaDollarSign } from "react-icons/fa";

const useStyles = makeStyles({
  expense: {
    maxWidth: 400,
  },

  task: {
    maxWidth: 200,


  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (

 <Grid
  container sm={12}
 >

  <Grid item sm>
  <Card className={classes.expenses}> 
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image = ''
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Expenses
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid> 

  <Grid item sm>
  <Card className={classes.tasks}> 
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Task
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>  
 </Grid>

    
  );
}
