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
//import classnames from "classnames";

// styles
//import useStyles from "./styles";

// logo
//import logo from "./logo.svg";
//import google from "../../images/google.svg";

// context
/*
TODO:
    import { useUserDispatch, loginUser } from "../../context/UserContext";

*/

/**
 * 

function HomePage(props) {
   // var classes = useStyles();
  
    // global
    //var userDispatch = useUserDispatch();
    var userDispatch = true;
  
  
    return (
      <header>
        <div style={{height: '300px', position: 'relative'}}>
    <Layout fixedHeader fixedDrawer>
        <Header title="Homepage">
            <Textfield
                value=""
                onChange={() => {}}
                label="Search"
                expandable
                expandableIcon="search"
            />
        </Header>
        <Drawer title="HomePage">
            <Navigation>
                <a href="#">Group1</a>
                <a href="#">Group2</a>
                <a href="#">Group3</a>
                <a href="#">+ Group</a>

            </Navigation>
        </Drawer>
        <Content />
    </Layout>
</div>
          </header>
    );
  }
  
  export default withRouter(HomePage);

  */




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
      <div >
          
          <SideBar/>
  
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
