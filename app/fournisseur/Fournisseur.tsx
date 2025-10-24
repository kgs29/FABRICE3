"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FormData {
  country: string;
  profileType: string;
  email: string;
  password: string;
  confirmPassword: string;
  company: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneCode: string;
  acceptTerms: boolean;
}

interface Errors {
  [key: string]: string;
}

const Fournisseur: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    country: "France",
    profileType: "both",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    firstName: "",
    lastName: "",
    phone: "",
    phoneCode: "+33",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Errors>({});

  // ✅ Correction de la fonction handleChange
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    const checked =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email)
      newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "L'email est invalide";

    if (!formData.password)
      newErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 6)
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    if (!formData.company)
      newErrors.company = "Le nom de l'entreprise est requis";

    if (!formData.firstName)
      newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName)
      newErrors.lastName = "Le nom est requis";

    if (!formData.phone)
      newErrors.phone = "Le téléphone est requis";
    else if (!/^[0-9+\s()-]{10,}$/.test(formData.phone))
      newErrors.phone = "Le numéro de téléphone est invalide";

    if (!formData.acceptTerms)
      newErrors.acceptTerms = "Vous devez accepter les conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Formulaire soumis:", formData);
      alert("Inscription réussie !");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col md:flex-row bg-gray-100">
        {/* Bannière gauche */}
        <div className="flex-1 bg-gradient-to-br from-orange-400 to-orange-500 text-white p-10 flex flex-col justify-center items-center text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4">
              Devenez fournisseur sur notre marketplace
            </h1>
            <p className="text-lg mb-6 opacity-90">
              Rejoignez notre plateforme et développez votre business à
              l'international
            </p>
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-2">
                <span className="bg-white text-orange-500 font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  ✓
                </span>
                Accédez à des millions d'acheteurs potentiels
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-white text-orange-500 font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  ✓
                </span>
                Outils de gestion simplifiés pour votre activité
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-white text-orange-500 font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  ✓
                </span>
                Support dédié aux fournisseurs
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-white text-orange-500 font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  ✓
                </span>
                Livraison GRATUITE pour votre première commande
              </li>
            </ul>
          </div>
        </div>

        {/* Formulaire */}
        <div className="flex-1 bg-white p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
              Créer un compte
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Remplissez le formulaire ci-dessous pour commencer
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pays */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Pays / Région
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              {/* Type de profil */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Je suis
                </label>
                <select
                  name="profileType"
                  value={formData.profileType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="buyer">Acheteur</option>
                  <option value="seller">Vendeur</option>
                  <option value="both">Les deux</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre e-mail sera également votre identifiant"
                  className={`w-full border rounded-md p-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Mots de passe */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Saisissez votre mot de passe"
                  className={`w-full border rounded-md p-2 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirmation du mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Saisissez à nouveau votre mot de passe"
                  className={`w-full border rounded-md p-2 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Entreprise */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${
                    errors.company ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>

              {/* Prénom / Nom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full border rounded-md p-2 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full border rounded-md p-2 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Numéro de téléphone
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleChange}
                    className="w-20 border border-gray-300 rounded-md p-2 text-center bg-gray-100"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 border rounded-md p-2 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Conditions */}
              <div
                className={`flex items-start p-3 rounded-md ${
                  errors.acceptTerms
                    ? "bg-red-50 border border-red-300"
                    : "bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                />
                <label className="text-sm text-gray-600">
                  J'accepte le{" "}
                  <Link href="#" className="text-orange-500 underline">
                    Contrat d'adhésion
                  </Link>
                  , les{" "}
                  <Link href="#" className="text-orange-500 underline">
                    Conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="#" className="text-orange-500 underline">
                    Politique de confidentialité
                  </Link>
                  .
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
              )}

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold mt-3 transition"
              >
                Créer mon compte
              </button>

              <p className="text-center text-gray-600 mt-3">
                Déjà un compte ?{" "}
                <Link href="/login" className="text-orange-500 font-semibold">
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fournisseur;
