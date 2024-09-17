import React from "react";
import Appbar from "../components/appbar";
import SearchBox from "../components/common/search";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container, Grid, Box } from "@mui/material";
import ArticleList from "../components/feature/article/articleList";
import FriendsList from "../components/feature/user/friendsList";
import { useSelector } from "react-redux";

const InaccessibilityPage = () => {
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
            <h1>Inaccessibility Page</h1>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default InaccessibilityPage;
