import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { ReferralMedium } from "../components/util/ReferralTypeConstants";
import {
    emailInviteURL,
    textInviteURL,
    emailNewGroupURL,
    textNewGroupURL
} from "../components/util/NotifConstants";
import superagent from "superagent";

import {
    CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_UPLOAD_URL
} from "../components/util/CloudinaryUtil";
const { EMAIL } = ReferralMedium;
//Retrieves current logged-in User Object data from DynamoDB.
export async function getUser() {
    console.log("Getting user...");
    let info = null;

    //Check cognito if there is an authenticated user and if so get data
    await Auth.currentAuthenticatedUser()
        .then(async data => {
            if (data === undefined) {
                return null;
            }

            //Gets Unique ID from data of authenticated user
            const sub = data["attributes"]["sub"];

            await API.graphql(graphqlOperation(queries.getUser, { id: sub }))
                .then(async data => {
                    info = data;
                })
                .catch(data => {
                    console.error("Get user from DynamoDB unsuccessful", data);
                    return;
                });
        })
        .catch(err => {
            console.log("Caught not authenticated error in getUser()", err);
        });

    //Map user to state
    // if(info !== null){
    //     store.dispatch(updateUser({
    //         user: info["data"]["getUser"]
    //     }))
    // }
    console.log("Finished getting user.");
    console.log(info);
    return info;
}

//Retrieves a user by ID from DynamoDB
export async function getUserById(userID) {
    console.log("Getting user...");
    let info = null;
    await API.graphql(graphqlOperation(queries.getUser, { id: userID }))
        .then(data => {
            info = data;
        })
        .catch(data => {
            console.error("Get user from DynamoDB unsuccessful", data);
            return data;
        });

    console.log("Finished getting user.", info);
    return info;
}

//Retrieves a user by ID from DynamoDB
export async function getUserByUserName(username) {
    console.log("Getting user by user name...");
    return await API.graphql(
        graphqlOperation(queries.listUsers, {
            filter: {
                username: {
                    eq: username
                }
            }
        })
    )
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error("Get user from DynamoDB unsuccessful", err);
            throw err;
        });
}

export async function createGroupAPI(
    name,
    description = "",
    type = "",
    groupOwnerId = ""
) {
    const groupInfo = {
        name,
        description,
        groupOwnerId,
        type
    };

    return await API.graphql(
        graphqlOperation(mutations.createGroup, { input: groupInfo })
    )
        .then(async response => {
            console.log("Group creation response: ", response);
            const createUserGroupsInfo = {
                userGroupsUserId: groupOwnerId,
                userGroupsGroupId: response.data.createGroup.id
            };
            return await API.graphql(
                graphqlOperation(mutations.createUserGroups, {
                    input: createUserGroupsInfo
                })
            )
                .then(async response => {
                    console.log("User group creation response: ", response);
                    return response;
                })
                .catch(err => {
                    console.error("Error creating user group", err);
                    throw err;
                });
        })
        .catch(err => {
            console.error("Error creating group", err);
            throw err;
        });
}

export async function updateUser(userID, name, phone) {
    const updateUserInput = {
        id: userID,
        name,
        phone
    };
    console.log({ updateUserInput });
    return await API.graphql(
        graphqlOperation(mutations.updateUser, { input: updateUserInput })
    )
        .then(data => {
            console.log("User updated successfully", { data });
            return data;
        })
        .catch(error => {
            console.error("Get user from DynamoDB unsuccessful", error);
            return error;
        });
}

export async function inviteNotificationApi(notifMedium, contact) {
    const apiEndpoint = notifMedium === EMAIL ? emailInviteURL : textInviteURL;
    let requestBody = {
        phone_number: contact
    };
    if (notifMedium === EMAIL) {
        requestBody = {
            email_address: contact
        };
    }
    return await fetch(apiEndpoint, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            console.log({ response });
            return response;
        })
        .catch(err => {
            console.log({ err });
            throw err;
        });
}

