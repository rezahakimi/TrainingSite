import * as React from "react";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AppbarContainer,
  AppbarHeader,
  MainTopMenu,
} from "../../styles/appbar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import Actions from "./actions";
import { useDispatch } from "react-redux";
import { setShowSearchBox } from "../../slices/uiSlice";
import { NavLink } from "react-router-dom";

const AppbarDesktop=({ userInfo, matches }) =>{
 // const { showSearchBox } = useSelector((state) => state.ui);
  //console.log(showSearchBox)

  const dispatch = useDispatch();

  // const { setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer>
      <AppbarHeader variant="h4">ZaMi</AppbarHeader>
      <MainTopMenu type="row">
        <ListItem>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={<NavLink to="/">Home</NavLink>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary={<NavLink to="/articles">Articles</NavLink>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText
            primary={<NavLink to="/articles/?cat=all">Categories</NavLink>}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={<NavLink to="/users">Users</NavLink>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary={<NavLink to="/useradmin">Admin</NavLink>} />
        </ListItem>

        <ListItemButton onClick={() => dispatch(setShowSearchBox(true))}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
        </ListItemButton>
      </MainTopMenu>
      <Actions matches={matches} userInfo={userInfo} />
    </AppbarContainer>
  );
}

export default React.memo(AppbarDesktop);