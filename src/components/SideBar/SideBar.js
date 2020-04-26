// @flow
// @format

import React from "react";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Authentication from "../../authentication/Authentication";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EditAttributes from "@material-ui/icons/EditAttributes";
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import { Link, useHistory } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "../../containers/Main.css";
import Group from "../Groups/Group";
import CreateGroupButton from "../Groups/CreateGroupButton.react";

import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { getUser as getUserDetailsQuery } from "../../customGraphql/queries";
import SideBarLoading from "../../pages/Loading/SideBarLoading";

import Notifications from "./Notifications";

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        maxWidth: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "center"
    },
    avatar: {
        margin: 5
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60
    },
    theUserId: {
        flexGrow: 1
    },
    card: {
        minWidth: 275
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    pos: {
        marginBottom: 12
    },
    typography: {
        flexGrow: 1,
        align: "center"
    }
}));

type Props = {|
    isSideBarOpen: boolean,
    setSideBarOpen: boolean => void,
    userID: string
|};

function SideBar({
    isSideBarOpen,
    setSideBarOpen,
    userID
}: Props): React.MixedElement {
    const theme = useTheme();
    const classes = useStyles(theme);

    const browserHistory = useHistory();
    //console.log("Test getting my Name:", props);
    //console.log("Test muNmae string", props.toString())
    /*
    let chipsToRender = props.theTopics.map(t => {
            return(
              <Chip size="small" label={t} />
            )

      });
      */
    const handleDrawerOpen = () => {
        setSideBarOpen(true);
    };

    const logout = async () => {
        console.log(Authentication.logout());
        await Authentication.logout()
            .then(() => {
                console.log("comes here to logout after promise");
                browserHistory.push("/");
                window.location.replace("/");
            })
            .catch(error => {
                console.log(error);
                // browserHistory.push("/");
            });
    };

    const handleDrawerClose = () => {
        setSideBarOpen(false);
    };

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    return (
        <div className={classes.root}>
            <Notifications />
            <CssBaseline />
            <ClickAwayListener onClickAway={handleDrawerClose}>
                <AppBar
                    style={{ backgroundColor: "darkseagreen" }}
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: isSideBarOpen
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            className={clsx(isSideBarOpen && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h1"
                            align="center"
                            className={classes.typography}
                        >
                            Coexist
                        </Typography>
                        <IconButton
                            component={Link}
                            to="/homepage"
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerClose}
                            //className={clsx(isSideBarOpen && classes.hide)}
                        >
                            <HomeTwoToneIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
            </ClickAwayListener>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={isSideBarOpen}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.SliderBarPersistent}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <Connect
                    query={graphqlOperation(getUserDetailsQuery, {
                        id: userID
                    })}
                >
                    {({ data, loading, error }) => {
                        if (error) {
                            //TODO: Add a dedicated ERROR Component with a message to show.
                            return <h3>Error...</h3>;
                        }
                        if (loading) {
                            return <SideBarLoading />;
                        }

                        const userData = data.getUser ?? null;
                        const {
                            username = "",
                            email = "",
                            name = "",
                            phone = "",
                            groups = {},
                            pictureURL = ""
                        } = userData ?? {};
                        const { items = [] } = groups ?? [];
                        const groupItems = items
                            .filter(groupItem => {
                                return (
                                    groupItem != null && groupItem.group != null
                                );
                            })
                            .sort((groupItem1, groupItem2) => {
                                const updatedTime1 =
                                    groupItem1.group?.updatedAt ?? "";
                                const updatedTime2 =
                                    groupItem2.group?.updatedAt ?? "";
                                return updatedTime2.localeCompare(updatedTime1);
                            });

                        const userAvatar =
                            pictureURL == null || pictureURL === "" ? (
                                <Avatar alt={name}>{name.charAt(0)}</Avatar>
                            ) : (
                                <Avatar alt={name} src={pictureURL}></Avatar>
                            );

                        window.localStorage.setItem(
                            "CoexistGroups",
                            JSON.stringify(groupItems)
                        );
                        window.localStorage.setItem(
                            "CoexistUserData",
                            JSON.stringify(userData)
                        );
                        // console.log(JSON.stringify(userData));
                        // TODO: Sort Group Items by Created Date
                        return (
                            <>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Card className={classes.card}>
                                            <CardHeader
                                                disableTypography
                                                avatar={userAvatar}
                                                title={
                                                    <Typography
                                                        variant="h4"
                                                        className={
                                                            classes.title
                                                        }
                                                    >
                                                        {name}
                                                    </Typography>
                                                }
                                                subheader={
                                                    <Typography
                                                        variant="h5"
                                                        color="textSecondary"
                                                    >
                                                        @{username}
                                                    </Typography>
                                                }
                                            />

                                            <CardContent
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                <Typography variant="body2">
                                                    Email: {email}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Phone: {phone}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}></Grid>
                                </Grid>
                                <Divider />
                                <List
                                    component="nav"
                                    aria-label="secondary mailbox folder"
                                >
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/profile"
                                        //selected={selectedIndex === 2}
                                        //onClick={event => handleListItemClick(event, 2)}
                                        onClick={handleDrawerClose}
                                    >
                                        <ListItemIcon>
                                            <ProfileIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </ListItem>
                                    <Divider />

                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography
                                                className={classes.title}
                                                color="textSecondary"
                                                gutterBottom
                                            >
                                                Groups
                                            </Typography>
                                            {groupItems.length === 0 && (
                                                <ListItemText
                                                    className={
                                                        classes.groupText
                                                    }
                                                    primary={
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                className={
                                                                    classes.groupName
                                                                }
                                                                color="textPrimary"
                                                            >
                                                                {
                                                                    "No Groups found"
                                                                }
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                className={
                                                                    classes.inline
                                                                }
                                                                color="textPrimary"
                                                            >
                                                                {
                                                                    "Create or get added to a group to continue"
                                                                }
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                            )}
                                            {groupItems.map(groupItem => {
                                                return (
                                                    <div key={groupItem.id}>
                                                        <Group
                                                            group={
                                                                groupItem.group
                                                            }
                                                        />
                                                        <Divider
                                                            variant="inset"
                                                            component="li"
                                                        />
                                                    </div>
                                                );
                                            })}
                                            <CreateGroupButton />
                                        </CardContent>
                                    </Card>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/referralPage"
                                        //selected={selectedIndex === 2}
                                        //onClick={event => handleListItemClick(event, 2)}
                                        onClick={handleDrawerClose}
                                    >
                                        <ListItemIcon>
                                            <EditAttributes />
                                        </ListItemIcon>
                                        <ListItemText primary="Refer a Friend!" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        selected={selectedIndex === 3}
                                        onClick={logout}
                                    >
                                        <ListItemIcon>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Sign Out" />
                                    </ListItem>
                                    <Divider />
                                </List>
                            </>
                        );
                    }}
                </Connect>
            </Drawer>
        </div>
    );
}

export default SideBar;
