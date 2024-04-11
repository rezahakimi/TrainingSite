import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Container,
  TablePagination,
  TextField,
  Button,
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

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [pagingController, setPagingController] = useState({
    page: 0,
    pageSize: 2,
    count: 5,
  });

  const [searchContent, setSearchContent] = useState("");

  // const [articlesData, setUsers] = useState({
  //   articlesData: [],
  //   artilesCount: 5,
  // });

  //console.log(pagingController.page);
  let pageNumber = pagingController.page;
  let pageSize = pagingController.pageSize;

  const {
    data,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getUserError,
    isFetching: isGetFetching,
  } = useGetAllArticlesQuery(
    {
      catId: catId,
      pageNumber: pageNumber,
      pageSize: pageSize,
      search: searchContent,
    }
    // ,
    // {
    //   skip: noMoreResults,
    // }
  );

  useEffect(() => {
    //   //   //setPassengersList(data.data);
    //   console.log(data);
    //   if (data) {
    //     setUsers({ ...articlesData, ...data });
    //   } else if (pagingController.page > 1) {
    //     setNoMoreResults(true);
    //   }
    if (data)
      setPagingController({
        ...pagingController,
        count: data.artilcesCount,
      });
  }, [data]);

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
      pageSize: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  /*   function handleSearchTextBoxChanged(value) {
    setSearchTextBoxContent(value);
  } */
  const handleSearch = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const txtSearch = data.get("txtSearch");
    setSearchContent(txtSearch);
    setPagingController({
      ...pagingController,
      page: 0,
    });
  };
  if (isGetLoading && !data) {
    return <div>Loading...</div>;
  }

  //console.log(pagingController.page);
  //console.log(pagingController.pageSize);
  console.log(pagingController.count);
  //console.log(data.articlesData);
  //console.log(data.artilcesCount);

  const renderProducts = data.articlesData.map((a) => {
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
      <Box
        component="form"
        sx={{
          p: { xs: 4, md: 10 },
          pt: 12,
          pb: 12,
          fontSize: { xs: "12px", md: "14px" },
        }}
        onSubmit={handleSearch}
      >
        <TextField
          id="txtSearch"
          name="txtSearch"
          variant="standard"
          label="Search"
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
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
          page={
            !pagingController.count || pagingController.count <= 0
              ? 1
              : pagingController.page
          }
          count={pagingController.count || 0}
          rowsPerPage={pagingController.pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[2, 4, 6, 8, { value: -1, label: "All" }]}
        />
      </Box>
    </Container>
  );
};

export default ArticleList;
