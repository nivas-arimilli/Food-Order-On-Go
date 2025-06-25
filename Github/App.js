import React, { useState, useEffect } from 'react';
import './styles/App.css';

import { ChefHat, Users, Store, ShoppingCart, Plus, Edit, Trash2, Eye, Star, MapPin, Clock, Phone, Mail, DollarSign, Package, TrendingUp, User, Settings, LogOut, Home, Menu, X, Minus } from 'lucide-react';

const FoodOrderingSystem = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [userType, setUserType] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Pizza Palace', cuisine: 'Italian', rating: 4.5, deliveryTime: '30-45', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400', phone: '+1234567890', email: 'contact@pizzapalace.com', address: '123 Main St', status: 'active' },
    { id: 2, name: 'Burger King', cuisine: 'American', rating: 4.2, deliveryTime: '25-35', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', phone: '+1234567891', email: 'info@burgerking.com', address: '456 Oak Ave', status: 'active' },
    { id: 3, name: 'Sushi Zen', cuisine: 'Japanese', rating: 4.8, deliveryTime: '40-50', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', phone: '+1234567892', email: 'hello@sushizen.com', address: '789 Pine St', status: 'pending' }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Pizza', restaurantId: 1, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300', description: 'Classic tomato and mozzarella pizza', status: 'available' },
    { id: 2, name: 'Cheeseburger', price: 8.99, category: 'Burger', restaurantId: 2, image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=300', description: 'Juicy beef patty with cheese', status: 'available' },
    { id: 3, name: 'Salmon Roll', price: 15.99, category: 'Sushi', restaurantId: 3, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300', description: 'Fresh salmon sushi roll', status: 'available' },
    { id: 4, name: 'Pepperoni Pizza', price: 14.99, category: 'Pizza', restaurantId: 1, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300', description: 'Classic pepperoni pizza', status: 'available' },
    { id: 5, name: 'Double Bacon Burger', price: 11.99, category: 'Burger', restaurantId: 2, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300', description: 'Double patty with crispy bacon', status: 'available' }
  ]);

  const [orders, setOrders] = useState([
    { id: 1, customerId: 1, restaurantId: 1, items: [{ productId: 1, quantity: 2, price: 12.99 }], total: 25.98, status: 'delivered', date: '2024-06-20', customerName: 'John Doe' },
    { id: 2, customerId: 2, restaurantId: 2, items: [{ productId: 2, quantity: 1, price: 8.99 }], total: 8.99, status: 'preparing', date: '2024-06-23', customerName: 'Jane Smith' },
    { id: 3, customerId: 3, restaurantId: 3, items: [{ productId: 3, quantity: 1, price: 3.99 }], total: 3.99, status: 'preparing', date: '2024-06-22', customerName: 'Smith' }

  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', type: 'customer', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', type: 'customer', status: 'active', joinDate: '2024-02-20' },
    { id: 3, name: 'Admin User', email: 'admin@foodsys.com', phone: '+1234567892', type: 'admin', status: 'active', joinDate: '2024-01-01' }
  ]);

  const [cart, setCart] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Login Component
  const LoginPage = () => {
    const handleLogin = (type) => {
      if (type === 'admin') {
        setCurrentUser({ id: 3, name: 'Admin User', email: 'admin@foodsys.com', type: 'admin' });
      } else if (type === 'customer') {
        setCurrentUser({ id: 1, name: 'John Doe', email: 'john@example.com', type: 'customer' });
      } else if (type === 'restaurant') {
        setCurrentUser({ id: 1, name: 'Pizza Palace', email: 'contact@pizzapalace.com', type: 'restaurant', restaurantId: 1 });
      }
      setUserType(type);
      setCurrentPage(type === 'admin' ? 'admin-dashboard' : type === 'customer' ? 'customer-home' : 'restaurant-dashboard');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <ChefHat className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">Food Ordering System</h1>
            <p className="text-gray-600 mt-2">Choose your login type</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleLogin('admin')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Login as Admin</span>
            </button>

            <button
              onClick={() => handleLogin('customer')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Login as Customer</span>
            </button>

            <button
              onClick={() => handleLogin('restaurant')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Store className="w-5 h-5" />
              <span>Login as Restaurant</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Sidebar Component
  const Sidebar = ({ items, currentPage, onPageChange }) => {
    return (
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <ChefHat className="w-8 h-8 text-orange-500" />
                <span className="text-xl font-bold">FoodSys</span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-medium">{currentUser?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{userType}</p>
            </div>

            <nav className="space-y-2">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onPageChange(item.page);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.page 
                      ? 'bg-orange-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              
              <button
                onClick={() => {
                  setCurrentPage('login');
                  setCurrentUser(null);
                  setUserType('');
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors mt-8"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </>
    );
  };

  // Header Component
  const Header = ({ title }) => (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {userType === 'customer' && (
            <button
              onClick={() => setCurrentPage('customer-cart')}
              className="relative bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );

  // Admin Components
  const AdminDashboard = () => {
    const stats = [
      { title: 'Total Restaurants', value: restaurants.length, icon: Store, color: 'bg-blue-500' },
      { title: 'Total Orders', value: orders.length, icon: Package, color: 'bg-green-500' },
      { title: 'Total Users', value: users.filter(u => u.type === 'customer').length, icon: Users, color: 'bg-purple-500' },
      { title: 'Revenue', value: `$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`, icon: DollarSign, color: 'bg-orange-500' }
    ];

    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Restaurants</h3>
            <div className="space-y-3">
              {restaurants.slice(0, 5).map(restaurant => (
                <div key={restaurant.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img src={restaurant.image} alt={restaurant.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium">{restaurant.name}</p>
                      <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{restaurant.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdminRestaurants = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Restaurants</h2>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Restaurant</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuisine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {restaurants.map(restaurant => (
                  <tr key={restaurant.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={restaurant.image} alt={restaurant.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                          <div className="text-sm text-gray-500">{restaurant.address}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{restaurant.cuisine}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-900">{restaurant.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        restaurant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {restaurant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const AdminOrders = () => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => {
                  const restaurant = restaurants.find(r => r.id === order.restaurantId);
                  return (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{restaurant?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Customer Components
  const CustomerHome = () => {
    const popularRestaurants = restaurants.filter(r => r.rating >= 4.0);

    return (
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {currentUser?.name}!</h2>
          <p className="text-gray-600">Discover amazing food from the best restaurants</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRestaurants.map(restaurant => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => {
                     setSelectedRestaurant(restaurant);
                     setCurrentPage('customer-restaurant');
                   }}>
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-gray-800">{restaurant.name}</h4>
                  <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-700">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{restaurant.deliveryTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Featured Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h4 className="font-medium text-gray-800">{product.name}</h4>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-orange-600">${product.price}</span>
                    <button
                      onClick={() => {
                        const existingItem = cart.find(item => item.id === product.id);
                        if (existingItem) {
                          setCart(cart.map(item => 
                            item.id === product.id 
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                          ));
                        } else {
                          setCart([...cart, { ...product, quantity: 1 }]);
                        }
                      }}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CustomerRestaurant = () => {
    if (!selectedRestaurant) return null;

    const restaurantProducts = products.filter(p => p.restaurantId === selectedRestaurant.id);

    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full md:w-32 h-32 object-cover rounded-lg" />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">{selectedRestaurant.name}</h2>
              <p className="text-gray-600 text-lg">{selectedRestaurant.cuisine} Cuisine</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{selectedRestaurant.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{selectedRestaurant.deliveryTime} min</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{selectedRestaurant.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-gray-800">{product.name}</h4>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-orange-600">${product.price}</span>
                    <button
                      onClick={() => {
                        const existingItem = cart.find(item => item.id === product.id);
                        if (existingItem) {
                          setCart(cart.map(item => 
                            item.id === product.id 
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                          ));
                        } else {
                          setCart([...cart, { ...product, quantity: 1 }]);
                        }
                      }}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CustomerCart = () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const updateQuantity = (id, change) => {
      setCart(cart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean));
    };

    const removeItem = (id) => {
      setCart(cart.filter(item => item.id !== id));
    };

    const placeOrder = () => {
      if (cart.length === 0) return;
      
      const newOrder = {
        id: orders.length + 1,
        customerId: currentUser.id,
        restaurantId: cart[0].restaurantId,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: total,
        status: 'preparing',
        date: new Date().toISOString().split('T')[0],
        customerName: currentUser.name
      };

      setOrders([...orders, newOrder]);
      setCart([]);
      alert('Order placed successfully!');
      setCurrentPage('customer-orders');
    };

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some delicious items to get started</p>
            <button
              onClick={() => setCurrentPage('customer-home')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center p-4 border-b border-gray-200 last:border-b-0">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1 ml-4">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-orange-600 font-semibold">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg mt-6 font-medium"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CustomerOrders = () => {
    const customerOrders = orders.filter(order => order.customerId === currentUser.id);

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
        
        {customerOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Place your first order to see it here</p>
            <button
              onClick={() => setCurrentPage('customer-home')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {customerOrders.map(order => {
              const restaurant = restaurants.find(r => r.id === order.restaurantId);
              return (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                      <p className="text-gray-600">{restaurant?.name}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => {
                      const product = products.find(p => p.id === item.productId);
                      return (
                        <div key={index} className="flex justify-between">
                          <span>{product?.name} x{item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Restaurant Components
  const RestaurantDashboard = () => {
    const restaurantOrders = orders.filter(order => order.restaurantId === currentUser.restaurantId);
    const restaurantProducts = products.filter(p => p.restaurantId === currentUser.restaurantId);
    
    const stats = [
      { title: 'Total Orders', value: restaurantOrders.length, icon: Package, color: 'bg-blue-500' },
      { title: 'Menu Items', value: restaurantProducts.length, icon: ChefHat, color: 'bg-green-500' },
      { title: 'Revenue', value: `$${restaurantOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`, icon: DollarSign, color: 'bg-orange-500' },
      { title: 'Avg Rating', value: '4.5', icon: Star, color: 'bg-purple-500' }
    ];

    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {restaurantOrders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Menu Items</h3>
            <div className="space-y-3">
              {restaurantProducts.slice(0, 5).map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RestaurantMenu = () => {
    const restaurantProducts = products.filter(p => p.restaurantId === currentUser.restaurantId);

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg text-gray-800">{product.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-orange-600 font-bold text-lg mb-4">${product.price}</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-1">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-1">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const RestaurantOrders = () => {
    const restaurantOrders = orders.filter(order => order.restaurantId === currentUser.restaurantId);

    const updateOrderStatus = (orderId, newStatus) => {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    };

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders</h2>
        
        <div className="space-y-4">
          {restaurantOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                  <p className="text-gray-600">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => {
                  const product = products.find(p => p.id === item.productId);
                  return (
                    <div key={index} className="flex justify-between">
                      <span>{product?.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Main App Component
  const MainApp = () => {
    const getSidebarItems = () => {
      if (userType === 'admin') {
        return [
          { label: 'Dashboard', icon: Home, page: 'admin-dashboard' },
          { label: 'Restaurants', icon: Store, page: 'admin-restaurants' },
          { label: 'Orders', icon: Package, page: 'admin-orders' },
          { label: 'Users', icon: Users, page: 'admin-users' }
        ];
      } else if (userType === 'customer') {
        return [
          { label: 'Home', icon: Home, page: 'customer-home' },
          { label: 'Orders', icon: Package, page: 'customer-orders' },
          { label: 'Cart', icon: ShoppingCart, page: 'customer-cart' }
        ];
      } else if (userType === 'restaurant') {
        return [
          { label: 'Dashboard', icon: Home, page: 'restaurant-dashboard' },
          { label: 'Menu', icon: ChefHat, page: 'restaurant-menu' },
          { label: 'Orders', icon: Package, page: 'restaurant-orders' }
        ];
      }
      return [];
    };

    const getPageTitle = () => {
      const titles = {
        'admin-dashboard': 'Admin Dashboard',
        'admin-restaurants': 'Restaurants',
        'admin-orders': 'Orders',
        'admin-users': 'Users',
        'customer-home': 'Home',
        'customer-restaurant': selectedRestaurant?.name || 'Restaurant',
        'customer-cart': 'Cart',
        'customer-orders': 'Your Orders',
        'restaurant-dashboard': 'Restaurant Dashboard',
        'restaurant-menu': 'Menu',
        'restaurant-orders': 'Orders'
      };
      return titles[currentPage] || 'Dashboard';
    };

    const renderPage = () => {
      switch (currentPage) {
        case 'admin-dashboard': return <AdminDashboard />;
        case 'admin-restaurants': return <AdminRestaurants />;
        case 'admin-orders': return <AdminOrders />;
        case 'customer-home': return <CustomerHome />;
        case 'customer-restaurant': return <CustomerRestaurant />;
        case 'customer-cart': return <CustomerCart />;
        case 'customer-orders': return <CustomerOrders />;
        case 'restaurant-dashboard': return <RestaurantDashboard />;
        case 'restaurant-menu': return <RestaurantMenu />;
        case 'restaurant-orders': return <RestaurantOrders />;
        default: return <div>Page not found</div>;
      }
    };

    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar 
          items={getSidebarItems()} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header title={getPageTitle()} />
          <main className="flex-1 overflow-y-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    );
  };

  // Return the appropriate component based on currentPage
  if (currentPage === 'login') {
    return <LoginPage />;
  }

  return <MainApp />;
};

export default FoodOrderingSystem;