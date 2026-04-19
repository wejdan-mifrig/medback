import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField
} from "@mui/material";
import api from "../api";

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

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    acc[categoryName].push(product);
    return acc;
  }, {});

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
         Menu
      </Typography>

      
      {Object.keys(grouped).map((category) => (
        <Box key={category} sx={{ mb: 5 }}>

        
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "bold",
              borderBottom: "2px solid #c4a484",
              display: "inline-block",
              pb: 1
            }}
          >
            {category}
          </Typography>

          <Grid container spacing={3}>
            {grouped[category].map((product) => (
              <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ borderRadius: 3, boxShadow: 4 }}>

                  <CardMedia
                    component="img"
                    height="180"
                    image={product.image}
                    alt={product.name}
                  />

                  <CardContent>
                    <Typography variant="h6">
                      {product.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>

                    <Typography sx={{ mt: 1, fontWeight: "bold" }}>
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
                      sx={{
                        mt: 2,
                        borderRadius: 2,
                        bgcolor: "#000",
                        "&:hover": { bgcolor: "#333" }
                      }}
                      onClick={() => addToCart(product)}
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