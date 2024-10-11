import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container, Grid } from "@mui/material";
import {ArticleList} from "../features/article";

const HomePage = () => {

  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: "#fff",
        }}
      ></Container>

      <Grid container direction="row" spacing={2}>
        <Grid item xs={2}>
        </Grid>
        <Grid item container direction="column" xs={10} spacing={2}>
          {/* <Grid item xs>
            <div>2</div>
          </Grid> */}
          <Grid item xs>
            <ArticleList></ArticleList>
          </Grid>
        </Grid>
         <Grid item xs={2}>

        </Grid> 
      </Grid>
    </ThemeProvider>
  );
};

export default HomePage;
