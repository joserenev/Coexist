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

import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';

const pubnub = new PubNub({
  publishKey: "pub-c-fcfbbd7d-d4d4-4dc2-9979-2339f3202a81",
  subscribeKey: "sub-c-7df07fca-72de-11ea-88bf-72bc4223cbd9",
  uuid: "12445"
});
var channels = ['testNotifChannel']; ////change to group id
var lastId = 0;


function Notifications(): React.MixedElement {
    const [messages, addMessage] = useState([{"message":"asdsa", "sender":"person a"}]);
	  const [message, setMessage] = useState('');
	  
    return (
        <div>
		 <PubNubProvider client={pubnub}>
		  <div className="App ${classes.noMargin}">
			<header className="App-header ${classes.noMargin}">
			  <PubNubConsumer>
				{client => {
				  client.addListener({
					message: messageEvent => {
					  console.log("Notification message: " + messageEvent.message.message);
					  if (messageEvent.message.uniqueId != lastId)
					  {
						  lastId = messageEvent.message.uniqueId;
						  window.alert("Received " + messageEvent.message.notificationClass + " notification: " + messageEvent.message.message);
					  }
					},
				  });

				  client.subscribe({ channels });
				}}
			  </PubNubConsumer>
			</header>
		</div>
	</PubNubProvider>
			
		</div>
    );
}

export default Notifications;
