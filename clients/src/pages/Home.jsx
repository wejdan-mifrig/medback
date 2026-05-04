import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  IconButton,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";




import imgCupcake from "../assets/Cupcake.jpg";
import imgDonut from "../assets/Donuts.jpg";
import imgVanillaCake from "../assets/Vanilla Cake.jpg";
import imgTiramisu from "../assets/Tiramisu.jpg";
import imgBrownie from "../assets/Brownies.jpg";
import imgCheesecake from "../assets/Cheesecake.jpg";

import imgColdChocolate from "../assets/Cold Chocolate.jpg";
import imgEnergyDrink from "../assets/Energy Drink.jpg";
import imgStrawberrySmoothie from "../assets/Strawberry Smoothie.jpg";
import imgMojito from "../assets/Mojito.jpg";
import imgOrangeJuice from "../assets/Orange Juice.jpg";
import imgIcedCoffee from "../assets/Iced Coffee.jpg";

import imgSpanishLatte from "../assets/Spanish Latte.jpg";
import imgHotChocolate from "../assets/Hot Chocolate.jpg";
import imgFlatWhite from "../assets/Flat White.jpg";
import imgMocha from "../assets/Mocha.jpg";
import imgAmericano from "../assets/Americano.jpg";
import imgLatte from "../assets/Latte.jpg";
import imgCappuccino from "../assets/Cappuccino.jpg";
import imgEspresso from "../assets/Espresso.jpg";




const cardContainerStyle = {
  minWidth: "340px",
  borderRadius: "25px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(200,169,126,0.3)",
  transition: "0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-12px) scale(1.03)",
  },
};

const letterStyle = (i) => ({
  fontSize: "3rem",
  fontWeight: "bold",
  background: "linear-gradient(45deg, #f5e6c8, #e6c9a8, #c8a97e, #f5d7a1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  opacity: 0,
  transform: getStartPosition(i),
  animation: "moveIn 1.2s ease forwards",
  animationDelay: `${i * 0.2}s`,
});

const getStartPosition = (i) => {
  const positions = [
    "translate(-150px, -80px)",
    "translate(150px, -80px)",
    "translate(-150px, 80px)",
    "translate(150px, 80px)",
  ];
  return positions[i];
};




const menuItems = [
  { title: "Cupcake", img: imgCupcake },
  { title: "Donut", img: imgDonut },
  { title: "Vanilla Cake", img: imgVanillaCake },
  { title: "Tiramisu", img: imgTiramisu },
  { title: "Brownie", img: imgBrownie },
  { title: "Cheesecake", img: imgCheesecake },

  { title: "Cold Chocolate", img: imgColdChocolate },
  { title: "Energy Drink", img: imgEnergyDrink },
  { title: "Strawberry Smoothie", img: imgStrawberrySmoothie },
  { title: "Mojito", img: imgMojito },
  { title: "Orange Juice", img: imgOrangeJuice },
  { title: "Iced Coffee", img: imgIcedCoffee },

  { title: "Spanish Latte", img: imgSpanishLatte },
  { title: "Hot Chocolate", img: imgHotChocolate },
  { title: "Flat White", img: imgFlatWhite },
  { title: "Mocha", img: imgMocha },
  { title: "Americano", img: imgAmericano },
  { title: "Latte", img: imgLatte },
  { title: "Cappuccino", img: imgCappuccino },
  { title: "Espresso", img: imgEspresso },
];




function Home() {
  const navigate = useNavigate();
  const sliderRef = useRef();

  const scroll = (dir) => {
    const container = sliderRef.current;
    container.scrollBy({
      left: dir === "left" ? -420 : 420,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #1a120b, #3e2723, #6f4e37, #c8a97e)",
        backgroundSize: "300% 300%",
        animation: "bgMove 12s ease infinite",
        "@keyframes bgMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "@keyframes moveIn": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1, transform: "translate(0,0)" },
        },
      }}
    >
      <Container maxWidth="lg">

   
        <Box sx={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", mb: 12 }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              {["Q", "ᴴ", "ᵂ", "ᴬ"].map((char, i) => (
                <Typography key={i} sx={letterStyle(i)}>
                  {char}
                </Typography>
              ))}
            </Box>

            <Typography sx={{ color: "#f5e6c8", mt: 2 }}>
              Cakes • Hot Drinks • Cold Drinks
            </Typography>

            <Button
              onClick={() => navigate("/menu")}
              sx={{
                mt: 4,
                px: 5,
                py: 1.5,
                borderRadius: "20px",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #c8a97e, #f5d7a1)",
                color: "#1a120b",
              }}
            >
              Explore Menu
            </Button>
          </Box>
        </Box>

        
        <Box sx={{ mt: 14 }}>
          <Typography variant="h3" sx={{ color: "#c8a97e", mb: 3 }}>
            QHWA WITH LOVE
          </Typography>
          <Typography sx={{ color: "#f5e6c8" }}>
            Coffee is more than just a drink—it’s a daily ritual that brings comfort, energy, and connection.
          </Typography>
        </Box>

        
        <Box sx={{ mt: 14 }}>
          <Typography variant="h3" sx={{ color: "#c8a97e", mb: 5 }}>
            Top Picks
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <IconButton onClick={() => scroll("left")} sx={{ color: "#c8a97e" }}>
              <ArrowBackIosNewIcon />
            </IconButton>

            <Box
              ref={sliderRef}
              sx={{
                display: "flex",
                gap: 4,
                overflowX: "auto",
                pb: 2,
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {menuItems.map((item, i) => (
                <Box key={i} sx={cardContainerStyle}>
                  <Box
                    sx={{
                      height: "260px",
                      borderRadius: "20px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${item.img})`,
                    }}
                  />
                  <Typography
                    sx={{
                      p: 2,
                      color: "#c8a97e",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              ))}
            </Box>

            <IconButton onClick={() => scroll("right")} sx={{ color: "#c8a97e" }}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>

    
        <Box sx={{ mt: 16, pb: 10 }}>
          <Typography variant="h3" sx={{ color: "#c8a97e", mb: 6, textAlign: "center" }}>
            Our Partners
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: LocalCafeIcon, name: "Golden Beans" },
              { icon: BakeryDiningIcon, name: "Sweet Bite" },
              { icon: EmojiFoodBeverageIcon, name: "Royal Drinks" },
            ].map((item, i) => (
              <Grid key={i} item xs={12} sm={4} textAlign="center">
                <item.icon sx={{ fontSize: 80, color: "#c8a97e" }} />
                <Typography sx={{ mt: 2, color: "#c8a97e" }}>
                  {item.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}

export default Home;