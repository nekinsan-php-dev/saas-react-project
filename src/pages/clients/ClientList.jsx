import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import ClientEditModal from "../../components/clients/ClientEditModal";

function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [message, setMessage] = useState("");

  const fetchClients = async () => {
    try {
      const res = await api.get("/clients");

      setClients(res.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch clients. Please try again later.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSelected = (clientId) => {
    setSelectedClient(clientId);
  };

  
  const handleUpdated = () => {
    fetchClients()
     setMessage("Product updated successfully!");
  }

  const closeModal = () => {
    setSelectedClient(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Client List</h1>
      <div>
        <Link
          to="/clients/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add New Client
        </Link>
      </div>
      <div>
        {message && <div className="text-green-500 mb-2">{message}</div>}
      </div>
      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="py-2 px-4 border-b">{client.name}</td>
                <td className="py-2 px-4 border-b">{client.email}</td>
                <td className="py-2 px-4 border-b">{client.phone}</td>
                <td className="py-2 px-4 border-b">
                    <button onClick={() => handleSelected(client.id)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
                        Edit
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

        {selectedClient && (
            <ClientEditModal
                clientId={selectedClient}
                onClose={closeModal}
                onUpdate={handleUpdated}
            />
        )}
    </div>
  );
}

export default ClientList;
