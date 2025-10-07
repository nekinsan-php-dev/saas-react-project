import React, { useEffect, useState } from "react";
import { fetchProduct, updateProduct } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";

function ProductEditModal({ productId, onClose, onUpdate }) {
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetchProduct(productId);
      setProduct(res.data.data);
    } catch (error) {
      setErr("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!product) return;

    setSaving(true);
    setErr("");
    try {
      const payload = {
        user_id: user?.id || product.user_id,
        type: product.type || "product",
        name: product.name,
        description: product.description || "",
        price: product.price,
        sku: product.sku,
        status: product.status || "active",
      };

      await updateProduct(productId, payload);
      onUpdate();
      onClose();
    } catch (err) {
      setErr("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[420px] max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Edit Product</h3>

        {loading ? (
          <p>Loading...</p>
        ) : err ? (
          <p className="text-red-500">{err}</p>
        ) : product ? (
          <>
            <div className="space-y-3">
              {/* Product Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  value={product.type || "product"}
                  onChange={handleChange}
                  className="border w-full px-2 py-1 rounded"
                >
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                </select>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name || ""}
                  onChange={handleChange}
                  placeholder="Product name"
                  className="border w-full px-2 py-1 rounded"
                />
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium mb-1">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={product.sku || ""}
                  onChange={handleChange}
                  placeholder="SKU"
                  className="border w-full px-2 py-1 rounded"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={product.price || ""}
                  onChange={handleChange}
                  placeholder="Price"
                  className="border w-full px-2 py-1 rounded"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={product.status || "active"}
                  onChange={handleChange}
                  className="border w-full px-2 py-1 rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={product.description || ""}
                  onChange={handleChange}
                  placeholder="Description"
                  className="border w-full px-2 py-1 rounded"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-100"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ProductEditModal;
