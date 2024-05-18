import { ThemeProvider } from "@emotion/react";
import { Container } from "@mui/material";
import theme from "../styles/theme";
import { useSelector } from "react-redux";
import Dashboard from "../components/admin/dashboard";

const AdminPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: "#fff",
        }}
      >
        {<Dashboard userId={userInfo.id}></Dashboard>}
      </Container>
    </ThemeProvider>
  );
};

export default AdminPage;
