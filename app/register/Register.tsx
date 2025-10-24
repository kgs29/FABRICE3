'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // ✅ Correction 1 : typage de l’événement pour React
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Correction 2 : typage de l’événement pour le formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas !');
      return;
    }

    router.push('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-400 to-orange-600">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Créer un compte
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom complet */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="
                w-full p-3 rounded-lg border border-gray-300 
                focus:border-orange-500 focus:ring-2 focus:ring-orange-300 
                outline-none transition duration-200 
                placeholder-gray-400 shadow-sm hover:shadow-md
              "
              placeholder="Entrez votre nom complet"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full p-3 rounded-lg border border-gray-300 
                focus:border-orange-500 focus:ring-2 focus:ring-orange-300 
                outline-none transition duration-200 
                placeholder-gray-400 shadow-sm hover:shadow-md
              "
              placeholder="exemple@email.com"
            />
          </div>

          {/* Téléphone */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="
                w-full p-3 rounded-lg border border-gray-300 
                focus:border-orange-500 focus:ring-2 focus:ring-orange-300 
                outline-none transition duration-200 
                placeholder-gray-400 shadow-sm hover:shadow-md
              "
              placeholder="XX XXX XXX"
            />
          </div>

          {/* Mot de passe */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="
                w-full p-3 rounded-lg border border-gray-300 
                focus:border-orange-500 focus:ring-2 focus:ring-orange-300 
                outline-none transition duration-200 
                placeholder-gray-400 shadow-sm hover:shadow-md
              "
              placeholder="********"
            />
          </div>

          {/* Confirmation */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="
                w-full p-3 rounded-lg border border-gray-300 
                focus:border-orange-500 focus:ring-2 focus:ring-orange-300 
                outline-none transition duration-200 
                placeholder-gray-400 shadow-sm hover:shadow-md
              "
              placeholder="********"
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="
              relative w-full py-3.5 
              bg-gradient-to-r from-orange-500 to-orange-600 
              text-white font-semibold uppercase tracking-wide 
              rounded-lg shadow-md hover:shadow-lg 
              transform hover:-translate-y-0.5 transition-all duration-300
              focus:outline-none focus:ring-4 focus:ring-orange-300
              overflow-hidden
            "
          >
            <span className="relative z-10">S'inscrire</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-20 transition-opacity"></span>
          </button>
        </form>

        {/* Lien vers connexion */}
        <div className="text-center mt-6 text-sm">
          <span className="text-gray-600">Déjà un compte ? </span>
          <Link
            href="/login"
            className="text-orange-500 hover:underline font-medium"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
