import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container, Grid, Box } from "@mui/material";
import ArticleList from "../components/article/articleList";
import { useLocation, useParams } from "react-router-dom";
import ArticleDetails from "../components/article/articleDetails";

const ArtilesPage = () => {
  const { articleid } = useParams();
  const location = useLocation();
  const articleCatQuery = new URLSearchParams(location.search).get("cat");
  let articlesRender;

  if (articleid) {
    articlesRender = <ArticleDetails articleId={articleid}></ArticleDetails>;
  } else {
    if (articleCatQuery) {
      articlesRender = <ArticleList catId={articleCatQuery}></ArticleList>;
    } else {
      articlesRender = <ArticleList></ArticleList>;
    }
  }
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
            {articlesRender}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <div>4</div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ArtilesPage;
