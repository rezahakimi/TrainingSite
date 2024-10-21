import * as React from "react";
import {
  Typography,
  ListItemAvatar,
  Avatar,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useGetFriendsQuery } from "../../../slices/userApiSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../../config";

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

const FriendsList = ({ userId/* , onHandleFriendClick */ }) => {

  //const navigate = useNavigate();
  const {
    data: friends = [],
    isLoading: isGetFriendsLoading,
    isSuccess: isGetFriendsSuccess,
    isError: isGetFriendsError,
    error: getGetFriendsError,
    isFetching: isGetFriendsFetching,
  } = useGetFriendsQuery(userId);

  useEffect(() => {}, []);

  /* const handleFriendClick = async (friendId, event) => {
    navigate("/users/" + friendId + "/");
  }; */

  if (getGetFriendsError) {
    return <div>Error: {getGetFriendsError.message}</div>;
  }
  if (isGetFriendsLoading && !friends) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Friends</div>
      {
      friends && friends.map((f, index) => {
      if (f != null) {
        let fId = f.id;
        return (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar 
            /* onClick={(event) => onHandleFriendClick(fId)} */
            
            >
            <NavLink to={`/users/${f.id}/`}>
              <Avatar
                alt="Remy Sharp"
                src={config.serverPath + config.imageProliePath + f.profileImg}
              />
              </NavLink>
            </ListItemAvatar>
            <ListItemText
              /* onClick={(event) => onHandleFriendClick(fId)} */
              primary={ <React.Fragment>
                <NavLink to={`/users/${f.id}/`}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {f.firstname + ' ' + f.lastname}
              </Typography>
            </NavLink>
            </React.Fragment>}
              secondary={
                <React.Fragment>
                    
                
                </React.Fragment>
              }
            />
          </ListItem>
        );
      }
    })
    }
    </>
  );
};

export default FriendsList;
