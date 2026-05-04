
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  Paper
} from "@mui/material";

import { useState } from "react";

function UserContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Message sent successfully ☕");

        setForm({
          name: "",
          email: "",
          message: ""
        });
      } else {
        alert("Failed to send message ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        background: "linear-gradient(135deg, #1c1c1c, #3e2723, #6f4e37)",

        animation: "bgMove 10s infinite alternate",
        "@keyframes bgMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: "25px",
            textAlign: "center",

            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            color: "#fff",

            animation: "fadeUp 0.8s ease",
            "@keyframes fadeUp": {
              from: { opacity: 0, transform: "translateY(40px)" },
              to: { opacity: 1, transform: "translateY(0)" }
            },

            transition: "0.4s",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
            }
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: "bold",
              color: "#d7ccc8",
              letterSpacing: "2px",
              animation: "fadeText 1s ease",
              "@keyframes fadeText": {
                from: { opacity: 0 },
                to: { opacity: 1 }
              }
            }}
          >
            Contact Us
          </Typography>

          <Typography sx={{ mb: 3, color: "#b0a7a7", fontSize: "14px" }}>
            We’d love to hear from you ☕
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column"
            }}
          >
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "10px",
                  color: "#fff"
                },
                input: { color: "#fff" },
                label: { color: "#ddd" }
              }}
            />

            <TextField
              label="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "10px",
                  color: "#fff"
                },
                input: { color: "#fff" },
                label: { color: "#ddd" }
              }}
            />

            <TextField
              label="Message"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              multiline
              rows={4}
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "10px",
                  color: "#fff"
                },
                input: { color: "#fff" },
                label: { color: "#ddd" }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.3,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6f4e37, #000)",
                fontWeight: "bold",
                letterSpacing: "1px",
                transition: "0.3s",
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
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default UserContact;