import React from "react";
import { Box, Paper, Grid, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetAllArticleCatsQuery } from "../../../slices/articleCatApiSlice";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { border } from "polished";
import { NavLink } from "react-router-dom";
const pagesize = 3;

const ArticleCatList = () => {
  //console.log(catId);
  const { data: articleCats = [] } = useGetAllArticleCatsQuery();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const renderProducts = articleCats.map((ac) => {
    return (
      <Grid
        item
        key={ac.id}
        /*  xs={2}
        sm={4}
        md={4} */
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
            <NavLink to={`/articles/?cat=${ac.id}/`}>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                {ac.title}
              </Typography>
            </NavLink>
          )}
        </Container>
      </Grid>
    );
  });

  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderProducts}
      </Grid>
      {/* <AppPagination setProducts={(p) => SetProducts(p)}></AppPagination> */}
    </Container>
  );
};

export default ArticleCatList;
