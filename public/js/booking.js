// Booking form and service selection logic

// Services data with pricing
const servicesData = {
  emergency: [
    { id: 'burst-pipe', name: 'Burst pipe repair', price: 45, i18nKey: 'services.emergency.burstPipe' },
    { id: 'emergency-leak', name: 'Emergency leak repair', price: 40, i18nKey: 'services.emergency.emergencyLeak' },
    { id: 'blocked-toilet', name: 'Blocked toilet clearing', price: 30, i18nKey: 'services.emergency.blockedToilet' },
    { id: 'flooding', name: 'Flooding assistance', price: 55, i18nKey: 'services.emergency.flooding' },
    { id: 'gas-leak', name: 'Gas leak detection', price: 35, i18nKey: 'services.emergency.gasLeak' }
  ],
  repairs: [
    { id: 'tap-repair', name: 'Tap/faucet repair', price: 15, i18nKey: 'services.repairs.tapRepair' },
    { id: 'toilet-repair', name: 'Toilet repair', price: 20, i18nKey: 'services.repairs.toiletRepair' },
    { id: 'pipe-leak', name: 'Pipe leak repair', price: 25, i18nKey: 'services.repairs.pipeLeak' },
    { id: 'cistern-repair', name: 'Cistern repair', price: 20, i18nKey: 'services.repairs.cisternRepair' },
    { id: 'water-pressure', name: 'Water pressure diagnosis', price: 15, i18nKey: 'services.repairs.waterPressure' },
    { id: 'valve-replacement', name: 'Valve replacement', price: 20, i18nKey: 'services.repairs.valveReplacement' },
    { id: 'sealant-repair', name: 'Sealant/grout repair', price: 15, i18nKey: 'services.repairs.sealantRepair' }
  ],
  drain: [
    { id: 'blocked-drain', name: 'Blocked drain clearing', price: 30, i18nKey: 'services.drain.blockedDrain' },
    { id: 'drain-camera', name: 'Drain camera inspection', price: 35, i18nKey: 'services.drain.drainCamera' },
    { id: 'drain-cleaning', name: 'Drain cleaning', price: 25, i18nKey: 'services.drain.drainCleaning' },
    { id: 'sewage-line', name: 'Sewage line repair', price: 70, i18nKey: 'services.drain.sewageLine' },
    { id: 'drain-install', name: 'Drain installation', price: 55, i18nKey: 'services.drain.drainInstall' }
  ],
  installation: [
    { id: 'tap-install', name: 'Tap/faucet installation', price: 20, i18nKey: 'services.installation.tapInstall' },
    { id: 'toilet-install', name: 'Toilet installation', price: 35, i18nKey: 'services.installation.toiletInstall' },
    { id: 'sink-install', name: 'Sink installation', price: 30, i18nKey: 'services.installation.sinkInstall' },
    { id: 'shower-install', name: 'Shower installation', price: 50, i18nKey: 'services.installation.showerInstall' },
    { id: 'bathtub-install', name: 'Bathtub installation', price: 70, i18nKey: 'services.installation.bathtubInstall' },
    { id: 'dishwasher-connect', name: 'Dishwasher connection', price: 20, i18nKey: 'services.installation.dishwasherConnect' },
    { id: 'washing-machine', name: 'Washing machine connection', price: 20, i18nKey: 'services.installation.washingMachine' },
    { id: 'water-heater', name: 'Water heater installation', price: 80, i18nKey: 'services.installation.waterHeater' },
    { id: 'radiator-install', name: 'Radiator installation', price: 40, i18nKey: 'services.installation.radiatorInstall' }
  ],
  heating: [
    { id: 'boiler-repair', name: 'Boiler repair', price: 50, fromPrice: true, i18nKey: 'services.heating.boilerRepair' },
    { id: 'boiler-service', name: 'Boiler servicing', price: 35, i18nKey: 'services.heating.boilerService' },
    { id: 'boiler-install', name: 'Boiler installation', price: 150, fromPrice: true, i18nKey: 'services.heating.boilerInstall' },
    { id: 'radiator-repair', name: 'Radiator repair/bleeding', price: 15, i18nKey: 'services.heating.radiatorRepair' },
    { id: 'underfloor', name: 'Underfloor heating service', price: 60, fromPrice: true, i18nKey: 'services.heating.underfloor' },
    { id: 'thermostat', name: 'Thermostat installation', price: 25, i18nKey: 'services.heating.thermostat' }
  ],
  bathroom: [
    { id: 'full-bathroom', name: 'Full bathroom installation', price: 300, fromPrice: true, i18nKey: 'services.bathroom.fullBathroom' },
    { id: 'kitchen-plumbing', name: 'Kitchen plumbing installation', price: 150, fromPrice: true, i18nKey: 'services.bathroom.kitchenPlumbing' },
    { id: 'fixture-upgrades', name: 'Fixture upgrades', price: 40, fromPrice: true, i18nKey: 'services.bathroom.fixtureUpgrades' },
    { id: 'pipe-rerouting', name: 'Pipe rerouting', price: 80, fromPrice: true, i18nKey: 'services.bathroom.pipeRerouting' }
  ],
  outdoor: [
    { id: 'garden-tap', name: 'Garden tap installation', price: 25, i18nKey: 'services.outdoor.gardenTap' },
    { id: 'irrigation', name: 'Irrigation system setup', price: 100, fromPrice: true, i18nKey: 'services.outdoor.irrigation' },
    { id: 'external-pipe', name: 'External pipe repair', price: 35, i18nKey: 'services.outdoor.externalPipe' },
    { id: 'water-meter', name: 'Water meter issues', price: 25, i18nKey: 'services.outdoor.waterMeter' }
  ]
};

