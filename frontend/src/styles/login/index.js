import styled from "@emotion/styled";
import {
  TextField,
  Button,
} from "@mui/material";
import { Colors } from "../theme";

export const LoginTextField = styled(TextField)(() => ({
  ".MuiInputLabel-root": {
    color: Colors.primary,
  },

  ".MuiInput-root::before": {
    borderBottom: `1px solid ${Colors.primary}`,
  },
}));

export const LoginButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "show",
  })(({ show, theme }) => ({
    width: "120px",
    fontSize: "12px",
    [theme.breakpoints.up("md")]: {
      //position: "absolute",    
      //bottom: "2%",
      width: "300px",
      //padding: "10px 5px",
    },
    background: Colors.primary,
    opacity: 0.9,
  }));

  export const SignupTextField = styled(TextField)(() => ({
    ".MuiInputLabel-root": {
      color: Colors.primary,
    },
  
    ".MuiInput-root::before": {
      borderBottom: `1px solid ${Colors.primary}`,
    },
  }));
  
  export const SignupButton = styled(Button, {
      shouldForwardProp: (prop) => prop !== "show",
    })(({ show, theme }) => ({
      width: "120px",
      fontSize: "12px",
      [theme.breakpoints.up("md")]: {
        //position: "absolute",    
        //bottom: "2%",
        width: "300px",
        //padding: "10px 5px",
      },
      background: Colors.primary,
      opacity: 0.9,
    }));