import React, { useState } from "react";
// <img src={logo} alt="logo" className={classes.logotypeImage} />
import { Grid, Typography, Button, TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
//import {Wrapper} from "./MessagePanelUI";

import Paper from "@material-ui/core/Paper";

import PubNub from "pubnub";
import { PubNubProvider, PubNubConsumer } from "pubnub-react";

import firebase from "firebase";

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AttachFile from '@material-ui/icons/AttachFile';
import Link from '@material-ui/core/Link';

import attachIcon from './AttachIcon.png';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 200
        }
    },
    box: {
        width: "80vw",
        background: "#B6E3B3",
        zindex: 10,
        padding: "5px",
        margin: "0px"
    },
    buttonClass: {
        width: "15%",
        float: "right",
        backgroundColor: "#B6E3B3"
    },
    input: {
        width: "85%",
        height: "100%",
        float: "left"
    },
    messageSelf: {
        // maxWidth: "80%",
        color: "white",
        backgroundColor: "green",
        borderRadius: "10px",
        margin: "5px",
        padding: "8px 15px",
        marginLeft: "50px"
    },
    messages: {
        // maxWidth: "80%",
        color: "black",
        backgroundColor: "lightgrey",
        borderRadius: "10px",
        margin: "5px",
        padding: "8px 15px",
        marginRight: "50px"
    },
    noMargin: {
        margin: "0px",
        border: "0px",
        padding: "0px"
    },
    messageDiv: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row"
    },
    messageHolder: {
        display: "block"
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        width: "100vh",
        minWidth: 500
    }
}));

const pubnub = new PubNub({
    publishKey: "pub-c-fcfbbd7d-d4d4-4dc2-9979-2339f3202a81",
    subscribeKey: "sub-c-7df07fca-72de-11ea-88bf-72bc4223cbd9",
    uuid: "12445"
});
var channels = ["testNotifChannel"]; ////change to group id

/*

if (message.message.substring(0, 5) == "link/" && message.message.substr(5).split("<>/").length == 2) //hyperlink
																{
																	var mess = message.message.substr(5).split("<>/");
																	var hyperLink = mess[0];
																	var outerMessage = mess[1];
																	<Link target="_blank" href={hyperLink}>
																	<Typography >
																		{
																			outerMessage
																			LINK BABY
																		}
																	</Typography>
																</Link>
																}
																else
																{	
																	<Typography>
																		{
																			message.message
																		}
																	</Typography>
																}
*/

