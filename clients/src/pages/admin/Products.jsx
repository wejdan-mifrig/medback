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

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
    CatId: ""
  });


  const fetchProducts = async () => {
    try {
      const res = await api.get("/all-products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

 
  const fetchCategories = async () => {
    try {
      const res = await api.get("/all-categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      toast.error("Failed to load categories");
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


  const addProduct = async () => {
    try {
      await api.post("/create-product", form);

      toast.success("Product added");

      setForm({
        name: "",
        price: "",
        quantity: "",
        description: "",
        image: "",
        CatId: ""
      });

      fetchProducts();
    } catch (err) {
      toast.error("Error adding product");
    }
  };


  const startEdit = (p) => {
    setEditingId(p._id);

    setForm({
      name: p.name || "",
      price: p.price || "",
      quantity: p.quantity || "",
      description: p.description || "",
      image: p.image || "",
      CatId: p.CatId?._id || ""
    });
  };

  const updateProduct = async () => {
    try {
      await api.put(`/update-product/${editingId}`, form);

      toast.success("Product updated");

      setEditingId(null);

      setForm({
        name: "",
        price: "",
        quantity: "",
        description: "",
        image: "",
        CatId: ""
      });

      fetchProducts();
    } catch (err) {
      toast.error("Update failed");
    }
  };


  const deleteProduct = async (id) => {
    try {
      await api.delete(`/delete-product/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };


  const grouped = products.reduce((acc, product) => {
    const key = product.CatId?.name || "Uncategorized";

    if (!acc[key]) acc[key] = [];
    acc[key].push(product);

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
        Products 
      </Typography>

  
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mb: 4 }}>

        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField
          label="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <TextField
          label="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        
        <TextField
          select
          label="Category"
          value={form.CatId}
          onChange={(e) => setForm({ ...form, CatId: e.target.value })}
          sx={{ minWidth: 180 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <Button
          variant="contained"
          onClick={editingId ? updateProduct : addProduct}
          sx={{ bgcolor: "#8b6b4f" }}
        >
          {editingId ? "Update" : "Add"}
        </Button>

      </Box>

    
      {Object.keys(grouped).map((catName) => (
        <Box key={catName} sx={{ mb: 4 }}>

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
            {catName}
          </Typography>

          <Grid container spacing={2}>
            {grouped[catName].map((p) => (
              <Grid item xs={12} sm={6} md={3} key={p._id}>

                <Card sx={{ bgcolor: "#fffaf3", borderRadius: 3 }}>

                  <CardContent sx={{ textAlign: "center" }}>

                    <Typography fontWeight="bold">{p.name}</Typography>

                    <Typography sx={{ color: "#8b6b4f" }}>
                      {p.description}
                    </Typography>

                    <Typography sx={{ color: "#8b6b4f" }}>
                      Price: {p.price}
                    </Typography>

                    <Typography sx={{ fontSize: "12px", color: "#a1887f" }}>
                      {p.CatId?.name}
                    </Typography>

           
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}>

                      <Button
                        onClick={() => startEdit(p)}
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
                        onClick={() => deleteProduct(p._id)}
                        variant="contained"
                        sx={{
                          backgroundColor: "#6f4e37",
                          color: "#fff",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#5a3d2b"
                          }
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

export default Products;