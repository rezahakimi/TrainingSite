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
  useGetAllFriendsQuery,
  useAddFriendMutation,
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
  } = useGetAllFriendsQuery(userId);
  const [addFriend] = useAddFriendMutation();
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

  const SubmitAddFriendHandler = async (event) => {
    event.preventDefault();
    let userInfoId = userInfo.id;
    const res = await addFriend({
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
      {iAmFriend ? (
        <IconButton aria-label="ّfriend" onClick={SubmitRemoveFriendHandler}>
          <PersonRemoveIcon />
        </IconButton>
      ) : (
        <IconButton aria-label="ّfriend" onClick={SubmitAddFriendHandler}>
          <PersonAddAlt1Icon />
        </IconButton>
      )}
    </>
  );
};

export default FriendManage;
