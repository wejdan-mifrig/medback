import { Box, Typography, Link } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer({ darkMode }) {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: darkMode ? "#e6d3b3" : "#c4a484",
        color: "#000",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
        }}
      >
        {}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon />
          <Typography>Jordan, Irbid</Typography>
        </Box>

        {}
        <Typography>© 2026 QHWA Coffee. All rights reserved.</Typography>

        {}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="#" target="_blank" color="inherit">
            <FacebookIcon />
          </Link>
          <Link href="#" target="_blank" color="inherit">
            <InstagramIcon />
          </Link>
          <Link href="#" target="_blank" color="inherit">
            <TwitterIcon />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
