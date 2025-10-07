import React from 'react'
import { Link } from 'react-router-dom'

function InvoiceList() {
  return (
    <div>
        <div>
            InvoiceList
        </div>
        <div>
            <Link to="/invoice/create">Create Invoice</Link>
        </div>
    </div>
  )
}

export default InvoiceList