import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingBag, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full shadow-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Cart
            </h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Discover amazing products and add them to your cart
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Cart Items
                  </h3>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0 w-full sm:w-24 h-48 sm:h-24 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 line-clamp-2">
                            {item.title}
                          </h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              ₹{item.price}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-400 line-through">
                              ₹{Math.round(item.price * 1.3)}
                            </span>
                            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                              23% OFF
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="w-full sm:w-auto bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-2 border border-red-200 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-6">
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Order Summary
                  </h3>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{total.toFixed(2)}</span>
                  </div>

                  {/* Discount
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">
                      -₹{(total * 0.23).toFixed(2)}
                    </span>
                  </div> */}

                  {/* Shipping */}
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 sm:p-6 border-t border-gray-100 space-y-3">
                  <Link
                    to="/checkout"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 sm:py-4 rounded-xl transition-all duration-200 font-medium text-sm sm:text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 py-3 rounded-xl transition-all duration-200 font-medium text-sm border border-gray-200 hover:border-gray-300 flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear Cart</span>
                  </button>

                  <Link
                    to="/products"
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-800 py-3 rounded-xl transition-all duration-200 font-medium text-sm border border-gray-300 hover:border-gray-400 flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
