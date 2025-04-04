import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, saveIntendedUrl } from '../utils/auth';

interface ProductCardProps {
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
  productImage,
  productPrice,
}) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    if (!isAuthenticated()) {
      saveIntendedUrl(`/product/${productId}`);
      navigate('/login');
      return;
    }
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <img src={productImage} alt={productName} />
      <h3>{productName}</h3>
      <p>${productPrice.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;