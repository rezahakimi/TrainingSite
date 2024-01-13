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
import {
  useAcceptFriendMutation,
  useGetRequestFriendsQuery,
  useRemoveFriendMutation,
} from "../../slices/userApiSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useEffect, useState } from "react";
import config from "../../config";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch } from "react-redux";
import { setCredentialsUpdate } from "../../slices/authSlice";
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

const FriendsRequestList = ({ userId }) => {
  const navigate = useNavigate();
  const {
    data: friends = [],
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getUserError,
    isFetching: isGetFetching,
  } = useGetRequestFriendsQuery(userId);
  const [acceptFriend] = useAcceptFriendMutation();
  const [removeFriend] = useRemoveFriendMutation();

  useEffect(() => {}, []);

  const handleFriendClick = async (friendId, event) => {
    navigate("/users/" + friendId + "/");
  };

  const acceptRequest = async (friendId, event) => {
    //event.preventDefault();
    const res = await acceptFriend({
      userId: userId,
      friendId: friendId,
    }).unwrap();

    if (res) {
      //setIAmmFriend((iAmFriend) => true);
    }
  };

  const rejectRequest = async (friendId, event) => {
    //event.preventDefault();
    const res = await removeFriend({
      userId: userId,
      friendId: friendId,
    }).unwrap();

    if (res) {
      //setIAmmFriend((iAmFriend) => true);
    }
  };

  if (getUserError) {
    return <div>Error: {getUserError.message}</div>;
  }
  if (isGetLoading && !friends) {
    return <div>Loading...</div>;
  }

  let friendsRender = "";

  if (friends) {
    friendsRender = friends.map((f) => {
      if (f != null) {
        let fId = f.id;
        return (
          <ListItem
            key={f.id}
            alignItems="flex-start"
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="thumbup"
                  onClick={() => acceptRequest(f.id)}
                >
                  <ThumbUpIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="thumbdown"
                  onClick={() => rejectRequest(f.id)}
                >
                  <ThumbDownIcon />
                </IconButton>
              </>
            }
          >
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

export default FriendsRequestList;
