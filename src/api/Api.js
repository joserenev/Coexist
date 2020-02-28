import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {
    ReferralTypeConstants,
    ReferralMedium
} from "../components/util/ReferralTypeConstants";
import {
    emailInviteURL,
    textInviteURL
} from "../components/util/NotifConstants";
const { EMAIL, TEXT } = ReferralMedium;

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
