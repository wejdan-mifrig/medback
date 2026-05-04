import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer
} from "@mui/material";

function AdminSidebar({ open, setOpen, setPage }) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box
        sx={{
          width: 260,
          height: "100%",
          bgcolor: "#6f4e37",
          color: "#fff",
          p: 2
        }}
      >

        <List>

          <ListItem disablePadding>
            <ListItemButton onClick={() => { setPage("home"); setOpen(false); }}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => { setPage("products"); setOpen(false); }}>
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => { setPage("users"); setOpen(false); }}>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => { setPage("messages"); setOpen(false); }}>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>

        </List>

      </Box>
    </Drawer>
  );
}

export default AdminSidebar;