import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/productcard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">

      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">

        <h3>{product.name}</h3>

        <p className="product-category">
          {product.category}
        </p>

        <p className="product-price">
          ₹{product.price}
        </p>

        <button
          className="add-cart-btn"
          onClick={handleAddToCart}
        >
          <i className="fas fa-cart-plus"></i>
          Add
        </button>

      </div>

    </div>
  );
};

export default ProductCard;