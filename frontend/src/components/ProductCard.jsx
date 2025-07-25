import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingBag, Eye, Heart, Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Lazy loading states
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);
  const cardRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "50px", // Start loading 50px before the image enters viewport
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  const handleView = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/products/${product._id}`);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsImageLoaded(true); // Still set as loaded to remove skeleton
  };

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-100 hover:border-gray-200 h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
        {/* Loading Skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
          </div>
        )}

        {/* Lazy Load Image */}
        {isInView && (
          <img
            ref={imgRef}
            src={imageError ? "/api/placeholder/300/375" : product.image}
            alt={product.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Image Error Fallback */}
        {imageError && isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs">Image unavailable</span>
            </div>
          </div>
        )}

        {/* Desktop Overlay Actions */}
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-3">
            <button
              onClick={handleView}
              className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:scale-110"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2">
          <div className="bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full shadow-sm flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-700">4.8</span>
          </div>
        </div>

        {/* Loading Indicator */}
        {!isImageLoaded && isInView && (
          <div className="absolute bottom-2 left-2">
            <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <span className="text-xs text-gray-600">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors flex-grow">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline space-x-1">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{Math.round(product.price * 1.3)}
            </span>
          </div>
          <span className="bg-green-100 text-green-700 text-xs font-medium px-1.5 py-0.5 rounded">
            23% OFF
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-auto">
          <button
            onClick={handleView}
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg transition-all duration-200 font-medium text-xs flex items-center justify-center space-x-1 border border-gray-200 hover:border-gray-300"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </button>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-3 rounded-lg transition-all duration-200 font-medium text-xs flex items-center justify-center space-x-1 shadow-sm hover:shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