// Selected services state
let selectedServices = [];
let urgencyFee = 0;
let timeFee = 0;

// Initialize booking functionality
document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  initFormHandlers();
  initPhotoUpload();
  setMinDate();
});

// Render all service cards
function renderServices() {
  const containers = {
    emergency: document.getElementById('emergency-services'),
    repairs: document.getElementById('repair-services'),
    drain: document.getElementById('drain-services'),
    installation: document.getElementById('installation-services'),
    heating: document.getElementById('heating-services'),
    bathroom: document.getElementById('bathroom-services'),
    outdoor: document.getElementById('outdoor-services')
  };

  for (const [category, services] of Object.entries(servicesData)) {
    const container = containers[category];
    if (!container) continue;

    services.forEach(service => {
      const card = createServiceCard(service);
      container.appendChild(card);
    });
  }
}

// Create a service card element
function createServiceCard(service) {
  const card = document.createElement('div');
  card.className = 'service-card p-4 flex items-center justify-between';
  card.dataset.serviceId = service.id;

  const priceText = service.fromPrice
    ? `<span data-i18n="services.from">from</span> €${service.price}`
    : `€${service.price}`;

  card.innerHTML = `
    <div class="flex items-center space-x-3">
      <div class="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center transition-colors service-checkbox">
        <svg class="w-3 h-3 text-white hidden check-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <span class="font-medium text-gray-800" data-i18n="${service.i18nKey}">${service.name}</span>
    </div>
    <span class="font-semibold text-primary-800">${priceText}</span>
  `;

  card.addEventListener('click', () => toggleService(service, card));

  return card;
}

// Toggle service selection
function toggleService(service, card) {
  const checkbox = card.querySelector('.service-checkbox');
  const checkIcon = card.querySelector('.check-icon');

  const index = selectedServices.findIndex(s => s.id === service.id);

  if (index === -1) {
    // Add service
    selectedServices.push(service);
    card.classList.add('selected');
    checkbox.classList.remove('border-gray-300');
    checkbox.classList.add('border-primary-500', 'bg-primary-500');
    checkIcon.classList.remove('hidden');
  } else {
    // Remove service
    selectedServices.splice(index, 1);
    card.classList.remove('selected');
    checkbox.classList.add('border-gray-300');
    checkbox.classList.remove('border-primary-500', 'bg-primary-500');
    checkIcon.classList.add('hidden');
  }

  updatePriceSummary();
}

// Initialize form handlers
function initFormHandlers() {
  // Urgency change
  document.querySelectorAll('input[name="urgency"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      switch (e.target.value) {
        case 'sameday':
          urgencyFee = 15;
          break;
        case 'emergency':
          urgencyFee = 25;
          break;
        default:
          urgencyFee = 0;
      }
      updatePriceSummary();
    });
  });

  // Time change
  const timeSelect = document.getElementById('appointment-time');
  if (timeSelect) {
    timeSelect.addEventListener('change', (e) => {
      timeFee = e.target.value === '18:00-20:00' ? 10 : 0;
      updatePriceSummary();
    });
  }

  // Form submission
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

// Update price summary
function updatePriceSummary() {
  const selectedSection = document.getElementById('selected-services-section');
  const selectedList = document.getElementById('selected-services-list');
  const totalPriceEl = document.getElementById('total-price');
  const depositPriceEl = document.getElementById('deposit-price');
  const submitBtn = document.getElementById('submit-btn');
  const submitPrice = document.getElementById('submit-price');

  if (selectedServices.length === 0) {
    selectedSection.classList.add('hidden');
    submitBtn.disabled = true;
    return;
  }

  selectedSection.classList.remove('hidden');
  submitBtn.disabled = false;

  // Build selected services list
  selectedList.innerHTML = selectedServices.map(s => `
    <div class="flex justify-between items-center py-2">
      <span class="text-gray-700" data-i18n="${s.i18nKey}">${s.name}</span>
      <span class="font-medium text-gray-900">${s.fromPrice ? 'from ' : ''}€${s.price}</span>
    </div>
  `).join('');

  // Add urgency fee if applicable
  if (urgencyFee > 0) {
    const urgencyLabel = urgencyFee === 25 ? 'Emergency fee (24/7)' : 'Same-day service fee';
    selectedList.innerHTML += `
      <div class="flex justify-between items-center py-2 text-accent-600">
        <span>${urgencyLabel}</span>
        <span class="font-medium">+€${urgencyFee}</span>
      </div>
    `;
  }

  // Add time fee if applicable
  if (timeFee > 0) {
    selectedList.innerHTML += `
      <div class="flex justify-between items-center py-2 text-accent-600">
        <span>Evening appointment (18:00-20:00)</span>
        <span class="font-medium">+€${timeFee}</span>
      </div>
    `;
  }

  // Calculate totals
  const servicesTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const total = servicesTotal + urgencyFee + timeFee;
  const deposit = Math.round(total * 0.30);

  // Update displays
  totalPriceEl.textContent = `€${total}`;
  totalPriceEl.classList.add('price-update');
  setTimeout(() => totalPriceEl.classList.remove('price-update'), 300);

  depositPriceEl.textContent = `€${deposit}`;
  submitPrice.textContent = `€${deposit}`;

  // Re-apply translations
  if (window.i18n && window.i18n.currentLocale !== 'en') {
    window.i18n.applyTranslations();
  }
}

