import React, { useState } from 'react';
import firebase from '../firebaseConfig';
import { Button, TextField, Typography, Container } from '@mui/material';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignup = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const db = firebase.firestore();

        // Assign role based on whether the admin checkbox is checked
        const role = isAdmin ? 'admin' : 'customer';

        db.collection('users').doc(user.uid).set({
          email: user.email,
          role: role
        }).then(() => {
          console.log('User signed up with role: {role}');
        }).catch((error) => {
          console.error('Error assigning role:', error.message);
        });
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
      });
  };

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
      });
  };

  return (
    <Container>
      <Typography variant="h4">Login or Sign Up</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <label>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        Register as Admin
      </label>
      <Button variant="contained" color="primary" onClick={handleSignup} fullWidth>
        Sign Up
      </Button>
      <Button variant="contained" color="secondary" onClick={handleLogin} fullWidth>
        Login
      </Button>
    </Container>
  );
};

export default Auth;