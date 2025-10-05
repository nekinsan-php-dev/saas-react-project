import React from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left side (Brand / Illustration) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-white items-center justify-center relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,white_1%,transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md text-center"
        >
          <h1 className="text-4xl font-bold mb-4">InvoicePro SaaS</h1>
          <p className="text-lg opacity-90">
            Simplify your billing with automated invoicing, real-time analytics,
            and client management — all in one powerful dashboard.
          </p>
        </motion.div>
      </div>

      {/* Right side (Form area) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome Back 👋</h2>
            <p className="text-gray-500 text-sm mt-2">
              Sign in or create an account to continue managing your invoices.
            </p>
          </div>

          {/* Page content (login/register) will render here */}
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
