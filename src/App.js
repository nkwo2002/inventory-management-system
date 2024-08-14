import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from './components/Auth';
import ProductManagement from './components/ProductManagement';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
       
          {/* Route for the Login/Signup page */}
          <Route path="/login">
            <Auth />
          </Route>

          {/* Route for the Admin Panel (Product Management) */}
          <Route path="/admin">
            <ProductManagement />
          </Route>

          {/* Route for the Checkout page */}
          <Route path="/checkout">
            <Checkout />
          </Route>

          {/* Default route (Home Page) */}
          <Route path="/" exact>
            <div style={{ padding: '20px' }}>
              <h1>Welcome to the Inventory Management System</h1>
              <p>Please login to continue.</p>
            </div>
          </Route>
       
      </div>
    </Router>
  );
}

export default App;