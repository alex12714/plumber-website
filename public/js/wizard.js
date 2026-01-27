// Wizard booking flow

// Service data organized by need type and category
const serviceData = {
  emergency: {
    categories: [
      {
        id: 'pipes',
        icon: '💧',
        name: 'Pipes & Leaks',
        i18nKey: 'category.pipes',
        services: [
          { id: 'burst-pipe', name: 'Burst pipe repair', price: 45, i18nKey: 'service.burstPipe' },
          { id: 'emergency-leak', name: 'Emergency leak repair', price: 40, i18nKey: 'service.emergencyLeak' },
          { id: 'pipe-leak', name: 'Pipe leak repair', price: 25, i18nKey: 'service.pipeLeak' }
        ]
      },
      {
        id: 'drains',
        icon: '🚽',
        name: 'Toilet & Drains',
        i18nKey: 'category.drains',
        services: [
          { id: 'blocked-toilet', name: 'Blocked toilet clearing', price: 30, i18nKey: 'service.blockedToilet' },
          { id: 'blocked-drain', name: 'Blocked drain clearing', price: 30, i18nKey: 'service.blockedDrain' },
          { id: 'sewage-line', name: 'Sewage line repair', price: 70, i18nKey: 'service.sewageLine' }
        ]
      },
      {
        id: 'flooding',
        icon: '🌊',
        name: 'Flooding',
        i18nKey: 'category.flooding',
        services: [
          { id: 'flooding', name: 'Flooding assistance', price: 55, i18nKey: 'service.flooding' }
        ]
      },
      {
        id: 'heating-emergency',
        icon: '🔥',
        name: 'Heating & Gas',
        i18nKey: 'category.heatingGas',
        services: [
          { id: 'boiler-repair', name: 'Boiler repair', price: 50, fromPrice: true, i18nKey: 'service.boilerRepair' },
          { id: 'gas-leak', name: 'Gas leak detection', price: 35, i18nKey: 'service.gasLeak' }
        ]
      }
    ]
  },
  maintenance: {
    categories: [
      {
        id: 'taps-fixtures',
        icon: '🚰',
        name: 'Taps & Fixtures',
        i18nKey: 'category.tapsFixtures',
        services: [
          { id: 'tap-repair', name: 'Tap/faucet repair', price: 15, i18nKey: 'service.tapRepair' },
          { id: 'toilet-repair', name: 'Toilet repair', price: 20, i18nKey: 'service.toiletRepair' },
          { id: 'cistern-repair', name: 'Cistern repair', price: 20, i18nKey: 'service.cisternRepair' },
          { id: 'valve-replacement', name: 'Valve replacement', price: 20, i18nKey: 'service.valveReplacement' },
          { id: 'sealant-repair', name: 'Sealant/grout repair', price: 15, i18nKey: 'service.sealantRepair' }
        ]
      },
      {
        id: 'pipes-maintenance',
        icon: '🔧',
        name: 'Pipes & Pressure',
        i18nKey: 'category.pipesPressure',
        services: [
          { id: 'pipe-leak-repair', name: 'Pipe leak repair', price: 25, i18nKey: 'service.pipeLeak' },
          { id: 'water-pressure', name: 'Water pressure diagnosis', price: 15, i18nKey: 'service.waterPressure' },
          { id: 'pipe-rerouting', name: 'Pipe rerouting', price: 80, fromPrice: true, i18nKey: 'service.pipeRerouting' }
        ]
      },
      {
        id: 'drains-maintenance',
        icon: '🪠',
        name: 'Drains',
        i18nKey: 'category.drainsMaintenance',
        services: [
          { id: 'drain-cleaning', name: 'Drain cleaning', price: 25, i18nKey: 'service.drainCleaning' },
          { id: 'drain-camera', name: 'Drain camera inspection', price: 35, i18nKey: 'service.drainCamera' },
          { id: 'blocked-drain-clear', name: 'Blocked drain clearing', price: 30, i18nKey: 'service.blockedDrain' }
        ]
      },
      {
        id: 'heating-maintenance',
        icon: '♨️',
        name: 'Heating & Boilers',
        i18nKey: 'category.heatingBoilers',
        services: [
          { id: 'boiler-service', name: 'Boiler servicing', price: 35, i18nKey: 'service.boilerService' },
          { id: 'radiator-repair', name: 'Radiator repair/bleeding', price: 15, i18nKey: 'service.radiatorRepair' },
          { id: 'underfloor', name: 'Underfloor heating service', price: 60, fromPrice: true, i18nKey: 'service.underfloor' }
        ]
      }
    ]
  },
  installation: {
    categories: [
      {
        id: 'bathroom',
        icon: '🛁',
        name: 'Bathroom',
        i18nKey: 'category.bathroom',
        services: [
          { id: 'tap-install', name: 'Tap/faucet installation', price: 20, i18nKey: 'service.tapInstall' },
          { id: 'toilet-install', name: 'Toilet installation', price: 35, i18nKey: 'service.toiletInstall' },
          { id: 'sink-install', name: 'Sink installation', price: 30, i18nKey: 'service.sinkInstall' },
          { id: 'shower-install', name: 'Shower installation', price: 50, i18nKey: 'service.showerInstall' },
          { id: 'bathtub-install', name: 'Bathtub installation', price: 70, i18nKey: 'service.bathtubInstall' },
          { id: 'full-bathroom', name: 'Full bathroom installation', price: 300, fromPrice: true, i18nKey: 'service.fullBathroom' }
        ]
      },
      {
        id: 'kitchen',
        icon: '🍳',
        name: 'Kitchen',
        i18nKey: 'category.kitchen',
        services: [
          { id: 'kitchen-plumbing', name: 'Kitchen plumbing installation', price: 150, fromPrice: true, i18nKey: 'service.kitchenPlumbing' },
          { id: 'dishwasher-connect', name: 'Dishwasher connection', price: 20, i18nKey: 'service.dishwasherConnect' },
          { id: 'sink-kitchen', name: 'Kitchen sink installation', price: 30, i18nKey: 'service.sinkInstall' }
        ]
      },
      {
        id: 'laundry',
        icon: '🧺',
        name: 'Laundry',
        i18nKey: 'category.laundry',
        services: [
          { id: 'washing-machine', name: 'Washing machine connection', price: 20, i18nKey: 'service.washingMachine' }
        ]
      },
      {
        id: 'heating-install',
        icon: '🌡️',
        name: 'Heating',
        i18nKey: 'category.heatingInstall',
        services: [
          { id: 'water-heater', name: 'Water heater installation', price: 80, i18nKey: 'service.waterHeater' },
          { id: 'radiator-install', name: 'Radiator installation', price: 40, i18nKey: 'service.radiatorInstall' },
          { id: 'thermostat', name: 'Thermostat installation', price: 25, i18nKey: 'service.thermostat' },
          { id: 'boiler-install', name: 'Boiler installation', price: 150, fromPrice: true, i18nKey: 'service.boilerInstall' }
        ]
      },
      {
        id: 'outdoor',
        icon: '🌳',
        name: 'Outdoor',
        i18nKey: 'category.outdoor',
        services: [
          { id: 'garden-tap', name: 'Garden tap installation', price: 25, i18nKey: 'service.gardenTap' },
          { id: 'irrigation', name: 'Irrigation system setup', price: 100, fromPrice: true, i18nKey: 'service.irrigation' },
          { id: 'external-pipe', name: 'External pipe repair', price: 35, i18nKey: 'service.externalPipe' },
          { id: 'water-meter', name: 'Water meter issues', price: 25, i18nKey: 'service.waterMeter' }
        ]
      }
    ]
  }
};

