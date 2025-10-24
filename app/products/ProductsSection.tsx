"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { allProducts, Product } from "../Data/products";
import Carousel from "../componets/carousel/Carousel";
import { useCart } from "../Context/CartContext";

const ProductsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  const { addToCart } = useCart();

  // Fonction utilitaire : normalise la casse et retire les accents
  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // retire les accents
      .toLowerCase();

  // Filtrage par catégorie
  const filteredProducts =
    activeCategory === "Tous"
      ? allProducts
      : allProducts.filter(
          (p) => normalize(p.category) === normalize(activeCategory)
        );

  return (
    <>
      <Carousel />
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Titre principal */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {activeCategory === "Tous"
                ? "Nos categorie de produit"
                : `Produits ${activeCategory}`}
            </h2>
            <Link href="#" className="text-blue-600 hover:underline">
              Voir tout
            </Link>
          </div>

          {/* Catégories */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {[
              "Tous",
              "Électronique",
              "Santé",
              "BTP",
              "Médical",
              "Agricole",
              "Industriel",
            ].map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full border text-sm transition-all ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grille Produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
                >
                  <div className="relative">
                    {product.originalPrice && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                        -
                        {Math.round(
                          (1 - product.price / (product.originalPrice || 1)) *
                            100
                        )}
                        %
                      </span>
                    )}
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-52 object-contain p-3"
                    />
                  </div>

                  <div className="px-4 pb-4">
                    <p className="text-gray-500 text-sm mt-2">
                      {product.brand}
                    </p>
                    <h3 className="font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>

                    <div className="flex items-center text-yellow-400 text-sm mb-1">
                      {"★".repeat(Math.floor(product.rating)) +
                        "☆".repeat(5 - Math.floor(product.rating))}
                      <span className="text-gray-500 ml-2">
                        ({product.reviews.toLocaleString()})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-orange-600">
                        {product.price.toFixed(2)} €
                      </span>
                      {product.originalPrice && (
                        <span className="line-through text-gray-400 text-sm">
                          {product.originalPrice.toFixed(2)} €
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (product.stock > 0) addToCart(product);
                      }}
                      className={`w-full py-2 mt-2 rounded-md font-medium ${
                        product.stock > 0
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {product.stock > 0
                        ? "Ajouter au panier"
                        : "Rupture de stock"}
                    </button>
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Aucun produit trouvé pour cette catégorie.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
