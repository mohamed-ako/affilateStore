import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductActions from "./ProductActions";
import { useSelector } from "react-redux";
// import { selectAllProducts } from "./redux/Slice";
const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.products.products).find(
    (e) => e._id === id
  );
  const [activeImage, setActiveImage] = useState(null);

  const handleImageClick = (index) => {
    setActiveImage(index);
    setTimeout(() => {
      setActiveImage(null);
    }, 3000); // Remove the active class after 3 seconds
  };
  console.log(
    "--------------------------------\n" +
      JSON.stringify(product) +
      "\n--------------------------------"
  );

  return (
    <div className="ProdDet">
      {product ? (
        <div>
          <div className="media">
            {product.video !== "0" ||
              (!product.video && (
                <video controls>
                  <source src={`${product.video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            <img
              src={`${product.theImage}`}
              alt="Main Product"
              className={activeImage === 999 ? "active" : ""}
              onClick={() => handleImageClick(999)}
            />
            {product.images.map((image, index) => (
              <img
                key={index.toString()}
                src={`${image}`}
                alt={`Product ${index}`}
                className={activeImage === index ? "active" : ""}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
          <div>
            <h2 className="heading">{product.name}</h2>
            <main>
              <table>
                <tbody>
                  <tr>
                    <th>Category</th>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td>{product.price} DH</td>
                  </tr>
                  <tr>
                    <th>Quantity</th>
                    <td>{product.quantity}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{new Date(product.date).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
              <span>
                <ProductActions productId={product._id} />
              </span>
            </main>
            <hr />
            <p className="descr">{product.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
