import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import coffeeLogo from "../../assets/coffee.png";
import { useNavigate } from "react-router-dom";

function AdminNavbar({ setOpen }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#8b6b4f", // ☕ كابتشينو
        color: "#fffaf3",
        borderBottom: "1px solid #7a5c44"
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: 2,
          minHeight: "64px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
      
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              color: "#fffaf3",
              "&:hover": { bgcolor: "#7a5c44" }
            }}
          >
            <MenuIcon />
          </IconButton>

          <img
            src={coffeeLogo}
            alt="logo"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />

          <Typography fontWeight="bold" letterSpacing={1}>
            Admin Panel
          </Typography>
        </Box>

   
        <Button
          onClick={logout}
          variant="contained"
          sx={{
            bgcolor: "#e6c7a1",
            color: "#3e2723",
            borderRadius: "20px",
            px: 3,
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#d9b88f"
            }
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;