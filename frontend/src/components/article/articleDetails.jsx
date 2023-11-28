import { Box, Typography, Stack, Chip } from "@mui/material";
import { useGetArticleByIdQuery } from "../../slices/articleApiSlice";
import { NavLink } from "react-router-dom";

const ArticleDetails = ({ articleId }) => {
  const { data: article, error, isLoading } = useGetArticleByIdQuery(articleId);
  console.log(article);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
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
        {article.categories.map((cat, index) => (
          <NavLink key={cat.id} to={`/articles/?cat=${cat.id}/`}>
            <Chip variant="outlined" label={cat.title} clickable />
          </NavLink>
        ))}
      </Stack>
      <Typography variant={"h5"} lineHeight={2}>
        {article.title}
      </Typography>
      <Typography variant={"body1"}>${article.content}</Typography>
    </Box>
  );
};

export default ArticleDetails;
