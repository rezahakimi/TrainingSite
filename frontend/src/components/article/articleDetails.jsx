import { Box, Typography, Stack, Chip, Button, Container } from "@mui/material";
import {
  useGetArticleByIdQuery,
  useGetUserLikeArticleQuery,
  useILikeArticleMutation,
  useIDisLikeArticleMutation,
} from "../../slices/articleApiSlice";
import { NavLink, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import ArtilePosts from "./articlePosts";

const ArticleDetails = ({ articleId, userId }) => {
  const { data: article, error, isLoading } = useGetArticleByIdQuery(articleId);
  const [iLikedArticle, setILikedArticle] = useState(false);
  const [iWriteArticle, setIWriteArticle] = useState(false);

  const [iLikeArticle] = useILikeArticleMutation();
  const [iDisLikeArticle] = useIDisLikeArticleMutation();

  let navigate = useNavigate();

  useEffect(() => {
    setILikedArticle((iliked) => false);
    setIWriteArticle((iWrite) => false);

    if (article) {
      article.iLikes.map((a) => {
        if (a.userId === userId) setILikedArticle((iliked) => true);
      });
      if (article.createdUserId === userId) setIWriteArticle((iWrite) => true);
    }
  }, [article]);

  const handleClick = async () => {
    if (iLikedArticle) {
      const res = await iDisLikeArticle({
        articleId,
        userId,
      }).unwrap();

      if (res) {
        setILikedArticle((iliked) => false);
      }
    } else {
      const res = await iLikeArticle({
        articleId,
        userId,
      }).unwrap();

      if (res) {
        setILikedArticle((iliked) => true);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  //console.log(article.categories);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  let renderLikedIcon = <></>;
  if (!iWriteArticle) {
    renderLikedIcon = (
      <Chip
        icon={<FavoriteBorderIcon />}
        onClick={handleClick}
        label="With Icon"
      />
    );
    if (iLikedArticle)
      renderLikedIcon = (
        <Chip icon={<FavoriteIcon />} onClick={handleClick} label="i like" />
      );
  }
  // console.log(iWriteArticle);

  //console.log(iLikedArticle);
  return (
    <>
      <Box
        sx={{
          borderRadius: 1,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          /* bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          }, */
        }}
      >
        <Stack direction="row" justifyContent="start">
          <Button variant="text" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Typography variant={"h5"} lineHeight={2}>
            <div dangerouslySetInnerHTML={{ __html: article.title }}></div>
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center">
          <NavLink to={`/users/${article.createdUserId}/`}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {article.createdUser}
            </Typography>
          </NavLink>
          <Typography sx={{ fontSize: 14 }}>{article.createdDate}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center">
          {article.categories.map((cat, index) => {
            return (
              <NavLink key={cat.id} to={`/articles/?cat=${cat.id}/`}>
                <Chip variant="outlined" label={cat.title} clickable />
              </NavLink>
            );
          })}
        </Stack>
        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
        <Stack direction="row" spacing={1}>
          {renderLikedIcon}
        </Stack>
      </Box>
      <ArtilePosts articleId={article.id}></ArtilePosts>
    </>
  );
};

export default ArticleDetails;
