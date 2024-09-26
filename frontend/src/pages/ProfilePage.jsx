import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Container, Grid, Box } from "@mui/material";
import ProfileManage from "../features/user/components/profileManage";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

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
          <div>1</div>
        </Grid>
        <Grid item container direction="column" xs={8} spacing={2}>
          <Grid item xs>
            <div>2</div>
          </Grid>
          <Grid item xs>
            <ProfileManage userId={userInfo.id}></ProfileManage>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <div>4</div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ProfilePage;