export async function updateGroup(groupID, updateInfo) {
    const input = {
        id: groupID,
        ...updateInfo
    };
    return await API.graphql(graphqlOperation(mutations.updateGroup, { input }))
        .then(data => {
            console.log("Group updated successfully", { data });
            return data;
        })
        .catch(error => {
            console.error("Update group unsuccessful", error);
            throw error;
        });
}

export async function newGroupNotication(notifMedium, contact) {
    const apiEndpoint =
        notifMedium === EMAIL ? emailNewGroupURL : textNewGroupURL;
    let requestBody = {
        phone_number: contact
    };
    if (notifMedium === EMAIL) {
        requestBody = {
            email_address: contact
        };
    }
    return await fetch(apiEndpoint, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            console.log({ response });
            return response;
        })
        .catch(err => {
            console.log({ err });
            throw err;
        });
}

export async function sendNewGroupNotificationsToAll(emailList) {
    const promises = emailList.map(email => {
        return newGroupNotication(EMAIL, email);
    });

    return await Promise.all(promises)
        .then(data => {
            console.log("All group invitation emails sent out", { data });
            return data;
        })
        .catch(error => {
            console.error("All group invitation emails failed", error);
            throw error;
        });
}

export async function addUserToGroup(groupID, userID) {
    const input = {
        input: {
            userGroupsUserId: userID,
            userGroupsGroupId: groupID
        }
    };

    return await API.graphql(
        graphqlOperation(mutations.createUserGroups, input)
    )
        .then(data => {
            console.log("User added to group successfully", { data });
            return data;
        })
        .catch(error => {
            console.error("Add user to group unsuccessful", error);
            throw error;
        });
}

export async function addUsersToGroup(groupID, userIDList, userEmailList) {
    const promises = userIDList.map(userID => {
        return addUserToGroup(groupID, userID);
    });
    promises.push(sendNewGroupNotificationsToAll(userEmailList));
    return await Promise.all(promises)
        .then(data => {
            console.log("All users added to group successfully", { data });
            return data;
        })
        .catch(error => {
            console.error("Add users to group unsuccessful", error);
            throw error;
        });
}

export async function deleteUserFromGroup(userGroupID) {
    const input = {
        input: {
            id: userGroupID
        }
    };

    return await API.graphql(
        graphqlOperation(mutations.deleteUserGroups, input)
    )
        .then(data => {
            console.log("User deleted from group successfully", { data });
            return data;
        })
        .catch(error => {
            console.error("Delete user from group unsuccessful", error);
            throw error;
        });
}

export async function deleteUsersFromGroup(userGroupIDList) {
    const promises = userGroupIDList.map(userGroupID => {
        return deleteUserFromGroup(userGroupID);
    });
    return await Promise.all(promises)
        .then(data => {
            console.log("All users deleted from group successfully", { data });
            return data;
        })
        .catch(error => {
            console.error("Delete users from group unsuccessful", error);
            throw error;
        });
}

export async function uploadCloudinaryImage(imageFile) {
    return superagent
        .post(CLOUDINARY_UPLOAD_URL)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("file", imageFile)
        .then(res => {
            console.log("Upload image successful.", res.body.secure_url);
            return res.body.secure_url;
        })
        .catch(error => {
            console.error("Upload image failed for idk why", error);
            throw error;
        });
}

export async function createNewReceipt(
    name,
    description = "",
    memberSplit = "",
    totalAmount: String = "0",
    receiptImageUrl: String = "",
    receiptOwnerId: String,
    receiptGroupId: String
) {
    const receiptInfo = {
        name,
        description,
        memberSplit,
        totalAmount,
        receiptImageUrl,
        receiptOwnerId,
        receiptGroupId
    };
    return await API.graphql(
        graphqlOperation(mutations.createReceipt, { input: receiptInfo })
    )
        .then(async response => {
            console.log("Receipt creation response: ", response);
            return response;
        })
        .catch(err => {
            console.error("Error creating receipt", err);
            throw err;
        });
}
