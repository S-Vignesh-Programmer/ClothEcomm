import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  CreditCard,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  Plus,
  Minus,
  Check,
} from "lucide-react";

const BASE_IMAGE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace("/api", "")

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
    } else {
      const productWithQuantity = { ...product, quantity };
      addToCart(productWithQuantity);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login");
    } else {
      const productWithQuantity = { ...product, quantity };
      addToCart(productWithQuantity);
      navigate("/checkout");
    }
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const getProductDescription = (category) => {
    const descriptions = {
      Men: "Crafted with premium materials and modern design, this men's piece combines comfort with contemporary style. Perfect for both casual and semi-formal occasions, featuring durable construction and attention to detail that ensures long-lasting wear.",
      Women:
        "Elegant and versatile, this women's fashion piece is designed to make you feel confident and stylish. Made with high-quality fabrics and thoughtful design elements, it's perfect for expressing your unique personality while maintaining comfort throughout the day.",
      Kids: "Fun, comfortable, and durable - this kids' item is designed with active lifestyles in mind. Made from soft, breathable materials that are gentle on sensitive skin, featuring playful designs that kids love and quality that parents trust.",
      default:
        "This premium fashion piece combines style, comfort, and quality craftsmanship. Made with carefully selected materials and designed with attention to detail, it's perfect for those who appreciate both fashion and functionality in their wardrobe choices.",
    };

    return descriptions[category] || descriptions.default;
  };

  // Enhanced image handling functions
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // If image path already contains full URL, return as is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Ensure proper path formatting
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${BASE_IMAGE_URL}${cleanPath}`;
  };

  // Optimized Image Component with fallback and loading states
  const OptimizedImage = ({ src, alt, className, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);

      // Try with a placeholder image if original fails
      if (imgSrc && !imgSrc.includes("placeholder")) {
        setImgSrc(
          `https://via.placeholder.com/400x400/e5e7eb/9ca3af?text=${encodeURIComponent(
            alt || "Product"
          )}`
        );
      }
    };

    return (
      <div className={`relative ${className}`} {...props}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-inherit">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        )}

        <img
          src={imgSrc}
          alt={alt}
          className={`${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />

        {hasError && imgSrc?.includes("placeholder") && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 rounded-inherit">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">📷</div>
              <div className="text-sm">Image unavailable</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Section */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <OptimizedImage
                src={getImageUrl(product.image)}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-purple-600 transition-colors cursor-pointer"
                >
                  <OptimizedImage
                    src={getImageUrl(product.image)}
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {product.title}
                  </h1>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full border-2 transition-all ${
                      isWishlisted
                        ? "border-red-500 bg-red-50 text-red-500"
                        : "border-gray-300 bg-white text-gray-600 hover:border-red-300 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  (4.8 • 127 reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹{product.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₹{Math.round(product.price * 1.3)}
                </span>
                <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-full">
                  23% OFF
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? "border-purple-600 bg-purple-50 text-purple-600"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-medium min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <CreditCard className="w-5 h-5" />
                <span>Buy Now</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="text-center space-y-2">
                <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-600">On orders ₹2500+</p>
              </div>
              <div className="text-center space-y-2">
                <div className="bg-green-50 p-3 rounded-full w-fit mx-auto">
                  <RotateCcw className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-600">45-day policy</p>
              </div>
              <div className="text-center space-y-2">
                <div className="bg-purple-50 p-3 rounded-full w-fit mx-auto">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Secure Pay</p>
                <p className="text-xs text-gray-600">SSL Protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 lg:mt-16">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Product Details
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {getProductDescription(product.category)}
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Premium quality materials
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Comfortable fit and feel
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Easy care and maintenance
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Versatile styling options
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Care Instructions:
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Machine wash cold with like colors</li>
                    <li>• Do not bleach or use fabric softener</li>
                    <li>• Tumble dry low or hang to dry</li>
                    <li>• Iron on low heat if needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
