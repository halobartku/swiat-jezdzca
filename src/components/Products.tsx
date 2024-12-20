import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flag, Target, Award, Package, X } from 'lucide-react';

const Products: React.FC = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const products = [
    {
      icon: Flag,
      title: "Przeszkody Treningowe",
      imagePath: "/images/Products/Treningowe",
      images: [
        '20240926_153909.jpg',
        'ALL_001 white-min.png',
        'ALL_001, ALV_001 blue-min.png',
        'ALV_002 red-min.png',
        'ALV_003 black-min.png',
        'LTS_002 blue plank-min.png'
      ]
    },
    {
      icon: Target,
      title: "Przeszkody Turniejowe",
      imagePath: "/images/Products/Turniejowe",
      images: [
        'set-12-min.png',
        'set-18-min.png',
        'TJS_504FIL1-min.png',
        'TJS_509-min.png',
        'TJS_511FIL-min.png',
        'TJS_514FIL-min.png'
      ]
    },
    {
      icon: Award,
      title: "Przeszkody Sponsorskie",
      imagePath: "/images/Products/Sponsorskie",
      images: [
        'biofeed-min.jpg',
        'krismar-min.jpg',
        'mc donald\'s-min.jpg',
        'techniekwebshop 1-min.jpg',
        'techniekwebshop 3-min.jpg',
        'tress-min.jpg'
      ]
    },
    {
      icon: Package,
      title: "Akcesoria",
      imagePath: "/images/Products/Akcesoria",
      images: [
        'ACC_715-min.jpg',
        'heartwood poles-min.jpg',
        'TPF_401BUBBLES  TPF_401MOSAIC TPF_401WAVE TPF_401RUBY-min.jpg',
        'TPF_410-min.jpg',
        'TPF_412-min.jpg',
        'TPF_414-min.jpg'
      ]
    }
  ];

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 pt-2 pb-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4 px-4"
      >
        <h2 className="text-xl md:text-2xl font-bold text-primary-text">Nasze Produkty</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {products.map((product, index) => (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-primary-bg/90 backdrop-blur-sm rounded-lg shadow-md p-4 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-secondary-bg rounded-lg">
                <product.icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-primary-text line-clamp-1">{product.title}</h3>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-1.5 aspect-square md:aspect-[4/2]">
              {product.images.map((imageName, index) => (
                <div
                  key={index}
                  className="relative bg-secondary-bg rounded-md overflow-hidden group"
                  onClick={() => setHoveredImage(`${product.imagePath}/${imageName}`)}
                >
                  <div className="aspect-square w-full h-full">
                    <img
                      src={`${product.imagePath}/${imageName}`}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enlarged Image Preview */}
      {/* Image Preview Modal */}
      {hoveredImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setHoveredImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-lg p-2"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setHoveredImage(null)}
              className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-lg z-10"
            >
              <X className="w-4 h-4 text-primary" />
            </button>
            <img
              src={hoveredImage}
              alt="Powiększony podgląd"
              className="w-auto h-auto max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6 px-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#ff4d4d] to-white text-black py-2 px-5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
        >
          Przeglądaj katalog
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#ff4d4d] to-white text-black py-2 px-5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
        >
          Zapytaj o ofertę
        </motion.button>
      </div>
    </div>
  );
};

export default Products;
