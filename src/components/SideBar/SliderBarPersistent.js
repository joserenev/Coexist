import React from 'react';
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
import './Main.css';
import S3AvatarInterface from '../S3AvatarInterface';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import FavIcon from '@material-ui/icons/StarBorder'

import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { Link } from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';




const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'sticky',
    padding: theme.spacing(3, 2),
    
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
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
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
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
  }
}));


const emails = ['username@gmail.com', 'user02@gmail.com'];




export default async function SliderBarPersistent(userId) {
  const classes = useStyles(userId);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const url = await S3AvatarInterface.get(userID);
  console.log(url);
  var obj = {
    name: userId
  };
  

  console.log("Test getting my Name:", obj.name);
  console.log("Test muNmae string", obj.name.toString())
  
  


  const handleDrawerOpen = () => {
    setOpen(true);


  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
 
  console.log("Using this class for drawer nav: ", classes.root);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <ClickAwayListener onClickAway={handleDrawerClose}>
      <AppBar style={{ marginTop: 42,  position: 'fixed', }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" align= 'center' noWrap className={classes.title}>
            Twistter
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
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
          image="images/but-first-lets-code-1.png"
          title="profle Pic"
        />
        <CardHeader
          disableTypography
          //avatar={<Avatar alt="Profile Pic" src="images/profileimage.jpg" className={classes.avatar} />}
          avatar={<Avatar alt="Profile Pic" src={url} className={classes.avatar} />}
          title={<Typography type='title' className={classes.title}>Name LastName</Typography>}
          subheader={<Typography type='caption' makeStyles={classes.subtitle}>@userId</Typography>}
        
        
         /> 
         <div>
           <h1>@tryTwo</h1>
           </div>
         <CardContent style={{display:'flex',justifyContent: 'space-around'}}>
           <div style={{display:'flex',flexDirection:'column'}}><p style={{margin:0}}><b>Tweets</b></p><p style={{margin:0}}>0</p></div>
           <div style={{display:'flex',flexDirection:'column'}}><p style={{margin:0}}><b>Following</b></p><p style={{margin:0}}>0</p></div>
           <div style={{display:'flex',flexDirection:'column'}}><p style={{margin:0}}><b>Followers</b></p><p style={{margin:0}}>0</p></div>
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
          component={Link} to='/signin'
          onClick={handleDrawerClose}
        >
          <ListItemIcon>
            <FavIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
          
        </ListItem>
      </List>
     
      </Drawer>
    </div>
  );
}

function MatchStateToProps(state) {
  return {
      user: state.user
  }
}
