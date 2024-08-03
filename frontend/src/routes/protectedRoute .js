import React from "react";
import { useSelector } from "react-redux";
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
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  if (userInfo.accessToken == "") return <Navigate to="/login" />;
  //console.log(redirectTo)
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
