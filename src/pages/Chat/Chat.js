import React from "react";
//import { Wrapper } from "./ChatUI.style";
import { Menu } from "../../components/ChatComp/Menu/Menu";
//import { CurrentConversation } from "features/currentConversation/CurrentConversation/CurrentConversation";
//import { ConversationMembers } from "features/conversationMembers/ConversationMembers/ConversationMembers";
//import { JoinConversationDialog } from "features/joinedConversations/JoinConversationDialog/JoinConversationDialog";
import styled from "styled-components/macro";
import MessagePanel from "../Messages/MessagePanel";

import { deleteMessage } from "../../api/ChatApi";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
            <IconButton
                component={Link}
                to={`/groupHomePage/${groupID}`}
                color="inherit"
                aria-label="open drawer"
                variant="contained"
                style={{}}
            >
                <ArrowBackIcon />
            </IconButton>
            <Wrapper>
                <Menu />
                <MessagePanel currentUserID={currentUserID} {...props} />
            </Wrapper>
        </div>
    );
};

export default Chat;
//export default Chat;
