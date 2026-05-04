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
  Badge,
  IconButton
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import coffeeLogo from "../../assets/coffee.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: 80
        }}
      >
      
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

        
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile ? (
            // 📱 Mobile Menu Button
            <IconButton onClick={() => setOpen(true)} sx={{ color: "#000" }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <>
            
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
            </>
          )}
        </Box>
      </Toolbar>

      
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#c4a484",
            color: "#000",
            boxShadow: "0 0 20px rgba(0,0,0,0.3)"
          }
        }}
      >
        <Box sx={{ width: 250, p: 2 }}>

          <List>
            {["Home", "Menu", "About", "Contact"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    "&:hover": {
                      bgcolor: "#000",
                      color: "#fff"
                    }
                  }}
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

        
          <Button
            fullWidth
            sx={{
              mt: 2,
              border: "1px solid #000",
              color: "#000",
              "&:hover": {
                bgcolor: "#000",
                color: "#fff"
              }
            }}
            onClick={() => {
              navigate("/cart");
              setOpen(false);
            }}
          >
            CART ({cartCount})
          </Button>

          <Button
            fullWidth
            sx={{
              mt: 1,
              border: "1px solid #000",
              color: "#000",
              "&:hover": {
                bgcolor: "#000",
                color: "#fff"
              }
            }}
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
          >
            Login
          </Button>

     
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              bgcolor: "#000",
              "&:hover": { bgcolor: "#333" }
            }}
            onClick={() => {
              navigate("/register");
              setOpen(false);
            }}
          >
            Register
          </Button>

        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;