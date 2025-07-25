import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load Stripe public key (can also be from env if needed)
const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_STRIPE_KEY");

const CheckoutButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/checkout`,
        {
          items: cartItems,
        }
      );

      const session = response.data;
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Error during checkout", error);
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
