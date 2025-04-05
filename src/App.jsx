import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import All from "./components/Categories-pages/All";
import Shoes from "./components/Categories-pages/Shoes";
import Backpacks from "./components/Categories-pages/Backpacks";
import Shirt from "./components/Categories-pages/Shirt";
import Accessories from "./components/Categories-pages/Accessories";
import Tshirt from "./components/Categories-pages/Tshirt";
import Jeans from "./components/Categories-pages/Jeans";
import ProductPage, { CartContext } from "./pages/ProductPage";
import { useEffect, useState } from "react";
import User from "./components/Authentication/User";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./utils/userSlice";
import ProtectedRoute from "./utils/ProtectedRoute";
import { getDatabase, ref, set, get } from "firebase/database";
import { setCart } from "./utils/cartSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [cartItem, setCartItem] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItem.find((cartItem) => cartItem.id === item.id);
    const newCart = existingItem 
      ? cartItem.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      : [...cartItem, item];
    
    setCartItem(newCart);
    
    // Save to Firebase if user is logged in
    if (user) {
      const db = getDatabase();
      set(ref(db, `carts/${user.uid}`), {
        items: newCart
      });
    }
  };

  // Load cart from session storage only if user is not logged in
  useEffect(() => {
    if (!user) {
      const json = sessionStorage.getItem("cartItem");
      const savedCart = JSON.parse(json);
      if (savedCart) {
        setCartItem(savedCart);
      }
    }
  }, [user]);

  // Save to session storage only if user is not logged in
  useEffect(() => {
    if (!user) {
      const json = JSON.stringify(cartItem);
      sessionStorage.setItem("cartItem", json);
    }
  }, [cartItem, user]);

  // Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));

        // Load cart from Firebase when user logs in
        const db = getDatabase();
        get(ref(db, `carts/${uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const savedCart = snapshot.val().items;
              setCartItem(savedCart);
              dispatch(setCart(savedCart));
            } else {
              // If no cart exists in Firebase, use session storage cart
              const sessionCart = JSON.parse(sessionStorage.getItem("cartItem")) || [];
              setCartItem(sessionCart);
              // Save session cart to Firebase
              set(ref(db, `carts/${uid}`), {
                items: sessionCart
              });
            }
          })
          .catch((error) => {
            console.error("Error loading cart:", error);
          });
      } else {
        dispatch(removeUser());
        // When logging out, load cart from session storage
        const sessionCart = JSON.parse(sessionStorage.getItem("cartItem")) || [];
        setCartItem(sessionCart);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartContext.Provider value={{ cartItem, addToCart, setCartItem }}>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="categories" element={<Categories />}>
          <Route path="all" element={<All />} />
          <Route path="shoes" element={<Shoes />} />
          <Route path="backpacks" element={<Backpacks />} />
          <Route path="shirt" element={<Shirt />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="tshirt" element={<Tshirt />} />
          <Route path="jeans" element={<Jeans />} />
        </Route>
        <Route
          path="categories/product/:id"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />
        <Route path="/user" element={<User />} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
