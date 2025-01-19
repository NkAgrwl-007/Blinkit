import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: null,
    category: "",
    subCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setProductData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data Submitted:", productData);
    // Add the API call for submission here
  };

  return (
    <div className="add-product">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" onChange={handleImageUpload} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
          </select>
        </div>
        <div className="form-group">
          <label>Sub Category</label>
          <select
            name="subCategory"
            value={productData.subCategory}
            onChange={handleChange}
          >
            <option value="">Select Sub Category</option>
            <option value="Fresh">Fresh</option>
            <option value="Frozen">Frozen</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
