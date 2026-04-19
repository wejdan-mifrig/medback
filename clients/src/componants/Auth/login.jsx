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

        // ✅ تخزين صحيح
        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(user));

        // ✅ توجيه حسب role
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
        background: "linear-gradient(135deg, #f3e9dc, #e6ccb2, #d6ccc2)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 5,
            borderRadius: "30px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
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
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>

          <Typography sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link component="button" onClick={() => navigate("/register")}>
              Register
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;