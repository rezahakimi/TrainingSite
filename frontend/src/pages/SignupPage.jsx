import React, { useEffect, useState } from "react";
import { SignupTextField, SignupButton } from "../styles/login";
import {
  Grid,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Colors } from "../styles/theme";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../slices/userApiSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

const initialFormState = {
  id: "",
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
  profileImg: "",
  roles: ["user"],
};

const SignupPage = () => {
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBlobImage, setSelectedBlobImage] = useState(null);
  const [userDisplayUser, setDisplayUser] = useState(initialFormState);

  useEffect(() => {
    if (userInfo) {
      // navigate("/");
    }
  }, [navigate, userInfo]);

  const handleselectedImageDelete = (e) => {
    setSelectedBlobImage(null);
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setSelectedBlobImage(URL.createObjectURL(file));
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    //  try {
    const payload = new FormData();
    payload.append("firstname", userDisplayUser.firstName);
    payload.append("lastname", userDisplayUser.lastName);
    payload.append("email", userDisplayUser.email);
    payload.append("phone", userDisplayUser.phone);
    payload.append("password", userDisplayUser.password);
    payload.append("image", selectedImage);

    console.log(selectedImage);
    const res = await registerUser(payload).unwrap();
    if (res) {
      navigate("/login");
    }

    //  } catch (err) {
    //toast.error(err?.data?.message || err.error);
    //  }
  };
  return (
    <ThemeProvider theme={theme}>
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
            SignUp
          </Typography>
          <Box
            component="form"
            sx={{
              p: { xs: 4, md: 10 },
              pt: 12,
              pb: 12,
              fontSize: { xs: "12px", md: "14px" },
            }}
            onSubmit={registerHandler}
          >
            <TextField
              color="primary"
              label="First Name"
              variant="standard"
              required
              fullWidth
              id="firstname"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              onChange={(e) =>
                setDisplayUser({
                  ...userDisplayUser,
                  firstName: e.target.value,
                })
              }
            />
            <TextField
              color="primary"
              label="Last Name"
              variant="standard"
              required
              fullWidth
              id="lastname"
              name="lastname"
              autoComplete="lastname"
              onChange={(e) =>
                setDisplayUser({
                  ...userDisplayUser,
                  lastName: e.target.value,
                })
              }
            />
            <TextField
              color="primary"
              label="Email"
              variant="standard"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              onChange={(e) =>
                setDisplayUser({
                  ...userDisplayUser,
                  email: e.target.value,
                })
              }
            />
            <TextField
              color="primary"
              label="Phone"
              variant="standard"
              required
              fullWidth
              id="phone"
              name="phone"
              autoComplete="phone"
              onChange={(e) =>
                setDisplayUser({
                  ...userDisplayUser,
                  phone: e.target.value,
                })
              }
            />
            <TextField
              color="primary"
              label="Password"
              variant="standard"
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={(e) =>
                setDisplayUser({
                  ...userDisplayUser,
                  password: e.target.value,
                })
              }
            />
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
              theme={theme}
            >
              SIgnUp
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupPage;
