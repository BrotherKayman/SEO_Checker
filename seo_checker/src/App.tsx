import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home';
import Products from './components/pages/Products/Products';
import SignUp from './components/pages/SignUp/SignUp';
import SEOCheck from './SEOCheck/SEOCheck';
import BlogPage from './components/pages/Blog/BlogPage';
import SignIn from './components/pages/Dashboard/SignIn';
import OrderForm from './components/pages/OrderForm/OrderForm';
import AdminDashboard from './components/pages/Dashboard/admin';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInHeroSection, setIsInHeroSection] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleMouseEnter = () => setIsInHeroSection(true);
    const handleMouseLeave = () => setIsInHeroSection(false);

    window.addEventListener('mousemove', handleMouseMove);

    const heroSection = heroSectionRef.current;
    if (heroSection) {
      heroSection.addEventListener('mouseenter', handleMouseEnter);
      heroSection.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (heroSection) {
        heroSection.removeEventListener('mouseenter', handleMouseEnter);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <Router>
      <Navbar />

      {/* Mouse circle effects */}
      <div
        className={`circle ${isInHeroSection ? 'circle-blur' : 'circle-fill'}`}
        style={{
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
        }}
      />
      <div
        className={`circle ${isInHeroSection ? 'circle-blur' : 'circle-border'}`}
        style={{
          transform: `translate(${mousePosition.x - 40}px, ${mousePosition.y - 40}px)`,
        }}
      />

      {/* Routes for different pages */}
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/tools' element={<SEOCheck />} />
        <Route path='/products' element={<Products />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/order/:productId" element={<OrderForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