// State
let currentStep = 1;
let selectedNeed = null;
let selectedCategory = null;
let selectedServices = [];
let urgencyFee = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initWizard();
  setMinDate();
});

function initWizard() {
  // Step 1: Need selection
  document.querySelectorAll('.need-option').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedNeed = btn.dataset.need;
      goToStep(2);
      renderCategories();
    });
  });

  // Back buttons
  document.getElementById('back-to-step-1')?.addEventListener('click', () => goToStep(1));
  document.getElementById('back-to-step-2')?.addEventListener('click', () => goToStep(2));
  document.getElementById('back-to-step-3')?.addEventListener('click', () => goToStep(3));

  // Continue to details
  document.getElementById('continue-to-details')?.addEventListener('click', () => goToStep(4));

  // Urgency change
  document.querySelectorAll('input[name="urgency"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      switch (e.target.value) {
        case 'sameday': urgencyFee = 15; break;
        case 'emergency': urgencyFee = 25; break;
        default: urgencyFee = 0;
      }
      updateFinalPrice();
    });
  });

  // Form submission
  document.getElementById('booking-form')?.addEventListener('submit', handleSubmit);
}

function goToStep(step) {
  currentStep = step;

  // Hide all steps
  document.querySelectorAll('.wizard-step').forEach(s => s.classList.add('hidden'));

  // Show current step
  document.getElementById(`step-${step}`)?.classList.remove('hidden');

  // Update progress
  document.getElementById('current-step').textContent = step;
  document.getElementById('progress-bar').style.width = `${step * 25}%`;

  // Scroll to top of wizard
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCategories() {
  const container = document.getElementById('category-options');
  const categories = serviceData[selectedNeed]?.categories || [];

  container.innerHTML = categories.map(cat => `
    <button type="button" class="category-option group p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-center" data-category="${cat.id}">
      <div class="text-3xl mb-2">${cat.icon}</div>
      <div class="font-medium text-gray-900 text-sm" data-i18n="${cat.i18nKey}">${cat.name}</div>
    </button>
  `).join('');

  // Add click handlers
  container.querySelectorAll('.category-option').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      goToStep(3);
      renderServices();
    });
  });

  // Re-apply translations
  if (window.i18n) window.i18n.applyTranslations();
}

