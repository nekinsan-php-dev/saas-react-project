import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { Link } from 'react-router-dom'

function ClientList() {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchClients = async ()=>{
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
    }

    useEffect(()=>{
        fetchClients();
    },[])

    if(loading) return <div>Loading...</div>
    if(error) return <div className='text-red-500'>{error}</div>

  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Client List</h1>
        <div>
            <Link to="/clients/new" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>Add New Client</Link>
        </div>
        {clients.length === 0 ? (
            <p>No clients found.</p>
        ) : (
            <table className='min-w-full bg-white border'>
                <thead>
                    <tr>
                        <th className='py-2 px-4 border-b'>Name</th>
                        <th className='py-2 px-4 border-b'>Email</th>
                        <th className='py-2 px-4 border-b'>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td className='py-2 px-4 border-b'>{client.name}</td>
                            <td className='py-2 px-4 border-b'>{client.email}</td>
                            <td className='py-2 px-4 border-b'>{client.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default ClientList