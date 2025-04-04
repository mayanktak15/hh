import "./TrendingSlider.css";
import { items } from "./AllData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TrendingItem() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const filteredItems = items.filter((item) => item.id >= 8);

  const handleProductClick = (productId, e) => {
    e.preventDefault();
    navigate(`/categories/product/${productId}`);
  };

  return (
    <>
      {filteredItems.map((item) => (
        <div 
          key={item.id} 
          className="row-item"
          onClick={(e) => handleProductClick(item.id, e)}
        >
          <div className="item-header">
            <img src={item.img} alt="product" />
          </div>
          <div className="item-description">
            <p>{item.description}</p>
            <p className="item-price">₹{item.price}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default TrendingItem;
