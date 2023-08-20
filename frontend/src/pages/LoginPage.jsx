import React from "react";
import { LoginTextField, LoginButton } from "../styles/login";
import {
  Grid,
  List,
  ListItemText,
  Typography,
  Button,
  Stack,
  Container,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Colors } from "../styles/theme";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const LoginPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        sx={{
          background: Colors.shaft,
          color: Colors.white,
          p: { xs: 4, md: 10 },
          pt: 12,
          pb: 12,
          fontSize: { xs: "12px", md: "14px" },
        }}
      >
        <LoginTextField
          color="primary"
          label="Email address"
          variant="standard"
        />
        <LoginButton
          startIcon={<LoginIcon sx={{ color: Colors.white }} />}
          variant="contained"
          theme={theme}
        >
          Subscribe
        </LoginButton>
        <Button variant="contained">Add to Cart</Button>
      </Box>
    </>
  );
};

export default LoginPage;
