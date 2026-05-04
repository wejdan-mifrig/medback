import { useState } from "react";
import { Box } from "@mui/material";

import AdminNavbar from "../componants/admin/AdminNavbar.jsx";
import AdminSidebar from "../componants/admin/AdminSidebar.jsx";

import Products from "./admin/Products.jsx";
import Users from "./admin/Users.jsx";
import Homee from "./admin/Homee.jsx";
import Messages from "./admin/Messages.jsx";

function Admin() {
  const [page, setPage] = useState("home");
  const [open, setOpen] = useState(false);

  return (
    <Box>

   
      <AdminNavbar setOpen={setOpen} />

      <Box sx={{ display: "flex", minHeight: "100vh" }}>

    
        <AdminSidebar
          open={open}
          setOpen={setOpen}
          setPage={setPage}
        />

     
        <Box sx={{ flex: 1, p: 3, bgcolor: "#f5f5f5" }}>

          {page === "home" && <Homee />}

          {page === "products" && <Products />}

          {page === "users" && <Users />}

          {page === "messages" && <Messages />}

        </Box>

      </Box>
    </Box>
  );
}

export default Admin;