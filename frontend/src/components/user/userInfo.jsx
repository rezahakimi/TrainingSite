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
  useGetAllRolesQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
import { NavLink } from "react-router-dom";
import { Colors } from "../../styles/theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useEffect, useState } from "react";
import config from "../../config";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setCredentialsUpdate } from "../../slices/authSlice";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import FriendManage from "./friendManage";

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

const UserInfo = ({ userId }) => {
  const {
    data: userProf,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getUserError,
    isFetching: isGetFetching,
  } = useGetUserByIdQuery(userId);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  const SubmitHandler = async (event) => {
    event.preventDefault();

    // const res = await updateUser({userId}).unwrap();

    //if (res) {
    // dispatch(setCredentialsUpdate({ ...res }));
    // setOpenSnackbar(true);
    //   }
  };

  const renderSnackbar = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleSnackbarClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  if (getUserError) {
    return <div>Error: {getUserError.message}</div>;
  }
  if (isGetLoading && !userProf) {
    return <div>Loading...</div>;
  }
  //console.log(userProf.profileImg);
  return (
    <>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: Colors.white,
            color: Colors.primary,
          }}
        >
          <Avatar
            sx={{ height: 70, width: 70 }}
            alt="Remy Sharp"
            src={
              config.serverPath + config.imageProliePath + userProf.profileImg
            }
          />
          <Typography component="h1" variant="h5">
            {userProf.firstname} {userProf.lastname}
          </Typography>
          <FriendManage userId={userId}></FriendManage>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Update Succful"
        action={renderSnackbar}
      />
    </>
  );
};

export default UserInfo;
