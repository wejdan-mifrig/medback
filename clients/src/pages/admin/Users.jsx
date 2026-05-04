import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem
} from "@mui/material";

import api from "../../api";
import { toast } from "react-hot-toast";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: ""
  });

  // ================= GET USERS =================
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users || []);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= START EDIT =================
  const startEdit = (u) => {
    setEditingId(u._id);

    setForm({
      name: u.name || "",
      email: u.email || "",
      role: u.role || ""
    });
  };

  // ================= UPDATE USER =================
  const updateUser = async () => {
    try {
      await api.put(`/user/${editingId}`, form);

      toast.success("User updated");

      setEditingId(null);

      setForm({
        name: "",
        email: "",
        role: ""
      });

      fetchUsers();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    try {
      await api.delete(`/user/${id}`);

      toast.success("User deleted");

      fetchUsers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ================= GROUP BY ROLE =================
  const grouped = users.reduce((acc, user) => {
    const key = user.role || "unknown";

    if (!acc[key]) acc[key] = [];

    acc[key].push(user);

    return acc;
  }, {});

  return (
    <Box sx={{ p: 3, bgcolor: "#f8f3ed", minHeight: "100vh" }}>

   
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: "#3e2723"
        }}
      >
        Users 
      </Typography>

      
      {editingId && (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4, flexWrap: "wrap" }}>

          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <TextField
            select
            label="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="admin">admin</MenuItem>
            <MenuItem value="user">user</MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={updateUser}
            sx={{ bgcolor: "#8b6b4f" }}
          >
            Save
          </Button>

        </Box>
      )}

   
      {Object.keys(grouped).map((role) => (
        <Box key={role} sx={{ mb: 4 }}>

          {/* ROLE TITLE */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#3e2723",
              borderLeft: "5px solid #8b6b4f",
              pl: 2
            }}
          >
            {role.toUpperCase()}
          </Typography>

          
          <Grid container spacing={2}>
            {grouped[role].map((u) => (
              <Grid item xs={12} sm={6} md={3} key={u._id}>

                <Card sx={{ bgcolor: "#fffaf3", borderRadius: 3 }}>

                  <CardContent sx={{ textAlign: "center" }}>

                    <Typography fontWeight="bold">
                      {u.name}
                    </Typography>

                    <Typography sx={{ color: "#8b6b4f" }}>
                      {u.email}
                    </Typography>

                    <Typography sx={{ fontSize: "12px", color: "#a1887f" }}>
                      {u.role}
                    </Typography>

               
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}>

                      <Button
                        onClick={() => startEdit(u)}
                        variant="outlined"
                        sx={{
                          borderColor: "#8b6b4f",
                          color: "#8b6b4f",
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: "#6f4e37",
                            backgroundColor: "#f5e6d3"
                          }
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={() => deleteUser(u._id)}
                        variant="contained"
                        sx={{
                          backgroundColor: "#6f4e37",
                          "&:hover": { backgroundColor: "#5a3d2b" }
                        }}
                      >
                        Delete
                      </Button>

                    </Box>

                  </CardContent>

                </Card>

              </Grid>
            ))}
          </Grid>

        </Box>
      ))}

    </Box>
  );
}

export default Users;