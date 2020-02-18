import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import IconButton from '@material-ui/core/IconButton';

import ExpensesIcon from '@material-ui/icons/AttachMoney';
import ChatIcon from '@material-ui/icons/Forum';
import CalendarIcon from '@material-ui/icons/Event';
import TasksIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles(theme => ({
    homePageContainer: {
      margin: 20,
      backgroundColor: '#ecf0f1',
      align: 'center',
      justifyContent: 'space-between',
      padding: "20",
      display: 'flex',
      flexDirection: 'row',
      minWidth: 540,
    },

    buttonContainer: {
      margin: 40,
      marginLeft: '5%',
      marginRight: '5%',
      flex:1,
      backgroundColor: 'white',
      align: 'center',
      justifyContent: 'center',
    },

    buttonImage: {
      align: 'center',
      justifyContent: 'center',
      height: '500',
      width:'500',

    }


}));

function HomePage(): React.MixedElement {
    const classes = useStyles();
    return (
      <>
      <div className={classes.homePageContainer}>
        <div className={classes.buttonContainer}>
          <IconButton  aria-label="Expenses" component="span" className={classes.buttonImage}>
            <ExpensesIcon />
          </IconButton>
        </div>
        <div className={classes.buttonContainer}>
          <IconButton  aria-label="Tasks" component="span" className={classes.buttonImage}>
            <TasksIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.homePageContainer}>
        <div className={classes.buttonContainer}>
          <IconButton aria-label="Calendar" component="span" className={classes.buttonImage}>
            <CalendarIcon />
          </IconButton>
        </div>
        <div className={classes.buttonContainer}>
          <IconButton aria-label="Chat Group" component="span" size="large" className={classes.buttonImage}>
            <ChatIcon />
          </IconButton>
        </div>
      </div>
      </>

    );
}
export default HomePage;
