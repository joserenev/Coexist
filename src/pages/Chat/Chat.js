import React from "react";
//import { Wrapper } from "./ChatUI.style";
import { Menu } from "../../components/ChatComp/Menu/Menu";
//import { CurrentConversation } from "features/currentConversation/CurrentConversation/CurrentConversation";
//import { ConversationMembers } from "features/conversationMembers/ConversationMembers/ConversationMembers";
//import { JoinConversationDialog } from "features/joinedConversations/JoinConversationDialog/JoinConversationDialog";
import styled from "styled-components/macro";
import MessagePanel from "../Messages/MessagePanel";

import { deleteMessage } from "../../api/ChatApi";
import { Button,Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SubdirectoryArrowLeftTwoToneIcon from '@material-ui/icons/SubdirectoryArrowLeftTwoTone';
import { Link, useHistory } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  color:
  height: 100%;
`;

const Chat = props => {
    const { currentUserID = "" } = props;
    const groupID = props.match?.params?.groupID ?? "";
    return (
        
        <div>
        <Grid container alignItems="flex-start" justify="flex-end" direction="row" >
            <IconButton
                component={Link}
                to={`/groupHomePage/${groupID}`}
                color="inherit"
                aria-label="open drawer"
                variant="contained"
                style={{  padding: 10,
                margin: 10, }}
                                
            >
                <SubdirectoryArrowLeftTwoToneIcon />
            </IconButton>
        </Grid>
        <Wrapper>
            <Menu />
            <MessagePanel currentUserID={currentUserID} {...props} />
        </Wrapper>
        </div>
    );
};

export default Chat;
//export default Chat;
