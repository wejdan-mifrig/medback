import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const [cart, setCart] = useState([]);

  
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
    alert("Order Confirmed ☕🔥");

    localStorage.removeItem("cart");
    setCart([]);

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        🛒 Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty 😢</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid key={item._id} size={{ xs: 12, md: 6 }}>
                <Card sx={{ display: "flex", borderRadius: 3 }}>

                 
                  <CardMedia
                    component="img"
                    image={item.image}
                    sx={{ width: 150 }}
                  />

                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">
                      {item.name}
                    </Typography>

                    <Typography color="text.secondary">
                      {item.description}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      Price: ${item.price}
                    </Typography>

                    <Typography>
                      Qty: {item.qty}
                    </Typography>

                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                      Total: ${item.price * item.qty}
                    </Typography>
                  </CardContent>

                 
                  <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
                    <IconButton onClick={() => removeItem(item._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>

                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="h5"
            sx={{ mt: 4, fontWeight: "bold" }}
          >
            Total Price: ${total}
          </Typography>

        
          <Button
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#000",
              "&:hover": { bgcolor: "#333" }
            }}
            onClick={confirmOrder}
          >
            Confirm Order
          </Button>
        </>
      )}
    </Box>
  );
}

export default Cart;