function MessagePanel(props): React.MixedElement {
    const realGroupId = window.location.href.substr(
        window.location.href.indexOf("/messages/") + 10
    );
    var groupMessageJSON = window.localStorage.getItem("GroupMessages") || "{}";
    var [messages, addMessage] = useState([]); //useState(groupMessages[realGroupId] || []);
    const [message, setMessage] = useState("");
    const classes = useStyles();
    const { currentUserID = "" } = props;
    channels[0] = realGroupId;

    var userDataJSON = window.localStorage.getItem("CoexistUserData") || "{}";
    var userData = JSON.parse(userDataJSON);
	
	const [open, setOpen] = React.useState(false);
	const [openPict, openPicture] = React.useState(false);
	
	const handlePictureOpen = () => {
		openPicture(true);
	};
	
	const handlePictureClose = () => {
		openPicture(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	
	const submitLink = () => {
		var linkField = document.getElementById("linkField").value;
		var displayField = document.getElementById("displayField").value;
		
		if (linkField.length < 1 || displayField.length < 1) { return; }
		displayField = displayField.substring(0, 120);
		linkField = linkField.substring(0, 128);
		sendMessagePub("link/" + linkField + "<>/" + displayField);
		setOpen(false);
	}
	
	const submitPicture = () => {
		window.alert("Sending picture...");
		var linkField = document.getElementById("pictureLinkField").value;
		var displayField = document.getElementById("pictureTextField").value;
		
		if (linkField.length < 1 || displayField.length < 1) { return; }
		displayField = displayField.substring(0, 120);
		linkField = linkField.substring(0, 128);
		sendMessagePub("picture/" + linkField + "<>/" + displayField);
		openPicture(false);
	}

    /////This is where messages are initially loaded from the database, and where new ones are sent?/////
    firebase
        .database()
        .ref("Group/" + realGroupId)
        .on("child_added", function(snapshot) {
            var sender = snapshot.val().sender;
            var senderId = snapshot.val().senderId;
            var message = snapshot.val().message;
            var timeSent = snapshot.val().timeSent;
            var messageID = snapshot.key;

            for (var i = 0; i < messages.length; i++) {
                if (messages[i].id === messageID) {
                    return;
                }
            }
            let messageObject = {};
            messageObject.sender = sender;
            messageObject.senderId = senderId;
            messageObject.message = message;
            messageObject.id = snapshot.key;
            messageObject.timeSent = snapshot.val().timeSent;

            var valueStrings = [
                "sender",
                "senderId",
                "message",
                "id",
                "timeSent"
            ];

            for (var i = 0; i < messages.length - 1; i++) {
                for (var a = i + 1; a < messages.length; a++) {
                    if (
                        parseInt(messages[a].timeSent) <
                        parseInt(messages[i].timeSent)
                    ) {
                        var tempObj = {};

                        for (var o = 0; o < valueStrings.length; o++) {
                            tempObj[valueStrings[o]] =
                                messages[a][valueStrings[o]];
                            messages[a][valueStrings[o]] =
                                messages[i][valueStrings[o]];
                            messages[i][valueStrings[o]] =
                                tempObj[valueStrings[o]];
                        }
                    }
                    if (
                        parseInt(messages[a].timeSent) >
                        parseInt(messageObject.timeSent)
                    ) {
                        var tempObj = {};
                        for (var o = 0; o < valueStrings.length; o++) {
                            tempObj[valueStrings[o]] =
                                messages[a][valueStrings[o]];
                            messages[a][valueStrings[o]] =
                                messageObject[valueStrings[o]];
                            messageObject[valueStrings[o]] =
                                tempObj[valueStrings[o]];
                        }
                    }
                }
            }

            //if (messages.length < 1) { console.log("Messages is blank with first value " + message); }
            for (var i = 0; i < messages.length; i++) {
                if (snapshot.key === messages[i].id) {
                    console.log(
                        "Message: " + messages[i].message + " duplicated!"
                    );
                    return;
                }
            }

            console.log(
                "Firebase received message: " +
                    messageObject.message +
                    ", length: " +
                    messages.length
            );
            addMessage([...messages, messageObject]);

            for (var i = 0; i < messages.length - 1; i++) {
                for (var a = i + 1; a < messages.length; a++) {
                    if (
                        parseInt(messages[a].timeSent) <
                        parseInt(messages[i].timeSent)
                    ) {
                        var tempObj = {};

                        for (var o = 0; o < valueStrings.length; o++) {
                            tempObj[valueStrings[o]] =
                                messages[a][valueStrings[o]];
                            messages[a][valueStrings[o]] =
                                messages[i][valueStrings[o]];
                            messages[i][valueStrings[o]] =
                                tempObj[valueStrings[o]];
                        }
                    }
                }
            }
            //this.setState({"messages": messages});
            // console.log("FIREBASE " + sender + ": " + message);
            // console.log("FIREBASE message id is: " + messageID);
        });
    //window.alert("Group id: " + groupID);

    const sendMessagePub = message => {
        message = message.substr(0, 256);
        var json = {};
        json.message = userData.username + ": " + message;
        json.timeSent = new Date().getTime();
        json.uniqueId = Math.random();
        json.notificationClass = "Message";
        json.sender = userData.username;
        json.senderId = userData.id;
        json.groupId = realGroupId;

        let tempMessageObject = {
            sender: userData.username,
            senderId: userData.id,
            message: message,
            key: Math.random() + "",
            timeSent: new Date().getTime()
        };

        ////Firebase code here/////
        firebase
            .database()
            .ref("Group/" + realGroupId)
            .push()
            .set(tempMessageObject, function(error) {
                if (error) {
                    var resp = window.confirm(
                        "There was an error sending the message: '" +
                            message +
                            "'. Retry sending?"
                    );
                    if (resp) {
                        sendMessagePub(message);
                    }
                }
            });

        pubnub.publish(
            {
                channel: channels[0],
                message: json
            },
            () => setMessage("")
        );
        /*pubnub.publish(
		  {
			channel: channels[0],
			message: json,
		  },
		  () => setMessage('')
		);*/
        document.getElementById("filled-multiline-flexible").value = "";
    };

    return (
        <PubNubProvider client={pubnub}>
            <div className="panelcontainer">
                <header className="header">
                    <PubNubConsumer>
                        {client => {
                            client.addListener({
                                message: messageEvent => {
                                    /*addMessage([
                                        ...messages,
                                        messageEvent.message
                                    ]);*/
                                    console.log(
                                        "Message panel message: " +
                                            messageEvent.message.message
                                    );
                                }
                            });

                            client.subscribe({
                                channels,
                                messageLimit: 50
                            }); //add load more option
                        }}
                    </PubNubConsumer>
                    <div
                        style={{
                            marginLeft: 10,
                            marginTop: 10,
                            height: "100%"
                        }}
                        className={classes.messageHolder}
                    >
                        <Paper className={classes.paper}>
                            <div
                                style={{
                                    backgroundColor: "white",
                                    height: "70vh",
                                    overflowY: "scroll"
                                }}
                            >
                                {messages.map((message, messageIndex) => {
                                    /*console.log(message.senderId);
                                    console.log(message.sender);
                                    console.log("OKAY");
                                    console.log(currentUserID);*/
                                    if (message.senderId === currentUserID) {
										if (message.message.substring(0, 5) == "link/" && message.message.substr(5).split("<>/").length == 2)
										{
											var mess = message.message.substr(5).split("<>/");
											var hyperLink = mess[0];
											var outerMessage = mess[1];
											return (
												<Grid
													container
													direction="column"
													justify="flex-start"
													alignItems="flex-end"
												>
													<Grid item>
														<div
															className={
																classes.messageDiv
															}
														>
															<div
																key={`message-${messageIndex}`}
																className={
																	classes.messageSelf
																}
															>
																<Typography>
																	<b>
																		{
																			message.sender
																		}
																	</b>
																</Typography>
																<Link target="_blank" href={hyperLink}>
																	<Typography >
																		{
																			outerMessage
																		}
																	</Typography>
																</Link>
																
															</div>
														</div>
													</Grid>
												</Grid>
											);
										}
										else if (message.message.substring(0, 8) == "picture/" && message.message.substr(7).split("<>/").length == 2)
										{
											var mess = message.message.substr(8).split("<>/");
											var pictureLink = mess[0];
											var caption = mess[1];
											return (
												<Grid
													container
													direction="column"
													justify="flex-start"
													alignItems="flex-end"
												>
													<Grid item>
														<div
															className={
																classes.messageDiv
															}
														>
															<div
																key={`message-${messageIndex}`}
																className={
																	classes.messageSelf
																}
															>
																<Typography>
																	<b>
																		{
																			message.sender
																		}
																	</b>
																</Typography>
																<img src={pictureLink} style={{ maxWidth:"250px", maxHeight:"250px", height:"auto" }} title={caption} />
																<Typography> { caption } </Typography>
															</div>
														</div>
													</Grid>
												</Grid>
											);
										}
										else
										{
											return (
												<Grid
													container
													direction="column"
													justify="flex-start"
													alignItems="flex-end"
												>
													<Grid item>
														<div
															className={
																classes.messageDiv
															}
														>
															<div
																key={`message-${messageIndex}`}
																className={
																	classes.messageSelf
																}
															>
																<Typography>
																	<b>
																		{
																			message.sender
																		}
																	</b>
																</Typography>
																<Typography>
																		{
																			message.message
																		}
																</Typography>
															</div>
														</div>
													</Grid>
												</Grid>
											);
										}
                                        
                                    }
									if (message.message.substring(0, 5) == "link/" && message.message.substr(5).split("<>/").length == 2)
									{
										var mess = message.message.substr(5).split("<>/");
										var hyperLink = mess[0];
										var outerMessage = mess[1];
										return (
											<Grid
												container
												direction="column"
												justify="flex-start"
												alignItems="flex-start"
											>
												<Grid item>
													<div
														className={
															classes.messageDiv
														}
													>
														<div
															key={`message-${messageIndex}`}
															className={
																classes.messages
															}
														>
															<Typography>
																<b>
																	{message.sender}
																</b>
															</Typography>
															<Link target="_blank" href={hyperLink}>
																<Typography >
																	{
																		outerMessage
																	}
																</Typography>
															</Link>
														</div>
													</div>
												</Grid>
											</Grid>
										);
									}
									else if (message.message.substring(0, 8) == "picture/" && message.message.substr(7).split("<>/").length == 2)
									{
										var mess = message.message.substr(8).split("<>/");
										var pictureLink = mess[0];
										var caption = mess[1];
										var mess = message.message.substr(5).split("<>/");
										var hyperLink = mess[0];
										var outerMessage = mess[1];
										return (
											<Grid
												container
												direction="column"
												justify="flex-start"
												alignItems="flex-start"
											>
												<Grid item>
													<div
														className={
															classes.messageDiv
														}
													>
														<div
															key={`message-${messageIndex}`}
															className={
																classes.messages
															}
														>
															<Typography>
																<b>
																	{message.sender}
																</b>
															</Typography>
															<img src={pictureLink} style={{ maxWidth:"250px", maxHeight:"250px", height:"auto" }} title={caption} />
															<Typography> { caption } </Typography>
														</div>
													</div>
												</Grid>
											</Grid>
										);
									}
									else
									{
										return (
											<Grid
												container
												direction="column"
												justify="flex-start"
												alignItems="flex-start"
											>
												<Grid item>
													<div
														className={
															classes.messageDiv
														}
													>
														<div
															key={`message-${messageIndex}`}
															className={
																classes.messages
															}
														>
															<Typography>
																<b>
																	{message.sender}
																</b>
															</Typography>
															<Typography>
																{message.message}
															</Typography>
														</div>
													</div>
												</Grid>
											</Grid>
										);
									}
                                })}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    height: "auto",
                                    backgroundColor: "lightgrey"
                                }}
                            >
                                <TextField
                                    id="filled-multiline-flexible"
                                    label="Message"
                                    placeholder="Enter your message here."
                                    helperText=""
                                    multiline
                                    fullWidth
                                    rows="4"
                                    rowsMax="4"
                                    className={classes.input}
                                    onChange={e => setMessage(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    variant="filled"
                                />
								<input disabled="true" accept="image/*" style={{ display:"none" }} id="icon-button-file" type="file" />
								<label htmlFor="icon-button-file">
									<IconButton color="primary" aria-label="upload picture" component="span" onClick={openPicture}>
										<PhotoCamera />
									</IconButton>
								</label>
								<label htmlFor="icon-button-attach">
									<IconButton src={attachIcon} color="primary" aria-label="upload picture" component="span" onClick={handleClickOpen}>
										<AttachFile />
									</IconButton>
								</label>
                                <Button
                                    className={classes.buttonClass}
                                    id="sendMessageButton"
                                    onClick={e => {
                                        e.preventDefault();
                                        sendMessagePub(message);
                                    }}
                                >
                                    Send
                                </Button>
								
								<Dialog
									open={open}
									TransitionComponent={Transition}
									keepMounted
									onClose={handleClose}
									aria-labelledby="alert-dialog-slide-title"
									aria-describedby="alert-dialog-slide-description"
								>
									<DialogTitle id="alert-dialog-slide-title">{"Attach a link"}</DialogTitle>
									<DialogContent>
										<TextField id="linkField" label="Link" />
										<br/>
										<TextField id="displayField" label="Text to Display" />
									</DialogContent>
									<DialogActions>
										<Button onClick={handleClose} color="primary">
											Cancel
										</Button>
										<Button onClick={submitLink} color="primary">
											Submit
										</Button>
									</DialogActions>
								</Dialog>
								
								<Dialog
									open={openPict}
									TransitionComponent={Transition}
									keepMounted
									onClose={handleClose}
									aria-labelledby="alert-dialog-slide-title"
									aria-describedby="alert-dialog-slide-description"
								>
									<DialogTitle id="alert-dialog-slide-title">{"Attach a picture"}</DialogTitle>
									<DialogContent>
										<TextField id="pictureLinkField" label="Picture URL" />
										<br/>
										<TextField id="pictureTextField" label="Caption" />
									</DialogContent>
									<DialogActions>
										<Button onClick={handlePictureClose} color="primary">
											Cancel
										</Button>
										<Button onClick={submitPicture} color="primary">
											Submit
										</Button>
									</DialogActions>
								</Dialog>
								
                            </div>
                        </Paper>
                    </div>
                </header>
            </div>
        </PubNubProvider>
    );
}

export default MessagePanel;

/*const useStyles = makeStyles(theme => ({
    headContainer: {
        margin: 10
    },

    largeIcons: {
        height: 180,
        width: 180
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        width: "100vh",
        minWidth: 500
    },
	pane: {
		flexDirection: "column-reverse",
		width: "50vw",
		height: "80vh",
		background: "#A5D699",
		zindex: 10,
		left: "5%"
	}
}));

function MessagePanel(): React.MixedElement {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.pane}>
            <Message />
        </div>
    );
}

export default MessagePanel;*/
