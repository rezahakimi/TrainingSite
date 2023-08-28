import React from 'react'
import Appbar from '../components/appbar'
import SearchBox from '../components/search'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container } from "@mui/material";

const HomePage = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: "#fff",
        }}
      >
        <Appbar />
        <SearchBox />
    fdgdgdgf
    </Container>
    </ThemeProvider>
  )
}

export default HomePage