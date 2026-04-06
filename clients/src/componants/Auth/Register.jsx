import { Container, TextField, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import api from "../../api.js";
import { toast } from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

   
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);

      if (!res.data.user) {
        toast.error(res.data.message || "Registration failed");
        return;
      }

    
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      toast.success("Registered successfully");
      
   
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during registration");
    }
  };

  return (
    <Container
      sx={{
        p: 2,
        bgcolor: "linen",
        m: "auto",
        mt: 5,
        maxWidth: "400px"
      }}
    >
      <Typography variant="h5">Register</Typography>
      <Box
        sx={{
          display: "flex",
          m: 2,
          gap: 2,
          flexDirection: "column",
        }}
      >
        <TextField
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          label="Name..."
          variant="outlined"
          fullWidth
        />

        <TextField
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          label="Email..."
          variant="outlined"
          fullWidth
        />

        <TextField
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          label="Password..."
          type="password"
          variant="outlined"
          fullWidth
        />

        <TextField
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          label="Confirm Password..."
          type="password"
          variant="outlined"
          fullWidth
        />

        <Button 
          variant="contained" 
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Register;