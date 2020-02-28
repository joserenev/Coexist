import type { GroupTypeEnum } from "../util/GroupConstants";
import type { MutationStatusEnum } from "../util/GroupConstants";

import Grid from '@material-ui/core/Grid';
import React from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Autorenew from "@material-ui/icons/Autorenew";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { ReferralTypeConstants } from "../../components/util/ReferralTypeConstants";

import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import  { PureComponent } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { useState } from "react";


const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20,
        flexDirection: "column",
        flex: 1,
        display: "flex"
    },

    info: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        displayContent: "center"
    },

    input: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    mediumIcon: {
        margin: 50,
        height: 80,
        width: 80,
    },

    pictureContainer: {
        margin: 20,
        float: "left",
        backgroundColor: "white",
        align: "center",
        justifyContent: "center",
        padding: 20,
        display: "flex",
        flexDirection: "column"
    },

    avatar: {
        height: 180,
        width: 180
    }
}));



    


function ForgotPassowrd(): React.MixedElement {
    const [nameValue, setNameValue] = useState("");
    const [loginValue, setLoginValue] = useState(""); // login value is "username"
    const classes = useStyles();
    return (
        <div>
            <div className={classes.container}>
                <div className={classes.info}>
                    <Autorenew className={classes.mediumIcon} />
                    <Typography variant="h2" m="8rem">
                        <i>
                            Reset Password
                        </i>
                    </Typography>
                </div>
                <Card style={{ overflow: 'visible' }}>
          <CardContent>
                <FormValidation >
                 <Grid item xs={12} sm={5}>
                    <TextField
                            id="Email"
                                InputProps={{
                                    classes: {
                                        underline:
                                        classes.textFieldUnderline,
                                    input: classes.textField
                                }
                            }}
                            value={nameValue}
                                        
                            margin="normal"
                            placeholder="Email"
                            type="email"
                            fullWidth
                        />
                    <Button
                        
                        size="large"
                         variant="outlined" color="primary"
                        //onClick={event =>  window.location.href='/resetPass'}
                        >
                            Submit
                        </Button>
                    </Grid>
                </FormValidation>
            </CardContent>
          <Divider />
           <CardContent>
           

              <Grid item xs={6} sm={2} rm={20}>
                <TextField
                            id="standard-password-input"
                                InputProps={{
                                    classes: {
                                        underline:
                                        classes.textFieldUnderline,
                                    input: classes.textField
                                }
                            }}
                            value={nameValue}
                                        
                            margin="normal"
                            placeholder="Reset Code"
                            type="password"
                            fullWidth
                        />
              </Grid>

              <Grid item xs={6} sm={2}>
                <TextField
                            id="standard-password-input"
                                InputProps={{
                                    classes: {
                                        underline:
                                        classes.textFieldUnderline,
                                    input: classes.textField
                                }
                            }}
                            value={nameValue}
                                        
                            margin="normal"
                            placeholder="New Password"
                            type="password"
                            fullWidth
                        />
              </Grid>

            
                <br /> <br />
                <Button
                        
                        size="large"
                         variant="outlined" color="primary"
                        //onClick={event =>  window.location.href='/resetPass'}
                        >
                            Submit
                </Button>

                 <br /> <br />
                <Button
                        
                        size="large"
                         variant="outlined" color="default"
                        onClick={event =>  window.location.href='/login'}
                        >
                            Back To Home
                </Button>

                </CardContent>
            </Card>
            </div>
        </div>
    );
}

export default ForgotPassowrd;
