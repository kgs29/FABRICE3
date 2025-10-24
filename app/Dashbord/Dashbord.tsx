"use client";

import React, { useState, useEffect } from "react";

interface SectionState {
  home: boolean;
  config: boolean;
  content: boolean;
  orders: boolean;
  products: boolean;
  analytics: boolean;
}

const Dashboard: React.FC = () => {
  const [openSections, setOpenSections] = useState<SectionState>({
    home: false,
    config: false,
    content: false,
    orders: false,
    products: false,
    analytics: false,
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setOpenSections({
          home: true,
          config: true,
          content: true,
          orders: true,
          products: true,
          analytics: true,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (section: keyof SectionState) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* HEADER */}
      <header className="bg-white shadow flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold text-orange-600">STORE.BUILDER</div>
        <div className="flex items-center gap-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            S'authentifier
          </button>
          <span className="text-gray-700 font-medium">Admin</span>
        </div>
      </header>

      {/* CONTENU */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-gray-900 text-white p-5">
          <h2 className="text-sm font-semibold text-gray-400 mb-4">DASHBOARD</h2>

          {["home", "config", "content", "orders", "products", "analytics"].map(
            (section) => (
              <div key={section} className="mb-4">
                <h3
                  onClick={() => toggleSection(section as keyof SectionState)}
                  className="flex justify-between items-center cursor-pointer font-semibold text-lg mb-2 hover:text-orange-400"
                >
                  {section === "home" && "Page Accueil"}
                  {section === "config" && "Configuration"}
                  {section === "content" && "Contenu"}
                  {section === "orders" && "Commandes"}
                  {section === "products" && "Produits"}
                  {section === "analytics" && "Analyse"}
                  <span className="text-sm">
                    {openSections[section as keyof SectionState] ? "▼" : "▶"}
                  </span>
                </h3>

                {openSections[section as keyof SectionState] && (
                  <ul className="ml-4 text-sm space-y-1 text-gray-300">
                    {section === "home" && (
                      <>
                        <li className="hover:text-orange-400 cursor-pointer">Boutique</li>
                        <li className="hover:text-orange-400 cursor-pointer">Contactez-nous</li>
                        <li className="hover:text-orange-400 cursor-pointer">Publications</li>
                      </>
                    )}
                    {section === "config" && (
                      <>
                        <li className="hover:text-orange-400 cursor-pointer">Mode de paiement</li>
                        <li className="hover:text-orange-400 cursor-pointer">Mode d'expédition</li>
                      </>
                    )}
                    {section === "content" && (
                      <>
                        <li className="hover:text-orange-400 cursor-pointer">Produits</li>
                        <li className="hover:text-orange-400 cursor-pointer">Articles</li>
                        <li className="hover:text-orange-400 cursor-pointer">Médias</li>
                      </>
                    )}
                    {section === "orders" && (
                      <>
                        <li className="hover:text-orange-400 cursor-pointer">Commandes</li>
                        <li className="hover:text-orange-400 cursor-pointer">Clients</li>
                        <li className="hover:text-orange-400 cursor-pointer">Retours</li>
                      </>
                    )}
                    {section === "products" && (
                      <>
                        <li className="hover:text-orange-400 cursor-pointer">Produits</li>
                        <li className="hover:text-orange-400 cursor-pointer">Liste produits</li>
                        <li className="hover:text-orange-400 cursor-pointer">Catégories</li>
                        <li className="hover:text-orange-400 cursor-pointer">Inventaire</li>
                      </>
                    )}
                    {section === "analytics" && (
                      <>
                        <li className="hover:text-orange-400 cursor-pointer">Visiteurs</li>
                        <li className="hover:text-orange-400 cursor-pointer">Pages vues</li>
                        <li className="hover:text-orange-400 cursor-pointer">Dashboard</li>
                        <li className="hover:text-orange-400 cursor-pointer">Rapports</li>
                      </>
                    )}
                  </ul>
                )}
              </div>
            )
          )}
        </aside>

       
      </div>
    </div>
  );
};

export default Dashboard;
