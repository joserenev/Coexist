import React, { useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { getViewStates } from "../Menu/Selectors";
import { UserInfo } from "../UserInfo/UserInfo";
//import { MyConversations } from "features/joinedConversations/MyConversations/MyConversations";
import { Wrapper, getAnimatedWrapperVariants } from "./Menu.style";
import { ThemeContext } from "styled-components";
import { useMediaQuery } from "../NetworkStatus/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import User from "../../User/User"

const Menu = () => { 
  //const view = useRef<HTMLElement>(null);
  //const views = useSelector(getViewStates);
  //const themeContext = useContext(ThemeContext);
  //const isSmall = useMediaQuery(themeContext.breakpoint.mediaQuery.small);

  return (
    <Wrapper
     // ref={view}
     // animate={views.Menu ? "open" : "closed"}
     // variants={getAnimatedWrapperVariants(isSmall)}
    >
      <User />
      <Typography>Have list of people in group here</Typography>
    </Wrapper>
  );
};

export { Menu };