const API_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Add a new user
export const addUser = async (name, email, company) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        company: { name: company },
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to add user: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
    return true; // Indicates successful deletion
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Edit an existing user
export const editUser = async (id, updatedUserData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUserData),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to edit user: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
