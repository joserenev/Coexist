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
  
  return (
    <div>
      <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Settings</button>
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
			<div class="input-group input-group-sm mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text" id="inputGroup-sizing-sm">Group Name</span>
				</div>
				<input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Name your group" value="Current Group Name"/>
			</div>
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">Description</span>
				</div>
				<textarea class="form-control" aria-label="With textarea"></textarea>
			</div>
			
			<br/>
			<h5>Members</h5>
			<div class="member-list">
				
			</div>
			
			
			<br/>
			<h5>Statistics</h5>
			
			<div class="card groupStats">
			  <ul class="list-group list-group-flush">
				<li class="list-group-item">Money spent: <span class="money-text">$1,000</span></li>
				<li class="list-group-item">Budget: <span class="money-text">$800</span></li>
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