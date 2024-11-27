import { useState, useEffect } from "react";
import "../App.css";
import Card from "../components/Card";
import AddUserCard from "../components/AddUserCard";
import { getUsers, addUser, deleteUser, editUser } from "../services/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function App() {
  const [users, setUser] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Snackbar Helper Functions
  const showSnackbar = (message, type) => {
    setSnackbar({ open: true, message, type });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUser(data);
      showSnackbar("Users fetched successfully!", "success");
    } catch {
      showSnackbar("Failed to fetch users!", "error");
    }
  };

  // Add a user
  const handleAddUser = async (name, email, company) => {
    try {
      const newUser = await addUser(name, email, company);
      setUser((prevUsers) => [...prevUsers, newUser]);
      showSnackbar("User added successfully!", "success");
    } catch {
      showSnackbar("Failed to add user!", "error");
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
      showSnackbar("User deleted successfully!", "success");
    } catch {
      showSnackbar("Failed to delete user!", "error");
    }
  };

  // Edit a user
  const handleEditUser = async (id, updatedUserData) => {
    try {
      const updatedUser = await editUser(id, updatedUserData);
      setUser((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? updatedUser : user))
      );
      showSnackbar("User updated successfully!", "success");
    } catch {
      showSnackbar("Failed to update user!", "error");
    }
  };

  return (
    <div className="App">
      <div>
        <h1>User Management Dashboard</h1>
      </div>

      <div>
        <AddUserCard addUser={handleAddUser} />
      </div>
      <br />
      <div className="d-flex flex-wrap gap-5 p-3 justify-content-center">
        {users.map((user) => (
          <Card
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            company={user.company.name}
            deleteUser={handleDeleteUser}
            editUser={handleEditUser}
          />
        ))}
      </div>
      
      {/* Material-UI Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.type}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default App;
