import { Box, Typography } from "@mui/material";
import { useGetArticleByIdQuery } from "../../slices/articleApiSlice";


const ArticleDetails = ({articleId}) => {
    const { data: article, error, isLoading } = useGetArticleByIdQuery(articleId);
    console.log(article)
    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    return(
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
        <Typography variant={"h5"} lineHeight={2}>
        {article.title}
        </Typography>
        <Typography variant={"body1"}>
          ${article.content}
        </Typography>
      </Box>
    )
}

export default ArticleDetails;