function renderServices() {
  const container = document.getElementById('service-options');
  const categories = serviceData[selectedNeed]?.categories || [];
  const category = categories.find(c => c.id === selectedCategory);

  if (!category) return;

  // Update title
  document.getElementById('step-3-title').textContent = category.name;

  // Clear previous selections
  selectedServices = [];

  container.innerHTML = category.services.map(service => `
    <label class="service-option flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary-300 transition-all">
      <input type="checkbox" class="sr-only" data-service-id="${service.id}">
      <div class="w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center mr-4 transition-colors checkbox-visual">
        <svg class="w-4 h-4 text-white hidden check-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <div class="flex-1">
        <div class="font-medium text-gray-900" data-i18n="${service.i18nKey}">${service.name}</div>
      </div>
      <div class="font-semibold text-primary-800">
        ${service.fromPrice ? '<span class="text-xs text-gray-500">from </span>' : ''}€${service.price}
      </div>
    </label>
  `).join('');

  // Add click handlers
  container.querySelectorAll('.service-option').forEach(label => {
    label.addEventListener('click', (e) => {
      e.preventDefault();
      const checkbox = label.querySelector('input[type="checkbox"]');
      const checkboxVisual = label.querySelector('.checkbox-visual');
      const checkIcon = label.querySelector('.check-icon');
      const serviceId = checkbox.dataset.serviceId;

      checkbox.checked = !checkbox.checked;

      if (checkbox.checked) {
        label.classList.add('border-primary-500', 'bg-primary-50');
        checkboxVisual.classList.remove('border-gray-300');
        checkboxVisual.classList.add('border-primary-500', 'bg-primary-500');
        checkIcon.classList.remove('hidden');

        const service = category.services.find(s => s.id === serviceId);
        if (service) selectedServices.push(service);
      } else {
        label.classList.remove('border-primary-500', 'bg-primary-50');
        checkboxVisual.classList.add('border-gray-300');
        checkboxVisual.classList.remove('border-primary-500', 'bg-primary-500');
        checkIcon.classList.add('hidden');

        selectedServices = selectedServices.filter(s => s.id !== serviceId);
      }

      updatePriceSummary();
    });
  });

  // Reset price summary
  updatePriceSummary();

  // Re-apply translations
  if (window.i18n) window.i18n.applyTranslations();
}

function updatePriceSummary() {
  const summary = document.getElementById('price-summary');
  const continueBtn = document.getElementById('continue-to-details');
  const countEl = document.getElementById('services-count');
  const totalEl = document.getElementById('total-price');
  const depositEl = document.getElementById('deposit-price');

  if (selectedServices.length === 0) {
    summary.classList.add('hidden');
    continueBtn.disabled = true;
    return;
  }

  summary.classList.remove('hidden');
  continueBtn.disabled = false;

  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const deposit = Math.round(total * 0.30);

  countEl.textContent = selectedServices.length;
  totalEl.textContent = `€${total}`;
  depositEl.textContent = `€${deposit}`;
}

