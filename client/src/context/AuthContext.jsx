import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await api.get('/auth/me');
                if (mounted) setUser(res.data.user)
            } catch (err) {
                setUser(null);
            } finally {
                if (mounted) setLoading(false)
            }
        })();
        return () => { mounted = false }
    }, []);

    const login = async (credentials) => {
        const res = await api.post('/auth/login', credentials);
        setUser(res.data.user);
        return res.data.user;
    }
    const register = async (payload) => {
        const res = await api.post('/auth/register', payload);
        setUser(res.data.user);
        console.log(res.data.user)
        return res.data.user;
    }
    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);