import React, { useEffect, useRef, useState } from "react";
import {
  useGetAllArticleCatsQuery,
  useDeleteArticleCatMutation,
} from "../../slices/articleCatApiSlice";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stack,
  useMediaQuery,
  Grid,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArticleCatmanagerDialog from "./articleCatmanagerDialog";
import { useGetArticlesNewPostByUserIdQuery } from "../../slices/articleApiSlice";
import { useTheme } from "@emotion/react";

const ArticlePostManager = ({ userInfo }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  // const childRef = useRef(null);
  let userid = userInfo.id;
  const {
    data: articleWithPosts = [],
    isLoading: isGetArticlesNewPostsLoading,
    isSuccess: isGetArticlesNewPostsSuccess,
    isError: isGetArticlesNewPostsError,
    error: getGetArticlesNewPostsError,
    isFetching: isGetArticlesNewPostsFetching,
  } = useGetArticlesNewPostByUserIdQuery({
    userid,
  });

  useEffect(() => {}, []);

  const onDisplayAddModalButtonClick = (e) => {};

  const handleCloseModal = () => {};

  if (isGetArticlesNewPostsLoading && !articleWithPosts) {
    return <div>Loading...</div>;
  }
  if (isGetArticlesNewPostsFetching) {
    return <div>Fetching...</div>;
  }
  if (isGetArticlesNewPostsError) {
    return <div>Message: {getGetArticlesNewPostsError}</div>;
  }

  const renderArticleWithPosts = articleWithPosts.map((a) => {
    if (a.comments.length > 0)
      return (
        <Grid
          item
          key={a.id}
          /*  xs={2}
        sm={4}
        md={4} */
          xs={12}
          sm={12}
          md={12}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
        >
          <Container
            disableGutters
            maxWidth="xl"
            sx={{
              background: "#fff",
            }}
          >
            {matches ? <div>sdfsdf</div> : <div>{a.articleTitle}</div>}
            {a.comments.map((ac) => {
              return matches ? <div>xxxxxx</div> : <div>{ac.id}</div>;
            })}
          </Container>
        </Grid>
      );
  });

  return <>{renderArticleWithPosts} </>;
};

export default ArticlePostManager;
