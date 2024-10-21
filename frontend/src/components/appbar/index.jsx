import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import AppbarDesktop from "./appbarDesktop";
import AppbarMobile from "./appbarMobile";

const Appbar=({userInfo}) =>{
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {matches ? <AppbarMobile matches={matches} userInfo={userInfo}/> : <AppbarDesktop matches={matches} userInfo={userInfo}/>}
    </>
  );
}

export default Appbar;