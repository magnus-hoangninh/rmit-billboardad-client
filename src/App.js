import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./routes/user-routes/Home/home";
import Details from "./routes/user-routes/Details/details";
import MyBillboards from "./routes/user-routes/Profile/my-billboards";
import GenericPage from "./routes/user-routes/GenericPage/generic-page";
import Tab from "./components/Tab/tab";
import MyMessages from "./routes/user-routes/Profile/my-messages";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Billboards from "./routes/admin-routes/ad-billboards";
import Pages from "./routes/admin-routes/ad-pages";
import SideMenu from "./components/SideMenu/sideMenu";
import Dashboard from "./routes/admin-routes/dashboard";
import PageDetails from "./routes/admin-routes/page-details";
import Section from "./routes/admin-routes/section";
import LoginForm from "./components/LoginSignup/LoginForm";
import SignupForm from "./components/LoginSignup/SignupForm";
import BasicProfile from "./routes/user-routes/Profile/BasicProfile";
import Users from "./routes/admin-routes/ad-users";
import AdminLogin from "./components/LoginSignup/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={[<NavBar />, <Footer/>]}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/details/:_id" element={<Details />}></Route>
          <Route path="/article/:_id" element={<GenericPage />}></Route>

          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/profile" element={<BasicProfile />} />

          <Route element={<Tab />}>
            <Route path="/my-billboards" element={<MyBillboards />}></Route>
            <Route path="/my-messages" element={<MyMessages />}></Route>
            <Route path="/my-account" element={<BasicProfile />}></Route>
          </Route>
        </Route>

        <Route path="/admin/login" element={<AdminLogin />}></Route>

        {/* Route for admin */}
        <Route element={<SideMenu />}>
          <Route path="/admin/" element={<Dashboard />}></Route>
          <Route path="/admin/billboards" element={<Billboards />}></Route>
          <Route path="/admin/users" element={<Users />}></Route>
          <Route path="/admin/pages" element={<Pages />}></Route>
          <Route
            path="/admin/page-details/:_id"
            element={<PageDetails />}
          ></Route>
          <Route path="/admin/section/:_id" element={<Section />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;