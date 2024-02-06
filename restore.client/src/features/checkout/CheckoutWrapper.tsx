import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51OglE1AYjLjaZhBGFv6eb0LWYlMPWJcFNQwgOswuIdGLCPVMVhINBXdbquTa6OgNfC3GJ7V5dJif1msTANxuokX400KttRrw4p");

export default function CheckoutWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    );
}
