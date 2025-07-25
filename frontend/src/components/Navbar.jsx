import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState, useRef, useEffect } from "react";
import {
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  CreditCard,
  Package,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleProductsClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };

  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            ClothEcomm
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Products Link - Only show if user is authenticated */}
            {user && (
              <Link
                to="/products"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <Package className="w-4 h-4" />
                <span>Products</span>
              </Link>
            )}

            {/* Cart Icon - Only show if user is authenticated */}
            {user && (
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-purple-600 transition-colors duration-200 p-2 hover:bg-purple-50 rounded-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {/* User Authentication */}
            {user ? (
              /* Profile Dropdown - Only shows checkout and logout */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 p-2 hover:bg-purple-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{user.name || "User"}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu - Only checkout and logout */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <Link
                      to="/checkout"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Checkout</span>
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login/Signup Links */
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="space-y-2">
              {user ? (
                <>
                  {/* Products Link for Mobile - Only when authenticated */}
                  <Link
                    to="/products"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 rounded-lg mx-2"
                  >
                    <Package className="w-5 h-5" />
                    <span>Products</span>
                  </Link>

                  {/* Cart Link for Mobile - Only when authenticated */}
                  <Link
                    to="/cart"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 rounded-lg mx-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart ({cartItems.length})</span>
                  </Link>

                  {/* Checkout Link for Mobile */}
                  <Link
                    to="/checkout"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 rounded-lg mx-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Checkout</span>
                  </Link>

                  {/* Logout Button for Mobile */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-lg mx-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                /* Login/Signup for Mobile - Only when not authenticated */
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 rounded-lg mx-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200 rounded-lg mx-2 text-center font-medium"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
