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
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={<NavLink to="/">Home</NavLink>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={<NavLink to="/articles">Articles</NavLink>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            primary={<NavLink to="/articles/?cat=all">Categories</NavLink>}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
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
