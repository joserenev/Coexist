import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

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