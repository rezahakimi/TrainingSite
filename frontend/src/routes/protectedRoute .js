import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetUserByIdQuery } from "../slices/userApiSlice";

/* const ProtectedRoute = ({children}) => {
  const { userInfo: user } = useSelector((state) => state.auth);

  let location = useLocation();

  if(!user) {
      return <Navigate to="/login" state={{ from: location}} replace />
  }
return children

}; */

const hasCommonItem = (arr1, arr2) => {
  const map = new Map();
  arr1.forEach(item => map.set(item, true));
  return arr2.some(item => map.has(item));
};

function ProtectedRoute({ children, roles }) {
  const { userInfo } = useSelector((state) => state.auth);
  let userId=null;

if(userInfo!=null)
  userId= userInfo.id;
  //return <Navigate to="/login" />;

  const {
    data: userOnline,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getUserError,
    isFetching: isGetFetching,
  } = useGetUserByIdQuery(userId);

  
  
  
  //if (userInfo.accessToken == "") return <Navigate to="/login" />;
  const location = useLocation();
  const { hash, pathname, search } = location;
  const url = window.location.href;

  //const history = useHistory()

  if(isGetLoading)
    return null;

  if (!userOnline) {
   // console.log("userInfo == null");
    return <Navigate to={`/login?pathname=${pathname}&search=${search}`} />;
  }

  //console.log(userInfo)
  //console.log(userOnline)
  /* if (userInfo.accessToken == "") {
    console.log("userInfo.accessToken !=");
    return <Navigate to="/login" />;
  } */
    if (!userInfo) {
      // console.log("userInfo == null");
       return <Navigate to={`/login?pathname=${pathname}&search=${search}`} />;
     }
     console.log(userInfo.roles)
     console.log(roles)
  // if (roles && !roles.map(role=>{return userInfo.roles.includes(role)})) {
    if (roles && !hasCommonItem(roles , userInfo.roles)) {
   // console.log("ROLE_ADMIN");
    return <Navigate to="/inaccessibility" />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
