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
  IconButton,
  Menu,
  MenuItem
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

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");

    navigate("/login");
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce((sum, item) => sum + item.qty, 0);

    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () =>
      window.removeEventListener("storage", updateCartCount);
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
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src={coffeeLogo}
            alt="coffee logo"
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%"
            }}
          />

          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Qᴴᵂᴬ
          </Typography>
        </Box>

        {/* CENTER LINKS */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: { xs: "none", md: "flex" },
            gap: 4
          }}
        >
          <Typography
            onClick={() => navigate(user ? "/user" : "/")}
            sx={{ cursor: "pointer" }}
          >
            Home
          </Typography>

          <Typography
            onClick={() =>
              navigate(user ? "/user/menu" : "/menu")
            }
            sx={{ cursor: "pointer" }}
          >
            Menu
          </Typography>

          <Typography
            onClick={() =>
              navigate(user ? "/user/about" : "/about")
            }
            sx={{ cursor: "pointer" }}
          >
            About
          </Typography>

          <Typography
            onClick={() =>
              navigate(user ? "/user/contact" : "/contact")
            }
            sx={{ cursor: "pointer" }}
          >
            Contact
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile ? (
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ color: "#000" }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {/* CART */}
              <Button
                onClick={() =>
                  navigate(user ? "/user/cart" : "/cart")
                }
                variant="outlined"
                sx={{
                  borderColor: "#000",
                  color: "#000",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#000",
                    color: "#fff"
                  }
                }}
              >
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>

                <Box sx={{ ml: 1 }}>CART</Box>
              </Button>

              {/* AUTH */}
              {!user ? (
                <>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#000",
                      color: "#000",
                      "&:hover": {
                        bgcolor: "#000",
                        color: "#fff"
                      }
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
                      "&:hover": {
                        bgcolor: "#333"
                      }
                    }}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleMenuOpen}
                    sx={{
                      border: "1px solid #000",
                      color: "#000",
                      fontWeight: "bold"
                    }}
                  >
                    {user?.name}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem disabled>
                      👤 {user?.name}
                    </MenuItem>

                    <MenuItem disabled>
                      📧 {user?.email}
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleLogout();
                        handleMenuClose();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </>
          )}
        </Box>
      </Toolbar>

      {/* MOBILE DRAWER */}
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
            {/* USER INFO FIRST */}
            {user && (
              <ListItem
                sx={{
                  bgcolor: "rgba(255,255,255,0.3)",
                  borderRadius: 3,
                  mb: 2,
                  py: 1.5
                }}
              >
                <ListItemText
                  primary={`👤 ${user?.name}`}
                  secondary={`📧 ${user?.email}`}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: "#000"
                  }}
                  secondaryTypographyProps={{
                    color: "#333",
                    fontSize: "0.85rem"
                  }}
                />
              </ListItem>
            )}

            {/* NAV LINKS */}
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
                    const path =
                      text === "Home"
                        ? user
                          ? "/user"
                          : "/"
                        : user
                        ? `/user/${text.toLowerCase()}`
                        : `/${text.toLowerCase()}`;

                    navigate(path);

                    setOpen(false);
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}

            {/* CART */}
            <ListItem disablePadding>
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
                  navigate(user ? "/user/cart" : "/cart");

                  setOpen(false);
                }}
              >
                <Badge
                  badgeContent={cartCount}
                  color="error"
                  sx={{ mr: 2 }}
                >
                  <ShoppingCartIcon />
                </Badge>

                <ListItemText primary="Cart" />
              </ListItemButton>
            </ListItem>

            {/* LOGOUT */}
            {user ? (
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#000",
                      color: "#fff"
                    }
                  }}
                  onClick={() => {
                    handleLogout();

                    setOpen(false);
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            ) : (
              <>
                <ListItem disablePadding>
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
                      navigate("/login");

                      setOpen(false);
                    }}
                  >
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: "#000",
                        color: "#fff"
                      }
                    }}
                    onClick={() => {
                      navigate("/register");

                      setOpen(false);
                    }}
                  >
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;