import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { Routes, Route, Navigate } from 'react-router-dom';
import Todos from './pages/Todos';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'aos/dist/aos.css';
import AOS from 'aos';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <></>;
  return user ? children : <Navigate to="/login" />
}
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: false, duration: 700, mirror: true, offset: 50 });
      AOS.refresh();
    }, 100)

  }, []);
  return (
    <AuthProvider>
      <Header />
      <main className='container' data-aos="fade-down">
        <Hero />
        <Routes>
          <Route path='/' element={<PrivateRoute><Todos /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </main>
    </AuthProvider>
  )
}

