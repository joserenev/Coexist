import React, { useState } from "react";
<<<<<<< HEAD
// <img src={logo} alt="logo" className={classes.logotypeImage} />
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
//import ImCard from "../../components/Card/ImCard.js/index.js";
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/SideBar/SideBar";
import ImageCard from "../../components/ImageCard/ImageCard.js";
//card images
import exp from '../../images/expense.png';
import chat from '../../images/chat.png';
import task from '../../images/task.png';
import calendar from '../../images/calendar.png';

class HomePage extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
          username: '',
          uID: '',
          loaded: false
          // following
      }

      //if(!this.props.isLoaded) {
      //    window.location.replace('/splash');
      //}
  }


  componentDidMount() {

  }

  render() {

    return (
    <div>
        
        <div className= 'drawer'>
          <SideBar/>
        </div>
      <div align="right">
        <ImageCard/>
      </div>
      
       
    </div>
 

  )
  }
=======

import { makeStyles } from "@material-ui/core/styles";

import SideBar from "../../components/SideBar/SideBar";

const useStyles = makeStyles(theme => ({
    homePage: {
        backgroundColor: "#c8dbfa",
        fontSize: "32vh",
        height: "100%",
        position: "absolute",
        width: "100%"
    }
}));

function HomePage(): React.MixedElement {
    const classes = useStyles();
    return <div className={classes.homePage}>Hello World!</div>;
>>>>>>> 3bd621f0bc70125c38e83ef87b59c7947afd7e2f
}
//export default connect(MatchStateToProps, {getUserConnect, getLoaded})(Homepage)
export default HomePage;
