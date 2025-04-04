import "./ProudProducts.css";
import { items } from "./AllData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductItem() {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const filteredItems = items.filter((item) => item.id <= 8);

  const handleProductClick = (productId) => {
    navigate(`/categories/product/${productId}`);
  };

  return (
    <>
      {filteredItems.map((item) => (
        <div key={item.id} className="product normal" onClick={() => handleProductClick(item.id)}>
          <div className="product-header">
            <img src={item.img} alt="product1" />
          </div>
          <div className="product-details">
            <p>{item.description}</p>
            <p className="item-price">₹{item.price}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductItem;
