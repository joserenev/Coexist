import {
    updateUserLastPageLoadTime,
    updateUserHeartbeatTime
} from "../../api/Api";

const UserStatusConstant = {
    ONLINE: "ONLINE",
    OFFLINE: "OFFLINE",
    IDLE: "IDLE"
};

async function updateUserPageLoadTime(userID) {
    await updateUserLastPageLoadTime(userID)
        .then(response => {
            // console.log("User Page Load time updated successfully");
        })
        .catch(err => {
            console.log({ err });
        });
}

async function updateUserHeartBeatTime(userID) {
    await updateUserHeartbeatTime(userID)
        .then(response => {
            // console.log("User Hearbeat time updated successfully");
        })
        .catch(err => {
            console.log({ err });
        });
}

export { updateUserPageLoadTime, updateUserHeartBeatTime, UserStatusConstant };
