import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  ListItemButton,
  ListItemIcon,
  Divider,
  List,
} from "@mui/material";
import React, { useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";
import UserManager from "./usermanager";
import ArticleManager from "./articlemanager";
import ArticleCatManager from "./articleCatmanager";

const Dashboard = () => {
  const drawerWidth = 240;
  const { userInfo } = useSelector((state) => state.auth);
  const [component, setComponent] = useState("user");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
              <ListItem disablePadding  onClick={() => setComponent("user")}>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon /> 
                  </ListItemIcon>
                  <ListItemText primary="UserManager" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding  onClick={() => setComponent("article")}>
                <ListItemButton>
                  <ListItemIcon>
                     <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Article" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding  onClick={() => setComponent("articlecat")}>
                <ListItemButton>
                  <ListItemIcon>
                     <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Article Category" />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <main>
          {component === "user" ? <UserManager /> : null}
          {component === "article" ? <ArticleManager /> : null}
          {component === "articlecat" ? <ArticleCatManager /> : null}
        </main>
      </Box>
    </Box>
  );
};

export default Dashboard;
