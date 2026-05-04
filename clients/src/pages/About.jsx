import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Rating } from "@mui/material";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlagIcon from "@mui/icons-material/Flag";
import FavoriteIcon from "@mui/icons-material/Favorite";

function About() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#fff",
        position: "relative",
        overflow: "hidden",

        background: "linear-gradient(-45deg,#2b1b14,#3e2723,#4e342e,#6d4c41,#3e2723)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 8s ease-in-out infinite",

        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "25%": { backgroundPosition: "50% 100%" },
          "50%": { backgroundPosition: "100% 50%" },
          "75%": { backgroundPosition: "50% 0%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      }}
    >

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), transparent 60%)",
          animation: "floatOverlay 10s linear infinite",
          zIndex: 0,
          "@keyframes floatOverlay": {
            "0%": { transform: "translate(0,0)" },
            "50%": { transform: "translate(-10%, -10%)" },
            "100%": { transform: "translate(0,0)" }
          }
        }}
      />

      <Container sx={{ py: 8, position: "relative", zIndex: 1 }}>

        <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: "bold" }}>
          About QHWA Coffee
        </Typography>

        <Grid container direction="column" alignItems="center" spacing={3}>

          {[
            {
              icon: <LocalCafeIcon sx={{ fontSize: 50 }} />,
              title: "Who We Are",
              text: "A premium café brand offering the finest coffee, cakes, and drinks."
            },
            {
              icon: <EmojiObjectsIcon sx={{ fontSize: 50 }} />,
              title: "What We Offer",
              text: "Hot drinks, cold drinks, desserts, and handcrafted beverages."
            },
            {
              icon: <VisibilityIcon sx={{ fontSize: 50 }} />,
              title: "Why Choose Us",
              text: "High quality ingredients and unforgettable coffee experience."
            },
            {
              icon: <FlagIcon sx={{ fontSize: 50 }} />,
              title: "Our Mission",
              text: "To deliver happiness in every cup and every bite."
            },
            {
              icon: <FavoriteIcon sx={{ fontSize: 50 }} />,
              title: "Our Vision",
              text: "To become the most loved coffee destination in the region."
            }
          ].map((item, i) => (
            <Grid item xs={12} key={i} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Card
                sx={{
                  width: "70%",
                  textAlign: "center",
                  background: "rgba(0,0,0,0.25)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  color: "#fff",
                  p: 3
                }}
              >
                {item.icon}
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
                  <Typography>{item.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

        </Grid>

        <Box sx={{ mt: 10 }}>
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            Customer Reviews
          </Typography>

          <Grid container direction="column" alignItems="center" spacing={3}>

            {[
              { name: "Ahmed", text: "Best coffee ever!", rating: 5 },
              { name: "Sara", text: "Amazing desserts and vibe", rating: 5 },
              { name: "John", text: "Very cozy place", rating: 4 },
              { name: "Lina", text: "I love iced latte!", rating: 5 },
              { name: "Omar", text: "Highly recommended", rating: 5 }
            ].map((review, i) => (
              <Grid item xs={12} key={i} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Card
                  sx={{
                    width: "70%",
                    textAlign: "center",
                    p: 3,
                    borderRadius: "20px",
                    background: "rgba(0,0,0,0.25)",
                    color: "#fff"
                  }}
                >
                  <Typography variant="h6">{review.name}</Typography>
                  <Typography sx={{ my: 1 }}>{review.text}</Typography>
                  <Rating value={review.rating} readOnly />
                </Card>
              </Grid>
            ))}

          </Grid>
        </Box>

      </Container>
    </Box>
  );
}

export default About;