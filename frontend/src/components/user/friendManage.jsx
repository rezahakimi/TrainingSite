import * as React from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Container,
  Avatar,
  Button,
  IconButton,
  Snackbar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  useGetFriendsQuery,
  useRequestFriendMutation,
  useRemoveFriendMutation,
} from "../../slices/userApiSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

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

const FriendManage = ({ userId }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: friends = [],
    isLoading: isGetFriendsLoading,
    isSuccess: isGetFriendsSuccess,
    isError: isGetFriendsError,
    error: getFriendsError,
    isFetching: isGetFriendsFetching,
  } = useGetFriendsQuery(userId);
  const [requestFriend] = useRequestFriendMutation();
  const [removeFriend] = useRemoveFriendMutation();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [iAmFriend, setIAmmFriend] = useState(false);

  useEffect(() => {
    friends.map((f) => {
      if (f.id === userInfo.id) {
        setIAmmFriend((iAmFriend) => true);
      }
    });
  }, [friends]);

  const SubmitRequestFriendHandler = async (event) => {
    event.preventDefault();
    let userInfoId = userInfo.id;
    const res = await requestFriend({
      userId: userId,
      friendId: userInfoId,
    }).unwrap();

    if (res) {
      setIAmmFriend((iAmFriend) => true);
    }
  };

  const SubmitRemoveFriendHandler = async (event) => {
    event.preventDefault();
    let userInfoId = userInfo.id;
    const res = await removeFriend({
      userId: userId,
      friendId: userInfoId,
    }).unwrap();

    if (res) {
      setIAmmFriend((iAmFriend) => false);
    }
  };

  if (getFriendsError) {
    return <div>Error: {getFriendsError.message}</div>;
  }
  if (isGetFriendsLoading && !friends && friends.length > 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userInfo.id !== userId ? (
        iAmFriend ? (
          <IconButton aria-label="ّfriend" onClick={SubmitRemoveFriendHandler}>
            <PersonRemoveIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="ّfriend" onClick={SubmitRequestFriendHandler}>
            <PersonAddAlt1Icon />
          </IconButton>
        )
      ) : (
        <div></div>
      )}
    </>
  );
};

export default FriendManage;
