import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import api from "../../api.js";

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleRegister = async () => {
        try {
            if (!formData.email || !formData.password) {
                toast.error("Please fill all fields!");
                return;
            }

            const res = await api.post("/auth/register", formData);

            if (res.status === 200) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message || "error");
            }

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <Container sx={{
            p: 4,
            pt: 7,
            textAlign: "center",
            margin: "0 auto",
        }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Register</Typography>

            <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Button
                variant="contained"
                sx={{
                    width: "100px",
                    mt: 3,
                }}
                onClick={handleRegister}
            >
                Register
            </Button>
        </Container>
    );
}

export default Register;