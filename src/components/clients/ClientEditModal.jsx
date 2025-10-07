import React, { useEffect, useState } from "react";
import { fetchClient, updateClient } from "../../services/clientService";

function ClientEditModal({ clientId, onClose, onUpdate }) {
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClientData();
  }, [clientId]);

  const fetchClientData = async () => {
    setLoading(true);
    try {
      const res = await fetchClient(clientId);
      setClientData(res.data.data);
    } catch (err) {
      setError("Failed to fetch client data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateClient(clientId, clientData);
      onUpdate();
      onClose();
    } catch (err) {
      setError("Failed to update client");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : clientData ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Edit Client</h2>

            {/* Name */}
            <div className="mb-2">
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={clientData.name || ""}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            {/* Email */}
            <div className="mb-2">
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={clientData.email || ""}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            {/* Phone */}
            <div className="mb-2">
              <label className="block mb-1">Phone:</label>
              <input
                type="text"
                name="phone"
                value={clientData.phone || ""}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            {/* Address */}
            <div className="mb-2">
              <label className="block mb-1">Address:</label>
              <input
                type="text"
                name="address"
                value={clientData.address || ""}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            {/* Company */}
            <div className="mb-2">
              <label className="block mb-1">Company:</label>
              <input
                type="text"
                name="company"
                value={clientData.company || ""}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            {/* Tax Number */}
            <div className="mb-2">
              <label className="block mb-1">Tax Number:</label>
              <input
                type="text"
                name="tax_number"
                value={clientData.tax_number || ""}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={onClose}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ClientEditModal;
