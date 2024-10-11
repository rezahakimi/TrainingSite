import {
  MenuItem,
  Typography,
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
  MainTopMenu,
} from "../../styles/appbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../../styles/theme";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/authApiSlice";
import { logout } from "../../slices/authSlice";
import { useEffect, useState } from "react";
import avator from "../../assets/images/avatar/2.jpg";
import LoginIcon from "@mui/icons-material/Login";
import config from "../../config/";

export default function Actions({ userInfo, matches }) {
  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [selectedBlobImage, setSelectedBlobImage] = useState(avator);

  //console.log(userInfo);
  //"http://localhost:5000/" +  config.imageProliePath +  user.profileImg

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    //console.log(anchorElUser);
    if (userInfo && userInfo.profileImg)
      setSelectedBlobImage(
        config.serverPath + config.imageProliePath + userInfo.profileImg
      );
  }, [userInfo]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = async (menuType, event) => {
    if (menuType === "profile") {
      navigate("/profile");
    } else if (menuType === "logout") {
      // const refreshToken = userInfo.refreshToken;
      // console.log(refreshToken);
      await logoutApiCall().unwrap();
      dispatch(logout());
      setAnchorElUser(null);
      navigate("/login");
    } else if (menuType === "changepass") {
      navigate("/changepassword");
    }
    setAnchorElUser(null);
  };

  return (
    <Component>
      <MainTopMenu type="row">
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
                    <Avatar alt="Remy Sharp" src={selectedBlobImage} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px", zIndex: 1500 }}
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
                  onClose={(event) => handleCloseMenu("")}
                >
                  <MenuItem>
                    <Typography textAlign="center">
                      {userInfo.firstname + " " + userInfo.lastname}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    key="profile"
                    onClick={(event) => handleCloseMenu("profile")}
                  >
                    <Typography textAlign="center">My Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    key="changepass"
                    onClick={(event) => handleCloseMenu("changepass")}
                  >
                    <Typography textAlign="center">Change Password</Typography>
                  </MenuItem>
                  <MenuItem
                    key="logout"
                    onClick={(event) => handleCloseMenu("logout")}
                  >
                    <Typography textAlign="center">Sign Out</Typography>
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
      </MainTopMenu>
    </Component>
  );
}
