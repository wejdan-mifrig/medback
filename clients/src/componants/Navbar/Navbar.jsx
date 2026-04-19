import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import coffeeLogo from "../../assets/coffee.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#c4a484",
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: 80
        }}
      >
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src={coffeeLogo}
            alt="coffee logo"
            style={{ width: 60, height: 60, borderRadius: "50%" }}
          />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Qᴴᵂᴬ
          </Typography>
        </Box>

        {/* NAV LINKS */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: { xs: "none", md: "flex" },
            gap: 4
          }}
        >
          <Typography onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
            Home
          </Typography>
          <Typography onClick={() => navigate("/menu")} sx={{ cursor: "pointer" }}>
            Menu
          </Typography>
          <Typography onClick={() => navigate("/about")} sx={{ cursor: "pointer" }}>
            About
          </Typography>
          <Typography onClick={() => navigate("/contact")} sx={{ cursor: "pointer" }}>
            Contact
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

          {/* CART */}
          <Button
            onClick={() => navigate("/cart")}
            variant="outlined"
            sx={{
              borderColor: "#000",
              color: "#000",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "16px",
              padding: "6px 16px",
              "&:hover": {
                bgcolor: "#000",
                color: "#fff"
              }
            }}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
            CART
          </Button>

          {/* LOGIN */}
          <Button
            variant="outlined"
            sx={{
              borderColor: "#000",
              color: "#000",
              "&:hover": { bgcolor: "#000", color: "#fff" }
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          {/* REGISTER */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#000",
              color: "#fff",
              "&:hover": { bgcolor: "#333" }
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      </Toolbar>

      {/* DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            {["Home", "Menu", "About", "Contact"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(text === "Home" ? "/" : `/${text.toLowerCase()}`);
                    setOpen(false);
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;