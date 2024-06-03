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

const UserListData = ({ user, matches }) => {
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
            <NavLink to={`/users/${user.id}/`}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {user.firstname + " " + user.lastname}
              </Typography>
            </NavLink>
          </CardContent>
          <CardActions>
            <NavLink to={`/users/${user.id}/`}>More info</NavLink>
            <Chip
              label={"friends " + user.iLikesCount}
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
            />
            <Chip
              label={"articles " + user.iLikesCount}
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

export default UserListData;
