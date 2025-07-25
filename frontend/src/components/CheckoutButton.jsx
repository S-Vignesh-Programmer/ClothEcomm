import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load Stripe public key (replace with your actual public key or env variable)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment`,
        {
          cartItems, // 🛒 this should match backend param
        },
        {
          withCredentials: true, // if you're using auth
        }
      );

      const { url } = response.data;
      window.location.href = url; // redirect user to Stripe Checkout
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
    >
      Proceed to Payment
    </button>
  );
};

export default CheckoutButton;
