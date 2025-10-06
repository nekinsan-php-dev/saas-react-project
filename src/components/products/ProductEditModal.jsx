import React, { useEffect, useState } from 'react'
import api from '../../api/axios';
import { fetchProduct, updateProduct } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';

function ProductEditModal({ productId, onClose, onUpdate }) {
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [err, setErr] = useState("")

    useEffect(() => {
        loadProduct()
    }, [productId])

    const loadProduct = async () => {
        try {
            const res = await fetchProduct(productId)
            setProduct(res.data.data)
        } catch (error) {
            setErr("Failed to load product details")
        } finally {
            setLoading(false)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        try {


            const payload = {
                name: product.name,
                description: product.description,
                price: product.price,
                sku: product.sku,
                status: product.status || "active",
            };

            await updateProduct(productId, payload)
            onUpdate()
            onClose()
        } catch (err) {
            setErr("Failed to update product");
        } finally {
            setSaving(false);
        }
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-96">
                <h3 className="text-lg font-semibold mb-4">Edit Product</h3>

                {loading ? (
                    <p>Loading...</p>
                ) : err ? (
                    <p className="text-red-500">{err}</p>
                ) : (
                    <>
                        <div className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                placeholder="Product name"
                                className="border w-full px-2 py-1 rounded"
                            />

                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="border w-full px-2 py-1 rounded"
                            />

                            <input
                                type="text"
                                name="sku"
                                value={product.sku}
                                onChange={handleChange}
                                placeholder="SKU"
                                className="border w-full px-2 py-1 rounded"
                            />

                            <textarea
                                name="description"
                                value={product.description || ""}
                                onChange={handleChange}
                                placeholder="Description"
                                className="border w-full px-2 py-1 rounded"
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={onClose}
                                className="px-3 py-1 border rounded hover:bg-gray-100"
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProductEditModal