import { Box, Typography } from "@mui/material";

function Homee() {
  const letters = ["Q", "ᴴ", "ᵂ", "ᴬ"];

  const directions = [
    "translateX(-200px)",
    "translateY(-200px)",
    "translateY(200px)",
    "translateX(200px)"
  ];

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        width: "100%",
        bgcolor: "#f8f3ed",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >

      <Box
        sx={{
          textAlign: "center",
          transform: "translateY(-40px)"
        }}
      >
  
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {letters.map((letter, index) => (
            <Typography
              key={index}
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: "#8b6b4f",
                opacity: 0,

                animation: "letterIn 1s ease forwards",
                animationDelay: `${index * 0.25}s`,

                "@keyframes letterIn": {
                  "0%": {
                    opacity: 0,
                    transform: directions[index]
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translate(0,0)"
                  }
                }
              }}
            >
              {letter}
            </Typography>
          ))}
        </Box>


        <Typography
          sx={{
            mt: 1,
            color: "#a1887f",
            letterSpacing: 2,
            opacity: 0,
            animation: "fadeIn 2s ease forwards",
            animationDelay: "1.2s",

            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 }
            }
          }}
        >
          Coffee Admin Dashboard
        </Typography>

      
        <Typography
          sx={{
            mt: 3,
            maxWidth: "500px",
            color: "#6d4c41",
            fontSize: "15px",
            lineHeight: 1.8,
            opacity: 0,
            animation: "fadeIn 2.5s ease forwards",
            animationDelay: "1.5s"
          }}
        >
          Coffee is more than just a drink.  
          It is a daily ritual that brings energy and focus.  
          Its rich aroma creates a feeling of comfort and warmth.  
          People gather around coffee to share moments and ideas.  
          Every cup tells a story of passion and taste.
        </Typography>
      </Box>
    </Box>
  );
}

export default Homee;