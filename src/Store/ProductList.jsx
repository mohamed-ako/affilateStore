import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductActions from "./ProductActions";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, fetchProducts } from "./store";
import InstallApp from "./InstallApp";
import "./style.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loggedIn = useSelector((state) => state.admin.loggedIn);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  if (!products.length) return <h2>No products found.</h2>;

  return (
    <div className="ProdList">
      <main className="DownApp">
        <InstallApp />
      </main>
      {products.map((product) => (
        <div
          key={product._id}
          className={`prod ${
            product.quantity === 0 ? "out-of-stock" : ""
          }`}
        >
          {loggedIn && (
            <div className="admin-buttons">
              <button
                className="btn"
                onClick={() => dispatch(deleteProduct(product._id))}
              >
                DELETE
              </button>
              <button className="btn">
                <Link to={`/edit/${product._id}`}>EDIT</Link>
              </button>
            </div>
          )}
          <Link to={`/product/${product._id}`}>
            <div className="front-content">
              {product.theImage && (
                <img src={`${product.theImage}`} alt="Product" />
              )}
            </div>
          </Link>
          <div className="content">
            <h4 className="heading">{product.name}</h4>
            <p className="price">{product.price} DH</p>
            <ProductActions productId={product._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