// Initialize photo upload
function initPhotoUpload() {
  const uploadArea = document.getElementById('photo-upload-area');
  const photoInput = document.getElementById('photo-input');
  const photoPreview = document.getElementById('photo-preview');

  if (!uploadArea || !photoInput) return;

  uploadArea.addEventListener('click', () => photoInput.click());

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('border-primary-500', 'bg-primary-50');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('border-primary-500', 'bg-primary-50');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('border-primary-500', 'bg-primary-50');

    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  });

  photoInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  });
}

// Handle file uploads
const uploadedFiles = [];

function handleFiles(files) {
  const photoPreview = document.getElementById('photo-preview');

  for (const file of files) {
    if (uploadedFiles.length >= 5) {
      alert('Maximum 5 photos allowed');
      break;
    }

    if (!file.type.startsWith('image/')) continue;

    uploadedFiles.push(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = document.createElement('div');
      preview.className = 'relative';
      preview.innerHTML = `
        <img src="${e.target.result}" class="w-full h-20 object-cover rounded-lg">
        <button type="button" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600" onclick="removePhoto(${uploadedFiles.length - 1})">×</button>
      `;
      photoPreview.appendChild(preview);
    };
    reader.readAsDataURL(file);
  }
}

function removePhoto(index) {
  uploadedFiles.splice(index, 1);
  const photoPreview = document.getElementById('photo-preview');
  photoPreview.children[index].remove();
}

window.removePhoto = removePhoto;

// Set minimum date to today
function setMinDate() {
  const dateInput = document.getElementById('appointment-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }
}

// Handle form submission
async function handleFormSubmit(e) {
  e.preventDefault();

  if (selectedServices.length === 0) {
    alert('Please select at least one service');
    return;
  }

  const form = e.target;
  const submitBtn = document.getElementById('submit-btn');

  // Validate required fields
  const requiredFields = ['customer-name', 'customer-email', 'customer-phone', 'property-type', 'street-address', 'city', 'postal-code', 'appointment-date', 'appointment-time'];
  let isValid = true;

  for (const fieldId of requiredFields) {
    const field = document.getElementById(fieldId);
    if (!field || !field.value.trim()) {
      field?.classList.add('border-red-500');
      isValid = false;
    } else {
      field.classList.remove('border-red-500');
    }
  }

  if (!isValid) {
    alert('Please fill in all required fields');
    return;
  }

  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner mr-2"></span>Processing...';

  // Build form data
  const servicesTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const total = servicesTotal + urgencyFee + timeFee;

  const bookingData = {
    services: selectedServices,
    totalAmount: total,
    depositAmount: Math.round(total * 0.30 * 100), // in cents for Stripe
    customerName: document.getElementById('customer-name').value,
    customerEmail: document.getElementById('customer-email').value,
    customerPhone: document.getElementById('customer-phone').value,
    propertyType: document.getElementById('property-type').value,
    serviceAddress: `${document.getElementById('street-address').value}, ${document.getElementById('city').value}, ${document.getElementById('postal-code').value}`,
    appointmentDate: document.getElementById('appointment-date').value,
    appointmentTime: document.getElementById('appointment-time').value,
    urgency: document.querySelector('input[name="urgency"]:checked').value,
    problemDescription: document.getElementById('problem-description').value || '',
    language: window.i18n?.currentLocale || 'en'
  };

  // Call Stripe checkout
  try {
    await window.stripeCheckout.createCheckoutSession(bookingData);
  } catch (error) {
    console.error('Checkout error:', error);
    alert('An error occurred. Please try again or call us directly.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span data-i18n="booking.payDeposit">Pay Deposit & Book</span><span id="submit-price" class="ml-2 font-bold">€${Math.round(total * 0.30)}</span>`;
  }
}

// Export for use in other modules
window.bookingState = {
  get selectedServices() { return selectedServices; },
  get urgencyFee() { return urgencyFee; },
  get timeFee() { return timeFee; }
};
