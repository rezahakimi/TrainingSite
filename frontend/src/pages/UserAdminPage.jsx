import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Container,
  Grid,
  Box,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Drawer,
  Toolbar,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import ArticleList from "../components/article/articleList";
import { useLocation, useParams } from "react-router-dom";
import ArticleDetails from "../components/article/articleDetails";
import UserInfo from "../components/user/userInfo";
import { useSelector } from "react-redux";
import FriendsList from "../components/user/friendsList";
import FriendsRequestList from "../components/user/friendsRequestList";
import ArticleManager from "../components/admin/articlemanager";
import ProfileManage from "../components/user/profileManage";
import ArticlePostManager from "../components/admin/articlePostManager";

const UserAdminPage = () => {
  const drawerWidth = 240;
  const { userInfo } = useSelector((state) => state.auth);
  const [component, setComponent] = useState("profile");

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
          {/* <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            > */}
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem disablePadding onClick={() => setComponent("profile")}>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => setComponent("article")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Article" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => setComponent("friends")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Friends" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => setComponent("newposts")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Posts" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          {/* </Drawer> */}
        </Grid>
        <Grid item container direction="column" xs={8} spacing={2}>
          <Grid item xs>
            <h1>Settings</h1>
          </Grid>
          <Grid item xs>
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
              <Toolbar />
              <main>
                {component === "profile" ? (
                  <ProfileManage userId={userInfo.id}></ProfileManage>
                ) : null}
                {component === "friends" ? (
                  <>
                    <h3>My Friends Request</h3>
                    <FriendsRequestList
                      userId={userInfo.id}
                    ></FriendsRequestList>
                  </>
                ) : null}
                {component === "article" ? (
                  <>
                    <h3>My Articles Manager</h3>
                    <ArticleManager userInfo={userInfo} />
                  </>
                ) : null}
                {component === "newposts" ? (
                  <>
                    <h3>My Articles Manager</h3>
                    <ArticlePostManager userInfo={userInfo} />
                  </>
                ) : null}
              </main>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <div>Friends</div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default UserAdminPage;
