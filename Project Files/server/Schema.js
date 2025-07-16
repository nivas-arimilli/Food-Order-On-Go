import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    usertype: { type: String },
    approval: { type: String }
});

// Admin Schema (you have collection named `id` in Compass)
const adminSchema = new mongoose.Schema({
    categories: { type: Array },
    promotedRestaurants: []
});

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
    ownerId: { type: String },
    title: { type: String },
    address: { type: String },
    mainImg: { type: String },
    menu: { type: Array, default: [] }
});

// Food Item Schema (your collection is `item`, not `foodItem`)
const foodItemSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    itemImg: { type: String },
    category: { type: String }, // veg / non-veg / beverage
    menuCategory: { type: String },
    restaurantId: { type: String },
    price: { type: Number },
    discount: { type: Number },
    rating: { type: Number }
});

// Orders Schema
const orderSchema = new mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    address: { type: String },
    pincode: { type: String },
    restaurantId: { type: String },
    restaurantName: { type: String },
    foodItemId: { type: String },
    foodItemName: { type: String },
    foodItemImg: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    discount: { type: Number },
    paymentMethod: { type: String },
    orderDate: { type: String },
    orderStatus: { type: String, default: 'order placed' }
});

// Cart Schema
const cartSchema = new mongoose.Schema({
    userId: { type: String },
    restaurantId: { type: String },
    restaurantName: { type: String },
    foodItemId: { type: String },
    foodItemName: { type: String },
    foodItemImg: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    discount: { type: Number }
});

// Exporting Models with corrected collection names
export const User = mongoose.model('users', userSchema);
export const Admin = mongoose.model('id', adminSchema); // 👈 using 'id' as collection name
export const Restaurant = mongoose.model('restaurant', restaurantSchema);
export const FoodItem = mongoose.model('item', foodItemSchema); // 👈 using 'item' collection
export const Orders = mongoose.model('orders', orderSchema);
export const Cart = mongoose.model('cart', cartSchema);
