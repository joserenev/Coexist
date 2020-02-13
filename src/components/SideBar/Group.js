import { withRouter } from "react-router-dom";
import clsx from 'clsx';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { borderRadius } from '@material-ui/system';

import { Link } from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatar: {
	  borderRadius: "5px",
  }
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
	  <ListItem alignItems="flex-start">
		<ListItemAvatar>
		  <Avatar variant="rounded" alt="Group Avatar" src="/static/images/avatar/1.jpg" />
		</ListItemAvatar>
		<ListItemText
		  primary="Roommate Group"
		  secondary={
			<React.Fragment>
			  <Typography
				component="span"
				variant="body2"
				className={classes.inline}
				color="textPrimary"
			  >
				Last sender name: 
			  </Typography>
			  {"Someone needs to vacuum"}
			</React.Fragment>
		  }
		/>
	  </ListItem>
  );
}
