import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Container,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetAllArticlesQuery } from "../../slices/articleApiSlice";
import ArticleRow from "./articleRow";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { border } from "polished";
const pagesize = 3;

const ArticleList = ({ catId }) => {
  //console.log(catId);
  const {
    data: articlesData,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getUserError,
    isFetching: isGetFetching,
  } = useGetAllArticlesQuery(catId);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [articlesCount, setArticlesCount] = useState(0);
  const [pagingController, setPagingController] = useState({
    page: 0,
    rowsPerPage: 2,
  });

  useEffect(() => {
    //setPassengersList(data.data);
    if (articlesData) setArticlesCount(articlesData.artilesCount);
  }, [pagingController]);

  //const [articles, SetArticless] = useState<IProducts[]>([]);
  /*   const getArticlesByPaging = {
    getdata: (from, to) => {
      const data = articles.slice(from, to);
      return new Promise((resolve, reject) => {
        resolve({
          count: articles.length,
          data: data,
        });
      });
    },
  }; */

  const handlePageChange = (event, newPage) => {
    setPagingController({
      ...pagingController,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagingController({
      ...pagingController,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };
  if (isGetLoading && !articlesData) {
    return <div>Loading...</div>;
  }
  console.log(articlesData.articlesData);
  const renderProducts = articlesData.articlesData.map((a) => {
    return (
      <Grid
        item
        key={a.id}
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
            /*           <div style={{border: '1px solid red'}}>
             */ <ArticleRow article={a} matches={matches} />
            /* </div> */
            /*           <SingleProductDesktop product={product} matches={matches} />
             */
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
      <TablePagination
        component="div"
        onPageChange={handlePageChange}
        page={pagingController.page}
        count={articlesCount}
        rowsPerPage={pagingController.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default ArticleList;
