import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container, Grid } from "@mui/material";
import UsersList from "../features/user/components/usersList";
import UserInfo from "../features/user/components/userInfo";
import { FriendsList } from "../features/user";
import { useParams } from "react-router-dom";

const UsersPage = () => {
  const { userid } = useParams();

  useEffect(() => {
    //if(userInfo)
  },[]);

  //const { userid } = useParams();

  let userProfileRender;
  const handleFriendClicks = async (friendIdEntry, event) => {
    //navigate("/users/" + friendId + "/");
  };
  const onHandleUserClick = async (userIdEntry, event) => {
    //navigate("/users/" + friendId + "/");
  };
  
  if(userid)
  userProfileRender = <UserInfo userId={userid}></UserInfo>;

  let usersRender;
if(!userid)
  usersRender = <UsersList displayType="all" ></UsersList>;
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: "#fff",
        }}
      ></Container>

      <Grid container direction="row" spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item container direction="column" xs={8} spacing={2}>
          <Grid item xs>
            <div>2</div>
          </Grid>
          <Grid item xs>
            
            {/* {userInfo? ((userId || userInfo) && userProfileRender) : usersRender} */}
            {usersRender}
            {userProfileRender}
          </Grid>
        </Grid>
        <Grid item xs={2}>
        {userid &&(<FriendsList userId={userid}></FriendsList>)}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default UsersPage;
