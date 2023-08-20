import { Outlet } from "react-router-dom";
import Appbar from "./components/appbar";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";
import { Container } from "@mui/material";
import SearchBox from "./components/search";

function App() {
  useEffect(() => {
    document.title = "React Toturial";
  }, []);
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
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
