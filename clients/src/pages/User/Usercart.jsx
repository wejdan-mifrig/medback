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



import Cupcake from "../../assets/Cupcake.jpg";
import Muffin from "../../assets/Muffin.jpg";
import Donut from "../../assets/Donuts.jpg";
import CarrotCake from "../../assets/Carrot Cake.jpg";
import VanillaCake from "../../assets/Vanilla Cake.jpg";
import Tiramisu from "../../assets/Tiramisu.jpg";
import Brownie from "../../assets/Brownies.jpg";
import RedVelvet from "../../assets/Red Velvet Cake.jpg";
import ChocolateCake from "../../assets/Chocolate Cake.jpg";
import Cheesecake from "../../assets/Cheesecake.jpg";

import ColdChocolate from "../../assets/Cold Chocolate.jpg";
import EnergyDrink from "../../assets/Energy Drink.jpg";
import IceTea from "../../assets/Ice Tea.jpg";
import StrawberrySmoothie from "../../assets/Strawberry Smoothie.jpg";
import Mojito from "../../assets/Mojito.jpg";
import OrangeJuice from "../../assets/Orange Juice.jpg";
import LemonJuice from "../../assets/Lemon Juice.jpg";
import Frappuccino from "../../assets/Frappuccino.jpg";
import IcedLatte from "../../assets/Iced Latte.jpg";
import IcedCoffee from "../../assets/Iced Coffee.jpg";

import SpanishLatte from "../../assets/Spanish Latte.jpg";
import Tea from "../../assets/Tea.jpg";
import HotChocolate from "../../assets/Hot Chocolate.jpg";
import FlatWhite from "../../assets/Flat White.jpg";
import TurkishCoffee from "../../assets/Turkish Coffee.jpg";
import Mocha from "../../assets/Mocha.jpg";
import Americano from "../../assets/Americano.jpg";
import Latte from "../../assets/Latte.jpg";
import Cappuccino from "../../assets/Cappuccino.jpg";
import Espresso from "../../assets/Espresso.jpg";



const imageMap = {
  Cupcake,
  Muffin,
  Donut,
  "Carrot Cake": CarrotCake,
  "Vanilla Cake": VanillaCake,
  Tiramisu,
  Brownie,
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

function UserCart() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const confirmOrder = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setOpen(true);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,

       
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
          mb: 3,
          textAlign: "center",
          color: "#fff",
          fontWeight: "bold"
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
                    borderRadius: "18px",
                    p: 2,

                    // ✨ glass effect مثل اللوق إن
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",

                    boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
                    color: "#fff"
                  }}
                >

                  <Box
                    component="img"
                    src={imageMap[item.name]}
                    alt={item.name}
                    sx={{
                      width: 120,
                      height: 120,
                      objectFit: "contain",
                      borderRadius: "15px",
                      border: "2px solid #c8a97e",
                      mr: 2,
                      background: "#fff"
                    }}
                  />

                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff" }}>
                      {item.name}
                    </Typography>

                    <Typography sx={{ color: "#ccc" }}>
                      {item.description}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      Price: ${item.price}
                    </Typography>

                    <Typography>Qty: {item.qty}</Typography>

                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                      Total: ${item.price * item.qty}
                    </Typography>
                  </CardContent>

                  <IconButton onClick={() => removeItem(item._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>

                </Card>

              </Grid>
            ))}

          </Grid>

          <Typography
            variant="h5"
            sx={{
              mt: 4,
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff"
            }}
          >
            Total Price: ${total}
          </Typography>

          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={confirmOrder}
              sx={{
                mt: 3,
                py: 1.3,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6f4e37, #000)",
                fontWeight: "bold",
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Order Confirmed ☕🔥
        </Alert>
      </Snackbar>

    </Box>
  );
}

export default UserCart;