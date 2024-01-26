import { Box, Typography, Stack, Chip } from "@mui/material";
import {
  useGetArticleByIdQuery,
  useGetUserLikeArticleQuery,
} from "../../slices/articleApiSlice";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ArticleDetails = ({ articleId, userId }) => {
  const { data: article, error, isLoading } = useGetArticleByIdQuery(articleId);
  /*  const {
    data: userLikeArticle,
    isLoading: isGetUserLikeArticleLoading,
    isSuccess: isGetUserLikeArticleSuccess,
    isError: isGetUserLikeArticleError,
    error: getGetUserLikeArticleError,
    isFetching: isGetUserLikeArticleFetching,
  } = useGetUserLikeArticleQuery({ articleId, userId }); */
  //const [requestFriend] = useRequestFriendMutation();

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  //console.log(article.categories);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(article);
  return (
    <Box
      sx={{
        borderRadius: 1,
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        /* bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          }, */
      }}
    >
      <Stack direction="row" spacing={1}>
        {article.categories.map((cat, index) => {
          return (
            <NavLink key={cat.id} to={`/articles/?cat=${cat.id}/`}>
              <Chip variant="outlined" label={cat.title} clickable />
            </NavLink>
          );
        })}
      </Stack>
      <Typography variant={"h5"} lineHeight={2}>
        <div dangerouslySetInnerHTML={{ __html: article.title }}></div>
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      <Stack direction="row" spacing={1}>
        <Chip icon={<FavoriteIcon />} onClick={handleClick} label="With Icon" />
        <Chip
          icon={<FavoriteBorderIcon />}
          onClick={handleClick}
          label="With Icon"
          variant="outlined"
        />
      </Stack>
    </Box>
  );
};

export default ArticleDetails;
