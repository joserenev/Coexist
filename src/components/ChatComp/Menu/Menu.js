import React, { useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Group from "../../Groups/Group";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ListItemText from "@material-ui/core/ListItemText";
//import { MyConversations } from "features/joinedConversations/MyConversations/MyConversations";
import {Wrapper} from "./Menu.style";
import Typography from "@material-ui/core/Typography";
import Member from "../Member"
import User from "../../User/User"
import SimpleUserProfileView from "../../User/SimpleUserProfileView";
import ErrorPage from "../../../pages/Error/ErrorPage"
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { getGroup } from "../../../customGraphql/queries";
import LoadingPage from "../../../pages/Loading/LoadingPage"

const useStyles = makeStyles(theme => ({
  
}));

function Menu(props): React.MixedElement {
  //const view = useRef<HTMLElement>(null);
  //const views = useSelector(getViewStates);
  //const themeContext = useContext(ThemeContext);
  //const isSmall = useMediaQuery(themeContext.breakpoint.mediaQuery.small);
  const classes = useStyles();
  const groupID = props.match?.params?.groupID ?? "";
  const { currentUserID = "" } = props;

  /*const isCurrentUserInGroup = useCallback(
    groupData => {
        const items = groupData?.users?.items ?? [];
        return items.some(groupItem => {
            return groupItem.user.id === currentUserID;
        });
    },
    [currentUserID]
    );
*/
  return (
    <Wrapper>
      <Connect query={graphqlOperation(getGroup, { id: groupID })}>
            {({ data, loading, error }) => {
                if (error) {
                    //TODO: Add a dedicated ERROR Component with a message to show.
                    return <h3>Error</h3>;
                }

                if (loading) {
                    return <LoadingPage />;
                }
                const groupData = data.getGroup ?? null;
                const {
                  users = {}
                } = groupData ?? {};
              const { items = [] } = users ?? [];
              const memberItems = items
              .filter(memberItem => {
                return (
                    memberItem != null && memberItem.group != null
                );
            })
            
                return(
                  <Card className={classes.card}>
                  <CardContent>
                      <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                      >
                          Members' List
                      </Typography>
                      {memberItems.length === 0 && (
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
                                              "No Members found"
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
                                              "Add members group to your group to continue"
                                          }
                                      </Typography>
                                  </React.Fragment>
                              }
                          />
                      )}
                      {memberItems.map(memberItem => {
                          return (
                              <div key={memberItem.id}>
                                  <Member
                                      member={
                                          memberItem.group
                                      }
                                  />
                                  <Divider
                                      variant="inset"
                                      component="li"
                                  />
                              </div>
                          );
                      })}
                  </CardContent>
              </Card>
                  
                  
                );
                /*if (!isCurrentUserInGroup(data?.getGroup)) {
                    return <ErrorPage />;
                }
                
                return (
                    <>
                        <div className={classes.groupInfoContainer}>
                            <Typography variant="h1">
                                {data?.getGroup?.users?.items?.user?.name ?? "Member Name"}
                            </Typography>
        
                        </div>
                      
                    </>
                );
                */
            }}
        </Connect>
    );
    </Wrapper>
  );
};

export { Menu };
