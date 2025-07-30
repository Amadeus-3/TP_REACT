import React, { useContext } from "react";
import { ThemeContext, LanguageContext, SearchContext } from "../App";

const ProductSearch = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { translations } = useContext(LanguageContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={translations.searchPlaceholder}
        className={`form-control ${isDarkTheme ? "bg-dark text-light" : ""}`}
      />
    </div>
  );
};

export default ProductSearch;
