import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white pt-16">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="font-bold text-5xl lg:text-6xl mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Automatize seu negócio com a
              <span className="text-primary-300 block">CoreCommerce</span>
            </motion.h1>

            <motion.p
              className="text-xl mb-8 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Soluções integradas de automação comercial e comunicação
              omnichannel para impulsionar o crescimento do seu negócio.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <a
                href="https://wa.me/5522992081232?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20CoreCommerce."
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-primary-500 hover:bg-primary-600 text-white font-medium flex items-center justify-center group"
              >
                Fale com a gente
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </a>
              <a
                href="#about"
                className="btn bg-transparent border border-white text-white hover:bg-white/10 transition-colors"
              >
                Conheça mais
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="CoreCommerce Platform"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {/* <a
              href="#about"
              className="flex flex-col items-center text-white/70 hover:text-white"
            >
              <span className="text-sm mb-2">Saiba mais</span>
              <div className="w-8 h-8 border-2 border-white/70 rounded-full flex items-center justify-center">
                <ArrowRight className="transform rotate-90" size={18} />
              </div>
            </a> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
