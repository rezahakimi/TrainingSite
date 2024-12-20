import React, { useEffect, useState } from "react";
import { LoginTextField, LoginButton } from "../styles/login";
import {
  Grid,
  List,
  ListItemText,
  Typography,
  Button,
  Stack,
  Container,
  FormControlLabel,
  Checkbox,
  Snackbar,
  IconButton
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Colors } from "../styles/theme";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/authApiSlice";
import { setCredentials } from "../slices/authSlice";
import CloseIcon from "@mui/icons-material/Close";

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

const LoginPage = () => {
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [snackbarProperty, setSnackbarProperty] = useState({SnackbarOpen: false, SnackbarText: ""});


  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  //const { userInfo } = useSelector((state) => state.auth);

  //useEffect(() => {
   // if (userInfo) {
   //   navigate("/");
   // }
  //}, [navigate, userInfo]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarProperty(snackbarProperty=>({...snackbarProperty, SnackbarOpen: false}));
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

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      const password = data.get("password");
      //console.log(email);
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      const pathname = new URLSearchParams(location.search).get("pathname");
      if(pathname)
      {
        console.log(pathname);
        navigate(pathname);
      }
      else
      {
        console.log("pathname");
      navigate("/");
      }
    } catch (err) {
      setSnackbarProperty(snackbarProperty=>({SnackbarOpen: true, SnackbarText: "Login fail."}));
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
            ورود
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
            <LoginTextField
              color="primary"
              label="پست الکترونیکی"
              variant="standard"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <LoginTextField
              color="primary"
              label="کلمه رمز"
              variant="standard"
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoginButton
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              startIcon={<LoginIcon sx={{ color: Colors.white }} />}
              variant="contained"
              theme={theme}
            >
              login
            </LoginButton>
            <Grid container>
              <Grid item xs>
                <NavLink to="forgetpassword" variant="body2">
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={snackbarProperty.SnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarProperty.SnackbarText}
        action={renderSnackbar}
      />
    </ThemeProvider>
  );
};

export default LoginPage;
