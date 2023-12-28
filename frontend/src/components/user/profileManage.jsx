import * as React from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Container,
  TextField,
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

const ProfileManage = ({ userId }) => {
  const {
    data: user,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getUserError,
    isFetching: isGetFetching,
  } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const { data: qroles = [] } = useGetAllRolesQuery();

  const [userDisplay, setDisplayUser] = useState(initialFormState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBlobImage, setSelectedBlobImage] = useState(null);
  const [selectedImageChanged, setSelectedImageChanged] = useState("no");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.roles) {
      setDisplayUser({
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        phone: user.phone,
        profileImg: user.profileImg,
        roles: qroles.map((role) => ({
          id: role.id,
          name: role.name,
          selected: user.roles.some((r) => r.id === role.id),
        })),
      });
      if (user.profileImg)
        setSelectedBlobImage(
          config.serverPath + config.imageProliePath + user.profileImg
        );
    }
  }, [user]);

  const handleselectedImageDelete = (e) => {
    setSelectedBlobImage(null);
    setSelectedImage(null);
    if (userDisplay.profileImg === "") setSelectedImageChanged("yes");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setSelectedBlobImage(URL.createObjectURL(file));
    setSelectedImageChanged("yes");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  const SubmitHandler = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    payload.append("id", user.id);
    payload.append("firstname", userDisplay.firstName);
    payload.append("lastname", userDisplay.lastName);
    payload.append("phone", userDisplay.phone);

    if (selectedBlobImage != null && selectedImage != null)
      payload.append("image", selectedImage);
    else if (selectedBlobImage == null && selectedImage == null) {
      payload.append("image", null);
    }
    payload.append("changeimage", selectedImageChanged);
    const res = await updateUser(payload).unwrap();

    if (res) {
      dispatch(setCredentialsUpdate({ ...res }));
      //setDisplayUser(initialFormState);
      // setSelectedBlobImage(null);
      // setSelectedImage(null);
      setOpenSnackbar(true);
    }
  };

  let RolesRender = "";
  if (userDisplay) {
    RolesRender = userDisplay.roles.map((role) => {
      if (role.selected)
        return (
          <List key={role.id}>
            <ListItem disablePadding>
              <ListItemText primary={role.name} />
            </ListItem>
          </List>
        );
    });
  }

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
  if (isGetLoading && !user) {
    return <div>Loading...</div>;
  }
  //console.log(selectedBlobImage);
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
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
          <Box
            component="form"
            sx={{
              p: { xs: 4, md: 10 },
              pt: 12,
              pb: 12,
              fontSize: { xs: "12px", md: "14px" },
            }}
            onSubmit={SubmitHandler}
          >
            <TextField
              autoFocus
              label="First Name"
              margin="dense"
              id="firstName"
              type="firstName"
              fullWidth
              variant="standard"
              value={userDisplay.firstName || ""}
              onChange={(e) =>
                setDisplayUser({
                  ...userDisplay,
                  firstName: e.target.value,
                })
              }
            />
            <TextField
              label="Last Name"
              margin="dense"
              id="lastName"
              type="lastName"
              fullWidth
              variant="standard"
              value={userDisplay.lastName || ""}
              onChange={(e) =>
                setDisplayUser({
                  ...userDisplay,
                  lastName: e.target.value,
                })
              }
            />
            <TextField
              label="Mobile"
              margin="dense"
              id="phone"
              type="phone"
              fullWidth
              variant="standard"
              value={userDisplay.phone || ""}
              onChange={(e) =>
                setDisplayUser({
                  ...userDisplay,
                  phone: e.target.value,
                })
              }
            />
            {RolesRender}
            <Container maxWidth="md" sx={{ boxShadow: 1, p: 2 }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" color="primary" component="span">
                  Upload Image
                </Button>
              </label>
              <p>
                {selectedBlobImage && (
                  <img
                    src={selectedBlobImage}
                    alt="Uploaded"
                    width="200"
                    height="200"
                  />
                )}
                <IconButton
                  onClick={handleselectedImageDelete}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </p>
            </Container>

            <Button
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              startIcon={<AppRegistrationIcon sx={{ color: Colors.white }} />}
              variant="contained"
            >
              Save
            </Button>
          </Box>
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

export default ProfileManage;
