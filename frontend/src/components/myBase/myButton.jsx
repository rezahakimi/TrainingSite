import React, { useState } from "react";
import { Button, CircularProgress, Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { green } from "@mui/material/colors";

const MyButton = ({ children, onClick }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnSuccess, setBtnSuccess] = useState(false);

  const handleBtnSubmmit = async (event) => {
    event.preventDefault();

    if (!btnLoading) {
      setBtnSuccess(false);
      setBtnLoading(true);
    }
    const res = await onClick();

    if (res) {
      setBtnSuccess(true);
      setBtnLoading(false);
    }
  };

  return (
    <Container sx={{ m: 1, position: "relative", width: "fit-content" }}>
      <Button
        variant="contained"
        disabled={btnLoading}
        onClick={handleBtnSubmmit}
      >
        {children}
      </Button>
      {btnLoading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Container>
  );
};
export default MyButton;
