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

function ProtectedRoute({ children }) {
  const { userInfo } = useSelector((state) => state.auth);
  //  if (!userInfo) {
  //    return <Navigate to="/login" />;
  //  }
  //if (userInfo.accessToken == "") return <Navigate to="/login" />;
  const location = useLocation();
  const { hash, pathname, search } = location;
  const url = window.location.href;

  //const history = useHistory()
  console.log(userInfo);

  if (userInfo == null) {
    console.log("userInfo == null");
    return <Navigate to="/login" />;
  }
  if (userInfo.accessToken == "") {
    console.log("userInfo.accessToken !=");
    return <Navigate to="/login" />;
  }
  if (!userInfo.roles.includes("ROLE_ADMIN")) {
    console.log("ROLE_ADMIN");
    return <Navigate to="/inaccessibility" />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
