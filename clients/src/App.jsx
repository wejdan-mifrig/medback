import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";

import Navbar from "./componants/Navbar/Navbar.jsx";
import UserNavbar from "./componants/UserNav/Usernav.jsx";
import Footer from "./componants/Footer/Footer.jsx";

import Login from "./componants/Auth/login.jsx";
import Register from "./componants/Auth/Register.jsx";

import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";


import UserHome from "./pages/user/Userhome.jsx";
import UserMenu from "./pages/user/Usermenu.jsx";
import UserAbout from "./pages/user/Userabout.jsx";
import UserContact from "./pages/user/Usercontact.jsx";
import UserCart from "./pages/user/Usercart.jsx";

function App() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");
  const isUser = location.pathname.startsWith("/user");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: 0,
        padding: 0
      }}
    >
      <Toaster position="top-center" />

   
      {!isAdmin && !isUser && <Navbar />}
      {isUser && <UserNavbar />}

     
      <Box sx={{ flex: 1 }}>
        <Routes>

   
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />

          
          <Route path="/user" element={<Navigate to="/user/home" />} />

       
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/menu" element={<UserMenu />} />
          <Route path="/user/about" element={<UserAbout />} />
          <Route path="/user/contact" element={<UserContact />} />
          <Route path="/user/cart" element={<UserCart />} />


          <Route path="/admin" element={<Admin />} />

        </Routes>
      </Box>


      {!isAdmin && <Footer />}
    </Box>
  );
}

export default App;