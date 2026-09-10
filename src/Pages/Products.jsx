import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../Components/ProductCard";
import "../styles/products.css";

const Products = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="products-page">

      <section className="products-header">
        <h1>Our Pet Products</h1>

        <p>
          Everything your pet needs,<br />
          all in one place.
        </p>
      </section>

      {loading && <p className="message">Loading products...</p>}

      {error && <p className="error-message">{error}</p>}

      <div className="products-container">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </div>
  );
};

export default Products;