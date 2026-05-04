import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import Cupcake from "../assets/Cupcake.jpg";
import Muffin from "../assets/Muffin.jpg";
import Donut from "../assets/Donuts.jpg";
import CarrotCake from "../assets/Carrot Cake.jpg";
import VanillaCake from "../assets/Vanilla Cake.jpg";
import Tiramisu from "../assets/Tiramisu.jpg";
import Brownie from "../assets/Brownies.jpg";
import RedVelvet from "../assets/Red Velvet Cake.jpg";
import ChocolateCake from "../assets/Chocolate Cake.jpg";
import Cheesecake from "../assets/Cheesecake.jpg";

import ColdChocolate from "../assets/Cold Chocolate.jpg";
import EnergyDrink from "../assets/Energy Drink.jpg";
import IceTea from "../assets/Ice Tea.jpg";
import StrawberrySmoothie from "../assets/Strawberry Smoothie.jpg";
import Mojito from "../assets/Mojito.jpg";
import OrangeJuice from "../assets/Orange Juice.jpg";
import LemonJuice from "../assets/Lemon Juice.jpg";
import Frappuccino from "../assets/Frappuccino.jpg";
import IcedLatte from "../assets/Iced Latte.jpg";
import IcedCoffee from "../assets/Iced Coffee.jpg";

import SpanishLatte from "../assets/Spanish Latte.jpg";
import Tea from "../assets/Tea.jpg";
import HotChocolate from "../assets/Hot Chocolate.jpg";
import FlatWhite from "../assets/Flat White.jpg";
import TurkishCoffee from "../assets/Turkish Coffee.jpg";
import Mocha from "../assets/Mocha.jpg";
import Americano from "../assets/Americano.jpg";
import Latte from "../assets/Latte.jpg";
import Cappuccino from "../assets/Cappuccino.jpg";
import Espresso from "../assets/Espresso.jpg";

const imageMap = {
  Cupcake, Muffin, Donut,
  "Carrot Cake": CarrotCake,
  "Vanilla Cake": VanillaCake,
  Tiramisu, Brownie,
  "Red Velvet": RedVelvet,
  "Chocolate Cake": ChocolateCake,
  Cheesecake,

  "Cold Chocolate": ColdChocolate,
  "Energy Drink": EnergyDrink,
  "Ice Tea": IceTea,
  "Strawberry Smoothie": StrawberrySmoothie,
  Mojito,
  "Orange Juice": OrangeJuice,
  "Lemon Juice": LemonJuice,
  Frappuccino,
  "Iced Latte": IcedLatte,
  "Iced Coffee": IcedCoffee,

  "Spanish Latte": SpanishLatte,
  Tea,
  "Hot Chocolate": HotChocolate,
  "Flat White": FlatWhite,
  "Turkish Coffee": TurkishCoffee,
  Mocha,
  Americano,
  Latte,
  Cappuccino,
  Espresso,
};

function Cart() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const confirmOrder = () => {
    localStorage.setItem("pendingCart", JSON.stringify(cart));
    localStorage.removeItem("cart");

    setCart([]);
    setOpen(true);
    window.dispatchEvent(new Event("storage"));

    setTimeout(() => {
      navigate("/login");
    }, 900);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        color: "#fff",

     
        background: "linear-gradient(135deg, #1c1c1c, #3e2723, #6f4e37)",
        backgroundSize: "400% 400%",
        animation: "bgMove 10s infinite alternate",

        "@keyframes bgMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      }}
    >

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: "2px"
        }}
      >
        🛒 Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography textAlign="center" sx={{ color: "#ddd" }}>
          Your cart is empty 😢
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {cart.map((item) => (
              <Grid key={item._id} item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: "20px",

                    // ✨ Glass effect مثل اللوج إن
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    transition: "0.3s",

                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={imageMap[item.name]}
                    sx={{
                      width: 110,
                      height: 110,
                      objectFit: "cover",
                      borderRadius: "15px",
                      border: "2px solid #6f4e37",
                      mr: 2
                    }}
                  />

                  <CardContent sx={{ flex: 1 }}>
                    <Typography fontWeight="bold">
                      {item.name}
                    </Typography>

                    <Typography sx={{ fontSize: "13px", color: "#ddd" }}>
                      Qty: {item.qty}
                    </Typography>

                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                      Total: ${item.price * item.qty}
                    </Typography>
                  </CardContent>

                  <IconButton onClick={() => removeItem(item._id)}>
                    <DeleteIcon sx={{ color: "#ff6b6b" }} />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography
            sx={{
              mt: 4,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px"
            }}
          >
            Total Price: ${total}
          </Typography>

          <Box textAlign="center">
            <Button
              onClick={confirmOrder}
              variant="contained"
              sx={{
                mt: 3,
                px: 4,
                py: 1.2,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6f4e37, #000)",
                fontWeight: "bold",
                animation: "btnGlow 2s infinite alternate",

                "@keyframes btnGlow": {
                  from: { boxShadow: "0 0 10px #6f4e37" },
                  to: { boxShadow: "0 0 25px #000" }
                },

                "&:hover": {
                  transform: "scale(1.05)"
                }
              }}
            >
              Confirm Order
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Redirecting to login...
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Cart;