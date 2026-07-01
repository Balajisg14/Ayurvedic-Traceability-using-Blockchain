const API_URL = process.env.REACT_APP_API_URL;

// Register user
export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
};

// Login user
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

// Get all products
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`);
  return res.json();
};
