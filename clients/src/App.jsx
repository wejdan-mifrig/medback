import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";

import Navbar from "./componants/Navbar/Navbar.jsx";
import Footer from "./componants/Footer/Footer.jsx";
import Login from "./componants/Auth/login.jsx";
import Register from "./componants/Auth/Register.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import User from "./pages/User.jsx";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh" 
      }}
    >
      <Toaster position="top-center" />

      <Navbar />

    
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}

export default App;
