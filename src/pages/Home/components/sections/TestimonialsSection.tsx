import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "A CoreCommerce transformou completamente a maneira como gerenciamos nosso e-commerce. A integração com nossas redes sociais multiplicou nossas vendas em apenas dois meses!",
    author: "Ana Silva",
    position: "CEO, Moda Express",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 5
  },
  {
    id: 2,
    content: "O suporte da equipe da CoreCommerce é excepcional. Sempre que precisamos de ajuda, eles estão prontos para resolver nossos problemas rapidamente.",
    author: "Carlos Mendes",
    position: "Diretor de Operações, TechStore",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 5
  },
  {
    id: 3,
    content: "A gestão de estoque em tempo real nos ajudou a reduzir custos e melhorar significativamente a experiência dos nossos clientes. Não temos mais problemas com produtos indisponíveis.",
    author: "Patrícia Almeida",
    position: "Gerente Comercial, Supermercado Familia",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    rating: 4
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section bg-primary-900 text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            O que nossos clientes dizem
          </h2>
          <p className="max-w-3xl mx-auto text-primary-100 text-lg animate-on-scroll">
            Conheça as histórias de sucesso das empresas que utilizam nossas soluções.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-8 animate-on-scroll">
          <div className="relative bg-primary-800 rounded-xl p-8 md:p-12 shadow-xl">
            <div className="flex mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={20} className="text-yellow-400 fill-current" />
              ))}
              {[...Array(5 - testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={20} className="text-gray-400" />
              ))}
            </div>
            
            <blockquote className="text-xl md:text-2xl mb-8 italic">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <div className="flex items-center">
              <img 
                src={testimonials[currentIndex].image} 
                alt={testimonials[currentIndex].author} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
                <p className="text-primary-300">{testimonials[currentIndex].position}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-primary-700 hover:bg-primary-600 transition-colors focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index ? 'bg-white' : 'bg-primary-700 hover:bg-primary-600'
                  } transition-colors`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-primary-700 hover:bg-primary-600 transition-colors focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;