function updateFinalPrice() {
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0) + urgencyFee;
  const deposit = Math.round(total * 0.30);

  document.getElementById('final-total').textContent = `€${total}`;
  document.getElementById('final-deposit').textContent = `€${deposit}`;
  document.getElementById('submit-price').textContent = `€${deposit}`;
}

function setMinDate() {
  const dateInput = document.getElementById('appointment-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }
}

async function handleSubmit(e) {
  e.preventDefault();

  if (selectedServices.length === 0) {
    alert('Please select at least one service');
    return;
  }

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner mr-2"></span>Processing...';

  const total = selectedServices.reduce((sum, s) => sum + s.price, 0) + urgencyFee;

  const bookingData = {
    services: selectedServices,
    totalAmount: total,
    depositAmount: Math.round(total * 0.30 * 100), // cents
    customerName: document.getElementById('customer-name').value,
    customerEmail: document.getElementById('customer-email').value,
    customerPhone: document.getElementById('customer-phone').value,
    serviceAddress: `${document.getElementById('address').value}, ${document.getElementById('city').value}, ${document.getElementById('postal-code').value}`,
    appointmentDate: document.getElementById('appointment-date').value,
    appointmentTime: document.getElementById('appointment-time').value,
    urgency: document.querySelector('input[name="urgency"]:checked').value,
    problemDescription: document.getElementById('problem-description')?.value || '',
    language: window.i18n?.currentLocale || 'en',
    needType: selectedNeed,
    category: selectedCategory
  };

  try {
    await window.stripeCheckout.createCheckoutSession(bookingData);
  } catch (error) {
    console.error('Checkout error:', error);
    alert('An error occurred. Please try again or call us directly at +371 22532304');
    submitBtn.disabled = false;
    const deposit = Math.round(total * 0.30);
    submitBtn.innerHTML = `<svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg><span>Pay Deposit</span><span class="ml-1">€${deposit}</span>`;
  }
}

// Mapbox configuration
const MAPBOX_TOKEN = 'pk.eyJ1IjoibGFub3Nsb2dpYyIsImEiOiJjbGY0dHhpazcwMnU5NDRxam5iaGNhMHQzIn0.v51zfyuwF7UrT-E2_w_t5w';
let map = null;
let marker = null;
let geocoder = null;
let mapInitialized = false;

function initMapbox() {
  if (mapInitialized) return;

  mapboxgl.accessToken = MAPBOX_TOKEN;

  // Initialize map centered on Riga
  map = new mapboxgl.Map({
    container: 'address-map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [24.1052, 56.9496], // Riga coordinates
    zoom: 12
  });

  // Add marker
  marker = new mapboxgl.Marker({ color: '#1e40af' })
    .setLngLat([24.1052, 56.9496])
    .addTo(map);

  // Initialize geocoder
  geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Enter your address...',
    countries: 'lv',
    proximity: { longitude: 24.1052, latitude: 56.9496 },
    language: window.i18n?.currentLocale || 'en',
    marker: false
  });

  // Add geocoder to container
  const geocoderContainer = document.getElementById('geocoder-container');
  geocoderContainer.innerHTML = '';
  geocoderContainer.appendChild(geocoder.onAdd(map));

  // Handle result selection
  geocoder.on('result', (e) => {
    const coords = e.result.center;
    const place = e.result;

    // Update hidden fields
    document.getElementById('address').value = place.place_name;
    document.getElementById('address-lat').value = coords[1];
    document.getElementById('address-lng').value = coords[0];

    // Update city and postal code if available
    if (place.context) {
      place.context.forEach(ctx => {
        if (ctx.id.startsWith('place')) {
          document.getElementById('city').value = ctx.text;
        }
        if (ctx.id.startsWith('postcode')) {
          document.getElementById('postal-code').value = ctx.text;
        }
      });
    }

    // Update marker and map
    marker.setLngLat(coords);
    map.flyTo({ center: coords, zoom: 15 });
  });

  // Handle clearing
  geocoder.on('clear', () => {
    document.getElementById('address').value = '';
    document.getElementById('address-lat').value = '';
    document.getElementById('address-lng').value = '';
  });

  mapInitialized = true;
}

// Update final price when entering step 4
const origGoToStep = goToStep;
goToStep = function(step) {
  origGoToStep(step);
  if (step === 4) {
    updateFinalPrice();
    // Initialize Mapbox with a small delay to ensure container is visible
    setTimeout(() => {
      initMapbox();
      if (map) map.resize();
    }, 100);
  }
};
