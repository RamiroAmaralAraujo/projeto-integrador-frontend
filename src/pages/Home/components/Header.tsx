import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoAzul from '../../../assets/LogoSemFundoAzul.svg';
import logoBranco from '../../../assets/LogoSemFundoBranco.svg';
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkColor = isScrolled ? 'text-gray-800' : 'text-white';
  const logoSrc = isScrolled ? logoAzul : logoBranco;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoSrc} alt="CoreCommerce Logo" className="mr-2 h-10" />
          <span className={`text-2xl font-bold ${linkColor}`}>
            CoreCommerce
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="#home" className={`font-medium hover:text-primary-500 ${linkColor}`}>
            Home
          </Link>
          <a href="#about" className={`font-medium hover:text-primary-500 ${linkColor}`}>
            Sobre
          </a>
          <a href="#benefits" className={`font-medium hover:text-primary-500 ${linkColor}`}>
            Benefícios
          </a>
          <a href="#testimonials" className={`font-medium hover:text-primary-500 ${linkColor}`}>
            Depoimentos
          </a>
          <span onClick={handleLogin} className="btn btn-primary">
            Área do Cliente
          </span>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none ${linkColor}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link to="/" className="font-medium text-gray-800 hover:text-primary-700 py-2" onClick={toggleMobileMenu}>
              Home
            </Link>
            <a href="#about" className="font-medium text-gray-800 hover:text-primary-700 py-2" onClick={toggleMobileMenu}>
              Sobre
            </a>
            <a href="#benefits" className="font-medium text-gray-800 hover:text-primary-700 py-2" onClick={toggleMobileMenu}>
              Benefícios
            </a>
            <a href="#testimonials" className="font-medium text-gray-800 hover:text-primary-700 py-2" onClick={toggleMobileMenu}>
              Depoimentos
            </a>
            <Link to="/login" className="btn btn-primary w-full text-center" onClick={toggleMobileMenu}>
              Área do Cliente
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
