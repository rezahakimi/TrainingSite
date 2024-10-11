import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import UserInfo from "../features/user/components/userInfo";
import FriendsList from "../features/user/components/friendsList";

const UserPage = ({userInfo}) => {
  const { userid } = useParams();

  let userProfileRender;

  userProfileRender = <UserInfo userId={userid}></UserInfo>;
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
        <Grid item xs={2}>
          <FriendsList userId={userInfo.id}></FriendsList>
        </Grid>
        <Grid item container direction="column" xs={8} spacing={2}>
          <Grid item xs>
            <div>2</div>
          </Grid>
          <Grid item xs>
            {userProfileRender}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          jhj
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default UserPage;
