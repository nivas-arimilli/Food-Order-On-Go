const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String, // 'admin', 'customer', 'restaurant'
});

const ProductSchema = new mongoose.Schema({
  restaurantId: String,
  name: String,
  price: Number,
  description: String
});

const OrderSchema = new mongoose.Schema({
  customerId: String,
  items: [{ productId: String, quantity: Number }],
  total: Number,
  status: String
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Product: mongoose.model('Product', ProductSchema),
  Order: mongoose.model('Order', OrderSchema)
};
