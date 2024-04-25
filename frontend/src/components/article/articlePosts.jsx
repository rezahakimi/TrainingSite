import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Container,
  TablePagination,
  TextField,
  Button,
} from "@mui/material";
import ArticleRow from "./articleRow";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import { useGetAllArticlePostsByArticleIdQuery } from "../../slices/articlePostApiSlice.js";

const ArtilePosts = ({ articleId }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const {
    data,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getGetArtilePostsError,
    isFetching: isGetFetching,
  } = useGetAllArticlePostsByArticleIdQuery({
    articleId: articleId,
  });

  useEffect(() => {
    //   //   //setPassengersList(data.data);
    //   console.log(data);
    //   if (data) {
    //     setUsers({ ...articlesData, ...data });
    //   } else if (pagingController.page > 1) {
    //     setNoMoreResults(true);
    //   }
  }, []);

  if (isGetLoading && !data) {
    return <div>Loading...</div>;
  }
  if (isGetFetching) {
    return <div>Fetching...</div>;
  }
  if (isGetError) {
    return <div>Message: {getGetArtilePostsError}</div>;
  }
  console.log(data);

  /*   const renderArticlePosts = data.articlePostsData.map((ap) => {
    return (
      <Grid
        item
        key={ap.id}
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
          {matches ? <div>sdfsdf</div> : <div>{ap.id}</div>}
        </Container>
      </Grid>
    );
  }); */
  return (
    <Container>
      {/* <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
          {renderArticlePosts} 
      </Grid> */}
    </Container>
  );
};

export default ArtilePosts;
