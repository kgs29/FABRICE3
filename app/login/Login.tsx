"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ✅ Définition du type pour les erreurs
interface Errors {
  login?: string;
  password?: string;
}

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Validation locale
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!login.trim()) newErrors.login = "Le login est obligatoire.";
    if (!password.trim()) newErrors.password = "Le mot de passe est obligatoire.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Soumission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerError("");

    try {
      const response = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        setServerError(data.message || "Identifiants incorrects.");
      }
    } catch (error) {
      setServerError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Connexion au Store
        </h1>

        {serverError && (
          <div className="text-red-500 text-center mb-4 font-medium">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Identifiant
            </label>
            <input
              type="text"
              value={login}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLogin(e.target.value)
              }
              className={`w-full p-3 rounded-lg border ${
                errors.login ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-orange-500 
                 outline-none transition duration-200 
                 placeholder-gray-400 shadow-sm hover:shadow-md`}
              placeholder="Entrez votre identifiant"
              disabled={loading}
            />
            {errors.login && (
              <p className="text-red-500 text-sm mt-1">{errors.login}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className={`w-full p-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-orange-400 focus:border-orange-500 
                 outline-none transition duration-200 
                 placeholder-gray-400 shadow-sm hover:shadow-md`}
              placeholder="Entrez votre mot de passe"
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`relative w-full py-3.5 rounded-lg font-semibold uppercase tracking-wide shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 overflow-hidden
              ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:-translate-y-0.5"
              }`}
          >
            <span className="relative z-10">
              {loading ? "Connexion en cours..." : "Se connecter"}
            </span>
          </button>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Pas encore de compte ? </span>
            <Link
              href="/register"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Créer un compte
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
