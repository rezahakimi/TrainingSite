import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container, Grid, Box } from "@mui/material";
import ArticleList from "../components/article/articleList";
import { useLocation, useParams } from "react-router-dom";
import ArticleDetails from "../components/article/articleDetails";
import UserInfo from "../components/user/userInfo";
import { useSelector } from "react-redux";
import FriendsList from "../components/user/friendsList";

const UserPage = () => {
  const { userid } = useParams();
  const { myUserInfo } = useSelector((state) => state.auth);
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
          <FriendsList userId={userid}></FriendsList>
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
