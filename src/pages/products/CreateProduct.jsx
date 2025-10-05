import React, { useState } from "react";
import api from "../../api/axios";
import { createProduct } from "../../services/productService";

const initialState = {
  type: "",
  name: "",
  price: "",
  description: "",
  sku: "",
};

function CreateProduct() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading,setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await createProduct(formData);
      setSuccess("Product create succesffully ");
      setFormData(initialState);
    } catch (err) {
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);    
    }
  };

  return (
    <div>
      <div>CreateProduct</div>
      <div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            Product:{" "}
            <input
              type="radio"
              name="type"
               value="product"
              checked={formData.type === "product"}
              onChange={handleChange}
            />
            Service{" "}
            <input
              type="radio"
              name="type"
              value="service"
              checked={formData.type === "service"}
              onChange={handleChange}
            />
          </div>
          <div>
            Name:{" "}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            Price:{" "}
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            Description:{" "}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            sku:{" "}
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Create Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
