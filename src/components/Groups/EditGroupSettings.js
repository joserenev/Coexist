import { withRouter } from "react-router-dom";
import clsx from 'clsx';


import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Link } from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import './popup.css';
import User from '../User/User';

const useStyles = makeStyles(theme => ({  
    groupStats: {
      width: 18,
    },

    buttonContainer: {
      margin: 40,
      flex:1,
      backgroundColor: 'white',
      justifyContent: 'center',
      display: "flex",
      alignItems: "center"
    },

    buttonImage: {
      align: 'center',
      justifyContent: 'center'
    },

     largeIcons: {
       height: 240,
       width: 240
     },
	

}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const uploadPicture = () => {
	  document.getElementById("imageUploadHidden").click();
  };
  
  const changeBudget = () => {
	  document.getElementsByClassName("budgetInput")[0].style.visibility = "visible";
  }
  
  const cancelBudget = () => {
	  document.getElementsByClassName("budgetInput")[0].style.visibility = "hidden";
  }
  
  const updateBudget = () => {
	  document.getElementsByClassName("budgetInput")[0].style.visibility = "hidden";
	  let budgetAmount = document.getElementsByClassName("budget-input")[0].value;
	  if (parseFloat(budgetAmount) != undefined)
	  {
		  let budgetNum = parseFloat(budgetAmount);
		  if (budgetNum >= 0 && budgetNum < 1000000)
		  {
			  document.getElementsByClassName("budget-text")[0].innerHTML = "$" + Math.floor(budgetNum).toLocaleString() + ".00";
		  }
	  }
  }
  
  const addNewMember = () => {
	  window.prompt("Type the username or email of the user you would like to add to the group");
  }
  
  return (
    <div>
      <button type="button" class="settings-button btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Settings</button>
	  <div class="modal fade" id="myModal" role="dialog" tabindex="-1">
		<div class="modal-dialog modal-lg">
		  <div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title text-center w-100" id="exampleModalLabel"><b>Settings for </b><b id="groupNameEdit">'Group Name'</b></h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<img onClick={uploadPicture} src="https://www.sideshow.com/storage/product-images/903766/thanos_marvel_square.jpg" class="group-img img-center" id="imageUpload"></img>
			
			<br/>
			<div class="input-group mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text" id="inputGroup-sizing-sm">Group Name</span>
				</div>
				<input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Name your group" value="Group Name"/>
			</div>
			<div class="input-group mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text">Description</span>
				</div>
				<textarea class="form-control" aria-label="With textarea"></textarea>
			</div>
			
			<br/>
			<h5>Members</h5>
			<div class="member-list">
				<User/>
				<User/>
			</div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Add new user
			</Button>
			
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add a User</DialogTitle>
				<DialogContent>
				  <DialogContentText>
					To add a user to the group, please enter their email or username 
					here.
				  </DialogContentText>
				  <TextField
					autoFocus
					margin="dense"
					id="name"
					label="Email or Username"
					type="email"
					fullWidth
				  />
				</DialogContent>
				<DialogActions>
				  <Button onClick={handleClose} color="primary">
					Cancel
				  </Button>
				  <Button onClick={handleClose} color="primary">
					Add
				  </Button>
				</DialogActions>
			  </Dialog>
			
			
			<br/>
			<h5>Statistics</h5>
			
			<div class="card groupStats">
			  <ul class="list-group list-group-flush">
				<li class="list-group-item">Money spent: <span class="money-text">$1,000.00</span></li>
				<li class="list-group-item">
					Budget: <span class="money-text budget-text" onClick={changeBudget}>$800</span>
					<div class="input-group mb-3 budgetInput">
					  <div class="input-group-prepend">
						<span class="input-group-text">$</span>
					  </div>
					  <input type="number" class="form-control budget-input" aria-label="Amount (to the nearest dollar)"/>
					  <div class="input-group-append">
						<span class="input-group-text accept-button" onClick={updateBudget}>✓</span>
					  </div>
					  <div class="input-group-append">
						<span class="input-group-text close-button" onClick={cancelBudget}>X</span>
					  </div>
					</div>
				</li>
			  </ul>
			</div>

			
			<input type="file" class="custom-file-input unanchored" accept="image/*" id="imageUploadHidden" />

			</div>
			<div class="modal-footer">
			  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  <button type="button" class="btn btn-default text-center w-100" data-dismiss="modal">Save</button>
			  </div>
		  </div>
		</div>
	  </div>
    </div>
  );
}