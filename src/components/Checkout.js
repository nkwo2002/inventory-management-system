import React, { useState, useEffect } from 'react';
import firebase from '../firebaseConfig';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('products').get().then((querySnapshot) => {
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsArray);
    });
  }, []);

  const handleCheckout = () => {
    if (selectedProduct && quantity > 0) {
      const db = firebase.firestore();
     const productRef = db.collection('products').doc(selectedProduct.id);

         productRef.get().then((doc) => {
           if (doc.exists) {
             const product = doc.data();
             if (product.quantity >= quantity) {
               productRef.update({
                 quantity: product.quantity - quantity
               }).then(() => {
                 console.log('Checkout successful!');
                 // You can generate a receipt here
                 generateReceipt(selectedProduct.name, quantity, product.price);
               });
             } else {
               console.error('Not enough stock available!');
               alert('Sorry, not enough stock available!');
             }
           }
         });
       }
     };

     const generateReceipt = (productName, quantity, price) => {
       const receipt = {
         product: productName,
         quantity: quantity,
         price: price,
         total: price * quantity,
         date: new Date().toLocaleString()
       };
       console.log('Receipt:', receipt);
       // Optionally, you can save the receipt to Firestore
       const db = firebase.firestore();
       db.collection('receipts').add(receipt)
         .then(() => {
           console.log('Receipt saved successfully!');
         })
         .catch((error) => {
           console.error('Error saving receipt:', error.message);
         });
     };

     return (
       <div>
         <h2>Checkout</h2>
         <select onChange={(e) => setSelectedProduct(products.find(product => product.id === e.target.value))}>
           <option value="">Select a product</option>
           {products.map((product) => (
             <option key={product.id} value={product.id}>{product.name} - ${product.price} (Available: {product.quantity})</option>
           ))}
         </select>
         <input
           type="number"
           placeholder="Quantity"
           value={quantity}
           onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
         />
         <button onClick={handleCheckout}>Checkout</button>
       </div>
     );
   };

   export default Checkout;
        