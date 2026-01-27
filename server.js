require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.static('public'));

// Raw body for Stripe webhooks
app.use('/api/webhook', express.raw({ type: 'application/json' }));

// JSON parser for other routes
app.use(express.json());

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API: Get Stripe publishable key
app.get('/api/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

// API: Create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const {
      services,
      totalAmount,
      depositAmount,
      customerEmail,
      customerName,
      customerPhone,
      serviceAddress,
      appointmentDate,
      appointmentTime,
      urgency,
      propertyType,
      problemDescription,
      language
    } = req.body;

    // Validate required fields
    if (!services || !totalAmount || !customerEmail || !customerName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate deposit (30% of total)
    const deposit = depositAmount || Math.round(totalAmount * 0.30 * 100); // in cents

    // Create line items for Stripe
    const lineItems = [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Plumbing Service Deposit (30%)',
          description: `Services: ${services.map(s => s.name).join(', ')}`,
          metadata: {
            services: JSON.stringify(services),
            totalAmount: totalAmount.toString()
          }
        },
        unit_amount: deposit
      },
      quantity: 1
    }];

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin || 'https://plumber.sites.onfire.so'}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'https://plumber.sites.onfire.so'}?canceled=true`,
      customer_email: customerEmail,
      locale: language === 'lv' ? 'lv' : language === 'ru' ? 'ru' : 'en',
      metadata: {
        customerName,
        customerPhone,
        serviceAddress,
        appointmentDate,
        appointmentTime,
        urgency,
        propertyType,
        problemDescription,
        totalAmount: totalAmount.toString(),
        services: JSON.stringify(services)
      }
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: error.message });
  }
});

// API: Stripe Webhook
app.post('/api/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful:', session.id);
      console.log('Customer:', session.customer_email);
      console.log('Metadata:', session.metadata);

      // todo: Send confirmation email to customer
      // todo: Send notification to business owner
      // todo: Create booking in database

      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// API: Upload photos
app.post('/api/upload', upload.array('photos', 5), (req, res) => {
  try {
    const files = req.files.map(file => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      size: file.size
    }));
    res.json({ success: true, files });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Serve index.html for all other routes (SPA-like behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
