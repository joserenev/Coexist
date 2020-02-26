import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';

//images/icons
import PersonIcon from "@material-ui/icons/Person";
import { Link, useHistory } from "react-router-dom";

const StyledBadge = withStyles(theme => ({
	  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);


  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  
  export default function User() {
    const classes = useStyles();
  
  return (
    <div>
    
    <div className={classes.root}>
    <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src={<PersonIcon/>} />
      </StyledBadge>
    <div>
<Typography variant="h4" color="inherit">
Name
</Typography>
<Typography variant="h6" color="inherit">
Username
</Typography>
</div>
  

  </div>
  </div>
   
    );
  }
 