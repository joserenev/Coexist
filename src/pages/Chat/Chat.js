import React from "react";
//import { Wrapper } from "./ChatUI.style";
import { Menu } from "../../components/ChatComp/Menu/Menu";
//import { CurrentConversation } from "features/currentConversation/CurrentConversation/CurrentConversation";
//import { ConversationMembers } from "features/conversationMembers/ConversationMembers/ConversationMembers";
//import { JoinConversationDialog } from "features/joinedConversations/JoinConversationDialog/JoinConversationDialog";
import styled from "styled-components/macro";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessagePanel from "../Messages/MessagePanel"


const Wrapper = styled.div`
  display: flex;
  color: 
  height: 100%;
`;




function Chat(props): React.MixedElement {
  
  return (
    <Wrapper>
      <Menu
        //need to pass in props?
      />
      <MessagePanel />
    
    </Wrapper>
  );
};

export default Chat;
//export default Chat;
