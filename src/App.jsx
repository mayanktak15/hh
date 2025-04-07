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

  const addToCart = async (item) => {
    const existingItem = cartItem.find((cartItem) => cartItem.id === item.id);
    const newCart = existingItem 
      ? cartItem.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      : [...cartItem, item];
    
    setCartItem(newCart);
    
    // Always save to local storage
    localStorage.setItem("cartItem", JSON.stringify(newCart));
    
    // If user is logged in, also save to Firebase
    if (user) {
      try {
        const db = getDatabase();
        await set(ref(db, `carts/${user.uid}`), {
          items: newCart
        });
      } catch (error) {
        console.error("Error saving cart to Firebase:", error);
      }
    }
  };

  // Load cart from local storage only if user is not logged in
  useEffect(() => {
    if (!user) {
      const json = localStorage.getItem("cartItem");
      const savedCart = JSON.parse(json);
      if (savedCart) {
        setCartItem(savedCart);
      }
    }
  }, [user]);

  // Save to local storage only if user is not logged in
  useEffect(() => {
    if (!user) {
      const json = JSON.stringify(cartItem);
      localStorage.setItem("cartItem", json);
    }
  }, [cartItem, user]);

  // Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));

        // Load cart from Firebase when user logs in
        const db = getDatabase();
        try {
          const snapshot = await get(ref(db, `carts/${uid}`));
          if (snapshot.exists()) {
            const savedCart = snapshot.val().items;
            setCartItem(savedCart);
            dispatch(setCart(savedCart));
          } else {
            const localCart = JSON.parse(localStorage.getItem("cartItem")) || [];
            setCartItem(localCart);
            // Save local cart to Firebase
            await set(ref(db, `carts/${uid}`), {
              items: localCart
            });
          }
        } catch (error) {
          console.error("Error loading cart:", error);
        }
      } else {
        // Before signing out, save current cart to local storage
        const currentCart = [...cartItem];
        localStorage.setItem("cartItem", JSON.stringify(currentCart));
        
        dispatch(removeUser());
        // Load the saved cart from local storage after sign out
        const localCart = JSON.parse(localStorage.getItem("cartItem")) || [];
        setCartItem(localCart);
        dispatch(setCart(localCart));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartContext.Provider value={{ cartItem, addToCart, setCartItem }}>/>} />
      <Navbar />
      <Routes> path="accessories" element={<Accessories />} />
          <Route path="shoes" element={<Shoes />} />te path="tshirt" element={<Tshirt />} />
          <Route path="backpacks" element={<Backpacks />} /><Jeans />} />
          <Route path="shirt" element={<Shirt />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="tshirt" element={<Tshirt />} />oduct/:id"
          <Route path="jeans" element={<Jeans />} />
        </Route> <ProtectedRoute>
        <Route    <ProductPage />
          path="categories/product/:id"
          element={
            <ProtectedRoute>
              <ProductPage />    <Route path="/user" element={<User />} />
            </ProtectedRoute>     </Routes>
          }    </CartContext.Provider>
        />
        <Route path="/user" element={<User />} />}







export default App;}  );    </CartContext.Provider>      </Routes>
export default App;
