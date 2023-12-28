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
import { useGetAllFriendsQuery } from "../../slices/userApiSlice";
import { NavLink } from "react-router-dom";
import { Colors } from "../../styles/theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useEffect, useState } from "react";
import config from "../../config";
import DeleteIcon from "@mui/icons-material/Delete";
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

const Friends = ({ userId }) => {
  const {
    data: friends,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getUserError,
    isFetching: isGetFetching,
  } = useGetAllFriendsQuery(userId);

  const [userDisplay, setDisplayUser] = useState(initialFormState);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  if (getUserError) {
    return <div>Error: {getUserError.message}</div>;
  }
  if (isGetLoading && !friends) {
    return <div>Loading...</div>;
  }

  let friendsRender = "";
  if (friends) {
    friendsRender = friends.map((f) => {
      return (
        <ListItem key={f.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  f.firstname
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
      );
    });
  }

  return (
    <>
      <Divider variant="inset" component="li" />
      {friendsRender}
    </>
  );
};

export default Friends;
