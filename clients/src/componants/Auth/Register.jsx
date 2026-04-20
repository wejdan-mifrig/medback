import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  Paper,
  Link
} from "@mui/material";
import { useState } from "react";
import api from "../../api.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/register", formData);

      if (!res.data.user) {
        toast.error(res.data.message || "Registration failed");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      toast.success("Registered successfully");

      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "An error occurred during registration"
      );
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

        // 🎨 نفس خلفية Login
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
          elevation={10}
          sx={{
            p: 5,
            borderRadius: "25px",
            textAlign: "center",

            // ✨ نفس glass effect
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            color: "#fff",

            // ✨ نفس animation
            animation: "fadeUp 0.8s ease",
            "@keyframes fadeUp": {
              from: { opacity: 0, transform: "translateY(40px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },

            transition: "0.4s",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            },
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
                to: { opacity: 1 },
              },
            }}
          >
            Create Account
          </Typography>

          <Typography sx={{ mb: 3, color: "#b0a7a7", fontSize: "14px" }}>
            Join us and start your journey ☕
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
            }}
          >
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
              label="Email"
              type="email"
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
              label="Password"
              type="password"
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

            <TextField
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
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
                  to: { boxShadow: "0 0 25px #000" },
                },

                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
          </Box>

          <Typography sx={{ mt: 2, color: "#ddd", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/login")}
              sx={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;

