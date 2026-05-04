import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField
} from "@mui/material";
import api from "../api";



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



function Menu() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/all-products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const handleQty = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: value
    });
  };

  const addToCart = (product) => {
    const qty = Number(quantities[product._id] || 1);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      cart = cart.map((item) =>
        item._id === product._id
          ? { ...item, qty: item.qty + qty }
          : item
      );
    } else {
      cart.push({ ...product, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  const grouped = products.reduce((acc, product) => {
    const categoryName = product.CatId?.name || "Other";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(product);
    return acc;
  }, {});

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f5efe6, #e7d8c9)"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          color: "#6b4f3a",
          fontWeight: "bold"
        }}
      >
        Menu
      </Typography>

      {Object.keys(grouped).map((category) => (
        <Box key={category} sx={{ mb: 6 }}>

          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: "#5c4432",
              borderBottom: "2px solid #c4a484",
              display: "inline-block",
              pb: 1
            }}
          >
            {category}
          </Typography>

          <Grid container spacing={3} justifyContent="center">

            {grouped[category].map((product) => (
              <Grid key={product._id} item xs={12} sm={6} md={3}>

                <Card
                  sx={{
                    borderRadius: "22px",
                    background: "#fffaf5",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    p: 2,
                    "&:hover": {
                      transform: "translateY(-6px)"
                    }
                  }}
                >

             
                  <Box
                    component="img"
                    src={imageMap[product.name]}
                    alt={product.name}
                    sx={{
                      width: "85%",      
                      height: 280,        
                      objectFit: "cover",  
                      borderRadius: "18px",
                      border: "2px solid #e0c3a3",
                      display: "block",
                      mx: "auto"
                    }}
                  />

                  <CardContent>

                    <Typography variant="h6" sx={{ color: "#5c4432", fontWeight: "bold" }}>
                      {product.name}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#8b6f47" }}>
                      {product.description}
                    </Typography>

                    <Typography sx={{ mt: 1, fontWeight: "bold", color: "#a67c52" }}>
                      ${product.price}
                    </Typography>

                    <TextField
                      fullWidth
                      type="number"
                      label="Quantity"
                      defaultValue={1}
                      sx={{ mt: 2 }}
                      onChange={(e) =>
                        handleQty(product._id, e.target.value)
                      }
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => addToCart(product)}
                      sx={{
                        mt: 2,
                        borderRadius: "12px",
                        background: "#c4a484",
                        "&:hover": {
                          background: "#a67c52"
                        }
                      }}
                    >
                      Add to Cart
                    </Button>

                  </CardContent>

                </Card>

              </Grid>
            ))}

          </Grid>

        </Box>
      ))}
    </Box>
  );
}

export default Menu;