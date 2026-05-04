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

      const pendingCart = JSON.parse(localStorage.getItem("pendingCart"));
      if (pendingCart && pendingCart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(pendingCart));
        localStorage.removeItem("pendingCart");
      }

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
        background: "linear-gradient(135deg, #1c1c1c, #3e2723, #6f4e37)",
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
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: "bold", color: "#fff" }}
          >
            Create Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
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
              fullWidth
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
              label="Password"
              type="password"
              fullWidth
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

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
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
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.3,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6f4e37, #000)",
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
              sx={{ color: "#fff", fontWeight: "bold" }}
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