import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  AppbarActionIcons,
  AppbarContainer,
  AppbarHeader,
  MyList,
} from "../../styles/appbar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import Actions from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { setShowSearchBox } from "../../slices/uiSlice";
import { NavLink } from "react-router-dom";

export default function AppbarDesktop({ matches }) {
  const { showSearchBox } = useSelector((state) => state.ui);
  //console.log(showSearchBox)

  const dispatch = useDispatch();

  // const { setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer>
      <AppbarHeader variant="h4">ZaMi</AppbarHeader>
      <MyList type="row">
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
      </MyList>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}
