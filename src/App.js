import React, { createContext, useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductSearch from "./components/ProductSearch";
import ThemeToggle from "./components/ThemeToggle";
import LanguageSelector from "./components/LanguageSelector";
import { useLocalStorage } from "./hooks/useLocalStorage";

// Create Contexts for Theme, Language, and Search
export const ThemeContext = createContext();
export const LanguageContext = createContext();
export const SearchContext = createContext();

// Translations object
const translations = {
  fr: {
    title: "Catalogue de Produits",
    searchPlaceholder: "Rechercher un produit...",
    price: "Prix",
    loading: "Chargement...",
    error: "Erreur",
    reload: "Recharger",
    previous: "Précédent",
    next: "Suivant",
    page: "Page",
    of: "sur",
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
  },
  en: {
    title: "Product Catalog",
    searchPlaceholder: "Search for a product...",
    price: "Price",
    loading: "Loading...",
    error: "Error",
    reload: "Reload",
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
  },
};

const App = () => {
  // Use custom hook to persist theme and language
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage("isDarkTheme", false);
  const [language, setLanguage] = useLocalStorage("language", "fr");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const body = document.body;
    if (isDarkTheme) {
      body.classList.add("bg-dark");
      body.classList.remove("bg-light");
    } else {
      body.classList.add("bg-light");
      body.classList.remove("bg-dark");
    }
    // The cleanup function is not strictly necessary here but is good practice
    return () => {
      body.classList.remove("bg-dark", "bg-light");
    };
  }, [isDarkTheme]);
  const themeValue = {
    isDarkTheme,
    setIsDarkTheme,
    translations: translations[language],
  };
  const languageValue = {
    language,
    setLanguage,
    translations: translations[language],
  };
  const searchValue = { searchTerm, setSearchTerm };

  return (
    <ThemeContext.Provider value={themeValue}>
      <LanguageContext.Provider value={languageValue}>
        <SearchContext.Provider value={searchValue}>
          {/* This container still needs its classes for text color and other styles */}
          <div
            className={`container ${isDarkTheme ? "text-light" : "text-dark"}`}
          >
            <header className="my-4">
              <h1 className="text-center">
                {languageValue.translations.title}
              </h1>
              <div className="d-flex justify-content-end gap-2">
                <ThemeToggle />
                <LanguageSelector />
              </div>
            </header>
            <main>
              <ProductSearch />
              <ProductList />
            </main>
          </div>
        </SearchContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
