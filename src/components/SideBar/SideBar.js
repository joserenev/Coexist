
// <img src={logo} alt="logo" className={classes.logotypeImage} />

import { withRouter } from "react-router-dom";


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

  //import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import Authentication from "../store/actions/Authentication"
import Chip from '@material-ui/core/Chip';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import FavIcon from '@material-ui/icons/StarBorder'


import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


import { Link } from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';

import React, {Component} from 'react';



import { withStyles } from '@material-ui/styles';
import "../../containers/Main.css";
import Group from "./Group";
//import NotificationTopics from "./NotificationTopics";





const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'center',
      },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  theUserId: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  typography: {
    flexGrow: 1,
        align: "center"
      }
}));


const MySubComponent = (props) => {
    const classes = useStyles(props);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    //console.log("Test getting my Name:", props);
    //console.log("Test muNmae string", props.toString())
    /*
    let chipsToRender = props.theTopics.map(t => {
            return(
              <Chip size="small" label={t} />
            )
          
      });
      */
    const handleDrawerOpen = () => {
      setOpen(true);
  
  
    };

    const discover = async () => {
      //await Authentication.logout();
      handleDrawerClose();
      window.location.replace('/discover');
    }

    /*
    const logout = async () => {
      await Authentication.logout();
      handleDrawerClose();
      window.location.replace('/');
    }
    */
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    const [selectedIndex, setSelectedIndex] = React.useState(1);
  

    let imageUrl = null;

    return (
      <div className={classes.root} className="drawer-nav">
        <CssBaseline />
        <ClickAwayListener onClickAway={handleDrawerClose}>
        <AppBar style={{ marginTop: 36,  position: 'absolute', backgroundColor : 'darkseagreen'  }}
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h1" align= 'center'  className={classes.typography}>
              Coexist
            </Typography>
          </Toolbar>
        </AppBar>
        </ClickAwayListener>
  
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
  
        >
          <div className={classes.SliderBarPersistent}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Grid container>
       <Grid item xs={12}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title="profle Pic"
          />
          <CardHeader
            disableTypography
            avatar={<Avatar alt="Profile Pic" src={props.profileImgURL} className={classes.avatar} />}
            title={<Typography type='title' className={classes.title}>{props.firstN} {props.lastN}</Typography>}
            subheader={<Typography type='caption'>@UserTag{props.userId}</Typography>}
          
          
           /> 

           <CardContent style={{display:'flex',justifyContent: 'space-around'}}>
            Content of the User
           </CardContent>
        </Card>
       </Grid>
       <Grid item xs={12}>
         
        </Grid>
      </Grid>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
          <ListItem
            button
            component={Link} to='/profile'
            //selected={selectedIndex === 2}
            //onClick={event => handleListItemClick(event, 2)}
            onClick={handleDrawerClose}
            
  
          >
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            //selected={selectedIndex === 3}
            //onClick={event => handleListItemClick(event, 3)}
            //onClick={logout}
            >
            <ListItemIcon>
              <FavIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
            
          </ListItem>

          <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Groups
          </Typography>
		  <Group>
			What goes here
		  </Group>
		  <Divider variant="inset" component="li" />
		  <Group>
			What goes here
		  </Group>
        </CardContent>
        </Card>

        <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Options
          </Typography>
          
        </CardContent>
        </Card>
          
        
        </List>
        
       
        </Drawer>
      </div>
    );
  }

class SideBar extends Component {
    

    // Constructor: TODO
    
    
    async componentDidMount() {
        
    }
    
    
    
    render(){


      return (
          < MySubComponent/>
      );
    }


}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired
};

/*
function MatchStateToProps(state) {
  return {
      user: state.user,
      isLoaded: state.isLoaded
  }
}
*/

//export default connect(MatchStateToProps, {getUserConnect, getLoaded})(RightDrawer)
export default (SideBar);