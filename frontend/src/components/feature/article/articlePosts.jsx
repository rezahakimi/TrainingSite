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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import ArticleRow from "./articleRow";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import {
  useCreateArticlePostMutation,
  useGetAllArticlePostsByArticleIdQuery,
} from "../../../slices/articlePostApiSlice.js";
import MyButton from "../../ui/myButton.jsx";

const ArtilePosts = ({ articleId, userId }) => {
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
    accept: true,
  });
  const [createArticlePost] = useCreateArticlePostMutation();
  const [postText, setPostText] = useState("");
  useEffect(() => {
    //   //   //setPassengersList(data.data);
    //   console.log(data);
    //   if (data) {
    //     setUsers({ ...articlesData, ...data });
    //   } else if (pagingController.page > 1) {
    //     setNoMoreResults(true);
    //   }
  }, []);

  const handleSendPost = async () => {
    console.log(userId);
    const res = await createArticlePost({
      articleId: articleId,
      userId: userId,
      comment: postText,
    }).unwrap();

    if (res) {
      setPostText("");
    }
  };

  if (isGetLoading && !data) {
    return <div>Loading...</div>;
  }
  if (isGetFetching) {
    return <div>Fetching...</div>;
  }
  if (isGetError) {
    return <div>Message: {getGetArtilePostsError}</div>;
  }

  const renderArticlePosts = data.articlePostsData.map((ap) => {
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
          {matches ? (
            <div>sdfsdf</div>
          ) : (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={ap.commentCreateFullName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {ap.comment}
                    </Typography>
                    {" more ..."}
                  </React.Fragment>
                }
              />
            </ListItem>
          )}
        </Container>
      </Grid>
    );
  });
  return (
    <Container>
      {/* <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="flex-start"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      > */}

      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Typography variant="h4" gutterBottom>
          Comments
        </Typography>
      </Box>
      <TextField
        id="outlined-multiline-flexible"
        label="Add to the discussion"
        multiline
        fullWidth
        maxRows={4}
        onChange={(e) => setPostText(e.target.value)}
      />
      <MyButton onClick={handleSendPost}>Send</MyButton>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {renderArticlePosts}
      </List>
      {/* </Grid> */}
    </Container>
  );
};

export default ArtilePosts;
