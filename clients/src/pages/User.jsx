// src/pages/UserPage.js
import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

function UserPage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Box sx={{ p: 4, minHeight: "100vh", background: "#f5f5f5" }}>
      
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Welcome {user?.name} 👋
      </Typography>

      <Grid container spacing={3}>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "15px" }}>
            <CardContent>
              <Typography variant="h6">My Orders</Typography>
              <Typography color="text.secondary">
                View your previous orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "15px" }}>
            <CardContent>
              <Typography variant="h6">Profile</Typography>
              <Typography color="text.secondary">
                Edit your information
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "15px" }}>
            <CardContent>
              <Typography variant="h6">Cart</Typography>
              <Typography color="text.secondary">
                Check your cart items
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </Box>
  );
}

export default UserPage;