import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, editProduct } from "./store";
import "./style.css";

const EditProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);
  const product = products.find((e) => e._id === id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    theImage: "",
    images: [],
    video: "",
    publisher: "",
    price: "",
    quantity: "",
    buyLink: "",
    about: "",
  });

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    } else {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        theImage: product.theImage,
        images: product.images,
        video: product.video,
        publisher: product.publisher,
        price: product.price,
        quantity: product.quantity,
        buyLink: product.buyLink,
        about: product.about,
      });
    }
  }, [dispatch, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const images = [...formData.images];
    images[index] = value;
    setFormData({
      ...formData,
      images,
    });
  };

  const handleAddImageInput = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  const handleRemoveImageInput = (index) => {
    const images = [...formData.images];
    images.splice(index, 1);
    setFormData({
      ...formData,
      images,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct({ id, ...formData }));
    navigate("/"); // Redirect to homepage or wherever appropriate
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit">
      <form onSubmit={handleSubmit}>
        <h2>Edit Product</h2>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Buy Link:</label>
        <input
          type="text"
          name="buyLink"
          value={formData.buyLink}
          onChange={handleChange}
          required
        />
        <label>About:</label>
        <input
          type="text"
          name="about"
          value={formData.about}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label>Quantity:</label>
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <label>First Image URL:</label>
        <input
          type="text"
          name="theImage"
          value={formData.theImage}
          onChange={handleChange}
          required
        />
        <label>Images URL:</label>
        {formData.images.map((image, index) => (
          <div key={index}>
            <input
              type="text"
              name={`image_${index}`}
              value={image}
              onChange={(e) => handleImageChange(e, index)}
              required
            />
            <button type="button" onClick={() => handleRemoveImageInput(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddImageInput}>
          Add Image
        </button>
        <label>Video URL:</label>
        <input
          type="text"
          name="video"
          value={formData.video}
          onChange={handleChange}
          required
        />
        <button type="submit">Edit Product</button>
      </form>
    </div>
  );
};

export default EditProductForm;
