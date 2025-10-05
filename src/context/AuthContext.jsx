import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const userRes = await api.get("/user");
        // console.log("userRes:", userRes);
        setUser(userRes.data);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
        const res = await api.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);

    const userRes = await api.get("/user");
    
    
    setUser(userRes.data);
    } catch (err) {
        console.log(err.response);
        
        if(err.response && err.response.status === 422){
            throw err.response.data.errors;
        } else if(err.response && err.response.data.message){
            throw {general: err.response.data.message};
        } else {
            throw {general: "Something went wrong. Please try again later."};
        }
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post("/register", { name, email, password });
      localStorage.setItem("token", res.data.token);

      const userRes = await api.get("/user");
      setUser(userRes.data);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        throw error.response.data.errors;
      } else if (error.response && error.response.data.message) {
        throw { general: error.response.data.message };
      } else {
        throw { general: "Something went wrong. Please try again later." };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
