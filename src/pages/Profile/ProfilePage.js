import React, { useState } from "react";
// <img src={logo} alt="logo" className={classes.logotypeImage} />
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";

import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import PersonIcon from '@material-ui/icons/Person';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
 headContainer: {
   margin: 20,
   backgroundColor: '#ecf0f1',
   align: 'center',
   justifyContent: 'center',
   padding: "20",
   display: 'flex',
   flexDirection: 'column',
   minWidth: 540,
 },

 mainInfoContainer: {
   margin: 20,
   backgroundColor: '#ecf0f1',
   align: 'center',
   justifyContent: 'center',
   padding: 20,

 },

 secondaryInfoContainer: {
   marginLeft: 60,
   marginRight: 60,
   marginBottom: 60,
   backgroundColor: 'white',
   align: 'center',
   justifyContent: 'center',
   padding: 20,
   display: 'flex',
   flexDirection: 'column',


 },

 pictureContainer: {
   margin: 20,
   float:'left',
   backgroundColor: 'white',
   align: 'center',
   justifyContent: 'center',
   padding: 20,
   display: 'flex',
   flexDirection: 'column',

 },

 avatar: {
   height: 180,
   width: 180
 },

 nameContainer: {
   margin: 20,
   marginLeft: 322,
   backgroundColor: '#ecf0f1',
   align: 'center',
   justifyContent: 'center',
   padding: 20

 },

 budgetContainers: {
   float:'left',
   justifyContent: 'space-between',
   padding: 10,
   display: 'flex',
   flexDirection: 'row',
   flex: 1

 },
 groupNamesContainer: {
   float:'right',
   marginRight: '0'
 },

}));

function ProfilePage(): React.MixedElement {
  const classes = useStyles();
  const theme = useTheme();
  const groups = ["CS! 407! buddies!","Guyz Gang Group","High School 2016","302 NChauncey Av"]
    return (
      <div>
        <div className={classes.headContainer}>
          <div className={classes.mainInfoContainer}>
            <div className={classes.pictureContainer}>
            <PersonIcon fontSize="large" className={classes.avatar}/>
              <Button variant="contained" align="center">
                EDIT
              </Button>
            </div>
            <div className={classes.nameContainer}>
              <Typography variant="h1" gutterBottom>

                JOHN DOE
              </Typography>
              <Typography variant="h4" gutterBottom>
                @john12Doe
              </Typography>
              <br/><br/>
              <Typography variant="body1" color = "red" gutterBottom>
                john_777@gmail.com
              </Typography>
              <Typography variant="body1" color="blue" gutterBottom>
                +1(765)777-7777
              </Typography>
            </div>
          </div>
          <div className={classes.secondaryInfoContainer}>
            <div className={classes.budgetContainers}>
              <Typography variant="body1" gutterBottom>
                Personal Budget
              </Typography>
              <Chip label="$1,000.00" align ="right" />
            </div>
            <div className={classes.budgetContainers}>
              <Typography variant="body1" gutterBottom>
                Total Spent
              </Typography>
              <Chip label="$430.30" align ="right" />
            </div>
            <div className={classes.budgetContainers}>
              <Typography variant="body1" gutterBottom>
                Remaining Balance
              </Typography>
              <Chip label="$569.70" align ="right" />
            </div>

            <br/>
            <div className={classes.budgetContainers}>
              <Typography variant="body1" gutterBottom>
                Groups I'm a part of
              </Typography>
              <div className={classes.groupNamesContainer}>

                {groups.map((group, index) => {
                  return (
                    <div key={index}>
                      <Chip label={group} />
                    </div>
                  );
                })}


              </div>
            </div>
          </div>
        </div>
      </div>
    );
}





export default ProfilePage;
