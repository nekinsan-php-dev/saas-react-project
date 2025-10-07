import React, { useEffect, useState } from "react";
import { fetchInvoiceSetting, updateInvoiceSetting } from "../../services/invoiceService";

function InvoiceSettings() {
  const [formData, setFormData] = useState({
    default_currency: "",
    default_language: "",
    invoice_prefix: "",
    next_invoice_number: "",
    company_name: "",
    company_address: "",
    company_phone: "",
    company_email: "",
    company_tax_number: "",
    footer_notes: "",
    terms_conditions: "",
    digital_signature: null,
  });

  const [existingSignature, setExistingSignature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch invoice settings on mount
  useEffect(() => {
    fetchSettingData();
  }, []);

  const fetchSettingData = async () => {
    try {
      setLoading(true);
      const res = await fetchInvoiceSetting();
      if (res.data && res.data.data) {
        const data = res.data.data;
        setFormData({
          default_currency: data.default_currency || "",
          default_language: data.default_language || "",
          invoice_prefix: data.invoice_prefix || "",
          next_invoice_number: data.next_invoice_number || "",
          company_name: data.company_name || "",
          company_address: data.company_address || "",
          company_phone: data.company_phone || "",
          company_email: data.company_email || "",
          company_tax_number: data.company_tax_number || "",
          footer_notes: data.footer_notes || "",
          terms_conditions: data.terms_conditions || "",
          digital_signature: null,
        });
        setExistingSignature(data.digital_signature);
      }
    } catch (err) {
      setError("Failed to fetch invoice settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, digital_signature: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          form.append(key, formData[key]);
        }
      });

      const res = await updateInvoiceSetting(form);
      setMessage("Invoice settings updated successfully!");
      setExistingSignature(res.data.data.digital_signature);
    } catch (err) {
      setError("Failed to update invoice settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading invoice settings...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Invoice Settings</h2>

      {message && <div className="text-green-600 mb-3">{message}</div>}
      {error && <div className="text-red-500 mb-3">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Default Currency</label>
            <input
              type="text"
              name="default_currency"
              value={formData.default_currency}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Default Language</label>
            <input
              type="text"
              name="default_language"
              value={formData.default_language}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Invoice Prefix</label>
            <input
              type="text"
              name="invoice_prefix"
              value={formData.invoice_prefix}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Next Invoice Number</label>
            <input
              type="number"
              name="next_invoice_number"
              value={formData.next_invoice_number}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-1">Company Address</label>
            <textarea
              name="company_address"
              value={formData.company_address}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Company Phone</label>
            <input
              type="text"
              name="company_phone"
              value={formData.company_phone}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Company Email</label>
            <input
              type="email"
              name="company_email"
              value={formData.company_email}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-1">Company Tax Number</label>
            <input
              type="text"
              name="company_tax_number"
              value={formData.company_tax_number}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-1">Footer Notes</label>
            <textarea
              name="footer_notes"
              value={formData.footer_notes}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            ></textarea>
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-1">Terms & Conditions</label>
            <textarea
              name="terms_conditions"
              value={formData.terms_conditions}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            ></textarea>
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-1">Digital Signature</label>
            {existingSignature && (
              <div className="mb-2">
                <img
                  src={existingSignature}
                  alt="Digital Signature"
                  className="h-16 border rounded"
                />
              </div>
            )}
            <input
              type="file"
              name="digital_signature"
              accept="image/*"
              onChange={handleFileChange}
              className="border px-2 py-1 w-full rounded"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InvoiceSettings;
