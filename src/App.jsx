import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/auth/register";
import GuestLayout from "./components/layouts/GuestLayout";
import Login from "./pages/auth/login";
import AuthLayout from "./components/layouts/AuthLayout";
import DashboardLayout from "./components/layouts/dashboard/DashboardLayout";
import GuestRoutes from "./routes/GuestRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Dashboard from "./pages/dashboard";
import ClientList from "./pages/clients/ClientList";
import CreateClient from "./pages/clients/CreateClient";
import CreateProduct from "./pages/products/CreateProduct";
import ProductsList from "./pages/products/ProductsList";
import Landing from "./pages/landing";
import InvoiceSettings from "./pages/settings/InvoiceSettings";

function App() {
  return (
    <>
      <Routes>
        <Route element={<GuestRoutes />}>
          <Route element={<GuestLayout/>}>
            <Route path="/" element={<Landing/>}/>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes/>}>
          <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/new" element={<CreateClient />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/settings/invoice-settings" element={<InvoiceSettings />} />
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
