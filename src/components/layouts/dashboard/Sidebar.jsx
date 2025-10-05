import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, to: "/dashboard" },
    { name: "Invoices", icon: <FileText size={20} />, href: "#" },
    { name: "Clients", icon: <Users size={20} />, to: "/clients" },
    { name: "Products", icon: <Package size={20} />, to: "/products" },
    { name: "Settings", icon: <Settings size={20} />, href: "#" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r shadow-sm flex flex-col transition-all duration-300`}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className={`text-xl font-bold ${!isOpen && "hidden"}`}>
          InvoicePro
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-3 border-t">
        <button className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full px-3 py-2 rounded-lg">
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
