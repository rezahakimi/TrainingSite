import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

/* const ProtectedRoute = ({children}) => {
  const { userInfo: user } = useSelector((state) => state.auth);

  let location = useLocation();

  if(!user) {
      return <Navigate to="/login" state={{ from: location}} replace />
  }
return children

}; */

function ProtectedRoute({ isAllowed, redirectTo = "/login", children }) {
  //console.log(redirectTo)
  if (!isAllowed) {
   return <Navigate to={redirectTo} />
  }
  return children ? children : <Outlet />
 }

export default ProtectedRoute
