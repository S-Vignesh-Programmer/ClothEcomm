import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("");

  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams();
      if (search) query.append("search", search);
      if (filters.category) query.append("category", filters.category);
      if (filters.minPrice) query.append("minPrice", filters.minPrice);
      if (filters.maxPrice) query.append("maxPrice", filters.maxPrice);
      if (filters.rating) query.append("rating", filters.rating);

      const data = await getAllProducts(query.toString());
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: 0,
      maxPrice: 10000,
      rating: 0,
    });
    setSearch("");
  };

  const categories = ["Men", "Women", "Kids"];
  const ratings = [
    { value: 0, label: "All Ratings" },
    { value: 4, label: "4★ & up" },
    { value: 3, label: "3★ & up" },
    { value: 2, label: "2★ & up" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Products
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our premium collection of fashion-forward clothing for
              the entire family
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products, brands, styles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm sm:text-base font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {(filters.category || filters.rating > 0 || search) && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {
                      [filters.category, filters.rating > 0, search].filter(
                        Boolean
                      ).length
                    }
                  </span>
                )}
              </button>

              {(filters.category || filters.rating > 0 || search) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm sm:text-base"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Category
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={filters.category === ""}
                        onChange={(e) =>
                          setFilters({ ...filters, category: e.target.value })
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        All Categories
                      </span>
                    </label>
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={filters.category === category}
                          onChange={(e) =>
                            setFilters({ ...filters, category: e.target.value })
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Price Range
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Min Price (₹)
                      </label>
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            minPrice: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Max Price (₹)
                      </label>
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            maxPrice: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">

              {products.length > 0 && (
                <div className="text-sm text-gray-500">
                  {search && (
                    <>
                      Results for "
                      <span className="font-medium text-gray-900">
                        {search}
                      </span>
                      "
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Products Display */}
            {products.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {products.map((product) => (
                  <div
                    key={product._id}
                    className={`${
                      viewMode === "list"
                        ? "flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                        : ""
                    }`}
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Try adjusting your filters or search terms to find what
                    you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
