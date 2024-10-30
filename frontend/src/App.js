import ProtectedRoute from "./routes/protectedRoute ";
import HomePage from "./pages/HomePage";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import { useSelector } from "react-redux";
import Appbar from "./components/appbar";
import SearchBox from "./components/common/search";
import ArtilesPage from "./pages/ArticlesPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import ChangePassword from "./pages/ChangePassword";
import UserAdminPage from "./pages/UserAdminPage";
import UsersPage from "./pages/UsersPage";
import InaccessibilityPage from "./pages/InaccessibilityPage";

/* const routeDefinitions = createRoutesFromElements(
  <>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/admin" element={<ProtectedLayout />}>
        <Route path="a" element={<AdminPage />} />
      </Route>
    </>

);

const router = createBrowserRouter(routeDefinitions); */

function App() {
  const { userInfo } = useSelector((state) => state.auth);


  let apppbar;
  //if (user) {
  apppbar = (
    <>
      <Appbar userInfo={userInfo}></Appbar>
      <SearchBox></SearchBox>
    </>
  );
  // }

  return (
    <BrowserRouter>
      {apppbar}
      <Routes>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute roles={['ROLE_USER', 'ROLE_ADMIN']} />}>
          <Route path="/articles" element={<ArtilesPage userInfo={userInfo} />}>
            <Route path=":articleid" element={<ArtilesPage userInfo={userInfo} />} />
          </Route>
          {/*           <Route path="/?cat" element={<ArtilesPage />}></Route>
           */}{" "}
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/users" element={<UsersPage />}></Route>
           <Route path="/users/:userid" element={<UsersPage />}></Route>
          {/*  <Route
      path='/dashboard'
      element={
       <ProtectedRoute isAllowed={!!user && user.permissions.includes("dashboard")} redirectTo='/home'>
        <DashboardPage />
       </ProtectedRoute>
      }
     /> */}
          {/* <Route
      path='/config'
      element={
       <ProtectedRoute isAllowed={!!user && user.roles.includes("admin")} redirectTo='/home'>
        <ConfigPage />
       </ProtectedRoute>
      }
     /> */}
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute  roles={['ROLE_ADMIN']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/useradmin" element={<UserAdminPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inaccessibility" element={<InaccessibilityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
