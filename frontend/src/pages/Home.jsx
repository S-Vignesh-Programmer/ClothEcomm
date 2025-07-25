import {
  Star,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ChevronRight,
  Users,
  Award,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth(); // Get user authentication status

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Outstanding quality and exceptional service! The clothes fit perfectly and arrived faster than expected. ClothEcomm has become my go-to fashion destination.",
      avatar: "SJ",
      role: "Fashion Enthusiast",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment:
        "Incredible variety for our entire family. The kids' section is particularly impressive with durable, stylish options that they actually want to wear!",
      avatar: "MC",
      role: "Family Shopper",
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment:
        "The mobile shopping experience is seamless, and the return policy gives me confidence to try new styles. Highly recommend ClothEcomm!",
      avatar: "ER",
      role: "Online Shopper",
    },
  ];

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Complimentary delivery on orders over ₹2,500 India-wide",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payments",
      description: "Bank-level security with SSL encryption protection",
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Easy Returns",
      description: "45-day hassle-free returns and exchanges policy",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Carefully curated brands and quality assurance",
    },
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      number: "150K+",
      label: "Happy Customers",
    },
    {
      icon: <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8" />,
      number: "25K+",
      label: "Products Available",
    },
    {
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      number: "500+",
      label: "Brand Partners",
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      number: "99.9%",
      label: "Customer Satisfaction",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Fashion That
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Defines You
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Discover premium clothing collections for men, women, and
                  children. Quality craftsmanship meets contemporary style.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to={user ? "/products" : "/login"}>
                  <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-800 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:from-indigo-800 hover:to-violet-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <ShoppingBag className="w-5 h-5" />
                    Shop Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <div className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop&crop=center"
                      alt="Men's Collection"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop"
                      alt="Kids Fashion"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                  <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop&crop=center"
                      alt="New Arrivals"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&crop=center"
                      alt="Women's Collection"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg animate-pulse">
                Up to 60% OFF
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose ClothEcomm?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our customer-first approach and
              premium services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:from-blue-50 group-hover:to-purple-50 group-hover:text-blue-600 transition-all duration-300 shadow-md group-hover:shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Find the perfect style for every member of your family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] rounded-3xl p-6 sm:p-8 flex flex-col justify-end relative overflow-hidden hover:shadow-xl transition-all duration-300 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center"
                  alt="Men's Fashion"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                <div className="relative z-10 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Men's Fashion
                  </h3>
                  <p className="text-gray-200 mb-4 text-sm sm:text-base">
                    Professional & Casual Wear
                  </p>
                  <div className="flex items-center text-blue-300 font-semibold text-sm sm:text-base">
                    Explore Collection
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/5] rounded-3xl p-6 sm:p-8 flex flex-col justify-end relative overflow-hidden hover:shadow-xl transition-all duration-300 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop=center"
                  alt="Women's Fashion"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                <div className="relative z-10 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Women's Fashion
                  </h3>
                  <p className="text-gray-200 mb-4 text-sm sm:text-base">
                    Elegant & Contemporary Styles
                  </p>
                  <div className="flex items-center text-pink-300 font-semibold text-sm sm:text-base">
                    Explore Collection
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/5] rounded-3xl p-6 sm:p-8 flex flex-col justify-end relative overflow-hidden hover:shadow-xl transition-all duration-300 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&h=500&fit=crop=center"
                  alt="Kids Collection"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                <div className="relative z-10 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Kids Collection
                  </h3>
                  <p className="text-gray-200 mb-4 text-sm sm:text-base">
                    Playful & Comfortable Designs
                  </p>
                  <div className="flex items-center text-green-300 font-semibold text-sm sm:text-base">
                    Explore Collection
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-600 mb-3 sm:mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Redefining Fashion Since 2020
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed">
                <p>
                  ClothEcomm has established itself as a premier destination for
                  fashion-forward individuals and families. We believe that
                  exceptional style should be accessible to everyone, which is
                  why we've built relationships with top brands and designers
                  worldwide.
                </p>
                <p>
                  Our commitment goes beyond just selling clothes – we're here
                  to help you express your unique personality through carefully
                  curated collections that blend contemporary trends with
                  timeless appeal.
                </p>
              </div>

              <div className="mt-6 sm:mt-8">
                <Link to={user ? "/products" : "/login"}>
                  <button className="w-full sm:w-auto bg-gradient-to-r  from-indigo-800 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:from-indigo-800 hover:to-violet-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Start Your Style Journey
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop&crop=center"
                  alt="Fashion Community"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6 sm:p-8">
                  <div className="text-center text-white w-full">
                    <Users className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" />
                    <p className="text-lg sm:text-xl font-semibold">
                      Fashion Community
                    </p>
                    <p className="text-xs sm:text-sm mt-2">
                      Join thousands of style enthusiasts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Real feedback from our valued community members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 sm:p-8 rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md"
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 text-sm sm:text-base">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            Join our community of fashion enthusiasts and discover your perfect
            look today. Premium quality, exceptional service, and styles that
            speak to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={user ? "/products" : "/login"}>
              <button className="w-full sm:w-auto bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Start Shopping Now
              </button>
            </Link>
            <Link to={user ? "/products" : "/signup"}>
              <button className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                {user ? "Browse Products" : "Create Account"}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                ClothEcomm
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Your trusted partner in fashion, bringing you premium quality
                clothing and exceptional shopping experiences since 2020.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-blue-400 hover:text-white rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-pink-600 hover:text-white rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base">
                Shop
              </h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Men's Fashion
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Women's Fashion
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Kids Collection
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Sale Items
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base">
                Support
              </h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Track Your Order
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base">
                Contact
              </h4>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
                  <span>hello@clothecomm.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Benz Street
                    <br />
                    Chennai, Tamil Nadu
                    <br />
                    India
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm sm:text-base text-gray-600">
              <p>&copy; 2025 ClothEcomm. All rights reserved.</p>
              <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
