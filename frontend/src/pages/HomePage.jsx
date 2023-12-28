import React from "react";
import Appbar from "../components/appbar";
import SearchBox from "../components/common/search";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container, Grid, Box } from "@mui/material";
import ArticleList from "../components/article/articleList";
import Friends from "../components/user/friends";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

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
          <div>1</div>
        </Grid>
        <Grid item container direction="column" xs={8} spacing={2}>
          <Grid item xs>
            <div>2</div>
          </Grid>
          <Grid item xs>
            <ArticleList></ArticleList>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Friends userId={userInfo.id}></Friends>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default HomePage;
