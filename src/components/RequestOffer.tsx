import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  productTypes: string[];
}

const productTypeOptions = {
  training: 'Przeszkody Treningowe',
  competition: 'Przeszkody Turniejowe',
  sponsor: 'Przeszkody Sponsorskie',
  accessories: 'Akcesoria',
  other: 'Inne'
};

const RequestOffer = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    productTypes: []
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    
    const timer = setTimeout(() => {
      const selectedTypes = formData.productTypes
        .map(type => productTypeOptions[type as keyof typeof productTypeOptions])
        .join(', ');

      const emailBody = `
Nowe zapytanie ofertowe:

Imię i Nazwisko: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone}
Rodzaj Przeszkód: ${selectedTypes}

Wiadomość:
${formData.message}
      `.trim();

      const mailtoLink = `mailto:biuro@swiatjezdzca.pl?subject=Zapytanie Ofertowe - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      setShowSuccess(false);
    }, 1500);

    return () => clearTimeout(timer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;
    
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      const checked = target.checked;
      setFormData(prev => ({
        ...prev,
        productTypes: checked 
          ? [...prev.productTypes, value]
          : prev.productTypes.filter(type => type !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto p-6 bg-primary-bg rounded-lg shadow-md hover:shadow-lg transition-all"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-primary-text">
        Zapytanie Ofertowe
      </h2>

      {showSuccess && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 cursor-pointer"
          onClick={() => setShowSuccess(false)}
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-xl text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowSuccess(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Dziękujemy!</h3>
            <p className="text-gray-600">Za chwilę otworzy się Twój klient pocztowy...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-text mb-2">
              Imię i Nazwisko
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-secondary-bg border border-gray-200 text-primary-text placeholder-secondary-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Jan Kowalski"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-secondary-bg border border-gray-200 text-primary-text placeholder-secondary-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="jan@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary-text mb-2">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-secondary-bg border border-gray-200 text-primary-text placeholder-secondary-text focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="+48 123 456 789"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">
            Rodzaj Przeszkód
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(productTypeOptions).map(([value, label]) => (
              <label key={value} className="flex items-center space-x-2 p-2 rounded hover:bg-secondary-bg/50 cursor-pointer">
                <input
                  type="checkbox"
                  name="productTypes"
                  value={value}
                  checked={formData.productTypes.includes(value)}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-primary-text">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary-text mb-2">
            Wiadomość
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-secondary-bg border border-gray-200 text-primary-text placeholder-secondary-text focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Opisz swoje potrzeby..."
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-[#ff4d4d] to-white text-black font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Wyślij Zapytanie
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RequestOffer;
