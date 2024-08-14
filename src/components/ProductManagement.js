import React, { useEffect, useState } from 'react';
import firebase from '../firebaseConfig';

const ProductManagement = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const db = firebase.firestore();
      db.collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
          setRole(doc.data().role);
        }
      });
    }
  }, []);

  if (role !== 'admin') {
    return <h2>Access Denied. You are not an admin.</h2>;
  }

  return (
    <div>
      <h2>Admin Panel - Add Product</h2>
      {/* Admin product management code here */}
    </div>
  );
};

export default ProductManagement;