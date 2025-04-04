import { useContext } from "react";
import { CartContext } from "../pages/ProductPage";
import { IconX } from "@tabler/icons-react";

function CartItem({ item, setCartItem }) {
  const { cartItem } = useContext(CartContext);

  const increase = () => {
    if (item.quantity >= 1) {
      updateCartItemQuantity(item.id, item.quantity + 1);
    }
  };

  const decrease = () => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item.id, item.quantity - 1);
    }
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItem.map((cartItem) =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );
    setCartItem(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItem.filter((cartItem) => cartItem.id !== id);
    setCartItem(updatedCart);
  };

  return (
    <div className="cart-item">
      <div className="cart-img">
        <img src={item.img} alt="product" />
      </div>
      <div className="cart-middle">
        <p className="cart-name">{item.description}</p>
        <div className="cart-btns">
          <button onClick={decrease}>-</button>
          <p className="quantity">{item.quantity}</p>
          <button onClick={increase}>+</button>
        </div>
      </div>
      <div className="cart-right">
        <p className="cart-price">₹{(item.price * item.quantity).toFixed(2)}</p>
        <IconX className="cart-remove" onClick={() => removeFromCart(item.id)} />
      </div>
    </div>
  );
}

export default CartItem;
