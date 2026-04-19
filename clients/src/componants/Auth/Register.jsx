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
        background: "linear-gradient(135deg, #f3e9dc, #e6ccb2, #d6ccc2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      
  

      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: "30px",
            textAlign: "center",
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.25)",
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            animation: "fadeSlide 0.8s ease",

            "@keyframes fadeSlide": {
              from: { opacity: 0, transform: "translateY(-40px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },

            "&:hover": {
              transform: "scale(1.03)",
              transition: "0.4s",
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: "#3e2723",
              letterSpacing: "1px",
            }}
          >
            Create Account 
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
              fullWidth
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "10px",
                },
              }}
            />

            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "10px",
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              fullWidth
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "10px",
                },
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
              fullWidth
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "10px",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.3,
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, #6f4e37, #4e342e)",
                color: "#fff",
                fontWeight: "bold",
                letterSpacing: "1px",
                boxShadow: "0 0 15px rgba(111,78,55,0.6)",
                transition: "0.3s",

                "&:hover": {
                  transform: "scale(1.07)",
                  boxShadow: "0 0 25px rgba(0,0,0,0.4)",
                },
              }}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 2,
              color: "#3e2723",
              fontSize: "14px",
              opacity: 0.8,
            }}
          >
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/login")}
              sx={{
                color: "#6f4e37",
                fontWeight: "bold",
                textDecoration: "none",
                cursor: "pointer",
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