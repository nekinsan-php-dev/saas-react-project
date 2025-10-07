import React, { useEffect, useState } from "react";
import { fetchClient, fetchClients } from "../../services/clientService";
import { fetchProducts } from "../../services/productService";
import { fetchInvoiceSetting } from "../../services/invoiceService";
import ProductDrawerForm from "../../components/products/ProductDrawerForm";

function InvoiceCreate() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [invoiceSetting, setInvoiceSetting] = useState(null);
  const [selectedClient, setSelectedClient] = useState("");
  const [items, setItems] = useState([
    { product_id: "", quantity: 1, price: 0, total: 0 },
  ]);
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);

  // ================= Fetch Data =================
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [clientRes, productRes, settingRes] = await Promise.all([
          fetchClients(),
          fetchProducts(),
          fetchInvoiceSetting(),
        ]);
        setClients(clientRes.data.data || []);
        setProducts(productRes.data.data || []);
        setInvoiceSetting(settingRes.data.data || null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch initial data.");
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  // ================= Handle Item Changes =================
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    // Update price when product changes
    if (field === "product_id") {
      const selectedProduct = products.find(
        (p) => p.id.toString() === value.toString()
      );
      updated[index].price = selectedProduct ? selectedProduct.price : 0;
    }

    // Auto calculate total for each item
    updated[index].total =
      Number(updated[index].quantity) * Number(updated[index].price);

    setItems(updated);
  };

  // ================= Add / Remove Rows =================
  const addItem = () => {
    setItems([...items, { product_id: "", quantity: 1, price: 0, total: 0 }]);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  // ================= Auto Calculations =================
  const subTotal = items.reduce((sum, i) => sum + Number(i.total || 0), 0);
  const taxAmount = (subTotal * taxRate) / 100;
  const discountAmount = (subTotal * discount) / 100;
  const grandTotal = subTotal + taxAmount - discountAmount;

  // ================= Handle Form Submit =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        client_id: selectedClient,
        items,
        tax_rate: taxRate,
        discount,
        sub_total: subTotal,
        total: grandTotal,
        invoice_prefix: invoiceSetting?.invoice_prefix || "INV",
      };

      console.log("Invoice Payload: ", payload);

      // TODO: call your backend createInvoice API here
      // await createInvoice(payload);

      alert("Invoice created successfully!");
    } catch (error) {
      console.error(error);
      setError("Failed to create invoice.");
    }
  };


  const refreshProducts = async () => {
  try {
    const res = await fetchProducts();
    setProducts(res.data.data || []);
  } catch (err) {
    console.error("Failed to refresh products", err);
  }
};


  // ================= UI =================
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-6">Create Invoice</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client */}
        <div>
          <label className="block font-medium mb-1">Client</label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option value="">-- Select Client --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name || client.company_name}
              </option>
            ))}
          </select>
        </div>

        {/* Invoice Prefix */}
        {invoiceSetting && (
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Invoice Prefix</label>
              <input
                type="text"
                value={invoiceSetting.invoice_prefix || ""}
                disabled
                className="border border-gray-300 rounded-lg w-full p-2 bg-gray-100"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">
                Next Invoice Number
              </label>
              <input
                type="text"
                value={invoiceSetting.next_invoice_number || ""}
                disabled
                className="border border-gray-300 rounded-lg w-full p-2 bg-gray-100"
              />
            </div>
          </div>
        )}

        {/* Product Items */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Invoice Items</h3>
            <button
              type="button"
              onClick={() => setIsProductDrawerOpen(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              + Create New Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Product</th>
                  <th className="px-3 py-2 text-center">Quantity</th>
                  <th className="px-3 py-2 text-center">Price</th>
                  <th className="px-3 py-2 text-center">Total</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-3 py-2">
                      <select
                        value={item.product_id}
                        onChange={(e) =>
                          handleItemChange(index, "product_id", e.target.value)
                        }
                        className="border border-gray-300 rounded w-full p-1"
                        required
                      >
                        <option value="">-- Select Product --</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                        className="border border-gray-300 rounded w-20 p-1 text-center"
                      />
                    </td>

                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value)
                        }
                        className="border border-gray-300 rounded w-24 p-1 text-center"
                      />
                    </td>

                    <td className="px-3 py-2 text-center">
                      ₹{item.total.toFixed(2)}
                    </td>

                    <td className="px-3 py-2 text-center">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-2 text-blue-600 hover:underline"
          >
            + Add Another Product
          </button>
        </div>

        {/* Tax & Discount */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Tax (%)</label>
            <input
              type="number"
              min="0"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="border border-gray-300 rounded-lg w-full p-2"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Discount (%)</label>
            <input
              type="number"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="border border-gray-300 rounded-lg w-full p-2"
            />
          </div>
        </div>

        {/* Totals */}
        <div className="border-t pt-4 text-right space-y-1">
          <p>Subtotal: ₹{subTotal.toFixed(2)}</p>
          <p>Tax: ₹{taxAmount.toFixed(2)}</p>
          <p>Discount: ₹{discountAmount.toFixed(2)}</p>
          <p className="font-semibold text-lg">
            Grand Total: ₹{grandTotal.toFixed(2)}
          </p>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Create Invoice
          </button>
        </div>
      </form>

       <ProductDrawerForm
    isOpen={isProductDrawerOpen}
    onClose={() => setIsProductDrawerOpen(false)}
    onCreated={() => refreshProducts()} // refresh product list
  />
    </div>
  );
}

export default InvoiceCreate;
