const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { User, Product, Order } = require('./Schema');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/foodorder', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch(console.error);

// User routes
app.post('/api/users/register', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.send({ message: 'Registered' });
});
app.post('/api/users/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  if (user) res.send(user);
  else res.status(401).send({ message: 'Invalid credentials' });
});

// Product routes
app.get('/api/products', async (_, res) => { res.send(await Product.find()); });
app.post('/api/products', async (req, res) => {
  const prod = new Product(req.body);
  await prod.save();
  res.send(prod);
});

// Order routes
app.post('/api/orders', async (req, res) => {
  const order = new Order({ ...req.body, status: 'pending' });
  await order.save();
  res.send(order);
});
app.get('/api/orders/:customerId', async (req, res) => {
  res.send(await Order.find({ customerId: req.params.customerId }));
});

app.listen(5000, () => console.log('Server running on port 5000'));
