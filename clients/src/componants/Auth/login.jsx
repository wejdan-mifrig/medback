import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/login", formData);

      if (res.status === 200) {
        toast.success(res.data.message);

        const user = res.data.user;
        const token = res.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(user));

        if (user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
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

        /* 🎨 خلفية جديدة */
        background:
          "linear-gradient(135deg, #1c1c1c, #3e2723, #6f4e37)",

        animation: "bgMove 10s infinite alternate",
        "@keyframes bgMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 5,
            borderRadius: "25px",
            textAlign: "center",

            /* ✨ Glass effect */
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)",

            /* ✨ animation */
            animation: "fadeUp 0.8s ease",
            "@keyframes fadeUp": {
              from: { opacity: 0, transform: "translateY(40px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },

            transition: "0.4s",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: "2px",
              animation: "fadeText 1s ease",
              "@keyframes fadeText": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            Welcome Back
          </Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            variant="filled"
            sx={{
              "& .MuiFilledInput-root": {
                background: "rgba(255,255,255,0.15)",
                borderRadius: "10px",
                color: "#fff",
              },
              input: { color: "#fff" },
              label: { color: "#ddd" },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            variant="filled"
            sx={{
              "& .MuiFilledInput-root": {
                background: "rgba(255,255,255,0.15)",
                borderRadius: "10px",
                color: "#fff",
              },
              input: { color: "#fff" },
              label: { color: "#ddd" },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.3,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6f4e37, #000)",
              fontWeight: "bold",
              letterSpacing: "1px",
              transition: "0.3s",
              animation: "btnGlow 2s infinite alternate",

              "@keyframes btnGlow": {
                from: { boxShadow: "0 0 10px #6f4e37" },
                to: { boxShadow: "0 0 25px #000" },
              },

              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>

          <Typography sx={{ mt: 2, color: "#ddd", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/register")}
              sx={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;