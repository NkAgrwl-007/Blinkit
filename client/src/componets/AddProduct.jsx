import React, { useState, useEffect } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: null,
    category: "",
    subCategory: "",
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories and subcategories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("your-api-endpoint/categories"); // Replace with your API
        const data = await response.json();
        setCategories(data.categories || []);
        setSubCategories(data.subCategories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProductData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !productData.name ||
      !productData.description ||
      !productData.image ||
      !productData.category ||
      !productData.subCategory
    ) {
      alert("Please fill in all fields and upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("image", productData.image);
    formData.append("category", productData.category);
    formData.append("subCategory", productData.subCategory);

    setIsLoading(true);
    try {
      const response = await fetch("your-api-endpoint", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      alert("Product uploaded successfully!");
      console.log("Response:", result);
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("An error occurred while uploading the product.");
    } finally {
      setIsLoading(false);
    }
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
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="image-preview"
            />
          )}
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
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
            {subCategories.map((subCat) => (
              <option key={subCat.id} value={subCat.name}>
                {subCat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
