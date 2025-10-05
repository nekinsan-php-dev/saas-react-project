import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";

function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      {/* Search */}
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search invoices, clients..."
          className="ml-2 bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-5">
        <button className="relative hover:text-gray-600">
          <Bell size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={26} className="text-gray-600" />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">John Doe</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
