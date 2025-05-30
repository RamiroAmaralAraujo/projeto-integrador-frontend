import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CoreCommerce</h3>
            <p className="text-gray-300 mb-4">
              Soluções em automação comercial e comunicação omnichannel para o
              seu negócio.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/people/Core-Commerce/61576302612238/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/corecommerce.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Benefícios
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Depoimentos
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Área do Cliente
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">(22) 99208-1232</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  corecommerce.suporte@gmail.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fique por dentro</h3>
            <p className="text-gray-300 mb-4">
              Informe seu e-mail para receber nossas novidades e atualizações.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="px-4 py-2 bg-primary-900 border border-primary-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700 text-white"
              />
              <button className="btn bg-primary-700 hover:bg-primary-600 text-white py-2">
                Quero receber
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CoreCommerce. Todos os direitos
            reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <a
              href="/termos-de-uso"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-white transition-colors mr-4"
            >
              Termos de Uso
            </a>
            <a
              href="/politica-de-privacidade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
