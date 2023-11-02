import React from "react";
import { styled } from "@mui/material/styles";
import { Box,Typography, Card, CardContent, CardActions, Button, Container, Link } from "@mui/material";
import { NavLink } from "react-router-dom";

/* export const MyArticle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    position: "relative",
  },
}));

export const MyArticleMetaWrapper = styled(Box)(({ theme }) => ({
  padding: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})); */

const ArticleRow = ({ article, matches }) => {
  return (
    <>
 <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: "#fff",
        }}
      >
             <Card sx={{ sx: 1.0 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {article.createdUser}
        </Typography>

        <Typography variant="h5" component="div">
        <NavLink exact to={`/articles/${article.id}/`}>{article.title}</NavLink>
        
        </Typography>
       
        <Typography variant="body2">
        {article.content}
        </Typography>
      </CardContent>
      <CardActions>
      <NavLink exact to={`/articles/${article.id}/`}>Learn More</NavLink>
      </CardActions>
    </Card>
    </Container>
    </>
  );
};

export default ArticleRow;
