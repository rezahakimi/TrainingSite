import React, { useEffect, useState } from "react";
import { SignupTextField, SignupButton } from "../styles/login";
import {
  Grid,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Colors } from "../styles/theme";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/authApiSlice";

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

const SignupPage = () => {
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
     // navigate("/");
    }
  }, [navigate, userInfo]);

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const firstname = data.get("firstname");
      const lastname = data.get("lastname");
      const email = data.get("email");
      const password = data.get("password");
      console.log(email);
      const res = await register({ firstname, lastname, email, password }).unwrap();
      navigate("/");
    } catch (err) {
      //toast.error(err?.data?.message || err.error);
    }
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
            onSubmit={loginHandler}
          >
             <SignupTextField
              color="primary"
              label="First Name"
              variant="standard"
              required
              fullWidth
              id="firstname"
              name="firstname"
              autoComplete="firstname"
              autoFocus
            />
             <SignupTextField
              color="primary"
              label="Last Name"
              variant="standard"
              required
              fullWidth
              id="lastname"
              name="lastname"
              autoComplete="lastname"
            />
            <SignupTextField
              color="primary"
              label="Email"
              variant="standard"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
            />
            <SignupTextField
              color="primary"
              label="Password"
              variant="standard"
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
            />

            <SignupButton
            sx={{ mt: 3, mb: 2 }}
              type="submit"
              startIcon={<AppRegistrationIcon sx={{ color: Colors.white }} />}
              variant="contained"
              theme={theme}
            >
              SIgnUp
            </SignupButton>
        </Box>
          </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignupPage