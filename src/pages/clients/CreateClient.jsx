import React, { useState } from "react";
import api from "../../api/axios";
import { address } from "framer-motion/client";
import { createClient } from "../../services/clientService";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  taxId: "",
  company: "",
};
function CreateClient() {
  const [formData, setFormData] = useState(initialState);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const errorMsg = validate();

    if (errorMsg) return setError(errorMsg);

    setLoading(true);

    try {
      await createClient(formData);
      setSuccess("Client created successfully!");
      setFormData(initialState);
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join(", "));
      } else {
        setError("Failed to create client. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div>
        <h2>add new client</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              name:{" "}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              email:{" "}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              phone:{" "}
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              address:{" "}
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              company:{" "}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div>
              taxId:{" "}
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit">Create Client</button>
            </div>
            <div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateClient;
