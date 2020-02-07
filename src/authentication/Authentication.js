import {Auth} from 'aws-amplify';

class Authentication {

    //Sign In method
    signIn(username, password) {
        return Auth.signIn({
            username, password
        })

    }

    // Sign up method
    async signUp(username, password, email, profile_image) {
        let data = await Auth.signUp({
            username,
            password,
            attributes: {
                email

            }
        });


        return data;
    }

    // Used to confirm signin
    confirmSignIn(username, code) {
        Auth.confirmSignIn(username, code, {
            forceAliasCreation: true
        }).then(data => console.log(data))
            .catch(err => console.log(err));
    }

    // Used to resend sign up code
    resend(username) {
        Auth.resendSignUp(username).then(() => {
            console.log('code resent successfully');
        }).catch(e => {
            console.log(e);
        });
    }

    // Used to log out
    async logout() {
        console.log("Logout Done");

        await Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));

        //window.location.reload();
    }

    // Used to change password
    changePassword(username, oldPass, newPass) {
        Auth.currentAuthenticatedUser()
            .then(user => {
                return Auth.changePassword(user, 'oldPassword', 'newPassword');
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    // Gets the authenticated user object which contains a ton of attributes
    getAuthenticatedUserObject() {
        return Auth.currentAuthenticatedUser();
    }

    // Gets name of user currently logged in
    getName() {
        if (!this.getAuthenticatedUserObject()) {
            return "User Undefined"
        }
        else {
            return this.getAuthenticatedUserObject().username;
        }
    }

    // Gets Sub ID of user currently logged in
    async getSub() {

        if (!await this.getAuthenticatedUserObject()) {
            return "User Undefined"
        }
        else {
            return await this.getAuthenticatedUserObject().then(data => {
                console.log(data);
            });
        }
    }

    // Returns if a user is authenticated
    isAuthenticated() {
        //Actual Code:
        let state;
        //let userData = null;

        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(function(data) {
            console.log("Authenticated");
            console.log(data.username);
            //userData = data;
            state = true;
        })
        .catch(function(err) {
            console.log("Error");
            console.log(err);
            state = false;
        }).then(function() {
            console.log(state);
            return state;
        });

    }

    // Confirms the sign up with the authentication code
    confirmSignUp(username, code) {
        Auth.confirmSignUp(username, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        });
    }

    // Resends the sign up verification code
    resendSignUp(username) {
        Auth.resendSignUp(username).then(() => {
            console.log('code resent successfully');
        }).catch(e => {
            console.log(e);
        });
    }

    changePassword(oldPassword, newPassword) {
        Auth.currentAuthenticatedUser().then(function(user) {
            return Auth.changePassword(user, oldPassword, newPassword);
        })
            .then (function(data) {
                return data;
            })
            .catch(function(err) {
                return err;
            })
    }

}

export default new Authentication();
