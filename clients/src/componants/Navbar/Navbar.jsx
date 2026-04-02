import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputBase
} from "@mui/material";

import { useState } from "react";
import coffeeLogo from "../../assets/coffee.png"; 

function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: darkMode ?  "#ffffff":"#c4a484",
        color: darkMode ?  "#6b4f3f":"#ffffff" ,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: 80 }}>
        {}
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

        {}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Typography
            sx={{
              cursor: "pointer",
              fontWeight: "500",
              "&:hover": { color: darkMode ? "#ffffff" : "#6b4f3f" }
            }}
          >
            Home
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
              fontWeight: "500",
              "&:hover": { color: darkMode ? "#ffffff" : "#6b4f3f" }
            }}
          >
            Menu
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
              fontWeight: "500",
              "&:hover": { color: darkMode ? "#ffffff" : "#6b4f3f" }
            }}
          >
            About
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
              fontWeight: "500",
              "&:hover": { color: darkMode ? "#ffffff" : "#6b4f3f" }
            }}
          >
            Contact
          </Typography>
        </Box>

        {}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            bgcolor: darkMode ? "#d9c4aa" : "#f5efe6",
            px: 2,
            borderRadius: 2
          }}
        >
          <InputBase
            placeholder="𝒮ℯ𝒶𝓇𝒸𝒽 𝒞ℴ𝒻𝒻ℯℯ..."
            sx={{ color: darkMode ? "#271b1b" : "#3c2b21" }}
          />
        </Box>

        {}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              border: "1px solid #000",
              color: darkMode ? "#000000" : "#6b4f3f",
              "&:hover": { bgcolor: "#000", color: "#fff" }
            }}
          >
            {darkMode ? "Light" : "Dark"}
          </Button>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#000",
                color: "#000",
                "&:hover": { bgcolor: "#000", color: "#fff" }
              }}
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
            >
              Register
            </Button>
          </Box>

          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            ☰
          </IconButton>
        </Box>
      </Toolbar>

      {}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 250,
            bgcolor: darkMode ? "#e6d3b3" : "#ffffff",
            color: darkMode ? "#ffffff" : "#6b4f3f",
            height: "100%"
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Menu" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <Button fullWidth variant="outlined">
                Login
              </Button>
            </ListItem>
            <ListItem>
              <Button fullWidth variant="contained" sx={{ bgcolor: "#000", color: "#fff" }}>
                Register
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;