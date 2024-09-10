import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Container,
  Grid,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  Toolbar,
} from "@mui/material";
import ArticleList from "../components/article/articleList";
import { useLocation, useParams } from "react-router-dom";
import ArticleDetails from "../components/article/articleDetails";
import { useSelector } from "react-redux";
import ArticleCatList from "../components/article/articleCatList";

const ArtilesPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [component, setComponent] = useState("all");
  const { articleid } = useParams();
  const location = useLocation();
  const articleCatQuery = new URLSearchParams(location.search).get("cat");
  let articlesRender;

  if (articleid) {
    articlesRender = (
      <ArticleDetails
        articleId={articleid}
        userId={userInfo.id}
      ></ArticleDetails>
    );
  } else {
    if (articleCatQuery) {
      if (articleCatQuery === "all") {
        articlesRender = <ArticleCatList></ArticleCatList>;
      } else {
        if (component === "all") {
          articlesRender = (
            <ArticleList
              catId={articleCatQuery}
              displayType="all"
            ></ArticleList>
          );
        } else if (component === "latest") {
          articlesRender = (
            <ArticleList
              catId={articleCatQuery}
              displayType="latest"
            ></ArticleList>
          );
        } else if (component === "top") {
          articlesRender = (
            <ArticleList
              catId={articleCatQuery}
              displayType="top"
            ></ArticleList>
          );
        }
      }
    } else {
      if (component === "all") {
        articlesRender = <ArticleList displayType="all"></ArticleList>;
      } else if (component === "top") {
        articlesRender = <ArticleList displayType="top"></ArticleList>;
      } else if (component === "latest") {
        articlesRender = <ArticleList displayType="latest"></ArticleList>;
      }
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
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
          {!articleid ? ( <List>
              <ListItem disablePadding onClick={() => setComponent("all")}>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="All" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => setComponent("latest")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Latest" />
                </ListItemButton>
              </ListItem>
              {/*  <ListItem disablePadding onClick={() => setComponent("relevant")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Relevant" />
                </ListItemButton>
              </ListItem> */}
              <ListItem disablePadding onClick={() => setComponent("top")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Top" />
                </ListItemButton>
              </ListItem>
            </List>):(<div></div>)}
          </Box>
        </Grid>
        <Grid item container direction="column" xs={8} spacing={2}>
          {/* <Grid item xs>
            <div>2</div>
          </Grid> */}
          <Grid item xs>
            {articlesRender}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          {/* <div>4</div> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ArtilesPage;
