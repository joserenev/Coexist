import React from "react";
//import { Wrapper } from "./ChatUI.style";
import { Menu } from "../../components/ChatComp/Menu/Menu";
//import { CurrentConversation } from "features/currentConversation/CurrentConversation/CurrentConversation";
//import { ConversationMembers } from "features/conversationMembers/ConversationMembers/ConversationMembers";
//import { JoinConversationDialog } from "features/joinedConversations/JoinConversationDialog/JoinConversationDialog";
import styled from "styled-components/macro";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessagePanel from "../Messages/MessagePanel";

import {
    sendMessage,
    listenerForMessages,
    deleteMessage
} from "../../api/ChatApi";

const Wrapper = styled.div`
  display: flex;
  color:
  height: 100%;
`;

const Chat = props => {
    const { currentUserID = "" } = props;
    return (
        <Wrapper>
            <Menu />
            <MessagePanel currentUserID={currentUserID} {...props} />
        </Wrapper>
    );
};

export default Chat;
//export default Chat;
