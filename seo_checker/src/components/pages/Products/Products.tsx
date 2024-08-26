import { useNavigate } from 'react-router-dom';
import { products } from './ProductsData';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();

  const handleOrderNow = (productId: number) => {
    navigate(`/order/${productId.toString()}`);
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">{product.price}</p>
          <p className="product-description">{product.description}</p>
          <ul className="product-features">
            {product.features.map((feature, index) => (
              <li key={index} className="feature-item">{feature}</li>
            ))}
          </ul>
          <button 
            onClick={() => handleOrderNow(product.id)}
            className="order-button"
          >
            Order Now
          </button>
        </div>
      ))}
</div>
  );
};

export default Products;
