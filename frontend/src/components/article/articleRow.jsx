import React from "react";
import { styled } from "@mui/material/styles";
import { Box,Typography, Card, CardContent, CardActions, Button, Container } from "@mui/material";

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
        {article.title}
        </Typography>
       
        <Typography variant="body2">
        {article.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Container>
    </>
  );
};

export default ArticleRow;
