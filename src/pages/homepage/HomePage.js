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


import SideBar from "../../components/SideBar/SideBar";
import ImageCard from "../../components/ImageCard/ImageCard.js";

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
        <div>
          <SideBar/>
          <div/>
        <div>
          <ImageCard/>
        </div>
      </div>

  )
  }
}

function MatchStateToProps(state) {
  return {
      user: state.user,
      isLoaded: state.isLoaded
  }
}

//export default connect(MatchStateToProps, {getUserConnect, getLoaded})(Homepage)
export default withRouter(HomePage)
