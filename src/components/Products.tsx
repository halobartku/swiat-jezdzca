import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flag, Target, Award, Package, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Products: React.FC = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [, setCurrentImageIndex] = useState<number>(0);
  const [currentProduct, setCurrentProduct] = useState<any | null>(null); // Type 'any' for now, refine later

  React.useEffect(() => {
    if (hoveredImage) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open'); // Cleanup on unmount
    };
  }, [hoveredImage]);

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
      ],
      description: "Profesjonalne przeszkody treningowe dla koni. Idealne do codziennych ćwiczeń i doskonalenia umiejętności jeździeckich."
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
      ],
      description: "Wysokiej jakości przeszkody turniejowe zgodne z normami. Zapewniają bezpieczeństwo i profesjonalny wygląd każdego konkursu."
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
      ],
      description: "Przeszkody sponsorskie to doskonały sposób na promocję marki podczas wydarzeń jeździeckich. Personalizacja i wysoka jakość wykonania."
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
      ],
      description: "Szeroki wybór akcesoriów jeździeckich, które uzupełnią każdy zestaw przeszkód i zapewnią dodatkową funkcjonalność."
    }
  ] as const;

  const handlePrevImage = () => {
    if (!currentProduct) return;
    setCurrentImageIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) {
        newIndex = currentProduct.images.length - 1;
      }
      setHoveredImage(`${currentProduct.imagePath}/${currentProduct.images[newIndex]}`);
      return newIndex;
    });
  };

  const handleNextImage = () => {
     if (!currentProduct) return;
    setCurrentImageIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex >= currentProduct.images.length) {
        newIndex = 0;
      }
      setHoveredImage(`${currentProduct.imagePath}/${currentProduct.images[newIndex]}`);
      return newIndex;
    });
  };


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
            title={product.description}
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
                  onClick={() => {
                    setHoveredImage(`${product.imagePath}/${imageName}`);
                    setCurrentImageIndex(index);
                    setCurrentProduct(product); // Store current product
                  }}
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
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between items-center px-4">
              <button onClick={handlePrevImage} className="p-2 bg-white/20 rounded-full hover:bg-white/40">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <button onClick={handleNextImage} className="p-2 bg-white/20 rounded-full hover:bg-white/40">
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
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
        <Button onClick={() => window.open('https://cdn.shopify.com/s/files/1/0731/1966/2406/files/catalogue_2024_November.pdf?v=1732272980', '_blank')}>
          Przeglądaj katalog
        </Button>
        <Button onClick={() => window.location.href='/#request-offer'}>
          Zapytaj o ofertę
        </Button>
      </div>
    </div>
  );
};

export default Products;
