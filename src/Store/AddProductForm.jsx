import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { addProduct, login } from "./store";

const AddProductForm = () => {
  const admins = useSelector((state) => state.admin.admins);
  const dispatch = useDispatch();
  const [htmlInput, setHtmlInput] = useState(""); // For HTML input
  const [htmlInputShein, setHtmlInputShein] = useState(""); // For HTML input

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      publisher: username,
    };
    dispatch(addProduct(updatedFormData));
    alert("Product added successfully!");
    // Reset form data
    setFormData({
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
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    const isAdmin = admins.find(
      (admin) => admin.username === username && admin.password === password
    );
    if (isAdmin) {
      setLoggedIn(true);
      console.log("admin " + username + " is logged in");
    } else {
      alert("Password or username incorrect");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddImageInput = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ""],
    }));
  };

  const handleRemoveImageInput = (index) => {
    setFormData((prevFormData) => {
      const updatedImages = [...prevFormData.images];
      updatedImages.splice(index, 1);
      return {
        ...prevFormData,
        images: updatedImages,
      };
    });
  };

  const handleImageUrlChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedImages = [...prevFormData.images];
      updatedImages[index] = value;
      return {
        ...prevFormData,
        images: updatedImages,
      };
    });
  };

  const extractDataFromHtml = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, "text/html");

      // Extracting name
      const nameElement = doc.querySelector("h1");
      const name = nameElement ? nameElement.textContent.trim() : "";
      const videoElement = doc.querySelector("source");
      const video = videoElement ? videoElement.textContent.trim() : "";

      // Extracting price
      const priceElement = doc.querySelector(".product-price-value");
      let price = priceElement ? priceElement.textContent.trim() : "";

      // Remove all non-numeric characters except periods
      price = price.replace(/[^0-9.]/g, "");

      // Convert price to a number (parseFloat handles decimal numbers)
      const priceNumber = parseFloat(price);

      // Extracting images
      const imageElements = doc.querySelectorAll(
        ".image-view--wrap--UhXabwz img"
      );
      const images = Array.from(imageElements).map((img) => {
        // Remove '_80x80.png_', '_120x120.png_', or similar patterns from the image URL
        // return img.src.replace(/(80x80\.png_|120x120\.png_)/g, "");
        return img.src.replace(/_\d+x\d+\.(png|jpg)/g, "");
      });

      // Update form data
      const descElement = doc.querySelector("#product-description");
      let desc = descElement ? descElement.textContent.trim() : "";
      // Update form data
      setFormData((prevFormData) => ({
        ...prevFormData,
        name,
        price: priceNumber,
        images: images.slice(1), // Use images from index 1 to the end
        theImage: images[0] || "",
        video,
        description: desc,
      }));

      alert("Form data updated");
    } catch (error) {
      console.error("Error parsing HTML:", error);
      alert(
        "There was an error extracting data from the HTML. Please check the input."
      );
    }
  };
  const extractDataFromHtmlShein = () => {
    try {
      const parser = new DOMParser();
      const docSh = parser.parseFromString(htmlInputShein, "text/html");

      // Extracting name
      const nameElementSh = docSh.querySelector("h1");
      const nameSh = nameElementSh ? nameElementSh.textContent.trim() : "";

      // Extracting video URL
      const videoElementSh = docSh.querySelector("source");
      const videoSh = videoElementSh ? videoElementSh.getAttribute("src") : "";

      // Extracting price
      const priceElementSh = docSh.querySelector(".original");
      let priceSh = priceElementSh ? priceElementSh.textContent.trim() : "";

      // Remove all non-numeric characters except periods
      priceSh = priceSh.replace(/[^0-9.]/g, "");

      // Convert price to a number
      const priceNumberSh = parseFloat(priceSh);

      // Extracting images
      const imageElementsSh = docSh.querySelectorAll(
        ".crop-image-container img"
      );
      const imagesSh = Array.from(imageElementsSh).map((img) =>
        img.getAttribute("src").replace(/_\d+x\d+/, "")
      );

      // Extracting description
      const descElementSh = docSh.querySelector(".product-intro__attr-wrap");
      const descSh = descElementSh ? descElementSh.textContent.trim() : "";

      // Update form data
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: nameSh,
        price: priceNumberSh,
        images: imagesSh.slice(1), // Use images from index 1 to the end
        theImage: imagesSh[0] || "",
        video: videoSh,
        description: descSh,
      }));

      alert("Form data updated");
    } catch (error) {
      console.error("Error parsing HTML:", error);
      alert(
        "There was an error extracting data from the HTML. Please check the input."
      );
    }
  };

  return (
    <div className="add">
      {loggedIn ? (
        <div>
          <main>
            <textarea
              rows="10"
              cols="50"
              placeholder="Paste AliExpress HTML here"
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
            />
            <button onClick={extractDataFromHtml}>Extract Data</button>
          </main>
          <main>
            <textarea
              rows="10"
              cols="50"
              placeholder="Paste AliExpress HTML here"
              value={htmlInputShein}
              onChange={(e) => setHtmlInputShein(e.target.value)}
            />
            <button onClick={extractDataFromHtmlShein}>Extract Data</button>
          </main>
          <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              // required
            />
            <label>Buy Link:</label>
            <input
              type="text"
              name="buyLink"
              value={formData.buyLink}
              onChange={handleChange}
              // required
            />
            <label>About:</label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              // required
            />
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              // required
            />
            <label>Quantity:</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              // required
            />
            <label>First Image URL:</label>
            <input
              type="text"
              name="theImage"
              value={formData.theImage}
              onChange={handleChange}
            />
            <main>
              <label>Additional Images URL:</label>
              {formData.images.map((image, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name={`image_${index}`}
                    value={image}
                    onChange={(e) => handleImageUrlChange(e, index)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImageInput(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddImageInput}>
                Add Image
              </button>
            </main>
            <label>Video URL:</label>
            <input
              type="text"
              name="video"
              value={formData.video}
              onChange={handleChange}
            />

            <button type="submit">Add Product</button>
          </form>
        </div>
      ) : (
        <form className="login" onSubmit={loginSubmit}>
          <h2>Login</h2>
          <label>User Name:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default AddProductForm;
