import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/profile")
      .then(res => { setUser(res.data.user); setLoading(false); })
      .catch(()   => setLoading(false));
  }, []);

  const login  = (u) => setUser(u);

  const logout = () => {
    api.get("/auth/logout").finally(() => {
      setUser(null);
      navigate("/login", { replace: true });
    });
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthCtx.Provider>
  );
}
export const useAuth = () => useContext(AuthCtx);
