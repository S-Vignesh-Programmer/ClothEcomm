import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  CreditCard,
  ShoppingBag,
  CheckCircle,
  ArrowRight,
  Package,
  Truck,
  Shield,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  X,
} from "lucide-react";

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  // Memoize calculations to prevent unnecessary re-renders
  const { subtotal, discount, shipping, total } = useMemo(() => {
    const sub = cartItems.reduce((acc, item) => acc + item.price, 0);
    const disc = sub * 0.23; // 23% discount
    const ship = 0; // Free shipping
    const tot = sub - disc + ship;
    return {
      subtotal: sub,
      discount: disc,
      shipping: ship,
      total: tot,
    };
  }, [cartItems]);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  // Use useCallback to prevent function recreation on every render
  const handleAddressChange = useCallback((e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const validateAddress = useCallback(() => {
    const required = [
      "fullName",
      "phone",
      "email",
      "address",
      "city",
      "state",
      "pincode",
    ];
    return required.every((field) => addressData[field].trim() !== "");
  }, [addressData]);

  const handleConfirmPay = useCallback(() => {
    setShowAddressForm(true);
  }, []);

  const handlePayment = useCallback(async () => {
    if (!validateAddress()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    setShowAddressForm(false);

    // Simulate payment processing
    setTimeout(() => {
      alert("Payment successful! Thank you for your order.");
      clearCart();
      setIsProcessing(false);
      navigate("/products");
    }, 2000);
  }, [validateAddress, clearCart, navigate]);

  const closeAddressForm = useCallback(() => {
    setShowAddressForm(false);
  }, []);

  // Memoize the AddressModal component to prevent unnecessary re-renders
  const AddressModal = useMemo(() => {
    if (!showAddressForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Delivery Address
              </h3>
            </div>
            <button
              onClick={closeAddressForm}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              type="button"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={addressData.fullName}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={addressData.phone}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={addressData.email}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={addressData.pincode}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter pincode"
                  autoComplete="postal-code"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Complete Address *
              </label>
              <textarea
                name="address"
                value={addressData.address}
                onChange={handleAddressChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="House no, Building name, Street, Area"
                autoComplete="street-address"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={addressData.city}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter city"
                  autoComplete="address-level2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={addressData.state}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter state"
                  autoComplete="address-level1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={addressData.landmark}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Near landmark"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <button
                onClick={closeAddressForm}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2 ${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                }`}
                type="button"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    showAddressForm,
    addressData,
    handleAddressChange,
    closeAddressForm,
    handlePayment,
    isProcessing,
  ]);

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Add some amazing products to proceed with checkout
            </p>
            <button
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              onClick={() => navigate("/products")}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Checkout
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Review your order and complete your purchase
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <Package className="w-5 h-5 text-purple-600" />
                    <span>Order Items ({cartItems.length})</span>
                  </h3>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item._id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0 w-full sm:w-20 h-48 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
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
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                ₹{item.price}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-400 line-through">
                                ₹{Math.round(item.price * 1.3)}
                              </span>
                            </div>
                            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                              23% OFF
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-purple-600" />
                  <span>Delivery Information</span>
                </h3>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Truck className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Free Shipping
                      </p>
                      <p className="text-xs text-gray-600">
                        No delivery charges
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        5-7 Days
                      </p>
                      <p className="text-xs text-gray-600">
                        Estimated delivery
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Secure
                      </p>
                      <p className="text-xs text-gray-600">Safe payment</p>
                    </div>
                  </div>
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
                  {/* Pricing Breakdown */}
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600">Discount (23%)</span>
                    <span className="font-medium text-green-600">
                      -₹{discount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg sm:text-xl font-semibold text-gray-900">
                        Total Amount
                      </span>
                      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Inclusive of all taxes
                    </p>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="p-4 sm:p-6 border-t border-gray-100">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Payment Method
                    </h4>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">
                          Cash on Delivery
                        </span>
                      </div>
                      <p className="text-xs text-purple-600 mt-1">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmPay}
                    className="w-full py-3 sm:py-4 rounded-xl transition-all duration-200 font-medium text-sm sm:text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    type="button"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Confirm & Pay ₹{total.toFixed(2)}</span>
                  </button>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    By placing this order, you agree to our terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {AddressModal}
    </>
  );
};

export default Checkout;
