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

import Avatar from "@material-ui/core/Avatar";
import GroupIcon from '@material-ui/icons/Group';
import GroupPicIcon from '@material-ui/icons/Wallpaper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
 container: {
   backgroundColor: '#ecf0f1',
   padding: 40,
   margin: 20,
   flexDirection: 'column',
   flex:1,
   display: "flex",
 },

 info: {
   flex:1,
   display: "flex",
   flexDirection: 'row',
   alignItems: "center",
   displayContent: "center"
 },

 input: {
   flex:1,
   display: "flex",
   flexDirection: 'row',
   alignItems: "center",
   justifyContent: "space-between"
 },

 mediumIcon: {
   marginRight: 20,
   height: 80,
   width: 80
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


}));

function CreateGroupSettings(): React.MixedElement {
  const classes = useStyles();
  const theme = useTheme();
    return (
      <div>
        <div className={classes.container}>
        <div className={classes.info}>
          <GroupIcon className={classes.mediumIcon}/>
          <Typography variant="h6" >
            <i> Groups are great for keeping payments in check and having all receipts in order. You can also plan
            events, assign tasks and have conversations with group members. </i>
          </Typography>
        </div>
        <div>
        <div className={classes.pictureContainer}>
        <GroupPicIcon fontSize="large" className={classes.avatar}/>
          <Button variant="contained" align="center">
            EDIT
          </Button>
        </div>
        <br/>
        <div className={classes.input}>
          <Typography variant="h6" >
            Group name
          </Typography>
          <form>
            <TextField label="Name" variant="outlined" />
          </form>
        </div>
        <br/>
        <div className={classes.input}>
          <Typography variant="h6" >
            Group description
          </Typography>
          <form >
            <TextField label="Description (Optional)" multiline rows="4" variant="outlined" />
          </form>
        </div>
        <br/>
        <div className={classes.input}>
          <Typography variant="h6" >
            Select Group type
          </Typography>
          <FormControl variant="outlined" >
          <InputLabel >
            Group type
          </InputLabel>
          <Select label="GroupType" native>
            <option value={1}>Housemates</option>
            <option value={2}>Work</option>
            <option value={3}>Social</option>
            <option value={4}>Other</option>
          </Select>
          </FormControl>
          </div>
        </div>
        </div>
      </div>
    );
}





export default CreateGroupSettings;
