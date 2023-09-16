import {
  MenuItem,
  Typography,
  Button,
  Divider,
  ListItemButton,
  ListItemIcon,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
} from "@mui/material";
import {
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
  MyList,
} from "../../styles/appbar";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/authApiSlice";
import { logout } from "../../slices/authSlice";
import { useState } from "react";
import avator from "../../assets/images/avatar/2.jpg";
import LoginIcon from "@mui/icons-material/Login";

export default function Actions({ matches }) {
  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;
  //console.log(matches)
  const { userInfo } = useSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      const refreshToken = userInfo.refreshToken;
      await logoutApiCall({ refreshToken }).unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = (menuType, event) => {
    if (menuType === "profile") {
    } else if (menuType === "logout") {
    }
    setAnchorElUser(null);
  };

  return (
    <Component>
      <MyList type="row">
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <ShoppingCartIcon />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <FavoriteIcon />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        {userInfo ? (
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              {/* <PersonIcon /> */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={avator} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={
                    /* {
                  vertical: "top",
                  horizontal: "right",
                } */
                    matches
                      ? {
                          vertical: "top",
                          horizontal: "right",
                        }
                      : {
                          vertical: "bottom",
                          horizontal: "right",
                        }
                  }
                  keepMounted
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                >
                  <MenuItem
                    key="profile"
                    onClick={(event) => handleCloseMenu("profile")}
                  >
                    <Typography textAlign="center">پروفایل</Typography>
                  </MenuItem>
                  <MenuItem key="logout" onClick={logoutHandler}>
                    <Typography textAlign="center">خروج</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </ListItemIcon>
          </ListItemButton>
        ) : (
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              <LoginIcon
                onClick={() => {
                  navigate("/login");
                }}
              />
            </ListItemIcon>
          </ListItemButton>
        )}
        <Divider orientation="vertical" flexItem />
      </MyList>
    </Component>
  );
}
