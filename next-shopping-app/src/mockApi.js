// src/mockApi.js

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const products = [
  { item_id: 1, name: "Laptop", description: "High-performance laptop", price: 999.99, quantity_available: 50, image_url: "/images/laptop.jpg" },
  { item_id: 2, name: "Smartphone", description: "Latest model smartphone", price: 699.99, quantity_available: 100, image_url: "/images/smartphone.jpg" },
  { item_id: 3, name: "Headphones", description: "Noise-cancelling headphones", price: 199.99, quantity_available: 75, image_url: "/images/headphones.jpg" },
];

const orders = [
  { order_id: 1, customer_id: 1, total_amount: 1199.98, order_date: "2023-05-01", fulfilled: false, items: [1, 2] },
  { order_id: 2, customer_id: 2, total_amount: 199.99, order_date: "2023-05-02", fulfilled: true, items: [3] },
];

const users = [
  { user_id: 1, username: "admin", email: "admin@example.com", role: "admin" },
  { user_id: 2, username: "customer", email: "customer@example.com", role: "customer" },
];

const discounts = [
  { code: "SUMMER10", discount_percentage: 10, valid_until: "2023-08-31" },
  { code: "WELCOME20", discount_percentage: 20, valid_until: "2023-12-31" },
];

// Mock API functions
export const fetchProducts = async () => {
  await delay(500); // Simulate network delay
  return products;
};

export const fetchProductById = async (id) => {
  await delay(300);
  return products.find(p => p.item_id === id);
};

export const createProduct = async (productData) => {
  await delay(700);
  const newProduct = { ...productData, item_id: products.length + 1 };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id, productData) => {
  await delay(500);
  const index = products.findIndex(p => p.item_id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...productData };
    return products[index];
  }
  throw new Error("Product not found");
};

export const deleteProduct = async (id) => {
  await delay(500);
  const index = products.findIndex(p => p.item_id === id);
  if (index !== -1) {
    products.splice(index, 1);
    return { success: true };
  }
  throw new Error("Product not found");
};

export const fetchOrders = async () => {
  await delay(500);
  return orders;
};

export const fetchOrderById = async (id) => {
  await delay(300);
  return orders.find(o => o.order_id === id);
};

export const updateOrderStatus = async (id, fulfilled) => {
  await delay(500);
  const order = orders.find(o => o.order_id === id);
  if (order) {
    order.fulfilled = fulfilled;
    return order;
  }
  throw new Error("Order not found");
};

export const fetchUsers = async () => {
  await delay(500);
  return users;
};

export const fetchUserById = async (id) => {
  await delay(300);
  return users.find(u => u.user_id === id);
};

export const createUser = async (userData) => {
  await delay(700);
  const newUser = { ...userData, user_id: users.length + 1 };
  users.push(newUser);
  return newUser;
};

export const fetchDiscounts = async () => {
  await delay(500);
  return discounts;
};

export const createDiscount = async (discountData) => {
  await delay(700);
  discounts.push(discountData);
  return discountData;
};

export const validateDiscount = async (code) => {
  await delay(300);
  const discount = discounts.find(d => d.code === code);
  if (discount && new Date(discount.valid_until) > new Date()) {
    return discount;
  }
  throw new Error("Invalid or expired discount code");
};