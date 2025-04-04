import { Link, useNavigate } from "react-router-dom";
import { items } from "./AllData";
import { useSelector } from "react-redux";

function CategoriesItem() {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleProductClick = (e, productId) => {
    e.preventDefault();
    if (!user) {
      sessionStorage.setItem('intendedUrl', `/categories/product/${productId}`);
      navigate("/user");
      return;
    }
    navigate(`/categories/product/${productId}`);
  };

  return (
    <>
      <div className="proud-container">
        <div className="container">
          <div className="products-grid">
            {items.map((item) => (
              <div key={item.id} className="product normal">
                <Link
                  onClick={(e) => handleProductClick(e, item.id)}
                  to={`/categories/product/${item.id}`}
                >
                  <div className="product-header">
                    <img src={item.img} alt="product1" />
                  </div>
                  <div className="product-details">
                    <p>{item.description}</p>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesItem;
