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
    Fade
} from "@material-ui/core";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { makeStyles, useTheme } from "@material-ui/core/styles";
//import {Wrapper} from "./MessagePanelUI";

import ReceiptIcon from "@material-ui/icons/Receipt";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import AcceptIcon from "@material-ui/icons/CheckCircle";
import RejectIcon from "@material-ui/icons/Cancel";

// import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import Message from "./Message";

import PubNub from "pubnub";
import { PubNubProvider, PubNubConsumer } from "pubnub-react";

import firebase from "firebase";
import {
    sendMessage,
    listenerForMessages,
    deleteMessage
} from "../../api/ChatApi";

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

function MessagePanel(props): React.MixedElement {
    const realGroupId = window.location.href.substr(
        window.location.href.indexOf("/messages/") + 10
    );
    var groupMessageJSON = window.localStorage.getItem("GroupMessages") || "{}";
    var groupMessages = JSON.parse(groupMessageJSON);
    const [messages, addMessage] = useState([]); //useState(groupMessages[realGroupId] || []);
    const [message, setMessage] = useState("");
    const classes = useStyles();
    const groupID = props.match?.params?.groupID ?? "null group id";
    const { currentUserID = "" } = props;
    channels[0] = realGroupId;

    var userDataJSON = window.localStorage.getItem("CoexistUserData") || "{}";
    var userData = JSON.parse(userDataJSON);

    /////This is where messages are initially loaded from the database, and where new ones are sent?/////
    firebase
        .database()
        .ref("Group/" + realGroupId)
        .on("child_added", function(snapshot) {
            var sender = snapshot.val().sender;
            var senderId = snapshot.val().senderId;
            var message = snapshot.val().message;
            var messageID = snapshot.key;

            for (var i = 0; i < messages.length; i++) {
                if (messages[i].id == messageID) {
                    return;
                }
            }
            let messageObject = {};
            messageObject.sender = sender;
            messageObject.senderId = senderId;
            messageObject.message = message;
            messageObject.id = snapshot.key;
            addMessage([...messages, 
					messageObject
					]);
            //this.setState({"messages": messages});
            // console.log("FIREBASE " + sender + ": " + message);
            // console.log("FIREBASE message id is: " + messageID);
        });
    //window.alert("Group id: " + groupID);

    const sendMessagePub = message => {
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
            message: message
        };

        ////Firebase code here/////
        firebase
            .database()
            .ref("Group/" + realGroupId)
            .push()
            .set(tempMessageObject);
		
		pubnub.publish(
		  {
			channel: channels[0],
			message: json,
		  },
		  () => setMessage('')
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
                            width: "80vw",
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
                                    console.log(message.senderId);
                                    console.log(message.sender);
                                    console.log("OKAY");
                                    console.log(currentUserID);
                                    if (message.senderId === currentUserID) {
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
                                                                {message.sender}
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
                                                            {message.sender}
                                                        </Typography>
                                                        <Typography>
                                                            {message.message}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    );
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
