import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomePage />}>
          {/* <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} /> 
      </Route>*/}
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </React.StrictMode>
);
