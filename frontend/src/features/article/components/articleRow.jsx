import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Link,
  Chip,
  Stack,
} from "@mui/material";
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
            <NavLink to={`/users/${article.createdUserId}/`}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {article.createdUser}
              </Typography>
            </NavLink>

            <Typography variant="h5" component="div">
              <NavLink to={`/articles/${article.id}/`}>{article.title}</NavLink>
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: article.abstract }}></div>
            <Stack direction="row" spacing={1}>
              {article.categories.map((cat, index) => (
                <NavLink key={cat.id} to={`/articles/?cat=${cat.id}/`}>
                  <Chip variant="outlined" label={"#" + cat.title} clickable />
                </NavLink>
              ))}
            </Stack>
          </CardContent>
          <CardActions>
            <NavLink to={`/articles/${article.id}/`}>Learn More</NavLink>
            <Chip
              label={"likes " + article.iLikesCount}
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
            />
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default ArticleRow;
