import ProtectedRoute from "./routes/protectedRoute ";
import HomePage from "./pages/HomePage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import { useSelector } from "react-redux";
import Appbar from "./components/appbar";
import SearchBox from "./components/common/search";
import ArtilesPage from "./pages/ArticlesPage";

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
  const { userInfo: user } = useSelector((state) => state.auth);

  let apppbar;
  if (user) {
    apppbar = (
      <>
        <Appbar></Appbar>
        <SearchBox></SearchBox>
      </>
    );
  }
  //console.log(user)
  return (
    <BrowserRouter>
      {apppbar}
      <Routes>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/articles" element={<ArtilesPage />}>
            <Route path=":articleid" element={<ArtilesPage />} />
          </Route>
          {/*  <Route
      path='/dashboard'
      element={
       <ProtectedRoute isAllowed={!!user && user.permissions.includes("dashboard")} redirectTo='/home'>
        <DashboardPage />
       </ProtectedRoute>
      }
     /> */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                isAllowed={!!user && user.roles.includes("ROLE_ADMIN")}
                redirectTo="/home"
              >
                <AdminPage />
              </ProtectedRoute>
            }
          />
          {/* <Route
      path='/config'
      element={
       <ProtectedRoute isAllowed={!!user && user.roles.includes("admin")} redirectTo='/home'>
        <ConfigPage />
       </ProtectedRoute>
      }
     /> */}
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
