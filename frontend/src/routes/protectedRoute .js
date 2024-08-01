import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/* const ProtectedRoute = ({children}) => {
  const { userInfo: user } = useSelector((state) => state.auth);

  let location = useLocation();

  if(!user) {
      return <Navigate to="/login" state={{ from: location}} replace />
  }
return children

}; */

function ProtectedRoute({ isAllowed, redirectTo = "/login", children }) {
  const uInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(uInfo);
  if (!uInfo) {
    return <Navigate to="/login" />;
  }
  if (uInfo.accessToken == "") return <Navigate to="/login" />;
  //console.log(redirectTo)
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
