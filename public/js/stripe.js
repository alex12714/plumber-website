// Stripe integration

let stripe = null;

// Initialize Stripe
async function initStripe() {
  try {
    const response = await fetch('/api/config');
    const { publishableKey } = await response.json();

    if (publishableKey) {
      stripe = Stripe(publishableKey);
    }
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
  }
}

// Create checkout session and redirect
async function createCheckoutSession(bookingData) {
  if (!stripe) {
    throw new Error('Stripe not initialized');
  }

  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  const { url } = await response.json();

  // Redirect to Stripe Checkout
  if (url) {
    window.location.href = url;
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initStripe);

// Export for use in booking.js
window.stripeCheckout = {
  createCheckoutSession
};
