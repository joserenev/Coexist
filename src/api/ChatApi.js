import firebase from 'firebase';

export async function sendMessage(groupID, sender, msg){
  firebase.database().ref('Group/' + groupID).push().set({
    "sender": sender,
    "message": msg
  });
}

//This function listens for new messages from the db in realtime
export async function listenerForMessages(groupID){
  firebase.database().ref("Group/").on("child_added", function(snapshot) {
    //snapshot.val().sender;
    //snapshot.val().message;
    //snapshot.key();

    var sender = snapshot.val().sender;
    var message = snapshot.val().message;
    var messageID = snapshot.key;

    console.log(sender + ": " + message);
    console.log("message id is: " + messageID);
  });
}

export async function deleteMessage(msgID){
  firebase.database().ref("messages").child(msgID).remove();
}
