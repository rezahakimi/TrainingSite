import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container, Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import UsersList from "../features/user/components/usersList";

const UsersPage = () => {
  const { myUserInfo } = useSelector((state) => state.auth);
  let usersRender;

  usersRender = <UsersList displayType="all"></UsersList>;
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
        <Grid item xs={2}></Grid>
        <Grid item container direction="column" xs={8} spacing={2}>
          <Grid item xs>
            <div>2</div>
          </Grid>
          <Grid item xs>
            {usersRender}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          jhj
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default UsersPage;
