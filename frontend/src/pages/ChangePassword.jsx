import React, { useEffect, useState } from "react";
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
import { useChangePasswordUserMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const initialFormState = {
  id: "",
  password: "",
  confirmpassword: "",
};

const ChangePassword = () => {
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayUser, setDisplayUser] = useState(initialFormState);

  const [changePasswordUser] = useChangePasswordUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setDisplayUser({
        id: userInfo.id,
      });
    }
  }, [navigate, userInfo]);

  const changePasswordHandler = async (event) => {
    event.preventDefault();
    //  try {

    if (displayUser.password === displayUser.confirmpassword) {
      const data = new FormData(event.currentTarget);
      //payload.append("id", displayUser.id);
      //payload.append("password", displayUser.password);
      //payload.append("confirmpassword", displayUser.confirmpassword);

      const id = displayUser.id;
      const res = await changePasswordUser({
        id: displayUser.id,
        password: displayUser.password,
        confirmpassword: displayUser.confirmpassword,
      }).unwrap();
      if (res) {
        dispatch(logout());
        navigate("/login");
      }
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
            Change Password
          </Typography>
          <Box
            component="form"
            sx={{
              p: { xs: 4, md: 10 },
              pt: 12,
              pb: 12,
              fontSize: { xs: "12px", md: "14px" },
            }}
            onSubmit={changePasswordHandler}
          >
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
                  ...displayUser,
                  password: e.target.value,
                })
              }
            />
            <TextField
              color="primary"
              label="Confirm Password"
              variant="standard"
              required
              fullWidth
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              autoComplete="current-password"
              onChange={(e) =>
                setDisplayUser({
                  ...displayUser,
                  confirmpassword: e.target.value,
                })
              }
            />

            <Button
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              startIcon={<AppRegistrationIcon sx={{ color: Colors.white }} />}
              variant="contained"
              theme={theme}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ChangePassword;
