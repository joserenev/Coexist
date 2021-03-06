import { withRouter } from "react-router-dom";
import clsx from "clsx";

import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SettingsIcon from "@material-ui/icons/Settings";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { getGroup } from "../../customGraphql/queries";
import LoadingPage from "../../pages/Loading/LoadingPage";

import { Link } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import "./popup.css";
import User from "../User/User";
import { getUserByUserName } from "../../api/Api";

import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';

const useStyles = makeStyles(theme => ({
    groupStats: {
        flex: 0.25
    },

    infoContainers: {
        margin: 40,
        backgroundColor: "white",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        width: "100%"
    }
}));

type Props = {|
    groupData: Object
|};

const pubnub = new PubNub({
  publishKey: "pub-c-fcfbbd7d-d4d4-4dc2-9979-2339f3202a81",
  subscribeKey: "sub-c-7df07fca-72de-11ea-88bf-72bc4223cbd9",
  uuid: "12445"
});
var channels = []; ////change to group id

export default function EditGroupSettings({ groupData }: Props) {
    console.log(groupData);
    const [open, setOpen] = useState(false);
	
	var userDataJSON = window.localStorage.getItem("CoexistUserData") || "{}";
	var userData = JSON.parse(userDataJSON);  

    const [groupName, setGroupName] = useState(groupData?.name ?? "");
    const [groupDescription, setGroupDescription] = useState(
        groupData?.description ?? ""
    );

    const groupItems = groupData?.users?.items ?? [];
    const [groupMembers, setGroupMembers] = useState(
        groupItems.map(groupItem => {
            return groupItem.user;
        })
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const uploadPicture = () => {
        //document.getElementById("imageUploadHidden").click();
        const imageLink = prompt(
            "Enter the link of the image you want to use."
        );
        if (imageLink == undefined || imageLink.length < 1) {
            return;
        }
        document.getElementById("imageUpload").setAttribute("src", imageLink);
    };

    const changeBudget = () => {
        document.getElementsByClassName("budgetInput")[0].style.display =
            "flex";
    };

    const cancelBudget = () => {
        document.getElementsByClassName("budgetInput")[0].style.display =
            "none";
    };

    const updateBudget = () => {
        document.getElementsByClassName("budgetInput")[0].style.visibility =
            "hidden";
        let budgetAmount = document.getElementsByClassName("budget-input")[0]
            .value;
        if (parseFloat(budgetAmount) != undefined) {
            let budgetNum = parseFloat(budgetAmount);
            if (budgetNum >= 0 && budgetNum < 1000000) {
                document.getElementsByClassName("budget-text")[0].innerHTML =
                    "$" + Math.floor(budgetNum).toLocaleString() + ".00";
            }
        }
    };

    const addGroupMember = newMember => {
        const memberAlreadyExists = groupMembers.some(member => {
            return newMember.id === member.id;
        });
        if (memberAlreadyExists) {
            return;
        }
		var json = {};
		json.message = userData.username + " added you to: '" + groupName + "'.";
		  json.timeSent = new Date().getTime();
		  json.uniqueId = Math.random();
		  json.notificationClass = "NewGroup";
		  json.sender = userData.username;
		  json.groupId = groupName;
		  
		pubnub.publish(
		  {
			channel: newMember.id,
			message: json,
		  },
		  () => setMessage('')
		);
        setGroupMembers(oldMembers => {
            const newMembers = oldMembers;
            newMembers.push(newMember);
            return newMembers;
        });
    };

    const addNewMember = async () => {
        const enteredName = window.prompt(
            "Type the username or email of the user you would like to add to the group"
        );
        if (enteredName.trim() === "") {
            return;
        }
        await getUserByUserName(enteredName)
            .then(response => {
                const { data = {} } = response ?? {};
                const { items = [] } = data?.listUsers ?? {};
                if (items.length === 0) {
                    alert("The user was not found");
                    return;
                }
                addGroupMember(items[0]);
            })
            .catch(err => {
                console.error(
                    "an error occured while fetchins user by username"
                );
            });
    };

    const saveGroupSettings = () => {
        let groupName = document.getElementById("group-name-input").value;
        let groupDescription = document.getElementById(
            "group-description-input"
        ).value;
        let groupBudget = document.getElementById("group-budget").innerHTML;
        let groupImage = document.getElementById("imageUpload").src;

        alert(
            "Group name: " +
                groupName +
                "\nDescription: " +
                groupDescription +
                "\nBudget: " +
                groupBudget +
                "\nImage Link: " +
                groupImage
        );
        ////Send to database
    };

    const leaveGroup = () => {
        const isLeaving = window.confirm(
            "Are you sure you want to leave this group?"
        );
        if (isLeaving === true) {
            //user leaves group, take them off page and remove from group in database
        }
    };

    console.log({ groupMembers });
    return (
        <div>
            <SettingsIcon
                data-toggle="modal"
                data-target="#myModal"
                height="30px"
                class="btn float-right shadow-none"
            />
            <div class="modal fade" id="myModal" tabIndex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5
                                class="modal-title text-center w-100"
                                id="exampleModalLabel"
                            >
                                <b>Settings for </b>
                                <b id="groupNameEdit">'{groupData.name}'</b>
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex bd-highlight">
                                <div class="p-2 bd-highlight">
                                    <img
                                        onClick={uploadPicture}
                                        src="https://www.sideshow.com/storage/product-images/903766/thanos_marvel_square.jpg"
                                        class="img-center"
                                        height="160px"
                                        id="imageUpload"
                                    ></img>
                                </div>
                                <div class="p-2 bd-highlight flex-grow-1">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span
                                                class="input-group-text"
                                                id="inputGroup-sizing-sm"
                                            >
                                                Group Name
                                            </span>
                                        </div>
                                        <input
                                            id="group-name-input"
                                            type="text"
                                            class="form-control"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={groupName}
                                        />
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                Description
                                            </span>
                                        </div>
                                        <textarea
                                            id="group-description-input"
                                            class="form-control"
                                            aria-label="With textarea"
                                            defaultValue={groupDescription}
                                        ></textarea>
                                    </div>
                                    <div>
                                        Owner: {groupData?.owner?.name ?? ""}
                                    </div>
                                    <div>
                                        Group type: {groupData?.type ?? ""}
                                    </div>
                                    <div>
                                        Created at: {groupData?.createdAt ?? ""}
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex flex-row bd-highlight justify-content-around">
                                <div class="p-2 bd-highlight">
                                    <h5>
                                        <b>Members</b>
                                    </h5>
                                    <div class="member-list">
                                        {groupMembers.map((user, index) => {
                                            return (
                                                <div key={index}>
                                                    <User
                                                        OnlineType="OfflineBadge"
                                                        user={user}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <br />
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={addNewMember}
                                    >
                                        Add new user
                                    </Button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="form-dialog-title"
                                    >
                                        <DialogTitle id="form-dialog-title">
                                            Add a User
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                To add a user to the group,
                                                please enter their email or
                                                username here.
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
                                            <Button
                                                onClick={handleClose}
                                                color="primary"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleClose}
                                                color="primary"
                                            >
                                                Add
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <div class="p-2 bd-highlight">
                                    <h5>
                                        <b>Statistics</b>
                                    </h5>

                                    <div class="card groupStats">
                                        <li class="list-group-item">
                                            Money spent:{" "}
                                            <span class="money-text" editable>
                                                $1,000.00
                                            </span>
                                        </li>
                                        <li class="list-group-item">
                                            Budget:{" "}
                                            <span
                                                class="money-text budget-text"
                                                onClick={changeBudget}
                                                id="group-budget"
												editable="true"
                                            >
                                                $809
                                            </span>
                                            <div class="input-group mb-3 budgetInput">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        $
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    class="form-control budget-input"
                                                    aria-label="Amount (to the nearest dollar)"
                                                />
                                                <div class="input-group-append">
                                                    <span
                                                        class="input-group-text accept-button"
                                                        onClick={updateBudget}
                                                    >
                                                        ✓
                                                    </span>
                                                </div>
                                                <div class="input-group-append">
                                                    <span
                                                        class="input-group-text close-button"
                                                        onClick={cancelBudget}
                                                    >
                                                        X
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <button
                                type="button"
                                class="btn btn-default"
                                onClick={leaveGroup}
                            >
                                Leave Group
                            </button>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-default text-center w-100"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                class="btn btn-default text-center w-100"
                                data-dismiss="modal"
                                onClick={saveGroupSettings}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
