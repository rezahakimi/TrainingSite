import { ThemeProvider } from "@emotion/react"
import { Container } from "@mui/material"
import theme from "../styles/theme"
import { useSelector } from "react-redux";
import Dashboard from "../components/admin/dashboard";

const AdminPage = () => {

    return (
      <ThemeProvider theme={theme}>
        <Container
          disableGutters
          maxWidth="xl"
          sx={{
            background: "#fff",
          }}
        >
      {
       <Dashboard></Dashboard>
      }
      </Container>
      </ThemeProvider>
    )
  }
  
  export default AdminPage