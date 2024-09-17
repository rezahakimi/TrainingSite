import * as React from "react";
import {
  Box,
  Typography,
  ListItemAvatar,
  Avatar,
  Container,
  TextField,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useGetFriendsQuery } from "../../../slices/userApiSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { Colors } from "../../../styles/theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useEffect, useState } from "react";
import config from "../../../config";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setCredentialsUpdate } from "../../../slices/authSlice";
import CloseIcon from "@mui/icons-material/Close";

const initialFormState = {
  firstName: "",
  lastName: "",
  phone: "",
  profileImg: "",
  roles: [
    {
      id: "",
      name: "",
      selected: false,
    },
  ],
};

const FriendsList = ({ userId }) => {

  const navigate = useNavigate();
  const {
    data: friends = [],
    isLoading: isGetFriendsLoading,
    isSuccess: isGetFriendsSuccess,
    isError: isGetFriendsError,
    error: getGetFriendsError,
    isFetching: isGetFriendsFetching,
  } = useGetFriendsQuery(userId);

  useEffect(() => {}, []);

  const handleFriendClick = async (friendId, event) => {
    navigate("/users/" + friendId + "/");
  };

  if (getGetFriendsError) {
    return <div>Error: {getGetFriendsError.message}</div>;
  }
  if (isGetFriendsLoading && !friends) {
    return <div>Loading...</div>;
  }

  let friendsRender = "";

  if (friends) {
    friendsRender = friends.map((f, index) => {
      if (f != null) {
        let fId = f.id;
        return (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar onClick={(event) => handleFriendClick(fId)}>
              <Avatar
                alt="Remy Sharp"
                src={config.serverPath + config.imageProliePath + f.profileImg}
              />
            </ListItemAvatar>
            <ListItemText
              onClick={(event) => handleFriendClick(fId)}
              primary={f.lastname}
              secondary={
                <React.Fragment>
                  {/*  <NavLink to={`/users/${f.id}/`}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {f.firstname}
                  </Typography>
                </NavLink>
 */}
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {f.firstname}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      }
    });
  }

  return (
    <>
      <div>Friends</div>
      {friendsRender}
    </>
  );
};

export default FriendsList;
