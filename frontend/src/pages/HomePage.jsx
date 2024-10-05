import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container, Grid, Box } from "@mui/material";
import {ArticleList} from "../features/article";
import {FriendsList} from "../features/user";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  //console.log(userInfo);
  let friendsListRender = null;
  if (userInfo != null)
    friendsListRender = <FriendsList userInfo={userInfo}></FriendsList>;

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
          {friendsListRender}
        </Grid>
        <Grid item container direction="column" xs={10} spacing={2}>
          {/* <Grid item xs>
            <div>2</div>
          </Grid> */}
          <Grid item xs>
            <ArticleList></ArticleList>
          </Grid>
        </Grid>
         <Grid item xs={2}>
          right
        </Grid> 
      </Grid>
    </ThemeProvider>
  );
};

export default HomePage;
