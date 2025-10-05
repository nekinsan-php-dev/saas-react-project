import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../services/productService";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const fetchProductsData = async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchProducts(page);

      setProducts(res.data.data);
      setMeta(res.data.meta);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData(page);
  }, [page]);

  const handleNext = () => {
    if (page < meta.last_page) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div>
      <div>
        <h2>PeoductList</h2>
        <div>
          <Link to="/products/create">Add new</Link>
        </div>
      </div>
      <div>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Sr.</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">SKU</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="text-center border-t">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.price}</td>
                  <td className="p-2 border">{product.sku}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {meta.current_page} of {meta.last_page}
        </span>
        <button onClick={handleNext} disabled={page === meta.last_page}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductsList;
