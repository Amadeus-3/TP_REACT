import { useState, useEffect, useContext, useCallback } from "react";
import { SearchContext } from "../App";
import { useDebounce } from "./useDebounce";

const useProductSearch = () => {
  const { searchTerm } = useContext(SearchContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9);
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  // Debounce the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const skip = (currentPage - 1) * limit;

        let url;
        if (debouncedSearchTerm) {
          url = `https://dummyjson.com/products/search?q=${debouncedSearchTerm}&limit=${limit}&skip=${skip}&delay=1000`;
        } else {
          url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&delay=1000`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm, currentPage, limit, refetchIndex]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  // Reload function
  const reload = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  // Pagination functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    products,
    loading,
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
  };
};

export default useProductSearch;
