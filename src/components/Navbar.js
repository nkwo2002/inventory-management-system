import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/admin">Admin Panel</Button>
        <Button color="inherit" component={Link} to="/checkout">Checkout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;