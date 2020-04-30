const baseURL = "https://murmuring-cove-51026.herokuapp.com";
const emailInviteURL = `${baseURL}/invite/email`;
const textInviteURL = `${baseURL}/invite/message`;
const emailNewGroupURL = `${baseURL}/addedToGroup/email`;
const textNewGroupURL = `${baseURL}/addedToGroup/message`;
const emailNotifURL = `${baseURL}/notif/email`;

const host_url = `http://localhost:3000`;

function getTaskURL(groupID) {
    return `${host_url}/tasks/${groupID}`;
}

function getCalendarEventURL(groupID) {
    return `${host_url}/calendar/${groupID}`;
}

function getReceiptURL(groupID) {
    return `${host_url}/expenses/${groupID}`;
}

export {
    baseURL,
    emailInviteURL,
    textInviteURL,
    emailNewGroupURL,
    textNewGroupURL,
    emailNotifURL,
    getTaskURL,
    getCalendarEventURL,
    getReceiptURL
};
