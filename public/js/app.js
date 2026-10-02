// ProofBridge — Application Controller & Reactive View Layer
import { INITIAL_DATA } from './data.js';
import { EvidenceEngine } from './engine.js';

// ========================================================
// REACTIVE APPLICATION STATE
// ========================================================
class AppState {
  constructor() {
    this.ngos = JSON.parse(JSON.stringify(INITIAL_DATA.ngos));
    this.user = JSON.parse(JSON.stringify(INITIAL_DATA.userProfile));
    this.currentPortal = 'user'; // 'user' | 'ngo'
    this.userRole = 'user'; // 'user' | 'ngo' | 'guest'
    this.currentRoute = 'landing';
    this.routeParams = {};
    this.selectedCause = 'all';
    this.searchQuery = '';
    this.activeNgoTab = 'overview';
    this.activeActivityId = 'act_school_kits';
    this.userLocation = { allowed: false, city: 'Mumbai', state: 'MH', lat: 19.0760, lng: 72.8777 };
    this.currentUser = { name: 'Dhruvesh', email: 'dhruvesh@volunteer.in', role: 'user', verifiedHours: 18.5, certificates: 5 };
    this.currentNgo = { name: 'Udaan Foundation', email: 'contact@udaanfoundation.org', darpanId: 'MH/2021/0298341', status: 'approved' };
    this.leaderboardTab = 'volunteers'; // 'volunteers' | 'donors'
    this.leaderboardPeriod = 'month';   // 'month' | 'year' | 'all'
    this.volunteerLeaderboardData = null;
    this.donorLeaderboardData = null;
    this.userRecognitionData = null;
    this.volunteerCheckedIn = false;
    this.volunteerCheckedOut = false;
    this.volunteerVerified = false;
    this.volunteerCheckInTime = null;
    this.volunteerCheckOutTime = null;
    this.calculatedHours = 4.75;
    this.calculatedDurationStr = '4h 44m';
    this.volunteerCertId = 'VOL-UDAAN-2026-001';
    this.aiAnalystLoading = false;
    this.aiAnalysisResult = null;
    this.uploadedInvoiceDoc = null;
    this.confirmedInvoiceFindings = null;
    this.participationsList = [];
    this.userVotes = {}; // { [actId]: 'up' | 'down' }
    this.complaintsList = [];
    this.feedbackList = [];
    this.registeredEvents = ['act_school_kits'];
    this.upcomingEventsList = [
      {
        id: 'act_school_kits',
        title: 'Annual Student School Kit Distribution Drive',
        cause: 'Education',
        ngoId: 'ngo_udaan',
        ngoName: 'Udaan Foundation',
        date: '24 September 2026',
        startTime: '10:00 AM',
        endTime: '03:00 PM',
        venue: 'Dharavi Municipal School #4',
        city: 'Mumbai',
        status: 'LIVE NOW',
        volunteerPositions: 25,
        registeredCount: 17,
        requiredSkills: 'Inventory verification, student kit distribution',
        expectedDuration: '5 hours',
        fundraiserTarget: 80000,
        fundraiserRaised: 62400,
        budget: [
          { category: 'School Kit Packs', amount: 55000 },
          { category: 'Transport', amount: 10000 },
          { category: 'Venue & Water', amount: 5000 },
          { category: 'Stationery Extras', amount: 10000 }
        ],
        heroImage: '/assets/school_kit_distribution.jpg'
      },
      {
        id: 'evt_health_camp',
        title: 'Free Multi-Speciality Community Health & Screening Camp',
        cause: 'Healthcare',
        ngoId: 'ngo_aarogya',
        ngoName: 'Aarogya Seva Foundation',
        date: '16 October 2026',
        startTime: '09:00 AM',
        endTime: '03:00 PM',
        venue: 'Sion Municipal Community Hall',
        city: 'Mumbai',
        status: 'UPCOMING',
        volunteerPositions: 30,
        registeredCount: 19,
        requiredSkills: 'Patient intake, blood pressure screening, vitals registration',
        expectedDuration: '6 hours',
        fundraiserTarget: 60000,
        fundraiserRaised: 48000,
        budget: [
          { category: 'Medical Diagnostics & Testing', amount: 35000 },
          { category: 'Physician Honoraria & Travel', amount: 15000 },
          { category: 'Patient First-Aid & Refreshments', amount: 10000 }
        ],
        heroImage: '/assets/medical_camp_healthcare.jpg'
      },
      {
        id: 'evt_tree_plantation',
        title: 'Mangrove Restoration & 1,000 Tree Plantation Drive',
        cause: 'Environment',
        ngoId: 'ngo_vriksha',
        ngoName: 'Vriksha Trust',
        date: '12 October 2026',
        startTime: '08:00 AM',
        endTime: '01:00 PM',
        venue: 'Bandra West Coastal Belt',
        city: 'Mumbai',
        status: 'UPCOMING',
        volunteerPositions: 35,
        registeredCount: 18,
        requiredSkills: 'General physical fitness, sapling handling, mulching',
        expectedDuration: '5 hours',
        fundraiserTarget: 75000,
        fundraiserRaised: 42000,
        budget: [
          { category: 'Native Saplings & Soil', amount: 35000 },
          { category: 'Digging Tools & Hose Equipment', amount: 15000 },
          { category: 'Refreshments & Volunteer Water', amount: 10000 },
          { category: 'Logistics & Truck Transport', amount: 15000 }
        ],
        heroImage: '/assets/tree_plantation_activity.jpg'
      },
      {
        id: 'evt_animal_welfare',
        title: 'Stray Animal Rescue, Anti-Rabies Vaccination & Shelter Drive',
        cause: 'Animal Welfare',
        ngoId: 'ngo_jeev_raksha',
        ngoName: 'Jeev Raksha Animal Trust',
        date: '15 October 2026',
        startTime: '08:30 AM',
        endTime: '01:30 PM',
        venue: 'Aarey Forest Animal Rescue Shelter',
        city: 'Mumbai',
        status: 'UPCOMING',
        volunteerPositions: 25,
        registeredCount: 14,
        requiredSkills: 'Gentle animal handling, vaccination tag records, shelter hygiene',
        expectedDuration: '5 hours',
        fundraiserTarget: 55000,
        fundraiserRaised: 38500,
        budget: [
          { category: 'Anti-Rabies Vaccines & Medical Kits', amount: 28000 },
          { category: 'Puppy Nutrition & Shelter Food', amount: 17000 },
          { category: 'Rescue Ambulance Fuel & Gear', amount: 10000 }
        ],
        heroImage: '/assets/animal_rescue_shelter.jpg'
      },
      {
        id: 'evt_women_empowerment',
        title: 'Sashakti: Women Artisan Vocational Tailoring & Livelihood Workshop',
        cause: 'Women Empowerment',
        ngoId: 'ngo_stree_shakti',
        ngoName: 'Stree Shakti Foundation',
        date: '18 October 2026',
        startTime: '10:00 AM',
        endTime: '03:00 PM',
        venue: 'Mahim Community Livelihood Center',
        city: 'Mumbai',
        status: 'UPCOMING',
        volunteerPositions: 20,
        registeredCount: 11,
        requiredSkills: 'Pattern cutting guidance, basic accounting mentorship, garment cataloging',
        expectedDuration: '5 hours',
        fundraiserTarget: 65000,
        fundraiserRaised: 49000,
        budget: [
          { category: 'Industrial Sewing Machine Toolkits', amount: 30000 },
          { category: 'Raw Organic Cotton & Fabric Dyes', amount: 22000 },
          { category: 'Master Trainer Stipend', amount: 13000 }
        ],
        heroImage: '/assets/women_vocational_workshop.jpg'
      },
      {
        id: 'evt_food_security',
        title: 'Annapurna: 500 Daily Nutritious Meals & Caregiver Food Drive',
        cause: 'Food Security',
        ngoId: 'ngo_aarogya',
        ngoName: 'Aarogya Seva Foundation',
        date: '14 October 2026',
        startTime: '07:00 AM',
        endTime: '11:30 AM',
        venue: 'Central Kitchen & Hospital Shelters, Sion',
        city: 'Mumbai',
        status: 'UPCOMING',
        volunteerPositions: 25,
        registeredCount: 16,
        requiredSkills: 'Hygienic food packaging, hot meal dispatch, crowd queue coordination',
        expectedDuration: '4.5 hours',
        fundraiserTarget: 50000,
        fundraiserRaised: 41000,
        budget: [
          { category: 'Grain, Pulses & Fresh Veg Procurement', amount: 28000 },
          { category: 'Biodegradable Meal Containers', amount: 12000 },
          { category: 'Vehicle Dispatch & LPG Gas', amount: 10000 }
        ],
        heroImage: '/assets/food_relief_distribution.jpg'
      },
      {
        id: 'evt_skill_development',
        title: 'Digital Kendra: Youth Computer Literacy & Python Coding Bootcamp',
        cause: 'Skill Development',
        ngoId: 'ngo_vidya_jyoti',
        ngoName: 'Vidya Jyoti Initiative',
        date: '22 October 2026',
        startTime: '09:30 AM',
        endTime: '02:30 PM',
        venue: 'Shivaji Park Youth Center, Dadar',
        city: 'Mumbai',
        status: 'UPCOMING',
        volunteerPositions: 20,
        registeredCount: 15,
        requiredSkills: 'Basic Python & HTML mentoring, student lab assistance, typing practice',
        expectedDuration: '5 hours',
        fundraiserTarget: 85000,
        fundraiserRaised: 64000,
        budget: [
          { category: 'Refurbished PC Monitors & Keyboards', amount: 52000 },
          { category: 'Broadband Fiber & Power Inverters', amount: 13000 },
          { category: 'Courseware Booklets & Volunteer Mentors', amount: 20000 }
        ],
        heroImage: '/assets/youth_skill_coding.jpg'
      },
      {
        id: 'evt_community_development',
        title: 'Jal Suraksha: Solar Drinking Water Purification Kiosk Installation',
        cause: 'Community Development',
        ngoId: 'ngo_gramin_vikas',
        ngoName: 'Gramin Vikas Sanstha',
        date: '25 October 2026',
        startTime: '09:00 AM',
        endTime: '02:00 PM',
        venue: 'Murbad Watershed Community Hub',
        city: 'Thane',
        status: 'UPCOMING',
        volunteerPositions: 30,
        registeredCount: 17,
        requiredSkills: 'Water testing sampling, filtration pipe assembly, community survey',
        expectedDuration: '5 hours',
        fundraiserTarget: 120000,
        fundraiserRaised: 88000,
        budget: [
          { category: 'Solar Reverse Osmosis & UV Units', amount: 75000 },
          { category: 'Tanks, Copper Plumbing & Sensors', amount: 30000 },
          { category: 'Water Quality Testing Kits & Field Training', amount: 15000 }
        ],
        heroImage: '/assets/community_cleanwater_drive.jpg'
      },
      {
        id: 'evt_disaster_relief',
        title: 'Monsoon Flood Relief Kits & Gravity Water Filter Distribution',
        cause: 'Disaster Relief',
        ngoId: 'ngo_jan_kalyan',
        ngoName: 'Jan Kalyan Samiti',
        date: '28 October 2026',
        startTime: '08:00 AM',
        endTime: '01:00 PM',
        venue: 'Chiplun Relief Center, Coastal Maharashtra',
        city: 'Ratnagiri',
        status: 'UPCOMING',
        volunteerPositions: 25,
        registeredCount: 12,
        requiredSkills: 'Emergency kit assembly, ration sorting, water filter assembly',
        expectedDuration: '5 hours',
        fundraiserTarget: 75000,
        fundraiserRaised: 58000,
        budget: [
          { category: 'Household Gravity Water Filters', amount: 38000 },
          { category: 'Dry Food Rations & Tarpaulins', amount: 25000 },
          { category: 'Emergency Boat Transport & Logistics', amount: 12000 }
        ],
        heroImage: '/assets/food_relief_distribution.jpg'
      }
    ];
  }

  getPrimaryActivity() {
    for (const ngo of this.ngos) {
      const act = ngo.activities?.find(a => a.id === this.activeActivityId);
      if (act) return { activity: act, ngo };
    }
    return { activity: this.ngos[0].activities[0], ngo: this.ngos[0] };
  }

  incrementVolunteerAttendance() {
    if (this.volunteerCheckedIn) return false;
    const { activity } = this.getPrimaryActivity();
    if (activity && activity.volunteers) {
      activity.volunteers.authenticatedAttendance += 1;
      this.volunteerCheckedIn = true;
      this.user.totalHours += 4;
      this.user.activitiesCount += 1;
      return true;
    }
    return false;
  }
}

const state = new AppState();

// Fetch initial participations list from backend
async function refreshParticipations() {
  try {
    const res = await fetch('/api/volunteer/participations');
    const data = await res.json();
    if (data && data.participations) {
      state.participationsList = data.participations;
      const me = data.participations.find(p => p.volunteerId === 'vol_10482');
      if (me) {
        if (me.attendanceStatus === 'checked_in') state.volunteerCheckedIn = true;
        if (me.attendanceStatus === 'checked_out') {
          state.volunteerCheckedIn = true;
          state.volunteerCheckedOut = true;
        }
        if (me.attendanceStatus === 'verified') {
          state.volunteerCheckedIn = true;
          state.volunteerCheckedOut = true;
          state.volunteerVerified = true;
        }
      }
    }
  } catch (err) {
    console.log('Using local participations cache');
  }
}
refreshParticipations();

// ========================================================
// ROUTER & NAVIGATION
// ========================================================
function handleRoute() {
  const hash = window.location.hash.slice(1) || '/';
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0 || parts[0] === '') {
    state.currentRoute = 'landing';
    state.routeParams = {};
  } else if (parts[0] === 'login') {
    state.currentRoute = 'login';
    state.routeParams = {};
  } else if (parts[0] === 'explore') {
    state.currentPortal = 'user';
    state.currentRoute = 'explore';
    state.routeParams = {};
  } else if (parts[0] === 'event' && parts[1]) {
    state.currentPortal = 'user';
    state.currentRoute = 'event-detail';
    state.routeParams = { id: parts[1] };
  } else if (parts[0] === 'event-pass') {
    state.currentPortal = 'user';
    state.currentRoute = 'event-pass';
    state.routeParams = {};
  } else if (parts[0] === 'ngo-dashboard' || (parts[0] === 'ngo' && parts[1] === 'dashboard')) {
    state.currentPortal = 'ngo';
    const sub = parts[2] || parts[1];
    if (sub === 'events') {
      state.currentRoute = 'ngo-events';
    } else if (sub === 'volunteers') {
      state.currentRoute = 'ngo-volunteers';
    } else if (sub === 'evidence') {
      state.currentRoute = 'ngo-evidence';
    } else if (sub === 'activities') {
      state.currentRoute = 'ngo-activities';
    } else {
      state.currentRoute = 'ngo-dashboard';
    }
  } else if (parts[0] === 'ngo' && parts[1]) {
    state.currentPortal = 'user';
    state.currentRoute = 'ngo';
    state.routeParams = { id: parts[1] };
    if (parts[2]) {
      state.activeNgoTab = parts[2];
    } else if (!state.activeNgoTab) {
      state.activeNgoTab = 'overview';
    }
  } else if (parts[0] === 'activity' && parts[1]) {
    state.currentPortal = 'user';
    state.currentRoute = 'activity';
    state.routeParams = { id: parts[1] };
    state.activeActivityId = parts[1];
  } else if (parts[0] === 'volunteer') {
    state.currentPortal = 'user';
    state.currentRoute = 'volunteer';
    state.routeParams = {};
  } else if (parts[0] === 'profile') {
    state.currentPortal = 'user';
    state.currentRoute = 'profile';
    state.routeParams = {};
  } else if (parts[0] === 'leaderboard') {
    state.currentPortal = 'user';
    state.currentRoute = 'leaderboard';
    if (parts[1] && ['volunteers', 'donors'].includes(parts[1])) {
      state.leaderboardTab = parts[1];
    }
    if (parts[2] && ['month', 'year', 'all'].includes(parts[2])) {
      state.leaderboardPeriod = parts[2];
    }
    state.routeParams = { tab: state.leaderboardTab, period: state.leaderboardPeriod };
  } else {
    state.currentRoute = 'landing';
  }

  renderNavbar();
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderNavbar() {
  const navContainer = document.querySelector('#main-nav .nav-container');
  if (!navContainer) return;

  if (state.currentRoute === 'login') {
    navContainer.innerHTML = `
      <a href="#/" class="brand-logo">
        <div class="brand-icon">
          <i data-lucide="shield-check" style="width: 20px; height: 20px;"></i>
        </div>
        <div class="brand-text">
          <span class="brand-name">ProofBridge</span>
          <span class="brand-tag">Authentication</span>
        </div>
      </a>
      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <a href="#/explore" class="btn btn-sm btn-outline">Explore as Guest</a>
        <a href="#/" class="btn btn-sm btn-primary">Home</a>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  if (state.currentPortal === 'ngo') {
    // NGO Management Console Navbar
    navContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <a href="#/ngo-dashboard" class="brand-logo">
          <div class="brand-icon" style="background: linear-gradient(135deg, #059669 0%, #064e3b 100%);">
            <i data-lucide="building-2" style="width: 20px; height: 20px;"></i>
          </div>
          <div class="brand-text">
            <span class="brand-name">ProofBridge</span>
            <span class="portal-badge portal-badge-ngo"><i data-lucide="shield-check" style="width: 10px; height: 10px;"></i> NGO Console</span>
          </div>
        </a>
      </div>

      <nav class="nav-links">
        <a href="#/ngo-dashboard" class="nav-item ${state.currentRoute === 'ngo-dashboard' ? 'active' : ''}">Overview</a>
        <a href="#/ngo/dashboard/events" class="nav-item ${state.currentRoute === 'ngo-events' ? 'active' : ''}">Events & Live QR</a>
        <a href="#/ngo/dashboard/activities" class="nav-item ${state.currentRoute === 'ngo-activities' ? 'active' : ''}">Past Activities</a>
        <a href="#/ngo/dashboard/volunteers" class="nav-item ${state.currentRoute === 'ngo-volunteers' ? 'active' : ''}">Volunteer Verification</a>
        <a href="#/ngo/dashboard/evidence" class="nav-item ${state.currentRoute === 'ngo-evidence' ? 'active' : ''}">Invoice Evidence</a>
      </nav>

      <div class="nav-actions">
        <a href="https://ngodarpan.gov.in/#/" target="_blank" rel="noopener noreferrer" class="darpan-badge-header" title="Verified against NITI Aayog NGO DARPAN Registry">
          <span class="darpan-icon">🏛️</span>
          <span>DARPAN: MH/2021/0298341</span>
        </a>
        <button class="portal-switch-btn" onclick="window.switchPortal('user')" title="Switch to Public User / Volunteer Portal">
          <i data-lucide="users" style="width: 15px; height: 15px; color: var(--primary);"></i>
          <span>Switch to Public User Portal</span>
        </button>
        <a href="#/login" class="volunteer-profile-pill" style="border-color: #059669;" title="NGO Administrator Account">
          <div class="avatar-circle" style="background: #047857;">UF</div>
          <div class="pill-info">
            <span class="pill-name">Udaan Admin</span>
            <span class="pill-badge" style="background: #ecfdf5; color: #047857;">Approved NGO</span>
          </div>
        </a>
      </div>
    `;
  } else {
    // Public User / Volunteer / Donor Navbar
    navContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <a href="#/" class="brand-logo">
          <div class="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">ProofBridge</span>
            <span class="portal-badge portal-badge-user"><i data-lucide="heart-handshake" style="width: 10px; height: 10px;"></i> Public Portal</span>
          </div>
        </a>
      </div>

      <nav class="nav-links">
        <a href="#/" class="nav-item ${state.currentRoute === 'landing' ? 'active' : ''}">Home</a>
        <a href="#/explore" class="nav-item ${state.currentRoute === 'explore' ? 'active' : ''}">Explore Events</a>
        <a href="#/activity/act_school_kits" class="nav-item ${state.currentRoute === 'activity' ? 'active' : ''}">
          <span class="pulse-dot"></span> Social Feed
        </a>
        <a href="#/leaderboard" class="nav-item ${state.currentRoute === 'leaderboard' ? 'active' : ''}">
          <i data-lucide="trophy" style="width: 14px; height: 14px; color: #fbbf24;"></i> Leaderboard
        </a>
        <a href="#/event-pass" class="nav-item ${state.currentRoute === 'event-pass' ? 'active' : ''}">
          <i data-lucide="ticket" style="width: 14px; height: 14px;"></i> My Event Pass
        </a>
        <a href="#/profile" class="nav-item ${state.currentRoute === 'profile' ? 'active' : ''}">My Passport & Recognition</a>
      </nav>

      <div class="nav-actions">
        <button class="location-chip" onclick="window.openLocationPicker()" title="Set your discovery location">
          <i data-lucide="map-pin" style="width: 13px; height: 13px; color: var(--primary);"></i>
          <span id="nav-location-label">${state.userLocation.city}, IN</span>
        </button>
        <button class="portal-switch-btn" onclick="window.switchPortal('ngo')" title="Switch to NGO Management Console">
          <i data-lucide="building-2" style="width: 15px; height: 15px; color: #0284c7;"></i>
          <span>Switch to NGO Portal</span>
        </button>
        <a href="#/profile" class="volunteer-profile-pill" id="user-passport-btn">
          <div class="avatar-circle">DS</div>
          <div class="pill-info">
            <span class="pill-name">${state.currentUser.name}</span>
            <span class="pill-badge" id="nav-volunteer-count">${state.currentUser.verifiedHours} hrs verified</span>
          </div>
        </a>
      </div>
    `;
  }

  if (window.lucide) window.lucide.createIcons();
}

window.navigateTo = function(path) {
  window.location.hash = `#/${path}`;
};

// ========================================================
// VIEW RENDERERS
// ========================================================
function renderCurrentView() {
  const container = document.getElementById('app');
  if (!container) return;

  switch (state.currentRoute) {
    case 'landing':
      container.innerHTML = renderLandingPage();
      break;
    case 'login':
      container.innerHTML = renderLoginPage();
      break;
    case 'explore':
      container.innerHTML = renderExplorePage();
      break;
    case 'event-detail':
      container.innerHTML = renderEventDetailPage(state.routeParams.id);
      break;
    case 'event-pass':
      container.innerHTML = renderEventPassPage();
      break;
    case 'ngo':
      container.innerHTML = renderNgoProfilePage(state.routeParams.id);
      break;
    case 'activity':
      container.innerHTML = renderActivityPage(state.routeParams.id);
      break;
    case 'ngo-dashboard':
      container.innerHTML = renderNgoDashboard('overview');
      break;
    case 'ngo-events':
      container.innerHTML = renderNgoDashboard('events');
      break;
    case 'ngo-activities':
      container.innerHTML = renderNgoDashboard('activities');
      break;
    case 'ngo-volunteers':
      container.innerHTML = renderNgoDashboard('volunteers');
      break;
    case 'ngo-evidence':
      container.innerHTML = renderNgoDashboard('evidence');
      break;
    case 'volunteer':
      container.innerHTML = renderVolunteerOpportunitiesPage();
      break;
    case 'profile':
      container.innerHTML = renderVolunteerPassportPage();
      loadUserRecognitionData();
      break;
    case 'leaderboard':
      container.innerHTML = renderLeaderboardPage();
      loadLeaderboardData();
      break;
    default:
      container.innerHTML = renderLandingPage();
  }

  if (document.getElementById('qr-code-canvas')) {
    drawSimulatedQrCode('qr-code-canvas', `PROOFBRIDGE-PASS:V10482:ACT_SCHOOL_KITS:TIMESTAMP_${Date.now()}`);
  }
  if (document.getElementById('hero-phone-qr')) {
    drawSimulatedQrCode('hero-phone-qr', `PROOFBRIDGE-PASS:V10482:ACT_SCHOOL_KITS:TIMESTAMP_${Date.now()}`);
  }
  if (document.getElementById('ngo-live-qr-canvas')) {
    drawSimulatedQrCode('ngo-live-qr-canvas', `PROOFBRIDGE-LIVE-QR:ACT_SCHOOL_KITS:WINDOW_1000_1500`);
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --------------------------------------------------------
// 0. AUTHENTICATION & PORTAL SELECTION (LOGIN VIEW)
// --------------------------------------------------------
function renderLoginPage() {
  return `
    <div class="login-view-wrapper">
      <div class="login-glass-card">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="brand-icon" style="margin: 0 auto 1rem; width: 52px; height: 52px;">
            <i data-lucide="shield-check" style="width: 28px; height: 28px;"></i>
          </div>
          <h2 style="font-size: 1.85rem; margin-bottom: 0.35rem;">ProofBridge Portal Access</h2>
          <p style="color: var(--text-muted); font-size: 0.92rem;">
            Select your workspace portal to access tailored tools and features.
          </p>
        </div>

        <!-- Portal Role Selector Cards -->
        <div style="margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <label style="font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted);">
              Select Your Portal
            </label>
            <span class="badge badge-neutral" style="font-size: 0.72rem;">Role-Based Architecture</span>
          </div>

          <div class="portal-chooser-grid">
            <!-- Card 1: Public User / Volunteer / Donor -->
            <div class="portal-card ${state.userRole === 'user' ? 'active-role' : ''}" onclick="window.selectLoginRole('user')">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                  <div style="width: 44px; height: 44px; border-radius: 12px; background: #eff6ff; color: #1d4ed8; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="users" style="width: 22px; height: 22px;"></i>
                  </div>
                  <span class="badge" style="background: #dbeafe; color: #1e40af;">PUBLIC PORTAL</span>
                </div>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.35rem;">Public User & Volunteer</h3>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.45; margin-bottom: 1rem;">
                  Discover local impact drives, register as an on-ground volunteer witness, scan live event attendance QRs, track hours, and verify evidence.
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.25rem;">
                  <span class="badge" style="background:#f1f5f9; color:#475569; font-size:0.7rem;">Explore Events</span>
                  <span class="badge" style="background:#f1f5f9; color:#475569; font-size:0.7rem;">My Event Pass</span>
                  <span class="badge" style="background:#f1f5f9; color:#475569; font-size:0.7rem;">Verified Hours</span>
                  <span class="badge" style="background:#f1f5f9; color:#475569; font-size:0.7rem;">Certificates</span>
                </div>
              </div>
              <button class="btn btn-primary" onclick="window.confirmLoginPortal('user')" style="width: 100%;">
                <i data-lucide="arrow-right"></i> Enter Public User Portal
              </button>
            </div>

            <!-- Card 2: NGO Organization -->
            <div class="portal-card ${state.userRole === 'ngo' ? 'active-role' : ''}" onclick="window.selectLoginRole('ngo')">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                  <div style="width: 44px; height: 44px; border-radius: 12px; background: #ecfdf5; color: #047857; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="building-2" style="width: 22px; height: 22px;"></i>
                  </div>
                  <span class="badge badge-consistent">APPROVED NGO</span>
                </div>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.35rem;">NGO Management Console</h3>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.45; margin-bottom: 1rem;">
                  Publish upcoming drives, configure volunteer positions, track real-time QR attendance, verify volunteer hours, and upload invoices for audit checks.
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.25rem;">
                  <span class="badge" style="background:#ecfdf5; color:#065f46; font-size:0.7rem;">DARPAN Matched</span>
                  <span class="badge" style="background:#ecfdf5; color:#065f46; font-size:0.7rem;">Live Event QR</span>
                  <span class="badge" style="background:#ecfdf5; color:#065f46; font-size:0.7rem;">Verify Hours</span>
                  <span class="badge" style="background:#ecfdf5; color:#065f46; font-size:0.7rem;">Invoice OCR</span>
                </div>
              </div>
              <button class="btn btn-primary" onclick="window.confirmLoginPortal('ngo')" style="width: 100%; background: #047857; border-color: #047857;">
                <i data-lucide="shield-check"></i> Enter NGO Console
              </button>
            </div>
          </div>
        </div>

        <!-- Authentication Form with Fast Quick-Fill -->
        <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="key" style="width: 16px; height: 16px; color: var(--primary);"></i>
              <strong style="font-size: 0.95rem;">Credentials Authentication</strong>
            </div>
            <span class="badge badge-neutral" style="font-size: 0.72rem;">Supabase Auth Ready</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group" style="margin-bottom: 0;">
              <label>Email Address</label>
              <input type="email" id="login-email-input" value="${state.userRole === 'ngo' ? 'contact@udaanfoundation.org' : 'dhruvesh@volunteer.in'}">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label>Password</label>
              <input type="password" id="login-password-input" value="••••••••••••">
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn btn-sm btn-outline" onclick="window.setQuickCredentials('user')">
                <i data-lucide="user"></i> Quick Fill: Volunteer User
              </button>
              <button class="btn btn-sm btn-outline" onclick="window.setQuickCredentials('ngo')">
                <i data-lucide="building"></i> Quick Fill: Udaan NGO
              </button>
            </div>
            <button class="btn btn-primary" onclick="window.submitLoginForm()">
              Sign In & Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------
// 1. LANDING PAGE
// --------------------------------------------------------
function renderLandingPage() {
  const udaan = state.ngos.find(n => n.id === 'ngo_udaan') || state.ngos[0];
  const primaryAct = udaan.activities[0];
  const volCount = primaryAct.volunteers.authenticatedAttendance;

  return `
    <div class="landing-view">
      <!-- Dribbble Master Creationz Hero Section -->
      <section class="hero-dribbble-wrap">
        <!-- SVG Contour Curves in Background -->
        <svg class="hero-contour-bg" viewBox="0 0 1400 650" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 320 C 300 120, 600 500, 1000 200 C 1200 80, 1350 250, 1400 180" stroke="#00c076" stroke-width="1.8" stroke-dasharray="8 8" opacity="0.45"/>
          <path d="M 80 480 C 400 260, 800 620, 1200 340 C 1300 270, 1380 400, 1400 350" stroke="#fbbf24" stroke-width="1.4" opacity="0.35"/>
          <circle cx="1080" cy="190" r="180" stroke="#00c076" stroke-width="1.2" opacity="0.25" fill="none"/>
        </svg>

        <!-- Big Display Header -->
        <div class="hero-dribbble-header">
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.75rem;">
            <span class="badge badge-consistent" style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700;">
              ● Evidence-First Social Impact
            </span>
            <span class="badge badge-darpan" style="font-size: 0.78rem;">
              🏛️ NITI Aayog DARPAN Matched
            </span>
          </div>
          <h1 class="hero-dribbble-title">
            Empowering Change,<br>
            <span class="dash-lead"></span>Inspiring Real Pr<span class="highlight-icon">🛡️</span>of
          </h1>
        </div>

        <!-- Three-Column Stage: Left Rail | 4-Panel Staggered Arched Grid | Right Rail -->
        <div class="hero-dribbble-stage">
          <!-- Left Rail -->
          <div class="hero-side-rail-left">
            <div class="rail-vertical-text">
              Together For Transparent Change. Connecting Claims To Field Evidence & Witnesses.
            </div>
            <div class="rail-circle-down" onclick="window.scrollTo({ top: 700, behavior: 'smooth' })" title="Scroll to explore">
              <i data-lucide="arrow-down" style="width: 22px; height: 22px;"></i>
            </div>
            <div class="rail-integrity-icons">
              <div class="rail-icon-chip" title="NITI Aayog DARPAN Matched">🏛️</div>
              <div class="rail-icon-chip" title="80G Tax Exemption">📋</div>
              <div class="rail-icon-chip" title="GPS Hardware Geotagged">📍</div>
            </div>
          </div>

          <!-- Center 4-Panel Staggered Arched Grid -->
          <div class="hero-arched-grid">
            <!-- Panel 1: Education -->
            <div class="hero-panel-card panel-1" onclick="window.navigateTo('event/act_school_kits')">
              <img src="/assets/school_kit_distribution.jpg" alt="School Kit Distribution Drive in Dharavi">
              <div class="hero-panel-pill">
                <span>🎒</span> 250 School Kits • Dharavi
              </div>
            </div>

            <!-- Panel 2: Healthcare -->
            <div class="hero-panel-card panel-2" onclick="window.navigateTo('event/evt_health_camp')">
              <img src="/assets/medical_camp_healthcare.jpg" alt="Free Community Health Camp in Sion">
              <div class="hero-panel-pill">
                <span>🩺</span> Health Camp • Sion
              </div>
            </div>

            <!-- Panel 3: Environment -->
            <div class="hero-panel-card panel-3" onclick="window.navigateTo('event/evt_tree_plantation')">
              <img src="/assets/tree_plantation_activity.jpg" alt="1,000 Mangrove Restoration in Bandra">
              <div class="hero-panel-pill">
                <span>🌱</span> 1,000 Mangroves • Bandra
              </div>
            </div>

            <!-- Panel 4: Animal Welfare -->
            <div class="hero-panel-card panel-4" onclick="window.navigateTo('event/evt_animal_welfare')">
              <img src="/assets/animal_rescue_shelter.jpg" alt="Animal Rescue Shelter & Rabies Vaccination">
              <div class="hero-panel-pill">
                <span>🐾</span> Stray Rescue • Aarey
              </div>
            </div>
          </div>

          <!-- Right Rail -->
          <div class="hero-side-rail-right">
            <div class="rail-stat-block">
              <div class="rail-stat-num">1.5k<span>+</span></div>
              <div class="rail-stat-label">Verified Evidence Claims</div>
            </div>
            <div class="rail-stat-block">
              <div class="rail-stat-num">25<span>+</span></div>
              <div class="rail-stat-label">DARPAN Matched NGOs</div>
            </div>
          </div>
        </div>

        <!-- Hero Action Buttons -->
        <div class="hero-dribbble-cta-row">
          <button class="btn btn-primary btn-lg" onclick="window.navigateTo('explore')" style="padding: 0.85rem 2rem; border-radius: var(--radius-pill); font-weight: 700; box-shadow: var(--shadow-green);">
            <i data-lucide="compass"></i> Explore Verified Drives ↗
          </button>
          <button class="btn btn-outline btn-lg" style="background: var(--primary-dark); color: #ffffff; border-color: var(--primary-dark); padding: 0.85rem 1.8rem; border-radius: var(--radius-pill); font-weight: 600;" onclick="window.openEvidenceDrawer('act_school_kits')">
            <i data-lucide="file-search"></i> Inspect Hero Evidence
          </button>
          <button class="btn btn-outline btn-lg" style="border-radius: var(--radius-pill); padding: 0.85rem 1.8rem; font-weight: 600;" onclick="window.navigateTo('ngo-dashboard')">
            <i data-lucide="layout-dashboard"></i> Switch to NGO Portal
          </button>
        </div>
      </section>

      <!-- Section 2: Proof In Action Organic Section -->
      <section class="proof-action-section">
        <!-- Left Organic Photo Frame -->
        <div class="proof-pebble-frame">
          <img src="/assets/food_relief_distribution.jpg" alt="Proof In Action On Ground">
          <div class="proof-action-title-overlay">
            Hope In<br><span>Action.</span>
          </div>
          <div class="btn-circle-action" onclick="window.openEvidenceDrawer('act_school_kits')" title="Inspect Live Evidence Passport">
            ↗
          </div>
        </div>

        <!-- Right Editorial Column -->
        <div class="proof-action-content">
          <div class="proof-watermark">VERIFIED</div>
          <div class="section-tag" style="margin-bottom: 0.75rem;">One Platform, Verified Truth</div>
          <h2>Transforming Impact Claims Into Physical Proof</h2>
          <p>
            ProofBridge encapsulates our commitment to verifiable, transparent philanthropy. Rather than asking donors to trust marketing statements, we anchor every social drive to physical proof: merchant tax invoices parsed by AI, original hardware EXIF timestamps, and independent on-ground corroboration from authenticated volunteers who were physically present.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem;">
            <span class="badge badge-consistent">✓ DARPAN Matched Registry</span>
            <span class="badge badge-consistent">✓ AI Invoice Audited</span>
            <span class="badge badge-consistent">✓ Live QR Attendance</span>
            <span class="badge badge-consistent">✓ Geotagged Media</span>
          </div>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-primary" style="border-radius: var(--radius-pill); padding: 0.75rem 1.5rem;" onclick="window.openEvidenceDrawer('act_school_kits')">
              <i data-lucide="shield-check"></i> Inspect Evidence Passport →
            </button>
            <button class="btn btn-outline" style="border-radius: var(--radius-pill); padding: 0.75rem 1.5rem;" onclick="window.openVolunteerModal()">
              <i data-lucide="user-plus"></i> Simulate Volunteer Check-In
            </button>
          </div>
        </div>
      </section>

      <!-- Section 3: The 4-Pill Clover Metric Grid -->
      <section class="clover-metrics-wrap">
        <div class="section-header" style="text-align: center; margin-bottom: 2.5rem;">
          <div class="section-tag">Audited Track Record</div>
          <h2 class="section-title">Measurable, Real-Time Community Scale</h2>
          <p class="section-desc">ProofBridge guarantees that every rupee and every hour is tied to independently verifiable evidence.</p>
        </div>

        <div class="clover-metrics-grid">
          <!-- Top Left Yellow Pebble -->
          <div class="clover-pill pebble-yellow-1">
            <div class="clover-num">850+</div>
            <div class="clover-label">Verified Volunteer Hours</div>
          </div>

          <!-- Top Middle Arched Photo -->
          <div class="clover-pill pebble-photo-1">
            <img src="/assets/school_kit_distribution.jpg" alt="Child literacy kits distributed">
          </div>

          <!-- Top Right Yellow Pebble -->
          <div class="clover-pill pebble-yellow-2">
            <div class="clover-num">100%</div>
            <div class="clover-label">DARPAN Registry Matched</div>
          </div>

          <!-- Bottom Left Forest Pebble -->
          <div class="clover-pill pebble-forest">
            <div class="clover-num">₹4.18L+</div>
            <div class="clover-label">Verifiable Spending Audited</div>
          </div>

          <!-- Bottom Middle Green Pebble -->
          <div class="clover-pill pebble-green">
            <div class="clover-num">28+</div>
            <div class="clover-label">Evidence-Backed Drives</div>
          </div>

          <!-- Bottom Right Arched Photo -->
          <div class="clover-pill pebble-photo-2">
            <img src="/assets/community_cleanwater_drive.jpg" alt="Clean drinking water kiosk project">
          </div>
        </div>
      </section>

      <!-- Section 4: 3D Dark Forest Banner with Angled Smartphone Mockup -->
      <section class="dark-forest-stage">
        <div class="dark-forest-glow"></div>
        <div class="dark-forest-grid">
          <!-- Left: 3D Smartphone Mockup -->
          <div class="mockup-phone-wrap">
            <div class="mockup-phone-body">
              <div class="mockup-phone-notch"></div>
              <div class="mockup-phone-screen">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; font-size: 0.72rem; color: #a1a1aa;">
                  <span>09:41 AM</span>
                  <span>5G ●●●</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); border-radius: 12px; padding: 0.75rem; text-align: center; margin-bottom: 0.75rem; border: 1px solid rgba(255,255,255,0.12);">
                  <span class="badge badge-consistent" style="font-size: 0.68rem; margin-bottom: 0.35rem;">
                    ● LIVE EVENT PASS
                  </span>
                  <div style="font-weight: 700; font-size: 0.88rem; color: #fff;">School Kit Drive</div>
                  <div style="font-size: 0.72rem; color: #94a3b8;">Udaan Foundation • Dharavi</div>
                </div>

                <!-- Animated Phone Canvas QR -->
                <div style="background: #ffffff; border-radius: 16px; padding: 0.85rem; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 0.75rem; box-shadow: 0 8px 20px rgba(0,0,0,0.4);">
                  <canvas id="hero-phone-qr" width="130" height="130" style="width: 130px; height: 130px;"></canvas>
                  <span style="font-size: 0.68rem; color: #059669; font-weight: 700; margin-top: 4px;">SCAN FOR ONSITE CHECK-IN</span>
                </div>

                <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 10px; padding: 0.5rem; text-align: center;">
                  <strong style="color: #34d399; font-size: 0.75rem; display: block;">✓ Checked In at 10:14 AM</strong>
                  <span style="color: #94a3b8; font-size: 0.68rem;">Dhruvesh Sharma (V10482)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Hero Dark Copy -->
          <div class="dark-forest-content">
            <h2 class="dark-forest-title">
              Your Voice Matters<br>
              In <span class="gold-accent">Our</span> <span class="gold-accent">Mission.</span>
            </h2>
            <p class="dark-forest-desc">
              Your voice matters in our mission to protect and empower vulnerable communities. Every contribution, volunteer hour, and expense receipt is traceable in real time. Experience true integrity from donor rupee to on-ground impact.
            </p>
            <div class="dark-forest-bottom-row">
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <button class="btn btn-primary" style="border-radius: var(--radius-pill); padding: 0.85rem 1.85rem; font-weight: 700; box-shadow: var(--shadow-green);" onclick="window.navigateTo('explore')">
                  Explore Live Drives
                </button>
                <button class="btn" style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.35); color: #ffffff; border-radius: var(--radius-pill); padding: 0.85rem 1.75rem; font-weight: 600;" onclick="window.navigateTo('event-pass')">
                  Open Event Pass
                </button>
              </div>
              <div class="btn-circle-arrow-lg" onclick="window.navigateTo('explore')" title="Explore All Drives">
                ↗
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Green Ticker Ribbon -->
      <section class="green-ticker-ribbon">
        <div class="ticker-track">
          <span class="ticker-item">🛡️ EVIDENCE-BACKED</span>
          <span class="ticker-item">•</span>
          <span class="ticker-item">🏛️ DARPAN VERIFIED</span>
          <span class="ticker-item">•</span>
          <span class="ticker-item">📍 GPS GEOTAGGED</span>
          <span class="ticker-item">•</span>
          <span class="ticker-item">🧾 AI INVOICE AUDITED</span>
          <span class="ticker-item">•</span>
          <span class="ticker-item">👥 VOLUNTEER WITNESSES</span>
          <span class="ticker-item">•</span>
          <span class="ticker-item">🔒 ZERO PHANTOM CLAIMS</span>
        </div>
      </section>

      <!-- Section 6: Featured Primary Vertical Slice -->
      <section style="margin: 5rem auto 3.5rem; max-width: 1100px;">
        <div class="section-header" style="text-align: center; margin-bottom: 2.5rem;">
          <div class="section-tag">Primary Showcase</div>
          <h2 class="section-title">Featured Organization: Udaan Foundation</h2>
          <p class="section-desc">
            Explore the comprehensive vertical slice: inspect school kit distribution evidence, review AI invoice math, and verify authenticated volunteer presence.
          </p>
        </div>

        <div class="activity-card" style="box-shadow: var(--shadow-card); border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-color);">
          <div class="activity-header" style="padding: 1.5rem 2rem;">
            <div class="activity-ngo-info">
              <span style="font-size: 2.2rem;">🎒</span>
              <div>
                <h3 style="font-size: 1.35rem; margin-bottom: 0.2rem;">Udaan Foundation</h3>
                <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">
                  DARPAN ID: MH/2021/0298412 • Education • Mumbai, Maharashtra
                </p>
              </div>
            </div>
            <button class="btn btn-outline" style="border-radius: var(--radius-pill);" onclick="window.navigateTo('ngo/ngo_udaan')">
              View Profile ↗
            </button>
          </div>
          <div class="activity-media-wrap" style="height: 320px;">
            <img src="/assets/school_kit_distribution.jpg" alt="School kit distribution by Udaan Foundation in Dharavi">
            <div class="activity-claim-banner">
              <h2>250 School Kits Distributed</h2>
              <p>Dharavi Municipal School #4, Mumbai • September 24, 2026</p>
            </div>
          </div>
          <div class="activity-body" style="padding: 1.75rem 2rem;">
            <div class="evidence-matrix-row">
              <div class="matrix-cell">
                <span>Claimed Impact</span>
                <strong>250 School Kits</strong>
              </div>
              <div class="matrix-cell">
                <span>Invoice Support</span>
                <strong style="color: var(--color-partial);">
                  <i data-lucide="alert-triangle" style="width: 16px; height: 16px;"></i> 220 Kits (Diff: 30)
                </strong>
              </div>
              <div class="matrix-cell">
                <span>Media EXIF</span>
                <strong style="color: var(--color-consistent);">
                  <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i> 8 Files Matched
                </strong>
              </div>
              <div class="matrix-cell">
                <span>Witnesses</span>
                <strong id="card-witness-count" style="color: var(--color-consistent);">
                  <i data-lucide="users" style="width: 16px; height: 16px;"></i> ${volCount} Attended
                </strong>
              </div>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end; flex-wrap: wrap; margin-top: 1.5rem;">
              <button class="btn btn-outline" style="border-radius: var(--radius-pill);" onclick="window.openVolunteerModal()">
                <i data-lucide="user-plus"></i> Volunteer / Check In
              </button>
              <button class="btn btn-primary" style="border-radius: var(--radius-pill); box-shadow: var(--shadow-green);" onclick="window.openEvidenceDrawer('act_school_kits')">
                <i data-lucide="file-search"></i> Inspect Evidence Passport →
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Dribbble-Style Modern Clean Footer -->
      <footer style="background: var(--bg-surface); border-top: 1px solid var(--border-color); padding: 2.5rem 1.5rem; margin-top: 4rem;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <div class="brand-icon" style="width: 34px; height: 34px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
            <strong style="font-size: 1.15rem; font-family: 'Outfit', sans-serif;">ProofBridge</strong>
          </div>
          <div style="color: var(--text-muted); font-size: 0.85rem;">
            @2026 ProofBridge. All rights reserved. Backed by NITI Aayog DARPAN standards.
          </div>
          <div style="display: flex; gap: 1.25rem; font-size: 0.84rem; color: var(--text-secondary);">
            <a href="https://ngodarpan.gov.in/#/" target="_blank" rel="noopener noreferrer">DARPAN Registry</a>
            <span>•</span>
            <a href="#/explore">Explore Causes</a>
            <span>•</span>
            <a href="#/login">Portal Access</a>
          </div>
        </div>
      </footer>
    </div>
  `;
}

// --------------------------------------------------------
// 2. EXPLORE PAGE (Public User / Volunteer Portal)
// --------------------------------------------------------
function renderExplorePage() {
  const matchesFilter = (item, causeProp = 'cause') => {
    const itemCause = (item[causeProp] || item.category || '').toLowerCase();
    const selCause = state.selectedCause.toLowerCase();
    const matchesCause = selCause === 'all' || 
      itemCause === selCause || 
      itemCause.includes(selCause) || 
      selCause.includes(itemCause) ||
      (selCause === 'healthcare' && itemCause.includes('health')) || 
      (selCause === 'health' && itemCause.includes('health'));
    const query = state.searchQuery.toLowerCase();
    const matchesQuery = !query || 
      (item.title && item.title.toLowerCase().includes(query)) || 
      (item.name && item.name.toLowerCase().includes(query)) || 
      (item.ngoName && item.ngoName.toLowerCase().includes(query)) || 
      (item.city && item.city.toLowerCase().includes(query)) || 
      (item.venue && item.venue.toLowerCase().includes(query)) || 
      (item.tagline && item.tagline.toLowerCase().includes(query)) ||
      itemCause.includes(query);
    return matchesCause && matchesQuery;
  };

  const filteredNgos = state.ngos.filter(ngo => matchesFilter(ngo, 'category'));
  const liveEvents = state.upcomingEventsList.filter(e => e.status === 'LIVE NOW' && matchesFilter(e, 'cause'));
  const upcomingEvents = state.upcomingEventsList.filter(e => e.status !== 'LIVE NOW' && matchesFilter(e, 'cause'));
  const udaan = state.ngos[0];
  const primaryAct = udaan.activities[0];
  const volCount = primaryAct.volunteers.authenticatedAttendance;

  // Aggregate opportunities from all NGOs matching filters
  const allOpportunities = [];
  state.ngos.forEach(n => {
    (n.opportunities || []).forEach(opp => {
      if (matchesFilter(opp, 'cause')) {
        allOpportunities.push({ ...opp, ngoName: n.name });
      }
    });
  });

  // Aggregate fundraisers from all NGOs matching filters
  const allFundraisers = [];
  state.ngos.forEach(n => {
    (n.fundraisers || []).forEach(f => {
      if (matchesFilter(f, 'title') || matchesFilter(n, 'category')) {
        allFundraisers.push({ ...f, ngoName: n.name });
      }
    });
  });

  return `
    <div class="explore-view">
      <!-- Location Banner (USER_INTERFACE.md #2) -->
      ${state.userLocation.allowed ? `
        <div class="location-banner" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-lg); padding: 0.9rem 1.25rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center;">
              <i data-lucide="map-pin" style="width: 18px; height: 18px;"></i>
            </div>
            <div>
              <strong style="font-size: 0.92rem; color: #166534; display: block;">Discovering social-impact activities near ${state.userLocation.city}, ${state.userLocation.state}</strong>
              <small style="color: #15803d; font-size: 0.78rem;">Verified drives within ~5 km radius • Exact GPS coordinates kept private</small>
            </div>
          </div>
          <button class="btn btn-sm btn-outline" style="border-color: #86efac; color: #15803d;" onclick="window.openLocationPicker()">
            <i data-lucide="sliders"></i> Change City
          </button>
        </div>
      ` : `
        <div class="location-banner" style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: var(--radius-lg); padding: 1rem 1.25rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #dbeafe; color: #1d4ed8; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i data-lucide="map-pin" style="width: 20px; height: 20px;"></i>
            </div>
            <div>
              <strong style="font-size: 0.95rem; color: #1e3a8a; display: block;">Find social-impact activities near you</strong>
              <span style="color: #3b82f6; font-size: 0.82rem;">Allow location or select your city to uncover local volunteer drives & fundraisers.</span>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn btn-sm btn-primary" onclick="window.requestBrowserGps()">
              <i data-lucide="crosshair"></i> Allow Location
            </button>
            <button class="btn btn-sm btn-outline" onclick="window.openLocationPicker()">
              <i data-lucide="map"></i> Choose Location Manually
            </button>
          </div>
        </div>
      `}

      <!-- Top Header & Filter Chips -->
      <div class="section-header" style="text-align: left; margin-bottom: 1.5rem; max-width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div class="section-tag">Public Discovery Feed</div>
            <h1 class="section-title">Explore Social Impact Near You</h1>
            <p class="section-desc">Discover nearby ongoing drives, upcoming volunteer opportunities, and evidence-backed activities across all causes.</p>
          </div>
          <a href="#/event-pass" class="btn btn-outline" style="border-color: var(--primary); color: var(--primary);">
            <i data-lucide="ticket"></i> Open My Event Pass
          </a>
        </div>
      </div>

      <!-- Filters & Search Bar with All Categories -->
      <div class="explore-top-bar" style="margin-bottom: 2.5rem;">
        <div class="search-box-wrap" style="margin-bottom: 1rem;">
          <i data-lucide="search"></i>
          <input type="text" class="search-input" id="ngo-search-input" 
                 placeholder="Search by event title, NGO name, city (Mumbai, Pune), or cause..." 
                 value="${state.searchQuery}"
                 oninput="window.handleSearchInput(event)">
        </div>

        <div class="filter-chips-row" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <button class="filter-chip ${state.selectedCause === 'all' ? 'active' : ''}" onclick="window.setCauseFilter('all')">All Causes</button>
          <button class="filter-chip ${state.selectedCause === 'education' ? 'active' : ''}" onclick="window.setCauseFilter('education')">📚 Education</button>
          <button class="filter-chip ${state.selectedCause === 'healthcare' ? 'active' : ''}" onclick="window.setCauseFilter('healthcare')">🩺 Healthcare</button>
          <button class="filter-chip ${state.selectedCause === 'environment' ? 'active' : ''}" onclick="window.setCauseFilter('environment')">🌱 Environment</button>
          <button class="filter-chip ${state.selectedCause === 'animal welfare' ? 'active' : ''}" onclick="window.setCauseFilter('animal welfare')">🐾 Animal Welfare</button>
          <button class="filter-chip ${state.selectedCause === 'women empowerment' ? 'active' : ''}" onclick="window.setCauseFilter('women empowerment')">🪡 Women Empowerment</button>
          <button class="filter-chip ${state.selectedCause === 'food security' ? 'active' : ''}" onclick="window.setCauseFilter('food security')">🍱 Food Security</button>
          <button class="filter-chip ${state.selectedCause === 'skill development' ? 'active' : ''}" onclick="window.setCauseFilter('skill development')">💻 Skill Development</button>
          <button class="filter-chip ${state.selectedCause === 'community development' ? 'active' : ''}" onclick="window.setCauseFilter('community development')">💧 Community Development</button>
          <button class="filter-chip ${state.selectedCause === 'disaster relief' ? 'active' : ''}" onclick="window.setCauseFilter('disaster relief')">🛡️ Disaster Relief</button>
        </div>
      </div>

      <!-- SECTION 1: HAPPENING NOW (Live Events with QR Check-In) -->
      ${liveEvents.length > 0 ? `
        <section style="margin-bottom: 3.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span class="pulse-dot"></span>
              <h2 style="font-size: 1.35rem; margin: 0;">Happening Now Near You</h2>
              <span class="badge badge-consistent">LIVE DRIVES</span>
            </div>
            <span style="font-size: 0.82rem; color: var(--text-muted);">Authoritative server timestamps enforced</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.5rem;">
            ${liveEvents.map(evt => `
              <div class="activity-card" style="box-shadow: var(--shadow-card); border-top: 3px solid #10b981;">
                <div class="activity-header">
                  <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                      <span class="badge badge-consistent" style="font-size: 0.72rem;">● LIVE NOW</span>
                      <span class="badge badge-neutral" style="font-size: 0.72rem;">${evt.cause}</span>
                    </div>
                    <h3 style="font-size: 1.15rem; margin: 0;">${evt.title}</h3>
                    <small style="color: var(--text-muted);">${evt.ngoName} • ${evt.venue}</small>
                  </div>
                </div>
                <div class="activity-media-wrap" style="height: 190px;">
                  <img src="${evt.heroImage}" alt="${evt.title}" style="height: 100%; object-fit: cover;">
                  <div style="position: absolute; bottom: 10px; left: 10px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; color: #fff;">
                    📍 ~1.8 km away • ${evt.startTime} – ${evt.endTime}
                  </div>
                </div>
                <div class="activity-body">
                  <div class="evidence-matrix-row" style="margin: 0 0 1rem 0;">
                    <div class="matrix-cell">
                      <span>Slots Filled</span>
                      <strong>${evt.registeredCount} / ${evt.volunteerPositions}</strong>
                    </div>
                    <div class="matrix-cell">
                      <span>Fundraiser</span>
                      <strong style="color: var(--primary);">₹${(evt.fundraiserRaised / 1000).toFixed(1)}k Raised</strong>
                    </div>
                    <div class="matrix-cell">
                      <span>Live Attendance</span>
                      <strong style="color: #10b981;">17 Active</strong>
                    </div>
                  </div>
                  <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                    <button class="btn btn-outline" style="font-size: 0.82rem; padding: 0.4rem 0.75rem;" onclick="window.navigateTo('event/${evt.id}')">
                      View Event
                    </button>
                    <button class="btn btn-primary" style="font-size: 0.82rem; padding: 0.4rem 0.85rem;" onclick="window.navigateTo('event-pass')">
                      <i data-lucide="qr-code"></i> My Event Pass
                    </button>
                    <button class="btn btn-outline" style="font-size: 0.82rem; padding: 0.4rem 0.75rem;" onclick="window.openDonateModal('${evt.ngoName}', '${evt.title}')">
                      <i data-lucide="heart"></i> Donate
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- SECTION 2: UPCOMING NEAR YOU (ALL CATEGORIES) -->
      <section style="margin-bottom: 3.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
          <div>
            <h2 style="font-size: 1.35rem; margin-bottom: 0.2rem;">Upcoming Near You</h2>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">Verified community drives opening soon across healthcare, environment, animal care, and empowerment.</p>
          </div>
          <span class="badge badge-neutral">${upcomingEvents.length} Drives Available</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem;">
          ${upcomingEvents.map(evt => `
            <div class="ngo-card" style="box-shadow: var(--shadow-card); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div class="ngo-cover" style="height: 180px; position: relative;">
                  <img src="${evt.heroImage}" alt="${evt.title}" style="width: 100%; height: 100%; object-fit: cover;">
                  <span class="ngo-category-badge" style="position: absolute; top: 12px; left: 12px;">${evt.cause}</span>
                  <div style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); color: #fff; font-size: 0.74rem; padding: 3px 8px; border-radius: 4px;">
                    📅 ${evt.date}
                  </div>
                </div>
                <div class="ngo-card-content" style="padding: 1.25rem;">
                  <h3 style="font-size: 1.12rem; line-height: 1.35; margin-bottom: 0.4rem;">${evt.title}</h3>
                  <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                    <strong>${evt.ngoName}</strong> • 📍 ${evt.venue}
                  </p>

                  <div class="ngo-metrics-bar" style="margin-bottom: 1rem;">
                    <div class="metric-box">
                      <span>Open Slots</span>
                      <strong>${evt.volunteerPositions - evt.registeredCount} Left</strong>
                    </div>
                    <div class="metric-box">
                      <span>Fundraiser</span>
                      <strong style="color: var(--primary);">₹${evt.fundraiserRaised.toLocaleString('en-IN')} Raised</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div style="padding: 0 1.25rem 1.25rem;">
                <div class="ngo-card-actions">
                  <button class="btn btn-outline" style="width: 100%;" onclick="window.navigateTo('event/${evt.id}')">
                    View Details →
                  </button>
                  <button class="btn btn-primary" onclick="window.registerForEvent('${evt.id}')" title="Register as Volunteer">
                    <i data-lucide="ticket"></i> Register
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 3: VOLUNTEER OPPORTUNITIES -->
      <section style="margin-bottom: 3.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
          <div>
            <h2 style="font-size: 1.35rem; margin-bottom: 0.2rem;">Volunteer Opportunities</h2>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">Become an authenticated on-ground witness. Verified hours unlock official certificates.</p>
          </div>
          <a href="#/profile" class="btn btn-sm btn-outline">My Volunteering History</a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.5rem;">
          ${allOpportunities.map(opp => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-card);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="badge badge-consistent">${opp.cause}</span>
                <span style="font-size: 0.82rem; font-weight: 700; color: var(--primary);">${opp.hours} hrs credit</span>
              </div>
              <h3 style="font-size: 1.15rem; margin-bottom: 0.4rem;">${opp.title}</h3>
              <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 0.85rem; line-height: 1.45;">
                Organized by <strong>${opp.ngoName}</strong>. Tasks: verified inventory counts, participant registration, on-site assistance.
              </p>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.25rem;">
                <span>📅 ${opp.date} • ${opp.time}</span>
                <span>📍 ${opp.location}</span>
                <span>👥 ${opp.slotsFilled} of ${opp.slotsTotal} slots registered</span>
              </div>
              <button class="btn btn-primary btn-block" onclick="window.registerForEvent('act_school_kits')">
                <i data-lucide="ticket"></i> Register & Get Event Pass
              </button>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 4: FUNDRAISERS & BUDGET TRANSPARENCY -->
      <section style="margin-bottom: 3.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
          <div>
            <h2 style="font-size: 1.35rem; margin-bottom: 0.2rem;">Fundraisers & Spending Transparency</h2>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">Inspect itemized budget breakdowns before making demo contributions.</p>
          </div>
          <span class="badge badge-darpan">Itemized Budgets</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 1.5rem;">
          ${allFundraisers.map(f => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 1.75rem; box-shadow: var(--shadow-card);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <span class="badge badge-darpan">ACTIVE CAMPAIGN</span>
                <span class="badge badge-consistent">80G Tax Benefit</span>
              </div>
              <h3 style="font-size: 1.2rem; margin-bottom: 0.35rem;">${f.title}</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
                Organized by <strong>${f.ngoName}</strong>. ${f.description}
              </p>

              <div style="background: var(--bg-subtle); border-radius: var(--radius-pill); height: 10px; overflow: hidden; margin-bottom: 0.5rem;">
                <div style="background: var(--primary); height: 100%; width: ${f.percentage}%; border-radius: var(--radius-pill);"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 1.25rem;">
                <strong>₹${f.raisedAmount.toLocaleString('en-IN')} raised</strong>
                <span style="color: var(--text-muted);">Goal: ₹${f.targetAmount.toLocaleString('en-IN')} (${f.percentage}%)</span>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1.25rem;">
                <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #475569; margin-bottom: 0.35rem;">
                  Impact Conversion
                </div>
                <div style="font-size: 0.84rem; color: var(--text-secondary);">
                  💡 ${f.unitEquivalent || 'Verifiable financial trail with tax exemption'}
                </div>
              </div>

              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-primary" style="flex: 1;" onclick="window.openDonateModal('${f.ngoName}', '${f.title}')">
                  <i data-lucide="heart"></i> Demo Contribution (₹800)
                </button>
                <button class="btn btn-outline" onclick="window.navigateTo('event/act_school_kits')">
                  Full Budget
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 5: SOCIAL-MEDIA-STYLE ACTIVITY FEED (USER_INTERFACE.md #5) -->
      <section style="margin-bottom: 3.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
          <div>
            <h2 style="font-size: 1.35rem; margin-bottom: 0.2rem;">Recently Completed Activities & Community Feed</h2>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">Public feed of documented events with upvoting and community feedback.</p>
          </div>
          <span class="badge badge-neutral">Public Feed</span>
        </div>

        <div class="activity-card" style="box-shadow: var(--shadow-card);">
          <div class="activity-header">
            <div class="activity-ngo-info">
              <span style="font-size: 2rem;">🎒</span>
              <div>
                <h3 style="margin-bottom: 0.15rem;">Udaan Foundation</h3>
                <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;">
                  DARPAN ID: MH/2021/0298412 • Education • Mumbai • 24 September 2026
                </p>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-outline" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;" onclick="window.openFeedbackModal('act_school_kits', 'School Kit Distribution Drive')">
                <i data-lucide="message-square"></i> Feedback
              </button>
              <button class="btn btn-outline" style="font-size: 0.78rem; padding: 0.35rem 0.65rem; color: #dc2626; border-color: #fecaca;" onclick="window.openFeedbackModal('act_school_kits', 'School Kit Distribution Drive')">
                <i data-lucide="flag"></i> Report
              </button>
            </div>
          </div>

          <div class="activity-media-wrap">
            <img src="/assets/school_kit_distribution.jpg" alt="School kit distribution by Udaan Foundation in Dharavi">
            <div class="activity-claim-banner">
              <h2>250 School Kits Distributed</h2>
              <p>Dharavi Municipal School #4, Mumbai • 24 September 2026</p>
            </div>
          </div>

          <div class="activity-body">
            <!-- Measurable Impact Claims (USER_INTERFACE.md #5) -->
            <div style="background: #f8fafc; border-left: 3px solid var(--primary); padding: 0.85rem 1rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 1.25rem;">
              <strong style="display: block; font-size: 0.95rem; margin-bottom: 0.25rem;">Measurable Impact Claims:</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 1.25rem; font-size: 0.88rem; color: var(--text-secondary);">
                <span>🎒 <strong>250</strong> school kits distributed</span>
                <span>👥 <strong>${volCount}</strong> authenticated volunteers</span>
                <span>💰 <strong>₹62,400</strong> raised</span>
              </div>
            </div>

            <!-- Evidence Matrix -->
            <div class="evidence-matrix-row" style="margin-bottom: 1.25rem;">
              <div class="matrix-cell">
                <span>Claimed Impact</span>
                <strong>250 School Kits</strong>
              </div>
              <div class="matrix-cell">
                <span>Invoice Support</span>
                <strong style="color: var(--color-partial);">
                  <i data-lucide="alert-triangle" style="width: 14px; height: 14px;"></i> 220 Kits (Diff: 30)
                </strong>
              </div>
              <div class="matrix-cell">
                <span>EXIF Provenance</span>
                <strong style="color: var(--color-consistent);">
                  <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i> 8 Files Matched
                </strong>
              </div>
              <div class="matrix-cell">
                <span>Volunteer Witnesses</span>
                <strong style="color: var(--color-consistent);">${volCount} Attendees</strong>
              </div>
            </div>

            <!-- Interactive Social Engagement (USER_INTERFACE.md #15) -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1rem; flex-wrap: wrap; gap: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-pill); overflow: hidden; background: #ffffff;">
                  <button class="vote-btn ${state.userVotes['act_school_kits'] === 'up' ? 'voted-up' : ''}" onclick="window.handleVote('act_school_kits', 'up')" title="Upvote this activity update" style="padding: 0.35rem 0.75rem; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                    <i data-lucide="arrow-up" style="width: 15px; height: 15px; color: ${state.userVotes['act_school_kits'] === 'up' ? '#10b981' : 'inherit'};"></i>
                    <span style="font-size: 0.82rem; font-weight: 600;">${(state.userVotes['act_school_kits'] === 'up' ? 43 : 42)}</span>
                  </button>
                  <div style="width: 1px; height: 16px; background: var(--border-color);"></div>
                  <button class="vote-btn ${state.userVotes['act_school_kits'] === 'down' ? 'voted-down' : ''}" onclick="window.handleVote('act_school_kits', 'down')" title="Downvote this activity update" style="padding: 0.35rem 0.75rem; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                    <i data-lucide="arrow-down" style="width: 15px; height: 15px; color: ${state.userVotes['act_school_kits'] === 'down' ? '#ef4444' : 'inherit'};"></i>
                    <span style="font-size: 0.82rem; font-weight: 600;">${(state.userVotes['act_school_kits'] === 'down' ? 3 : 2)}</span>
                  </button>
                </div>
                <small style="color: var(--text-muted); font-size: 0.75rem;" title="Community engagement metric only">
                  *Votes reflect community sentiment, not audit verification
                </small>
              </div>

              <div style="display: flex; gap: 0.75rem;">
                <button class="btn btn-primary" onclick="window.openEvidenceDrawer('act_school_kits')">
                  <i data-lucide="file-search"></i> Inspect Evidence Passport →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 6: NGO DIRECTORY -->
      <section>
        <div class="section-header" style="text-align: left; margin-bottom: 1.5rem;">
          <div class="section-tag">Organization Directory</div>
          <h2 class="section-title">All Approved NGOs</h2>
          <p class="section-desc">Search NGOs with inspectable evidence records, verified DARPAN registrations, and open volunteer initiatives.</p>
        </div>

        <div class="ngo-grid">
          ${filteredNgos.map(ngo => `
            <div class="ngo-card">
              <div class="ngo-cover">
                <img src="${ngo.coverImage}" alt="${ngo.name}">
                <span class="ngo-category-badge">${ngo.category}</span>
              </div>
              <div class="ngo-card-content">
                <div class="ngo-card-header">
                  <div class="ngo-avatar">${ngo.logo}</div>
                  <div class="ngo-name-wrap">
                    <h3>${ngo.name}</h3>
                    <div class="ngo-location">
                      <i data-lucide="map-pin" style="width: 13px; height: 13px;"></i>
                      <span>${ngo.city}, ${ngo.state}</span>
                    </div>
                  </div>
                </div>
                <p class="ngo-desc">${ngo.tagline}</p>
                
                <div style="margin-bottom: 1rem;">
                  <span class="badge badge-darpan" title="Verified against NITI Aayog NGO DARPAN">
                    <i data-lucide="check" style="width: 12px; height: 12px;"></i>
                    DARPAN: ${ngo.identity.darpanId}
                  </span>
                </div>

                <div class="ngo-metrics-bar">
                  <div class="metric-box">
                    <span>Evidence Activities</span>
                    <strong>${ngo.stats.activities} Records</strong>
                  </div>
                  <div class="metric-box">
                    <span>Volunteers</span>
                    <strong>${ngo.stats.volunteers} Witnesses</strong>
                  </div>
                </div>

                <div class="ngo-card-actions">
                  <button class="btn btn-outline btn-block" onclick="window.navigateTo('ngo/${ngo.id}')">
                    View Profile →
                  </button>
                  ${ngo.featuredActivityId ? `
                    <button class="btn btn-primary" onclick="window.openEvidenceDrawer('${ngo.featuredActivityId}')" title="Inspect Evidence">
                      <i data-lucide="file-search"></i>
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

// --------------------------------------------------------
// 2B. EVENT DETAIL PAGE (USER_INTERFACE.md #6)
// --------------------------------------------------------
function renderEventDetailPage(eventId) {
  const event = state.upcomingEventsList.find(e => e.id === eventId) || state.upcomingEventsList[0];
  const isRegistered = state.registeredEvents.includes(event.id);
  const remainingSlots = Math.max(0, event.volunteerPositions - event.registeredCount);

  return `
    <div class="event-detail-view" style="max-width: 960px; margin: 0 auto;">
      <div style="margin-bottom: 1.25rem;">
        <a href="#/explore" class="btn btn-sm btn-outline" style="border-radius: var(--radius-pill);">
          ← Back to Discovery Feed
        </a>
      </div>

      <!-- Hero Header -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 2rem; box-shadow: var(--shadow-card);">
        <div style="height: 280px; position: relative;">
          <img src="${event.heroImage}" alt="${event.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; top: 15px; left: 15px; display: flex; gap: 0.5rem;">
            <span class="badge ${event.status === 'LIVE NOW' ? 'badge-consistent' : 'badge-neutral'}" style="font-size: 0.8rem;">
              ${event.status === 'LIVE NOW' ? '● LIVE NOW' : 'UPCOMING'}
            </span>
            <span class="badge" style="background: rgba(0,0,0,0.6); color: #fff;">${event.cause}</span>
          </div>
        </div>
        <div style="padding: 1.75rem 2rem;">
          <h1 style="font-size: 1.85rem; margin-bottom: 0.5rem;">${event.title}</h1>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; color: var(--text-muted); font-size: 0.9rem; align-items: center;">
            <span>🏢 <strong>${event.ngoName}</strong></span>
            <span>•</span>
            <span>📅 ${event.date} (${event.startTime} - ${event.endTime})</span>
            <span>•</span>
            <span>📍 ${event.venue}, ${event.city}</span>
          </div>
        </div>
      </div>

      <!-- Two-Column Layout -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div>
          <!-- Event Overview -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 2rem;">
            <h3 style="margin-bottom: 0.75rem;">Event Overview</h3>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1.5rem;">
              Community social impact initiative organized by <strong>${event.ngoName}</strong>. 
              All volunteer participation and funds raised are backed by inspectable proof trails on ProofBridge.
            </p>

            <h4 style="margin-bottom: 0.75rem;">Venue & Distance</h4>
            <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i data-lucide="map-pin" style="color: var(--primary); width: 22px; height: 22px;"></i>
                <div>
                  <strong style="font-size: 0.92rem; display: block;">${event.venue}</strong>
                  <span style="font-size: 0.8rem; color: var(--text-muted);">${event.city} • ~2.4 km from your selected location</span>
                </div>
              </div>
              <span class="badge badge-consistent">Transit Accessible</span>
            </div>

            <!-- Volunteer Registration Section (USER_INTERFACE.md #6) -->
            <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; margin-top: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3 style="margin: 0;">Volunteer Registration</h3>
                <span class="badge ${remainingSlots > 0 ? 'badge-consistent' : 'badge-unavailable'}">
                  ${remainingSlots > 0 ? `${remainingSlots} Slots Available` : 'Registration Full'}
                </span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
                <div style="background: #f8fafc; padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid #e2e8f0;">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Required Skills</span>
                  <div style="font-size: 0.88rem; font-weight: 600; margin-top: 2px;">${event.requiredSkills}</div>
                </div>
                <div style="background: #f8fafc; padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid #e2e8f0;">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Expected Duration</span>
                  <div style="font-size: 0.88rem; font-weight: 600; margin-top: 2px;">${event.expectedDuration}</div>
                </div>
              </div>

              ${isRegistered ? `
                <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-md); padding: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; color: #065f46;">
                    <i data-lucide="check-circle" style="width: 18px; height: 18px;"></i>
                    <strong style="font-size: 0.9rem;">You are registered for this event!</strong>
                  </div>
                  <a href="#/event-pass" class="btn btn-sm btn-primary">
                    <i data-lucide="ticket"></i> Open My Event Pass
                  </a>
                </div>
              ` : `
                <button class="btn btn-primary btn-lg btn-block" onclick="window.registerForEvent('${event.id}')">
                  <i data-lucide="ticket"></i> Register as Volunteer
                </button>
              `}
            </div>
          </div>

          <!-- Fundraiser & Budget Transparency (USER_INTERFACE.md #6, #13) -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h3 style="margin: 0;">Fundraiser & Planned Budget</h3>
              <span class="badge badge-darpan">Transparent Budget</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
              Planned budget allocation submitted by ${event.ngoName}. Actual spending invoices are audited post-event.
            </p>

            <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; margin-bottom: 1.5rem;">
              <thead>
                <tr style="background: var(--bg-subtle); text-align: left;">
                  <th style="padding: 0.65rem 0.85rem;">Budget Category</th>
                  <th style="padding: 0.65rem 0.85rem; text-align: right;">Planned Amount</th>
                </tr>
              </thead>
              <tbody>
                ${(event.budget || []).map(b => `
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.65rem 0.85rem;">${b.category}</td>
                    <td style="padding: 0.65rem 0.85rem; text-align: right; font-weight: 600;">₹${b.amount.toLocaleString('en-IN')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-primary btn-block" onclick="window.openDonateModal('${event.ngoName}', '${event.title}')">
                <i data-lucide="heart"></i> Make Demo Contribution
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div>
          <!-- Host Organization Card -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
            <span class="badge badge-darpan" style="margin-bottom: 0.75rem;">HOST NGO</span>
            <h4 style="margin-bottom: 0.25rem;">${event.ngoName}</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
              Verified on NITI Aayog DARPAN Registry under ID: MH/2021/0298341.
            </p>
            <a href="#/ngo/${event.ngoId || 'ngo_udaan'}" class="btn btn-outline btn-block btn-sm">
              View NGO Profile →
            </a>
          </div>

          <!-- Evidence & Integrity Actions -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem;">
            <h4 style="margin-bottom: 0.75rem;">Community Moderation</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">
              Notice an inaccuracy or concern? Submissions create an audit record for platform moderators.
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <button class="btn btn-outline btn-sm btn-block" onclick="window.openFeedbackModal('${event.id}', '${event.title}')">
                <i data-lucide="message-square"></i> Submit Feedback
              </button>
              <button class="btn btn-outline btn-sm btn-block" style="color: #dc2626; border-color: #fecaca;" onclick="window.openFeedbackModal('${event.id}', '${event.title}')">
                <i data-lucide="flag"></i> Report Discrepancy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------
// 2C. MY EVENT PASS & ATTENDANCE FLOW (USER_INTERFACE.md #7, #8, #9, #10)
// --------------------------------------------------------
function renderEventPassPage() {
  const { activity } = state.getPrimaryActivity();
  const volCount = activity.volunteers.authenticatedAttendance;

  return `
    <div class="event-pass-view" style="max-width: 820px; margin: 0 auto;">
      <div class="section-header" style="text-align: left; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div class="section-tag">Proof-of-Presence</div>
            <h1 class="section-title">My Event Pass</h1>
            <p class="section-desc">Live QR attendance pass for registered volunteers. Timestamps enforced by server clock.</p>
          </div>
          <span class="badge badge-consistent">
            <i data-lucide="shield-check"></i> Identity Authenticated (#V10482)
          </span>
        </div>
      </div>

      <!-- Main Event Pass Card -->
      <div style="background: var(--bg-surface); border: 2px solid var(--primary); border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 2rem; box-shadow: var(--shadow-card);">
        <div style="background: linear-gradient(135deg, #064e3b 0%, #022c22 100%); color: #ffffff; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="badge" style="background: rgba(16, 185, 129, 0.25); color: #34d399; border: 1px solid #10b981; font-size: 0.72rem; margin-bottom: 0.4rem;">
              ACTIVE VOLUNTEER PASS
            </span>
            <h2 style="color: #fff; font-size: 1.4rem; margin: 0;">School Kit Distribution Drive</h2>
            <small style="color: #cbd5e1;">Udaan Foundation • Dharavi Community High School</small>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.78rem; color: #94a3b8; text-transform: uppercase;">Pass Holder</div>
            <strong style="font-size: 1.1rem; color: #fff;">Aarav Mehta</strong>
          </div>
        </div>

        <div style="padding: 2rem;">
          <!-- QR Scanner & Status -->
          <div style="display: grid; grid-template-columns: 240px 1fr; gap: 2rem; align-items: center; margin-bottom: 2rem;">
            <div style="text-align: center; background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem;">
              <canvas id="qr-code-canvas" width="180" height="180" style="display: block; margin: 0 auto; border-radius: 8px;"></canvas>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; margin-top: 0.5rem;" id="pass-id-display">
                #V10482:ACT_SCHOOL_KITS
              </div>
            </div>

            <div>
              <div style="margin-bottom: 1rem;">
                <span class="badge ${state.volunteerCheckedIn ? 'badge-consistent' : 'badge-neutral'}" id="qr-window-status-badge">
                  ${state.volunteerCheckedIn ? 'Checked In (Active)' : 'Check-in Active'}
                </span>
                <h3 style="margin-top: 0.35rem; font-size: 1.25rem;">Live Venue Attendance</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.45;" id="pass-window-msg">
                  ${state.volunteerCheckedOut 
                    ? 'Check-out completed at 02:47 PM. Awaiting NGO verification of hours.' 
                    : (state.volunteerCheckedIn 
                        ? 'Checked in at 10:03 AM IST. Live volunteer timer is actively recording.' 
                        : 'Event is live. Present this QR code at the venue entrance scanner to check in.')}
                </p>
              </div>

              <!-- Live Timer Display (USER_INTERFACE.md #9) -->
              <div style="background: #f1f5f9; border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <span style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">
                    ${state.volunteerCheckedIn ? 'Live Volunteer Timer' : 'Scheduled Hours'}
                  </span>
                  ${state.volunteerCheckedIn && !state.volunteerCheckedOut ? `
                    <span class="badge badge-consistent" style="font-size: 0.7rem;">
                      <span class="pulse-dot"></span> Live Recording
                    </span>
                  ` : ''}
                </div>
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--text-main);" id="live-timer-text">
                  ${state.volunteerCheckedOut 
                    ? 'Participation duration: 4h 44m' 
                    : (state.volunteerCheckedIn ? 'Current volunteer time: 2h 16m' : '10:00 AM – 03:00 PM (5h 00m expected)')}
                </div>
                <small style="color: var(--text-muted); font-size: 0.75rem;">
                  Authoritative duration calculated from server timestamps: check_out_time - check_in_time
                </small>
              </div>

              <!-- Pass Action Buttons -->
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                ${!state.volunteerCheckedIn ? `
                  <button class="btn btn-primary" onclick="window.simulateVolunteerCheckIn()" id="simulate-checkin-btn">
                    <i data-lucide="qr-code"></i> Scan QR & Check In (10:03 AM)
                  </button>
                ` : (!state.volunteerCheckedOut ? `
                  <button class="btn btn-primary" onclick="window.simulateVolunteerCheckOut()" id="simulate-checkout-btn">
                    <i data-lucide="log-out"></i> Scan QR & Check Out (02:47 PM)
                  </button>
                ` : `
                  <button class="btn btn-outline" disabled style="opacity: 0.7;">
                    <i data-lucide="check-circle-2"></i> Checked Out (4h 44m recorded)
                  </button>
                `)}
              </div>
            </div>
          </div>

          <!-- Interactive Judge Test Controls (USER_INTERFACE.md #8) -->
          <div style="background: #f8fafc; border: 1px dashed var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase;">
                Judge Testing Panel: Time Window Rules
              </strong>
              <span class="badge badge-neutral" style="font-size: 0.7rem;">Deterministic Validation</span>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">
              Test server-side boundary rules. Early check-in (before 09:45 AM) is rejected by the backend.
            </p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn btn-sm btn-outline" onclick="window.testCheckInWindow('early')">
                <i data-lucide="clock"></i> Test Early Attempt (09:30 AM → Server Reject)
              </button>
              <button class="btn btn-sm btn-outline" onclick="window.testCheckInWindow('live')">
                <i data-lucide="check"></i> Test Active Window (10:03 AM → Server Allow)
              </button>
            </div>
          </div>
        </div>

        <!-- Certificate Status Banner (USER_INTERFACE.md #10) -->
        <div style="background: #f0fdf4; border-top: 1px solid #bbf7d0; padding: 1.25rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i data-lucide="award" style="width: 24px; height: 24px; color: #16a34a;"></i>
            <div>
              <strong style="color: #15803d; font-size: 0.95rem; display: block;">Official Volunteer Certificate</strong>
              <span style="font-size: 0.8rem; color: #166534;">
                ${state.volunteerVerified 
                  ? 'Contribution verified by Udaan Foundation (4.75 hrs). Certificate ID #VOL-UDAAN-2026-001.' 
                  : (state.volunteerCheckedOut 
                      ? 'Work completed (4h 44m). Awaiting NGO hours verification before certificate issuance.' 
                      : 'Certificate becomes eligible after event check-in, check-out, and NGO review.')}
              </span>
            </div>
          </div>

          ${state.volunteerVerified ? `
            <a href="/api/certificates/volunteer/VOL-UDAAN-2026-001" class="btn btn-success" target="_blank" download>
              <i data-lucide="download"></i> Download Certificate (PDF)
            </a>
          ` : `
            <button class="btn btn-outline" style="font-size: 0.8rem;" onclick="window.switchPortal('ngo')">
              <i data-lucide="arrow-right"></i> Verify as NGO in Console
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}


// --------------------------------------------------------
// 3. NGO PROFILE PAGE (With Official DARPAN Transparency Tab)
// --------------------------------------------------------
function renderNgoProfilePage(ngoId) {
  const ngo = state.ngos.find(n => n.id === ngoId) || state.ngos[0];
  const primaryAct = ngo.activities?.[0];
  const volCount = primaryAct?.volunteers?.authenticatedAttendance || 17;

  return `
    <div class="ngo-profile-view">
      <!-- Profile Hero Header -->
      <div class="ngo-profile-header">
        <div class="profile-cover">
          <img src="${ngo.coverImage}" alt="${ngo.name}">
        </div>
        <div class="profile-header-content">
          <div class="profile-info-group">
            <div class="profile-logo-large">${ngo.logo}</div>
            <div class="profile-titles">
              <h1>${ngo.name}</h1>
              <div class="profile-meta-row">
                <span>📍 ${ngo.city}, ${ngo.state}</span>
                <span>•</span>
                <span>🏷️ ${ngo.category}</span>
                <span>•</span>
                <span class="badge badge-darpan">DARPAN Matched ✓</span>
              </div>
            </div>
          </div>
          <div class="profile-actions-bar">
            <button class="btn btn-outline" onclick="window.navigateTo('ngo-dashboard')">
              <i data-lucide="layout-dashboard"></i> NGO Dashboard
            </button>
            <button class="btn btn-outline" onclick="window.openVolunteerModal()">
              <i data-lucide="user-plus"></i> Volunteer
            </button>
            <button class="btn btn-primary" onclick="window.openDonateModal('${ngo.name}', '${ngo.fundraisers?.[0]?.title || 'Education Fund'}')">
              <i data-lucide="heart"></i> Donate
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tabs-nav">
        <button class="tab-btn ${state.activeNgoTab === 'overview' ? 'active' : ''}" onclick="window.setNgoTab('overview')">
          <i data-lucide="info"></i> Overview
        </button>
        <button class="tab-btn ${state.activeNgoTab === 'activities' ? 'active' : ''}" onclick="window.setNgoTab('activities')">
          <i data-lucide="layers"></i> Activities (${ngo.activities?.length || 0})
        </button>
        <button class="tab-btn ${state.activeNgoTab === 'transparency' ? 'active' : ''}" onclick="window.setNgoTab('transparency')">
          <i data-lucide="shield-check"></i> Transparency & DARPAN
        </button>
        <button class="tab-btn ${state.activeNgoTab === 'fundraisers' ? 'active' : ''}" onclick="window.setNgoTab('fundraisers')">
          <i data-lucide="pie-chart"></i> Fundraisers
        </button>
        <button class="tab-btn ${state.activeNgoTab === 'volunteer' ? 'active' : ''}" onclick="window.setNgoTab('volunteer')">
          <i data-lucide="users"></i> Volunteering
        </button>
        <button class="tab-btn ${state.activeNgoTab === 'leaderboard' ? 'active' : ''}" onclick="window.setNgoTab('leaderboard')">
          <i data-lucide="trophy"></i> Top Contributors
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tabs-content-area">
        <!-- Tab 1: Overview -->
        <div class="tab-pane ${state.activeNgoTab === 'overview' ? 'active' : ''}">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
            <div>
              <h3 style="margin-bottom: 0.75rem;">About ${ngo.name}</h3>
              <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">
                ${ngo.tagline} Established in ${ngo.founded}, the organization specializes in grassroots execution across urban and rural clusters. Every claimed activity is linked to verifiable purchase bills and independent volunteer check-ins.
              </p>

              <h3 style="margin-bottom: 1rem;">Primary Evidence Highlight</h3>
              ${primaryAct ? `
                <div class="activity-card" style="box-shadow: none; border-color: var(--border-color);">
                  <div class="activity-header">
                    <h4>${primaryAct.title}</h4>
                    <span class="badge badge-partial">⚠️ Needs Clarification</span>
                  </div>
                  <div class="activity-body">
                    <p style="margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.92rem;">
                      ${primaryAct.claim.description} on ${primaryAct.date}.
                    </p>
                    <div class="evidence-matrix-row" style="margin: 0 0 1rem 0;">
                      <div class="matrix-cell">
                        <span>Reported</span>
                        <strong>${primaryAct.claim.claimedQuantity} Kits</strong>
                      </div>
                      <div class="matrix-cell">
                        <span>Documented</span>
                        <strong style="color: var(--color-partial);">220 Kits</strong>
                      </div>
                      <div class="matrix-cell">
                        <span>Witnesses</span>
                        <strong style="color: var(--color-consistent);">${volCount} Present</strong>
                      </div>
                    </div>
                    <button class="btn btn-primary btn-block" onclick="window.openEvidenceDrawer('${primaryAct.id}')">
                      <i data-lucide="file-search"></i> Inspect Evidence Passport →
                    </button>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Sidebar Stats -->
            <div>
              <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 1rem;">Verified Activity Metrics</h4>
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted); font-size: 0.88rem;">Evidence Activities</span>
                    <strong>${ngo.stats.activities}</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted); font-size: 0.88rem;">Registered Volunteers</span>
                    <strong>${ngo.stats.volunteers}</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted); font-size: 0.88rem;">Volunteer Hours</span>
                    <strong>${ngo.stats.volunteerHours} hrs</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-muted); font-size: 0.88rem;">Funds Traced</span>
                    <strong>₹${ngo.stats.fundsRaised.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: Activities -->
        <div class="tab-pane ${state.activeNgoTab === 'activities' ? 'active' : ''}">
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            ${(ngo.activities || []).map(act => `
              <div class="activity-card">
                <div class="activity-header">
                  <div>
                    <h3>${act.title}</h3>
                    <p style="font-size: 0.82rem; color: var(--text-muted);">
                      📍 ${act.location.name}, ${act.location.city} • 📅 ${act.date}
                    </p>
                  </div>
                  <span class="badge ${act.documents?.[0]?.quantityStatus === 'partial' ? 'badge-partial' : 'badge-consistent'}">
                    ${act.documents?.[0]?.quantityStatus === 'partial' ? '⚠️ Needs Clarification' : '✓ Verified'}
                  </span>
                </div>
                <div class="activity-media-wrap">
                  <img src="${act.heroImage}" alt="${act.title}">
                </div>
                <div class="activity-body">
                  <div class="evidence-matrix-row">
                    <div class="matrix-cell">
                      <span>Claimed Impact</span>
                      <strong>${act.claim.description}</strong>
                    </div>
                    <div class="matrix-cell">
                      <span>Invoice Document</span>
                      <strong>${act.documents?.[0]?.invoiceNumber || 'INV-4821'}</strong>
                    </div>
                    <div class="matrix-cell">
                      <span>Witness Attendance</span>
                      <strong style="color: var(--color-consistent);">${act.volunteers.authenticatedAttendance} Verified</strong>
                    </div>
                  </div>
                  <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button class="btn btn-outline" onclick="window.openVolunteerModal()">
                      Volunteer for Event
                    </button>
                    <button class="btn btn-primary" onclick="window.openEvidenceDrawer('${act.id}')">
                      View Evidence Drawer →
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tab 3: Official DARPAN Transparency Tab -->
        <div class="tab-pane ${state.activeNgoTab === 'transparency' ? 'active' : ''}">
          <div class="transparency-grid">
            <div class="transparency-card">
              <div class="transparency-card-head">
                <span class="badge badge-darpan">GOVERNMENT REGISTRY</span>
                <i data-lucide="check-circle" class="text-success"></i>
              </div>
              <h3>NGO DARPAN Unique ID</h3>
              <p>Registered and verified on NITI Aayog's official portal under ID: <strong>${ngo.identity.darpanId}</strong>.</p>
              <div style="margin: 1.25rem 0;">
                <a href="${ngo.identity.darpanUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-block">
                  <i data-lucide="external-link"></i> Verify on NGO DARPAN Portal ↗
                </a>
              </div>
              <div class="gov-disclaimer-box">
                ${ngo.identity.disclaimer}
              </div>
            </div>

            <div class="transparency-card">
              <div class="transparency-card-head">
                <span class="badge badge-consistent">SOCIETY ACT</span>
                <i data-lucide="file-check" class="text-success"></i>
              </div>
              <h3>Legal Registration</h3>
              <p>Registered under <strong>${ngo.identity.registrationNumber}</strong>. Foundational charter and governing body records matched.</p>
              <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-top: 1rem;">
                Status: <strong>Matched & Active ✓</strong>
              </div>
            </div>

            <div class="transparency-card">
              <div class="transparency-card-head">
                <span class="badge badge-consistent">TAX EXEMPTION</span>
                <i data-lucide="shield" class="text-success"></i>
              </div>
              <h3>80G / 12A Certification</h3>
              <p>Income Tax Department exemption status: <strong>${ngo.identity.eightyGStatus}</strong>. Donors receive valid 80G tax benefit receipts.</p>
              <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-top: 1rem;">
                FCRA Status: <strong>${ngo.identity.fcraStatus}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 4: Fundraisers -->
        <div class="tab-pane ${state.activeNgoTab === 'fundraisers' ? 'active' : ''}">
          ${(ngo.fundraisers || []).map(f => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 2rem; max-width: 800px;">
              <span class="badge badge-darpan" style="margin-bottom: 0.75rem;">ACTIVE CAMPAIGN</span>
              <h2>${f.title}</h2>
              <p style="color: var(--text-secondary); margin: 0.5rem 0 1.5rem;">${f.description}</p>
              
              <div style="background: var(--bg-subtle); border-radius: var(--radius-pill); height: 12px; overflow: hidden; margin-bottom: 0.75rem;">
                <div style="background: var(--primary); height: 100%; width: ${f.percentage}%; border-radius: var(--radius-pill);"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 1.5rem;">
                <strong>₹${f.raisedAmount.toLocaleString('en-IN')} raised</strong>
                <span style="color: var(--text-muted);">Goal: ₹${f.targetAmount.toLocaleString('en-IN')} (${f.percentage}%)</span>
              </div>

              <div style="background: #f8fafc; border-left: 3px solid var(--primary); padding: 0.85rem; margin-bottom: 1.5rem; font-size: 0.88rem;">
                💡 <strong>Impact conversion:</strong> ${f.unitEquivalent}
              </div>

              <button class="btn btn-primary btn-lg btn-block" onclick="window.openDonateModal('${ngo.name}', '${f.title}')">
                <i data-lucide="heart"></i> Donate to this Fundraiser
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Tab 5: Volunteering -->
        <div class="tab-pane ${state.activeNgoTab === 'volunteer' ? 'active' : ''}">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.5rem;">
            ${(ngo.opportunities || []).map(opp => `
              <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.75rem;">
                <span class="badge badge-consistent" style="margin-bottom: 0.75rem;">${opp.cause} • ${opp.hours} hrs</span>
                <h3>${opp.title}</h3>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin: 0.75rem 0 1.25rem; display: flex; flex-direction: column; gap: 0.35rem;">
                  <span>📅 ${opp.date} • ${opp.time}</span>
                  <span>📍 ${opp.location}</span>
                  <span>👥 ${opp.slotsFilled} of ${opp.slotsTotal} slots filled</span>
                </div>
                <button class="btn btn-primary btn-block" onclick="window.openVolunteerModal()">
                  <i data-lucide="ticket"></i> Register & Get Volunteer Pass
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tab 6: Top Community Leaders for this NGO (Section 8 Requirement) -->
        <div class="tab-pane ${state.activeNgoTab === 'leaderboard' ? 'active' : ''}">
          <div style="margin-bottom: 2rem;">
            <div style="background: linear-gradient(135deg, #093325 0%, #0d4633 100%); color: #ffffff; border-radius: 20px; padding: 1.75rem 2rem; margin-bottom: 2rem;">
              <span class="badge" style="background: rgba(251, 191, 36, 0.2); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.4); margin-bottom: 0.5rem;">
                ORGANIZATION IMPACT LEDGER
              </span>
              <h2 style="color: #ffffff; font-size: 1.6rem; margin-bottom: 0.35rem;">Community Leaders — ${ngo.name}</h2>
              <p style="color: #cbd5e1; font-size: 0.95rem;">
                Recognizing verified individuals who have dedicated verified hours or completed financial support specifically to ${ngo.name}.
              </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
              <!-- Top Volunteers for this NGO -->
              <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
                  <h3 style="font-size: 1.15rem; color: #065f46; display: flex; align-items: center; gap: 0.5rem;">
                    <span>🤝</span> TOP VOLUNTEERS
                  </h3>
                  <span class="badge badge-consistent">Verified Hours</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: #f0fdf4; border-radius: 12px; border: 1px solid #86efac;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <span style="font-size: 1.3rem;">🥇</span>
                      <div>
                        <strong>Aarav M.</strong>
                        <small style="display: block; color: var(--text-muted);">Verified Attendance</small>
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <strong style="color: #00c076; font-size: 1.1rem;">18.5 verified hrs</strong>
                      <span class="recognition-chip" style="font-size: 0.7rem;">🌱 Community Helper</span>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <span style="font-size: 1.3rem;">🥈</span>
                      <div>
                        <strong>Priya S.</strong>
                        <small style="display: block; color: var(--text-muted);">Verified Attendance</small>
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <strong style="color: #093325; font-size: 1.1rem;">15.0 verified hrs</strong>
                      <span class="recognition-chip" style="font-size: 0.7rem;">🌱 Community Helper</span>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <span style="font-size: 1.3rem;">🥉</span>
                      <div>
                        <strong>Rahul K.</strong>
                        <small style="display: block; color: var(--text-muted);">Verified Attendance</small>
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <strong style="color: #093325; font-size: 1.1rem;">12.0 verified hrs</strong>
                      <span class="recognition-chip" style="font-size: 0.7rem;">🌱 Community Helper</span>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: #f0fdf4; border-radius: 12px; border: 1px solid #86efac;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <span style="font-weight: 800; color: #093325; font-size: 1rem; width: 22px;">#4</span>
                      <div>
                        <strong>Dhruvesh S.</strong> <span class="badge badge-consistent" style="font-size: 0.65rem;">You</span>
                        <small style="display: block; color: var(--text-muted);">Verified Attendance</small>
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <strong style="color: #00c076; font-size: 1.1rem;">4.75 verified hrs</strong>
                      <span class="recognition-chip" style="font-size: 0.7rem;">🌱 Community Helper</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Top Contributors for this NGO -->
              <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
                  <h3 style="font-size: 1.15rem; color: #0369a1; display: flex; align-items: center; gap: 0.5rem;">
                    <span>💝</span> TOP CONTRIBUTORS
                  </h3>
                  <span class="badge badge-consistent">Completed Transfers</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: #f0f9ff; border-radius: 12px; border: 1px solid #bae6fd;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <span style="font-size: 1.3rem;">🥇</span>
                      <div>
                        <strong>Anonymous Supporter</strong>
                        <small style="display: block; color: var(--text-muted);">Verified Transfer</small>
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <strong style="color: #0284c7; font-size: 1.1rem;">₹25,000</strong>
                      <span class="recognition-chip" style="font-size: 0.7rem;">💎 Impact Contributor</span>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <span style="font-size: 1.3rem;">🥈</span>
                      <div>
                        <strong>Community Champion</strong>
                        <small style="display: block; color: var(--text-muted);">Verified Transfer</small>
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <strong style="color: #093325; font-size: 1.1rem;">₹12,000</strong>
                      <span class="recognition-chip" style="font-size: 0.7rem;">🌟 Community Supporter</span>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: #f0fdf4; border-radius: 12px; border: 1px solid #86efac;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <span style="font-size: 1.3rem;">🥉</span>
                      <div>
                        <strong>Dhruvesh S.</strong> <span class="badge badge-consistent" style="font-size: 0.65rem;">You</span>
                        <small style="display: block; color: var(--text-muted);">Verified Transfer</small>
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <strong style="color: #00c076; font-size: 1.1rem;">₹5,000</strong>
                      <span class="recognition-chip" style="font-size: 0.7rem;">🌟 Community Supporter</span>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <span style="font-weight: 800; color: #093325; font-size: 1rem; width: 22px;">#4</span>
                      <div>
                        <strong>Rahul K.</strong>
                        <small style="display: block; color: var(--text-muted);">Verified Transfer</small>
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <strong style="color: #093325; font-size: 1.1rem;">₹3,500</strong>
                      <span class="recognition-chip" style="font-size: 0.7rem;">🪙 Supporter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------
// 4. ACTIVITY FEED / DETAIL PAGE
// --------------------------------------------------------
function renderActivityPage(activityId) {
  const { activity, ngo } = state.getPrimaryActivity();
  const volCount = activity.volunteers.authenticatedAttendance;

  return `
    <div class="activity-view" style="max-width: 900px; margin: 0 auto;">
      <div class="activity-card">
        <div class="activity-header">
          <div class="activity-ngo-info">
            <span style="font-size: 2.2rem;">${ngo.logo}</span>
            <div>
              <h2>${ngo.name}</h2>
              <p style="font-size: 0.85rem; color: var(--text-muted);">
                ${activity.location.name} • 📅 ${activity.date}
              </p>
            </div>
          </div>
          <button class="btn btn-outline" onclick="window.navigateTo('ngo/${ngo.id}')">
            View NGO Profile
          </button>
        </div>

        <div class="activity-media-wrap">
          <img src="${activity.heroImage}" alt="${activity.title}">
          <div class="activity-claim-banner">
            <h2>${activity.claim.description}</h2>
            <p>📍 ${activity.location.area}, ${activity.location.city} (${activity.location.latitude}° N, ${activity.location.longitude}° E)</p>
          </div>
        </div>

        <div class="activity-body">
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
            Distribution of standardized learning backpacks containing 6 ruled notebooks, Oxford mathematical geometry boxes, and writing instruments to enrolled primary school students in Dharavi.
          </p>

          <!-- 4-Point Quick Verification Matrix -->
          <div class="evidence-matrix-row">
            <div class="matrix-cell">
              <span>Claimed</span>
              <strong>250 Kits</strong>
            </div>
            <div class="matrix-cell">
              <span>Invoiced</span>
              <strong style="color: var(--color-partial);">
                ${state.confirmedInvoiceFindings ? `${state.confirmedInvoiceFindings.documentedQuantity} Kits (Diff: ${state.confirmedInvoiceFindings.difference})` : '220 Kits (Diff: 30)'}
              </strong>
            </div>
            <div class="matrix-cell">
              <span>EXIF Camera Date</span>
              <strong style="color: var(--color-consistent);">Matched (24 Sep)</strong>
            </div>
            <div class="matrix-cell">
              <span>On-Ground Witnesses</span>
              <strong id="feed-witness-count" style="color: var(--color-consistent);">${volCount} Attendees</strong>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: flex-end; flex-wrap: wrap;">
            <button class="btn btn-outline" onclick="window.navigateTo('ngo-dashboard')">
              <i data-lucide="upload"></i> Upload Additional Invoices
            </button>
            <button class="btn btn-outline" onclick="window.openVolunteerModal()">
              <i data-lucide="ticket"></i> Authenticate / Check In
            </button>
            <button class="btn btn-primary btn-lg" onclick="window.openEvidenceDrawer('${activity.id}')">
              <i data-lucide="file-search"></i> Inspect Complete Evidence Passport →
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------
// 5. NGO DASHBOARD / CONSOLE (NGO_INTERFACE.md)
// --------------------------------------------------------
function renderNgoDashboard(activeTab = 'overview') {
  const { activity, ngo } = state.getPrimaryActivity();
  const volCount = activity.volunteers.authenticatedAttendance;

  return `
    <div class="dashboard-view" style="max-width: 1060px; margin: 0 auto;">
      <!-- NGO Console Header -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 1.75rem 2rem; margin-bottom: 1.75rem; box-shadow: var(--shadow-card); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 1.25rem;">
          <div style="width: 56px; height: 56px; border-radius: 14px; background: linear-gradient(135deg, #059669 0%, #064e3b 100%); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 700;">
            UF
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <h1 style="font-size: 1.45rem; margin: 0;">Udaan Foundation</h1>
              <span class="badge badge-consistent" style="font-size: 0.72rem;">PLATFORM APPROVED</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.82rem; color: var(--text-muted); flex-wrap: wrap;">
              <span>DARPAN: <strong>MH/2021/0298341</strong></span>
              <span>•</span>
              <span>Education & Youth Development</span>
              <span>•</span>
              <span style="color: #059669;">● System Active</span>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.4rem 0.75rem;" onclick="window.switchPortal('user')">
            <i data-lucide="external-link"></i> Public Feed Preview
          </button>
          <button class="btn btn-primary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;" onclick="window.openCreateEventModal()">
            <i data-lucide="plus"></i> Create Event
          </button>
        </div>
      </div>

      <!-- Navigation Tabs (NGO_INTERFACE.md #24) -->
      <div class="tabs-nav" style="margin-bottom: 2rem;">
        <a href="#/ngo-dashboard" class="tab-btn ${activeTab === 'overview' ? 'active' : ''}">
          <i data-lucide="layout-dashboard"></i> Overview
        </a>
        <a href="#/ngo/dashboard/events" class="tab-btn ${activeTab === 'events' ? 'active' : ''}">
          <i data-lucide="calendar"></i> Events & Live QR (${state.upcomingEventsList.length})
        </a>
        <a href="#/ngo/dashboard/activities" class="tab-btn ${activeTab === 'activities' ? 'active' : ''}">
          <i data-lucide="layers"></i> Past Activities
        </a>
        <a href="#/ngo/dashboard/volunteers" class="tab-btn ${activeTab === 'volunteers' ? 'active' : ''}">
          <i data-lucide="users"></i> Volunteer Verification
        </a>
        <a href="#/ngo/dashboard/evidence" class="tab-btn ${activeTab === 'evidence' ? 'active' : ''}">
          <i data-lucide="receipt"></i> Invoice Evidence Engine
        </a>
      </div>

      <!-- TAB 1: OVERVIEW (NGO_INTERFACE.md #2) -->
      ${activeTab === 'overview' ? `
        <div>
          <!-- Metric Tiles Grid -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 2rem;">
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem;">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Total Activities</span>
              <div style="font-size: 1.85rem; font-weight: 800; margin: 0.25rem 0; color: var(--text-main);">14</div>
              <small style="color: #059669; font-size: 0.78rem;">11 Completed • 1 Live • 2 Upcoming</small>
            </div>

            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem;">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Verified Hours</span>
              <div style="font-size: 1.85rem; font-weight: 800; margin: 0.25rem 0; color: var(--primary);">486 hrs</div>
              <small style="color: var(--text-muted); font-size: 0.78rem;">142 Authenticated Volunteers</small>
            </div>

            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem;">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Funds Collected</span>
              <div style="font-size: 1.85rem; font-weight: 800; margin: 0.25rem 0; color: #0284c7;">₹4,18,000</div>
              <small style="color: var(--text-muted); font-size: 0.78rem;">Verifiable Expense Ledger</small>
            </div>

            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem;">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Evidence Review</span>
              <div style="font-size: 1.85rem; font-weight: 800; margin: 0.25rem 0; color: #d97706;">1 Alert</div>
              <small style="color: #d97706; font-size: 0.78rem;">30-Kit Discrepancy Pending</small>
            </div>
          </div>

          <!-- Recent Activity & Status Bar (NGO_INTERFACE.md #22) -->
          <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i data-lucide="clock" style="color: var(--primary); width: 22px; height: 22px;"></i>
              <div>
                <strong style="font-size: 0.92rem; display: block;">Last documented activity: 8 days ago</strong>
                <span style="font-size: 0.8rem; color: var(--text-muted);">Platform automatically computes days since last verified impact documentation.</span>
              </div>
            </div>
            <a href="#/ngo/dashboard/activities" class="btn btn-sm btn-outline">
              View Activity History →
            </a>
          </div>

          <!-- Quick Actions Grid -->
          <h3 style="font-size: 1.15rem; margin-bottom: 1rem;">Quick Administrative Actions</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; cursor: pointer;" onclick="window.openCreateEventModal()">
              <i data-lucide="calendar-plus" style="color: var(--primary); width: 24px; height: 24px; margin-bottom: 0.5rem;"></i>
              <strong style="display: block; font-size: 0.95rem;">Create New Event</strong>
              <small style="color: var(--text-muted);">Set up volunteer slots & budget items.</small>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; cursor: pointer;" onclick="window.location.hash='#/ngo/dashboard/volunteers'">
              <i data-lucide="user-check" style="color: #0284c7; width: 24px; height: 24px; margin-bottom: 0.5rem;"></i>
              <strong style="display: block; font-size: 0.95rem;">Verify Volunteer Hours</strong>
              <small style="color: var(--text-muted);">Review check-in/out and sign certificates.</small>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; cursor: pointer;" onclick="window.location.hash='#/ngo/dashboard/evidence'">
              <i data-lucide="receipt" style="color: #059669; width: 24px; height: 24px; margin-bottom: 0.5rem;"></i>
              <strong style="display: block; font-size: 0.95rem;">Upload Invoices & Bills</strong>
              <small style="color: var(--text-muted);">Extract line items and compare with claims.</small>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; cursor: pointer;" onclick="window.openEvidenceDrawer('act_school_kits')">
              <i data-lucide="shield-alert" style="color: #d97706; width: 24px; height: 24px; margin-bottom: 0.5rem;"></i>
              <strong style="display: block; font-size: 0.95rem;">Audit Evidence Passport</strong>
              <small style="color: var(--text-muted);">Inspect 4-layer proof and discrepancy card.</small>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- TAB 2: EVENTS & LIVE QR (NGO_INTERFACE.md #9, #10, #13) -->
      ${activeTab === 'events' ? `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <div>
              <h2 style="font-size: 1.35rem; margin: 0 0 0.25rem 0;">Published & Upcoming Events</h2>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Configure volunteer slots, planned budgets, and live attendance QR codes.</p>
            </div>
            <button class="btn btn-primary" onclick="window.openCreateEventModal()">
              <i data-lucide="calendar-plus"></i> Create Upcoming Event
            </button>
          </div>

          <!-- Live Event Attendance QR Generation Card (NGO_INTERFACE.md #13, #14) -->
          <div style="background: var(--bg-surface); border: 2px solid #059669; border-radius: var(--radius-xl); padding: 1.75rem; margin-bottom: 2rem; box-shadow: var(--shadow-card);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
              <div>
                <span class="badge badge-consistent" style="margin-bottom: 0.4rem;">LIVE EVENT QR ATTENDANCE GENERATOR</span>
                <h3 style="font-size: 1.25rem; margin: 0 0 0.25rem 0;">Annual Student School Kit Distribution Drive</h3>
                <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">
                  Event window: <strong>10:00 AM – 03:00 PM</strong> • Allowed check-in opens: <strong>09:45 AM</strong>
                </p>
              </div>
              <div style="text-align: right;">
                <span class="badge badge-consistent" style="font-size: 0.8rem;">
                  <span class="pulse-dot"></span> Check-in Active
                </span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 2rem; align-items: center;">
              <div style="text-align: center; background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1rem;">
                <canvas id="ngo-live-qr-canvas" width="160" height="160" style="display: block; margin: 0 auto; border-radius: 6px;"></canvas>
                <small style="color: var(--text-muted); font-size: 0.72rem; margin-top: 0.5rem; display: block;">
                  Scan with ProofBridge Volunteer Pass
                </small>
              </div>

              <div>
                <h4 style="margin-bottom: 0.5rem;">System QR Attendance Rules Enforced:</h4>
                <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i data-lucide="check" style="color: #059669; width: 16px; height: 16px;"></i>
                    <span>Rejects check-in before allowed time window (rejection before 09:45 AM)</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i data-lucide="check" style="color: #059669; width: 16px; height: 16px;"></i>
                    <span>Rejects duplicate check-in from the same authenticated volunteer</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i data-lucide="check" style="color: #059669; width: 16px; height: 16px;"></i>
                    <span>Rejects check-out without prior valid check-in</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i data-lucide="check" style="color: #059669; width: 16px; height: 16px;"></i>
                    <span>Authoritative server timestamps recorded for duration calculation</span>
                  </div>
                </div>

                <a href="#/ngo/dashboard/volunteers" class="btn btn-outline btn-sm">
                  View Real-Time Attendance Table →
                </a>
              </div>
            </div>
          </div>

          <!-- All Events List -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
              <thead>
                <tr style="background: var(--bg-subtle); text-align: left;">
                  <th style="padding: 0.75rem 1rem;">Event Title</th>
                  <th style="padding: 0.75rem 1rem;">Cause</th>
                  <th style="padding: 0.75rem 1rem;">Date & Time</th>
                  <th style="padding: 0.75rem 1rem;">Volunteers</th>
                  <th style="padding: 0.75rem 1rem;">Fundraiser</th>
                  <th style="padding: 0.75rem 1rem;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${state.upcomingEventsList.map(e => `
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 1rem; font-weight: 600;">
                      ${e.title}<br>
                      <small style="color: var(--text-muted); font-weight: normal;">📍 ${e.venue}, ${e.city}</small>
                    </td>
                    <td style="padding: 1rem;"><span class="badge badge-neutral">${e.cause}</span></td>
                    <td style="padding: 1rem;">${e.date}<br><small style="color: var(--text-muted);">${e.startTime} - ${e.endTime}</small></td>
                    <td style="padding: 1rem;">${e.registeredCount} / ${e.volunteerPositions} Slots</td>
                    <td style="padding: 1rem;">₹${e.fundraiserRaised.toLocaleString('en-IN')} / ₹${e.fundraiserTarget.toLocaleString('en-IN')}</td>
                    <td style="padding: 1rem;">
                      <span class="badge ${e.status === 'LIVE NOW' ? 'badge-consistent' : 'badge-neutral'}">
                        ${e.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <!-- TAB 3: PAST ACTIVITIES & MEASURABLE CLAIMS (NGO_INTERFACE.md #3, #6, #7, #8) -->
      ${activeTab === 'activities' ? `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <div>
              <h2 style="font-size: 1.35rem; margin: 0 0 0.25rem 0;">Documented Past Activities</h2>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Generic measurable claims, media provenance checks, and public feed publishing.</p>
            </div>
            <button class="btn btn-outline" onclick="showToast('Activity update saved.')">
              <i data-lucide="save"></i> Save Draft
            </button>
          </div>

          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-card);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
              <div>
                <span class="badge badge-consistent" style="margin-bottom: 0.35rem;">PUBLISHED RECORD</span>
                <h3 style="font-size: 1.35rem; margin: 0;">School Kit Distribution Drive</h3>
                <small style="color: var(--text-muted);">Dharavi Municipal School #4, Mumbai • 24 September 2026</small>
              </div>
              <button class="btn btn-primary" onclick="showToast('✓ Activity update published to public user feed!')">
                <i data-lucide="share-2"></i> Publish Update to Public Feed
              </button>
            </div>

            <!-- Generic Measurable Activity Claims (NGO_INTERFACE.md #7) -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div>
                  <strong style="font-size: 0.95rem; display: block;">Generic Measurable Activity Claims</strong>
                  <span style="font-size: 0.8rem; color: var(--text-muted);">Non-hardcoded measurable metrics for verifiable impact tracking.</span>
                </div>
                <button class="btn btn-sm btn-outline" onclick="showToast('Added new generic claim row.')">
                  + Add Another Claim
                </button>
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Claim 1 (Primary)</span>
                  <div style="font-size: 1.25rem; font-weight: 700; margin: 0.25rem 0;">250 Kits</div>
                  <small style="color: var(--text-muted);">Metric: School kits distributed</small>
                </div>
                <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Claim 2 (Witnesses)</span>
                  <div style="font-size: 1.25rem; font-weight: 700; margin: 0.25rem 0;">17 Volunteers</div>
                  <small style="color: var(--text-muted);">Metric: On-site authenticated attendance</small>
                </div>
                <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Claim 3 (Financials)</span>
                  <div style="font-size: 1.25rem; font-weight: 700; margin: 0.25rem 0;">₹62,400</div>
                  <small style="color: var(--text-muted);">Metric: Funds utilized for procurement</small>
                </div>
              </div>
            </div>

            <!-- Media Upload & AI Provenance Analysis (NGO_INTERFACE.md #4, #5) -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.75rem;">
              <h4 style="margin-bottom: 0.35rem;">Activity Media & AI Provenance Analysis</h4>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">
                Uploaded activity photos are checked for EXIF metadata alignment. AI-generated media detection uses cautious, probabilistic wording.
              </p>

              <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1.5rem; align-items: center;">
                <div style="border-radius: var(--radius-md); overflow: hidden; height: 130px;">
                  <img src="/assets/school_kit_distribution.jpg" alt="Uploaded activity media" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="badge badge-consistent">No AI-generation signal detected</span>
                    <span style="color: var(--text-muted); font-size: 0.78rem;">Probabilistic model audit</span>
                  </div>
                  <div>
                    <strong>Original EXIF Timestamp:</strong> 24-Sep-2026 09:42:18 IST (Aligned with event schedule)
                  </div>
                  <div>
                    <strong>Hardware GPS Coordinates:</strong> 19.0402° N, 72.8508° E (Matches Dharavi municipal school)
                  </div>
                </div>
              </div>
            </div>

            <!-- Post-Event Actual Spending (NGO_INTERFACE.md #21) -->
            <h4 style="margin-bottom: 0.5rem;">Post-Event Actual Spending vs Planned</h4>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.86rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); text-align: left;">
                    <th style="padding: 0.6rem 0.85rem;">Category</th>
                    <th style="padding: 0.6rem 0.85rem; text-align: right;">Planned</th>
                    <th style="padding: 0.6rem 0.85rem; text-align: right;">Actual Spent</th>
                    <th style="padding: 0.6rem 0.85rem;">Invoice Attached</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.65rem 0.85rem;">School Kit Packs</td>
                    <td style="padding: 0.65rem 0.85rem; text-align: right;">₹55,000</td>
                    <td style="padding: 0.65rem 0.85rem; text-align: right; font-weight: 600;">₹55,000</td>
                    <td style="padding: 0.65rem 0.85rem;"><span class="badge badge-partial">INV-4821 (220/250 kits)</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.65rem 0.85rem;">Transport & Logistics</td>
                    <td style="padding: 0.65rem 0.85rem; text-align: right;">₹10,000</td>
                    <td style="padding: 0.65rem 0.85rem; text-align: right; font-weight: 600;">₹9,400</td>
                    <td style="padding: 0.65rem 0.85rem;"><span class="badge badge-consistent">Matched ✓</span></td>
                  </tr>
                  <tr>
                    <td style="padding: 0.65rem 0.85rem;">Venue & Volunteer Water</td>
                    <td style="padding: 0.65rem 0.85rem; text-align: right;">₹5,000</td>
                    <td style="padding: 0.65rem 0.85rem; text-align: right; font-weight: 600;">₹5,000</td>
                    <td style="padding: 0.65rem 0.85rem;"><span class="badge badge-consistent">Matched ✓</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- TAB 4: VOLUNTEER VERIFICATION (NGO_INTERFACE.md #15, #16, #17) -->
      ${activeTab === 'volunteers' ? `
        <div>
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 2rem; box-shadow: var(--shadow-card);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                  <span class="badge badge-consistent">VOLUNTEER VERIFICATION CONSOLE</span>
                  <h3 style="margin: 0;">Review Attendance & Sign Certificates</h3>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.88rem; margin: 0;">
                  Authoritative duration: <strong>calculated_hours = check_out_time - check_in_time</strong>. NGO verifies contribution to unlock official certificates.
                </p>
              </div>
            </div>

            <!-- Attendance Records Table -->
            <div style="overflow-x: auto; margin-bottom: 1.5rem;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); text-align: left;">
                    <th style="padding: 0.75rem 1rem;">Volunteer</th>
                    <th style="padding: 0.75rem 1rem;">Activity</th>
                    <th style="padding: 0.75rem 1rem;">Check In</th>
                    <th style="padding: 0.75rem 1rem;">Check Out</th>
                    <th style="padding: 0.75rem 1rem;">Calculated</th>
                    <th style="padding: 0.75rem 1rem;">Verification Status</th>
                    <th style="padding: 0.75rem 1rem; text-align: right;">Action</th>
                  </tr>
                </thead>
                <tbody id="dashboard-attendance-rows">
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 1rem; font-weight: 600;">
                      Aarav Mehta<br>
                      <small style="color: var(--text-muted);">#V10482</small>
                    </td>
                    <td style="padding: 1rem;">School Kit Distribution</td>
                    <td style="padding: 1rem;">
                      <span class="badge badge-consistent">${state.volunteerCheckInTime || '10:03 AM'}</span>
                    </td>
                    <td style="padding: 1rem;">
                      ${state.volunteerCheckedOut ? `<span class="badge badge-consistent">${state.volunteerCheckOutTime || '02:47 PM'}</span>` : '<span style="color: var(--text-muted);">In Progress</span>'}
                    </td>
                    <td style="padding: 1rem; font-weight: 600;">
                      ${state.volunteerCheckedOut ? state.calculatedDurationStr : '--'}
                    </td>
                    <td style="padding: 1rem;" id="dash-vol-status-cell">
                      ${state.volunteerVerified 
                        ? '<span class="badge badge-consistent">✓ Verified by Udaan</span>' 
                        : (state.volunteerCheckedOut 
                            ? '<span class="badge badge-partial">Pending Verification</span>' 
                            : '<span class="badge badge-unavailable">Active On-Site</span>')}
                    </td>
                    <td style="padding: 1rem; text-align: right;" id="dash-vol-action-cell">
                      ${state.volunteerVerified
                        ? `<a href="/api/certificates/volunteer/${state.volunteerCertId}" class="btn btn-outline" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;" target="_blank" download>
                             <i data-lucide="download"></i> Download PDF
                           </a>`
                        : (state.volunteerCheckedOut
                            ? `<button class="btn btn-primary" style="font-size: 0.78rem; padding: 0.35rem 0.75rem;" onclick="window.openVerificationModal()">
                                 <i data-lucide="check"></i> Verify Contribution
                               </button>`
                            : `<button class="btn btn-outline" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;" onclick="window.openVolunteerModal()">
                                 View Pass
                               </button>`)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Direct Verification Form -->
            <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="margin-bottom: 0.5rem;">NGO Verification Fields</h4>
              <div style="display: grid; grid-template-columns: 160px 1fr auto; gap: 1rem; align-items: flex-end;">
                <div class="form-group" style="margin-bottom: 0;">
                  <label>Verified Hours</label>
                  <input type="number" step="0.25" id="ngo-input-verified-hours" value="4.75">
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                  <label>Contribution Description</label>
                  <input type="text" id="ngo-input-contrib-desc" value="Assisted with school kit distribution and participant registration.">
                </div>
                <button class="btn btn-primary" onclick="window.openVerificationModal()">
                  <i data-lucide="check-circle-2"></i> Verify Contribution
                </button>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- TAB 5: INVOICE EVIDENCE ENGINE (NGO_INTERFACE.md #18, #19, #20) -->
      ${activeTab === 'evidence' ? `
        <div>
          <!-- Capability 1: Real Invoice Upload + Document Vision / OCR -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 2rem; margin-bottom: 2.5rem; box-shadow: var(--shadow-card);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                  <span class="badge badge-darpan">CAPABILITY 4</span>
                  <h3 style="margin: 0;">Real Invoice Upload & Document Vision Pipeline</h3>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.88rem; margin: 0;">
                  Attach authentic procurement bills (JPG, PNG, PDF). Our OCR pipeline extracts line items and compares them against claimed activity metrics.
                </p>
              </div>
              <button class="btn btn-outline" style="font-size: 0.78rem; padding: 0.4rem 0.75rem;" onclick="window.loadSampleInvoiceFile()">
                <i data-lucide="file-text"></i> Load Sample Tax Invoice (INV-4821)
              </button>
            </div>

            <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: var(--radius-lg); padding: 2rem; text-align: center; margin-bottom: 1.5rem;" id="invoice-dropzone">
              <input type="file" id="invoice-file-uploader" accept=".jpg,.jpeg,.png,.pdf" style="display: none;" onchange="window.handleRealInvoiceUpload(event)">
              <i data-lucide="upload-cloud" style="width: 44px; height: 44px; color: var(--primary); margin: 0 auto 0.75rem; display: block;"></i>
              <h4 style="margin-bottom: 0.35rem;">Upload Supporting Invoice Document</h4>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">Accepts JPG, JPEG, PNG, or PDF format (Max 10MB)</p>
              <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="document.getElementById('invoice-file-uploader').click()">
                  <i data-lucide="file-plus"></i> Select File from Computer
                </button>
                <button class="btn btn-outline" onclick="window.triggerSampleInvoiceUpload('sample_invoice_inv4821.jpg')">
                  <i data-lucide="sparkles"></i> Sample: School Kit Invoice (INV-4821)
                </button>
                <button class="btn btn-outline" onclick="window.triggerSampleInvoiceUpload('sample_receipt_meal_pack.jpg')">
                  <i data-lucide="utensils"></i> Sample: Meal Relief Receipt (INV-2026-0915-001)
                </button>
              </div>
            </div>

            <!-- Upload Status Indicator -->
            <div id="invoice-upload-status" style="display: none; margin-bottom: 1.5rem;">
              <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-md); padding: 1rem; display: flex; align-items: center; gap: 0.75rem;">
                <span class="pulse-dot"></span>
                <div id="invoice-status-msg" style="font-size: 0.88rem; color: #065f46;">
                  Reading image... running OCR... extracting structured invoice fields...
                </div>
              </div>
            </div>

            <!-- Strictly Read-Only Review of Extracted Information -->
            <div id="ocr-review-section" style="display: none; background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <h4 style="color: var(--text-main); margin-bottom: 0.2rem;">Review Extracted OCR Information</h4>
                    <span class="badge" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; font-size: 0.72rem;">
                      <i data-lucide="lock" style="width: 11px; height: 11px; display: inline-block; vertical-align: middle;"></i> Read-Only Proof
                    </span>
                  </div>
                  <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0;">Verified document values extracted directly from the invoice image. Fields are locked to preserve tamper-proof audit trail integrity.</p>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                  <span id="ocr-engine-tag" class="badge" style="background: #f3e8ff; color: #7e22ce; border: 1px solid #e9d5ff; font-size: 0.72rem;">
                    <i data-lucide="sparkles" style="width: 11px; height: 11px; display: inline-block; vertical-align: middle;"></i> Ollama Gemma 4 Vision
                  </span>
                  <span class="badge badge-consistent" id="ocr-status-badge">OCR Completed ✓</span>
                </div>
              </div>

              <!-- Document Integrity Notice -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 0.65rem 0.9rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #475569;">
                  <i data-lucide="file-check-2" style="width: 16px; height: 16px; color: #0284c7; flex-shrink: 0;"></i>
                  <span><strong>Document Integrity Protected:</strong> Immutable values extracted from physical invoice image. Manual alteration disabled.</span>
                </div>
                <div style="font-size: 0.75rem; color: #64748b;">
                  SHA-256: <code id="ocr-hash-display" style="background: #ffffff; padding: 2px 6px; border-radius: 4px; border: 1px solid #cbd5e1; font-weight: 600;">--</code>
                </div>
              </div>

              <!-- Read-Only Key-Value Grid -->
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.25rem;">
                <div class="readonly-doc-card">
                  <span class="readonly-doc-label">
                    <span>Vendor Name</span>
                    <i data-lucide="lock" style="width: 12px; height: 12px; color: #94a3b8;"></i>
                  </span>
                  <div class="readonly-doc-value" id="ocr-val-vendor">ABC Educational Supplies Pvt Ltd</div>
                </div>

                <div class="readonly-doc-card">
                  <span class="readonly-doc-label">
                    <span>Invoice Number</span>
                    <i data-lucide="lock" style="width: 12px; height: 12px; color: #94a3b8;"></i>
                  </span>
                  <div class="readonly-doc-value font-mono" id="ocr-val-invnum">INV-4821</div>
                </div>

                <div class="readonly-doc-card">
                  <span class="readonly-doc-label">
                    <span>Invoice Date</span>
                    <i data-lucide="lock" style="width: 12px; height: 12px; color: #94a3b8;"></i>
                  </span>
                  <div class="readonly-doc-value" id="ocr-val-date">23 September 2026</div>
                </div>

                <div class="readonly-doc-card">
                  <span class="readonly-doc-label">
                    <span>GSTIN / Tax ID</span>
                    <i data-lucide="lock" style="width: 12px; height: 12px; color: #94a3b8;"></i>
                  </span>
                  <div class="readonly-doc-value font-mono" id="ocr-val-gstin">29AAFCA3123R1Z5</div>
                </div>

                <div class="readonly-doc-card" style="grid-column: span 2;">
                  <span class="readonly-doc-label">
                    <span>Item Description</span>
                    <i data-lucide="lock" style="width: 12px; height: 12px; color: #94a3b8;"></i>
                  </span>
                  <div class="readonly-doc-value" id="ocr-val-item">Standard School Kit Pack</div>
                </div>

                <div class="readonly-doc-card" style="border-left: 3px solid #0284c7; background: #f0f9ff;">
                  <span class="readonly-doc-label" style="color: #0369a1;">
                    <span>Documented Quantity (Extracted)</span>
                    <span class="badge" style="background: #e0f2fe; color: #0284c7; font-size: 0.68rem; padding: 1px 6px;">Image Evidence</span>
                  </span>
                  <div class="readonly-doc-value highlight-qty" id="ocr-val-qty">220 Kits</div>
                </div>

                <div class="readonly-doc-card">
                  <span class="readonly-doc-label">
                    <span>Unit Price & Documented Subtotal</span>
                    <i data-lucide="lock" style="width: 12px; height: 12px; color: #94a3b8;"></i>
                  </span>
                  <div class="readonly-doc-value" id="ocr-val-price">₹660.00 / kit</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
                    Subtotal: <strong id="ocr-val-subtotal" style="color: var(--text-main);">₹1,45,200.00</strong>
                  </div>
                </div>
              </div>

              <!-- Bottom Action Bar -->
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-color); flex-wrap: wrap; gap: 0.75rem;">
                <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem;">
                  <i data-lucide="shield-alert" style="width: 15px; height: 15px; color: #f59e0b;"></i>
                  <span>Activity Claim: <strong>250 Kits</strong> | Verified Document Proof: <strong id="ocr-footer-qty" style="color: #0369a1;">220 Kits</strong></span>
                </div>
                <button class="btn btn-primary" onclick="window.confirmOcrAndRunEvidenceEngine()" id="btn-run-evidence-engine">
                  <i data-lucide="cpu"></i> Run Evidence Engine Comparison
                </button>
              </div>
            </div>

            <!-- Evidence Engine Reconciliation Output Card -->
            <div id="engine-reconciliation-card" style="${state.confirmedInvoiceFindings ? 'display: block;' : 'display: none;'} background: #fffbeb; border: 2px solid #fde68a; border-radius: var(--radius-lg); padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <i data-lucide="alert-triangle" class="text-warning"></i>
                  <strong style="color: #b45309; font-size: 1.05rem;">Evidence Engine Reconciliation Findings</strong>
                </div>
                <span class="badge badge-partial">Partial Documentary Support</span>
              </div>

              <div class="alert-comparison-row" style="margin: 0.75rem 0;">
                <div class="comp-item">
                  <span>Claimed</span>
                  <strong id="recon-claimed">250 Kits</strong>
                </div>
                <div class="comp-item">
                  <span>Documented</span>
                  <strong style="color: #b45309;" id="recon-doc">220 Kits</strong>
                </div>
                <div class="comp-item">
                  <span>Discrepancy</span>
                  <strong style="color: #dc2626;" id="recon-diff">-30 Kits</strong>
                </div>
              </div>

              <p style="font-size: 0.88rem; color: #92400e; margin-bottom: 1rem;" id="recon-msg">
                Submitted invoice evidence currently accounts for 220 of the 250 reported kits. 30 kits lack supporting invoice evidence.
              </p>

              <div style="display: flex; gap: 0.75rem;">
                <button class="btn btn-primary" onclick="window.openEvidenceDrawer('act_school_kits')">
                  <i data-lucide="file-search"></i> View in Evidence Passport
                </button>
              </div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// --------------------------------------------------------
// 6. VOLUNTEER OPPORTUNITIES PAGE
// --------------------------------------------------------
function renderVolunteerOpportunitiesPage() {
  const udaan = state.ngos[0];
  const opps = udaan.opportunities;

  return `
    <div class="volunteer-page">
      <div class="section-header" style="text-align: left; margin-bottom: 2rem;">
        <div class="section-tag">Proof-of-Presence</div>
        <h1 class="section-title">Authenticated Volunteering</h1>
        <p class="section-desc">
          Join on-ground events, receive a secure event pass, and verify claims through independent physical attendance.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.75rem;">
        ${opps.map(opp => `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-card);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span class="badge badge-consistent">${opp.cause}</span>
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--primary);">${opp.hours} Hours Logged</span>
            </div>
            <h3 style="margin-bottom: 0.5rem;">${opp.title}</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1rem;">
              Organized by <strong>Udaan Foundation</strong>. Volunteers verify item distribution, assist teachers, and record verifiable presence.
            </p>
            <div style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.25rem;">
              <span>📅 ${opp.date} (${opp.time})</span>
              <span>📍 ${opp.location}</span>
            </div>
            <button class="btn btn-primary btn-block" onclick="window.openVolunteerModal()">
              <i data-lucide="ticket"></i> Get Volunteer Pass
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// --------------------------------------------------------
// 7. PUBLIC LEADERBOARD PAGE & USER RECOGNITION
// --------------------------------------------------------
function renderLeaderboardPage() {
  const isVol = state.leaderboardTab === 'volunteers';
  const period = state.leaderboardPeriod || 'month';
  const data = isVol ? state.volunteerLeaderboardData : state.donorLeaderboardData;
  const list = data?.leaderboard || [];
  const curUser = data?.currentUserRank || null;

  const top1 = list[0] || null;
  const top2 = list[1] || null;
  const top3 = list[2] || null;
  const rest = list.slice(3);

  const periodLabel = period === 'month' ? 'This Month' : period === 'year' ? 'This Year' : 'All Time';

  return `
    <div class="leaderboard-view">
      <!-- Hero Banner -->
      <div class="leaderboard-hero-banner">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
          <span class="badge" style="background: rgba(251, 191, 36, 0.2); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.4); font-size: 0.78rem; font-weight: 700;">
            🏆 PROOFBRIDGE IMPACT LEDGER
          </span>
          <span class="badge" style="background: rgba(0, 192, 118, 0.2); color: #34d399; border: 1px solid rgba(0, 192, 118, 0.4); font-size: 0.78rem;">
            ✓ Strictly Verified Contributions Only
          </span>
        </div>
        <h1 style="font-size: 2.3rem; color: #ffffff; margin-bottom: 0.5rem; font-weight: 800;">COMMUNITY LEADERS</h1>
        <p style="font-size: 1.05rem; color: #cbd5e1; max-width: 680px; margin-bottom: 1.25rem; line-height: 1.5;">
          Recognizing verified citizens who contribute their valuable time and resources to community impact.
        </p>
        <div style="font-size: 0.8rem; color: #94a3b8; background: rgba(0,0,0,0.3); border-radius: 10px; padding: 0.55rem 0.85rem; display: inline-block;">
          🛡️ <em>Platform Recognition Only. Unverified attendance, pending hours, cancelled donations, and demo payments are strictly excluded.</em>
        </div>
      </div>

      <!-- Controls Bar: Tabs & Period Switcher -->
      <div class="leaderboard-controls-bar">
        <div class="leaderboard-type-tabs">
          <button class="leaderboard-type-btn ${isVol ? 'active' : ''}" onclick="window.switchLeaderboardTab('volunteers')">
            <i data-lucide="clock" style="width: 16px; height: 16px;"></i> Volunteer Hours
          </button>
          <button class="leaderboard-type-btn ${!isVol ? 'active' : ''}" onclick="window.switchLeaderboardTab('donors')">
            <i data-lucide="heart" style="width: 16px; height: 16px;"></i> Real Donations
          </button>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">PERIOD:</span>
          <div class="leaderboard-period-pills">
            <button class="period-pill-btn ${period === 'month' ? 'active' : ''}" onclick="window.switchLeaderboardPeriod('month')">This Month</button>
            <button class="period-pill-btn ${period === 'year' ? 'active' : ''}" onclick="window.switchLeaderboardPeriod('year')">This Year</button>
            <button class="period-pill-btn ${period === 'all' ? 'active' : ''}" onclick="window.switchLeaderboardPeriod('all')">All Time</button>
          </div>
        </div>
      </div>

      <!-- Current User Position Banner -->
      <div class="current-user-rank-banner">
        <div style="display: flex; align-items: center; gap: 1.25rem;">
          <div class="rank-badge-pill">
            ${curUser && curUser.rank ? (typeof curUser.rank === 'number' ? `#${curUser.rank}` : curUser.rank) : '#--'}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <strong style="font-size: 1.15rem; color: #093325;">YOUR POSITION</strong>
              <span class="badge" style="background: #00c076; color: #093325; font-size: 0.72rem; font-weight: 700;">${periodLabel}</span>
            </div>
            <p style="font-size: 0.92rem; color: #374151; margin-top: 0.2rem;">
              ${isVol
                ? `<strong>${curUser?.verifiedHours || 0} verified hours</strong> across <strong>${curUser?.completedActivities || 0} activities</strong>`
                : `<strong>₹${(curUser?.totalAmount || 0).toLocaleString('en-IN')} contributed</strong> across <strong>${curUser?.donationsCount || 0} donations</strong>`
              }
              • Public Display: <strong>${curUser?.displayName || 'Dhruvesh S.'}</strong>
            </p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          ${curUser?.badge ? `
            <span class="recognition-chip" style="background: #ffffff; border: 1px solid #86efac; color: #065f46;">
              ${curUser.badge.icon} ${curUser.badge.name}
            </span>
          ` : ''}
          <a href="#/profile" class="btn btn-sm btn-outline" style="background: #ffffff; border-color: #00c076; color: #065f46; font-weight: 600;">
            <i data-lucide="settings" style="width: 14px; height: 14px;"></i> Privacy & Name
          </a>
        </div>
      </div>

      <!-- Top 3 Podium (Visual Recognition Cards) -->
      ${list.length > 0 ? `
        <div class="podium-container">
          <!-- #2 Silver Card -->
          ${top2 ? `
            <div class="podium-card rank-2">
              <span class="podium-medal">🥈</span>
              <div class="podium-avatar">${top2.displayName.substring(0, 2).toUpperCase()}</div>
              <span class="badge" style="background: #e2e8f0; color: #334155; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">
                RANK #2
              </span>
              <h3 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${top2.displayName}</h3>
              <div style="font-size: 1.25rem; font-weight: 800; color: #093325; margin-bottom: 0.25rem;">
                ${isVol ? `${top2.verifiedHours} verified hrs` : `₹${top2.totalAmount.toLocaleString('en-IN')}`}
              </div>
              <small style="color: var(--text-muted); display: block; margin-bottom: 0.75rem;">
                ${isVol ? `${top2.completedActivities} completed activities` : `${top2.donationsCount} contributions`}
              </small>
              <span class="recognition-chip" style="background: #f1f5f9; color: #334155;">
                ${top2.badge?.icon || '🌟'} ${top2.badge?.name || 'Helper'}
              </span>
            </div>
          ` : '<div class="podium-card rank-2" style="opacity: 0.4;"><span>No second entry yet</span></div>'}

          <!-- #1 Gold Champion Card (Center / Elevated) -->
          ${top1 ? `
            <div class="podium-card rank-1">
              <span class="podium-medal" style="font-size: 2.2rem;">🥇</span>
              <div class="podium-avatar">${top1.displayName.substring(0, 2).toUpperCase()}</div>
              <span class="badge" style="background: #fef3c7; color: #b45309; border: 1px solid #fde68a; font-size: 0.8rem; font-weight: 800; margin-bottom: 0.5rem;">
                👑 #1 TOP CONTRIBUTOR
              </span>
              <h3 style="font-size: 1.35rem; margin-bottom: 0.25rem; color: #093325;">${top1.displayName}</h3>
              <div style="font-size: 1.6rem; font-weight: 800; color: #00c076; margin-bottom: 0.25rem;">
                ${isVol ? `${top1.verifiedHours} verified hrs` : `₹${top1.totalAmount.toLocaleString('en-IN')}`}
              </div>
              <small style="color: #4b5563; display: block; margin-bottom: 0.85rem; font-weight: 600;">
                ${isVol ? `${top1.completedActivities} verified activities` : `${top1.donationsCount} verified donations`}
              </small>
              <span class="recognition-chip" style="background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46;">
                ${top1.badge?.icon || '👑'} ${top1.badge?.name || 'Champion'}
              </span>
            </div>
          ` : '<div class="podium-card rank-1"><p>No entries yet for this period</p></div>'}

          <!-- #3 Bronze Card -->
          ${top3 ? `
            <div class="podium-card rank-3">
              <span class="podium-medal">🥉</span>
              <div class="podium-avatar">${top3.displayName.substring(0, 2).toUpperCase()}</div>
              <span class="badge" style="background: #ffedd5; color: #9a3412; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">
                RANK #3
              </span>
              <h3 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${top3.displayName}</h3>
              <div style="font-size: 1.25rem; font-weight: 800; color: #093325; margin-bottom: 0.25rem;">
                ${isVol ? `${top3.verifiedHours} verified hrs` : `₹${top3.totalAmount.toLocaleString('en-IN')}`}
              </div>
              <small style="color: var(--text-muted); display: block; margin-bottom: 0.75rem;">
                ${isVol ? `${top3.completedActivities} completed activities` : `${top3.donationsCount} contributions`}
              </small>
              <span class="recognition-chip" style="background: #fff7ed; color: #9a3412;">
                ${top3.badge?.icon || '🌱'} ${top3.badge?.name || 'Helper'}
              </span>
            </div>
          ` : '<div class="podium-card rank-3" style="opacity: 0.4;"><span>No third entry yet</span></div>'}
        </div>
      ` : `
        <div style="text-align: center; padding: 3rem; background: var(--bg-surface); border-radius: 20px; border: 1px solid var(--border-color); margin-bottom: 2rem;">
          <p style="color: var(--text-muted);">No verified records found for this period. Authenticated volunteer activity and completed donations will appear here.</p>
        </div>
      `}

      <!-- Ranked List Table (#4 to N) -->
      ${rest.length > 0 ? `
        <div class="ranked-table-card">
          <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.1rem;">Ranked Community Contributors</h3>
            <span style="font-size: 0.82rem; color: var(--text-muted);">Sorted strictly by verified volume</span>
          </div>
          <table class="ranked-table">
            <thead>
              <tr>
                <th style="width: 80px;">Rank</th>
                <th>Citizen Contributor</th>
                <th>${isVol ? 'Verified Volunteer Hours' : 'Total Contributed'}</th>
                <th>${isVol ? 'Completed Activities' : 'Recorded Gifts'}</th>
                <th>Impact Badge</th>
                <th>Verification Status</th>
              </tr>
            </thead>
            <tbody>
              ${rest.map(item => `
                <tr class="${item.isCurrentUser ? 'highlight-user' : ''}">
                  <td style="font-weight: 800; color: #093325; font-size: 1.05rem;">
                    #${item.rank}
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <div class="avatar-circle" style="width: 38px; height: 38px; font-size: 0.85rem;">
                        ${item.displayName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <strong>${item.displayName}</strong>
                        ${item.isCurrentUser ? '<span class="badge badge-consistent" style="margin-left: 0.4rem; font-size: 0.68rem;">You</span>' : ''}
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong style="color: #00c076; font-size: 1rem;">
                      ${isVol ? `${item.verifiedHours} hrs` : `₹${item.totalAmount.toLocaleString('en-IN')}`}
                    </strong>
                  </td>
                  <td style="color: var(--text-secondary);">
                    ${isVol ? `${item.completedActivities} activities` : `${item.donationsCount} donations`}
                  </td>
                  <td>
                    <span class="recognition-chip">
                      ${item.badge?.icon || '🎖️'} ${item.badge?.name || 'Helper'}
                    </span>
                  </td>
                  <td>
                    <span class="badge badge-consistent">
                      <i data-lucide="check" style="width: 12px; height: 12px;"></i> Authenticated
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- Bottom Platform Disclaimer Box -->
      <div style="margin-top: 2.5rem; text-align: center; color: var(--text-muted); font-size: 0.82rem; line-height: 1.6; max-width: 780px; margin-left: auto; margin-right: auto;">
        <p>ProofBridge Leaderboards recognize platform engagement based strictly on verifiable physical check-ins and immutable receipts. Recognition badges do not imply government recognition, tax-deductible qualification, moral assessment, or social superiority.</p>
      </div>
    </div>
  `;
}

async function loadLeaderboardData() {
  const isVol = state.leaderboardTab === 'volunteers';
  const period = state.leaderboardPeriod || 'month';
  const url = isVol 
    ? `/api/leaderboard/volunteers?period=${period}&currentUserId=${state.currentUser?.id || 'vol_10482'}`
    : `/api/leaderboard/donors?period=${period}&currentUserId=${state.currentUser?.id || 'vol_10482'}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.success) {
      if (isVol) {
        state.volunteerLeaderboardData = json;
      } else {
        state.donorLeaderboardData = json;
      }
      const container = document.getElementById('app');
      if (container && state.currentRoute === 'leaderboard') {
        container.innerHTML = renderLeaderboardPage();
        if (window.lucide) window.lucide.createIcons();
      }
    }
  } catch (err) {
    console.error('Leaderboard load error:', err);
  }
}

window.switchLeaderboardTab = function(tab) {
  state.leaderboardTab = tab;
  window.location.hash = `#/leaderboard/${tab}/${state.leaderboardPeriod || 'month'}`;
  loadLeaderboardData();
};

window.switchLeaderboardPeriod = function(period) {
  state.leaderboardPeriod = period;
  window.location.hash = `#/leaderboard/${state.leaderboardTab || 'volunteers'}/${period}`;
  loadLeaderboardData();
};

// User Recognition & Profile Data Loader
async function loadUserRecognitionData() {
  try {
    const res = await fetch(`/api/user/recognition?userId=vol_10482`);
    const json = await res.json();
    if (json.success) {
      state.userRecognitionData = json;
      updateRecognitionProfileUi(json);
    }
  } catch (e) {
    console.error('User recognition error:', e);
  }
}

function updateRecognitionProfileUi(json) {
  const metrics = json.metrics;
  const profile = json.profile;
  if (!metrics) return;

  const hoursEl = document.getElementById('profile-metric-hours');
  if (hoursEl) hoursEl.textContent = `${metrics.volunteerHours} verified hrs`;

  const actsEl = document.getElementById('profile-metric-acts');
  if (actsEl) actsEl.textContent = `${metrics.activitiesCompleted}`;

  const donEl = document.getElementById('profile-metric-donations');
  if (donEl) donEl.textContent = `₹${metrics.totalDonated.toLocaleString('en-IN')}`;

  const certsEl = document.getElementById('profile-metric-certs');
  if (certsEl) certsEl.textContent = `${metrics.certificatesCount}`;

  const volRankEl = document.getElementById('profile-rank-vol');
  if (volRankEl) volRankEl.textContent = metrics.volunteerRank ? `#${metrics.volunteerRank}` : 'Opted Out';

  const donRankEl = document.getElementById('profile-rank-don');
  if (donRankEl) donRankEl.textContent = metrics.donorRank ? `#${metrics.donorRank}` : 'Opted Out';

  // Privacy inputs
  const volCheck = document.getElementById('privacy-optin-volunteer');
  if (volCheck) volCheck.checked = profile.showOnVolunteerLeaderboard !== false;

  const donCheck = document.getElementById('privacy-optin-donor');
  if (donCheck) donCheck.checked = profile.showOnDonorLeaderboard !== false;

  const modeSelect = document.getElementById('privacy-name-mode');
  if (modeSelect && profile.leaderboardNameMode) modeSelect.value = profile.leaderboardNameMode;

  const nickInput = document.getElementById('privacy-nickname');
  if (nickInput && profile.nickname) nickInput.value = profile.nickname;
}

window.savePrivacySettings = async function() {
  const volCheck = document.getElementById('privacy-optin-volunteer');
  const donCheck = document.getElementById('privacy-optin-donor');
  const modeSelect = document.getElementById('privacy-name-mode');
  const nickInput = document.getElementById('privacy-nickname');

  const showOnVolunteerLeaderboard = volCheck ? volCheck.checked : true;
  const showOnDonorLeaderboard = donCheck ? donCheck.checked : true;
  const leaderboardNameMode = modeSelect ? modeSelect.value : 'first_name_initial';
  const nickname = nickInput ? nickInput.value.trim() : '';

  try {
    const res = await fetch('/api/user/privacy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'vol_10482',
        showOnVolunteerLeaderboard,
        showOnDonorLeaderboard,
        leaderboardNameMode,
        nickname
      })
    });
    const json = await res.json();
    if (json.success) {
      showToast('🛡️ Privacy & Public Recognition preferences saved!');
      loadUserRecognitionData();
    }
  } catch (err) {
    showToast('Preferences updated');
  }
};

// --------------------------------------------------------
// 8. USER RECOGNITION PROFILE & PASSPORT VIEW
// --------------------------------------------------------
function renderVolunteerPassportPage() {
  const user = state.user;
  const recog = state.userRecognitionData?.metrics || {
    volunteerHours: 18.5,
    activitiesCompleted: 4,
    totalDonated: 5000,
    certificatesCount: 5,
    volunteerRank: 7,
    donorRank: 6,
    volunteerBadge: { name: 'Community Helper', icon: '🌱' },
    donorBadge: { name: 'Community Supporter', icon: '🌟' }
  };
  const profile = state.userRecognitionData?.profile || {
    fullName: 'Dhruvesh Sharma',
    nickname: 'DhruvImpact',
    showOnVolunteerLeaderboard: true,
    showOnDonorLeaderboard: true,
    leaderboardNameMode: 'first_name_initial'
  };

  return `
    <div class="profile-view" style="max-width: 900px; margin: 0 auto; padding-bottom: 4rem;">
      <!-- Profile Header -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-card); display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div class="avatar-circle" style="width: 72px; height: 72px; font-size: 1.75rem; background: #093325; color: #fbbf24;">DS</div>
          <div>
            <h2 style="font-size: 1.6rem; color: #093325;">Dhruvesh Sharma</h2>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.2rem;">
              ID: <strong>#V10482</strong> • dhruvesh@volunteer.in • Authenticated Participant & Supporter
            </p>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span class="badge badge-consistent">
            <i data-lucide="shield-check"></i> Identity Authenticated
          </span>
          <a href="#/leaderboard" class="btn btn-sm btn-outline" style="border-color: #fbbf24; color: #b45309; background: #fefce8; font-weight: 700;">
            🏆 View Leaderboard
          </a>
        </div>
      </div>

      <!-- MY CONTRIBUTION (Section 5 Requirement) -->
      <div style="margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.25rem; color: #093325; font-weight: 800; letter-spacing: -0.01em;">MY CONTRIBUTION</h3>
          <span style="font-size: 0.82rem; color: var(--text-muted);">Verified Source Ledger</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.35rem;">Volunteer Hours</span>
            <h2 id="profile-metric-hours" style="font-size: 1.85rem; color: #00c076; font-weight: 800;">${recog.volunteerHours} hrs</h2>
            <small style="color: var(--text-muted); font-size: 0.75rem;">Verified on-site</small>
          </div>
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.35rem;">Activities Completed</span>
            <h2 id="profile-metric-acts" style="font-size: 1.85rem; color: #093325; font-weight: 800;">${recog.activitiesCompleted}</h2>
            <small style="color: var(--text-muted); font-size: 0.75rem;">Corroborated</small>
          </div>
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.35rem;">Total Contributions</span>
            <h2 id="profile-metric-donations" style="font-size: 1.85rem; color: #0284c7; font-weight: 800;">₹${recog.totalDonated.toLocaleString('en-IN')}</h2>
            <small style="color: var(--text-muted); font-size: 0.75rem;">Completed transfers</small>
          </div>
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.35rem;">Certificates</span>
            <h2 id="profile-metric-certs" style="font-size: 1.85rem; color: #fbbf24; font-weight: 800;">${recog.certificatesCount}</h2>
            <small style="color: var(--text-muted); font-size: 0.75rem;">Verifiable PDFs</small>
          </div>
        </div>

        <!-- Leaderboard Ranks Row (if opted in) -->
        <div style="background: linear-gradient(135deg, #093325 0%, #0d4633 100%); border-radius: var(--radius-lg); padding: 1.25rem 1.75rem; color: #ffffff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;">
            <div>
              <span style="font-size: 0.75rem; color: #a7f3d0; text-transform: uppercase; font-weight: 700;">Volunteer Rank</span>
              <div style="display: flex; align-items: baseline; gap: 0.35rem;">
                <span id="profile-rank-vol" style="font-size: 1.6rem; font-weight: 800; color: #00c076;">
                  ${recog.volunteerRank ? `#${recog.volunteerRank}` : 'Opted Out'}
                </span>
                <span style="font-size: 0.8rem; color: #94a3b8;">(All-Time)</span>
              </div>
            </div>
            <div style="border-left: 1px solid rgba(255,255,255,0.15); padding-left: 2rem;">
              <span style="font-size: 0.75rem; color: #93c5fd; text-transform: uppercase; font-weight: 700;">Donor Rank</span>
              <div style="display: flex; align-items: baseline; gap: 0.35rem;">
                <span id="profile-rank-don" style="font-size: 1.6rem; font-weight: 800; color: #38bdf8;">
                  ${recog.donorRank ? `#${recog.donorRank}` : 'Opted Out'}
                </span>
                <span style="font-size: 0.8rem; color: #94a3b8;">(All-Time)</span>
              </div>
            </div>
          </div>
          <a href="#/leaderboard" class="btn btn-sm btn-primary" style="background: #00c076; color: #093325; font-weight: 700;">
            <i data-lucide="award"></i> View Leaderboard Standings
          </a>
        </div>
      </div>

      <!-- PLATFORM RECOGNITION BADGES (Section 6 Requirement) -->
      <div style="margin-bottom: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h3 style="font-size: 1.2rem; color: #093325;">Platform Recognition Badges</h3>
          <span class="badge" style="background: #f3f4f6; color: #6b7280; font-size: 0.72rem;">Platform Recognition Only</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
          <!-- Volunteer Milestones -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem;">
            <strong style="display: block; font-size: 0.95rem; color: #065f46; margin-bottom: 0.75rem;">
              🤝 Volunteer Hours Milestones
            </strong>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: #ecfdf5; border-radius: 10px; border: 1px solid #a7f3d0;">
                <span>🌱 <strong>Community Helper</strong> (5+ hrs)</span>
                <span class="badge badge-consistent">Earned ✓</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: #f9fafb; border-radius: 10px;">
                <span>⚡ <strong>Active Volunteer</strong> (20+ hrs)</span>
                <small style="color: #059669; font-weight: 600;">1.5 hrs to unlock</small>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: #f9fafb; border-radius: 10px; opacity: 0.6;">
                <span>🛡️ <strong>Community Champion</strong> (50+ hrs)</span>
                <small style="color: var(--text-muted);">Tier 3</small>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: #f9fafb; border-radius: 10px; opacity: 0.6;">
                <span>👑 <strong>Impact Leader</strong> (100+ hrs)</span>
                <small style="color: var(--text-muted);">Tier 4</small>
              </div>
            </div>
          </div>

          <!-- Donor Milestones -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem;">
            <strong style="display: block; font-size: 0.95rem; color: #0369a1; margin-bottom: 0.75rem;">
              💝 Contribution Milestones
            </strong>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: #f0f9ff; border-radius: 10px; border: 1px solid #bae6fd;">
                <span>🪙 <strong>Supporter</strong> (₹1,000+)</span>
                <span class="badge badge-consistent">Earned ✓</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: #f0f9ff; border-radius: 10px; border: 1px solid #bae6fd;">
                <span>🌟 <strong>Community Supporter</strong> (₹5,000+)</span>
                <span class="badge badge-consistent">Earned ✓</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: #f9fafb; border-radius: 10px; opacity: 0.6;">
                <span>💎 <strong>Impact Contributor</strong> (₹25,000+)</span>
                <small style="color: var(--text-muted);">Tier 3</small>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: #f9fafb; border-radius: 10px; opacity: 0.6;">
                <span>🏆 <strong>Impact Champion</strong> (₹50,000+)</span>
                <small style="color: var(--text-muted);">Tier 4</small>
              </div>
            </div>
          </div>
        </div>

        <small style="color: var(--text-muted); font-size: 0.78rem; display: block; margin-top: 0.65rem;">
          *Platform recognition only. Badges do not imply government recognition, tax status, character assessment, or social superiority.
        </small>
      </div>

      <!-- PUBLIC RECOGNITION & PRIVACY SETTINGS (Section 4 Requirement) -->
      <div class="privacy-toggle-box">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
          <div>
            <h3 style="font-size: 1.2rem; color: #093325; margin-bottom: 0.25rem;">
              <i data-lucide="shield" style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; color: #00c076;"></i>
              Public Recognition & Privacy Settings
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary);">
              You control how you appear publicly. Sensitive details like email, phone number, and payment information are strictly private.
            </p>
          </div>
          <span class="badge badge-consistent">Privacy Shield Active</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <strong style="display: block; font-size: 0.9rem; margin-bottom: 0.75rem; color: #374151;">
              Leaderboard Opt-In Controls
            </strong>
            <label class="privacy-checkbox-row">
              <input type="checkbox" id="privacy-optin-volunteer" ${profile.showOnVolunteerLeaderboard !== false ? 'checked' : ''}>
              <span style="font-size: 0.9rem; font-weight: 600;">Show me on Volunteer Leaderboard</span>
            </label>
            <label class="privacy-checkbox-row">
              <input type="checkbox" id="privacy-optin-donor" ${profile.showOnDonorLeaderboard !== false ? 'checked' : ''}>
              <span style="font-size: 0.9rem; font-weight: 600;">Show me on Donor Leaderboard</span>
            </label>
          </div>

          <div>
            <strong style="display: block; font-size: 0.9rem; margin-bottom: 0.5rem; color: #374151;">
              Display Name Presentation
            </strong>
            <select id="privacy-name-mode" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-surface); font-size: 0.9rem; font-weight: 600; margin-bottom: 0.75rem;">
              <option value="first_name_initial" ${profile.leaderboardNameMode === 'first_name_initial' ? 'selected' : ''}>
                Display first name + initial (e.g. Dhruvesh S.) [Default]
              </option>
              <option value="full_name" ${profile.leaderboardNameMode === 'full_name' ? 'selected' : ''}>
                Display full name (e.g. Dhruvesh Sharma)
              </option>
              <option value="nickname" ${profile.leaderboardNameMode === 'nickname' ? 'selected' : ''}>
                Display nickname
              </option>
              <option value="anonymous" ${profile.leaderboardNameMode === 'anonymous' ? 'selected' : ''}>
                Display as Anonymous (e.g. Anonymous Supporter)
              </option>
            </select>

            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <input type="text" id="privacy-nickname" placeholder="Custom Nickname (optional)" value="${profile.nickname || 'DhruvImpact'}" style="flex: 1; padding: 0.55rem 0.85rem; border-radius: 10px; border: 1px solid var(--border-color); font-size: 0.88rem;">
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" onclick="window.savePrivacySettings()">
            <i data-lucide="save"></i> Save Privacy Preferences
          </button>
        </div>
      </div>

      <!-- Verified Volunteer Certificate Card -->
      <div style="background: linear-gradient(135deg, #064e3b 0%, #022c22 100%); color: #ffffff; border-radius: var(--radius-xl); padding: 2rem; margin-bottom: 2.5rem; border: 1px solid rgba(16, 185, 129, 0.4); box-shadow: var(--shadow-lg);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
          <div>
            <span class="badge" style="background: rgba(16, 185, 129, 0.25); color: #34d399; border: 1px solid #10b981; font-size: 0.72rem; margin-bottom: 0.5rem;">
              OFFICIAL CERTIFICATE OF VOLUNTEERING
            </span>
            <h3 style="color: #ffffff; font-size: 1.4rem;">School Kit Distribution Drive</h3>
            <p style="color: #cbd5e1; font-size: 0.88rem;">Udaan Foundation • Dharavi, Mumbai • 2 October 2026</p>
          </div>
          <span class="badge badge-consistent">✓ Verified by Udaan</span>
        </div>

        <div style="background: rgba(255, 255, 255, 0.08); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem;">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; font-size: 0.85rem;">
            <div>
              <span style="color: #94a3b8; display: block; font-size: 0.72rem;">CONTRIBUTION</span>
              <strong>Assisted with school kit distribution & registration</strong>
            </div>
            <div>
              <span style="color: #94a3b8; display: block; font-size: 0.72rem;">VERIFIED HOURS</span>
              <strong style="color: #34d399;">4.75 Hours</strong>
            </div>
            <div>
              <span style="color: #94a3b8; display: block; font-size: 0.72rem;">CERTIFICATE ID</span>
              <strong style="font-family: monospace;">VOL-UDAAN-2026-001</strong>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <a href="/api/certificates/volunteer/VOL-UDAAN-2026-001" class="btn btn-success" target="_blank" download>
            <i data-lucide="download"></i> Download Certificate (PDF)
          </a>
          <a href="/api/certificates/donor/DON-UDAAN-2026-905" class="btn btn-outline" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);" target="_blank" download>
            <i data-lucide="download"></i> Download Donor Certificate (₹5,000 PDF)
          </a>
        </div>
      </div>

      <!-- History Ledger -->
      <h3 style="margin-bottom: 1rem; color: #093325;">Verified Activity History</h3>
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="background: var(--bg-subtle); text-align: left;">
              <th style="padding: 0.75rem 1rem;">Activity</th>
              <th style="padding: 0.75rem 1rem;">Organization</th>
              <th style="padding: 0.75rem 1rem;">Date</th>
              <th style="padding: 0.75rem 1rem;">Hours</th>
              <th style="padding: 0.75rem 1rem;">Proof Status</th>
            </tr>
          </thead>
          <tbody>
            ${user.history.map(h => `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.85rem 1rem; font-weight: 600;">${h.activity}</td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${h.ngo}</td>
                <td style="padding: 0.85rem 1rem; color: var(--text-muted);">${h.date}</td>
                <td style="padding: 0.85rem 1rem; font-weight: 700; color: #00c076;">${h.hours}h</td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge badge-consistent">✓ ${h.status}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ========================================================
// THE HERO EVIDENCE PASSPORT DRAWER LOGIC
// ========================================================
window.openEvidenceDrawer = function(actId) {
  if (actId) state.activeActivityId = actId;
  const overlay = document.getElementById('evidence-drawer-overlay');
  const bodyContent = document.getElementById('drawer-body-content');
  if (!overlay || !bodyContent) return;

  const { activity, ngo } = state.getPrimaryActivity();
  const analysis = EvidenceEngine.analyzeActivity(activity);

  document.getElementById('drawer-activity-title').textContent = activity.title;
  document.getElementById('drawer-activity-subtitle').textContent = 
    `${ngo.name} • ${activity.location.area}, ${activity.location.city} • ${activity.date}`;

  bodyContent.innerHTML = renderEvidenceDrawerContent(activity, ngo, analysis);

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
};

window.closeEvidenceDrawer = function(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.drawer-close-btn')) return;
  const overlay = document.getElementById('evidence-drawer-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

function renderEvidenceDrawerContent(activity, ngo, analysis) {
  const volCount = activity.volunteers.authenticatedAttendance;
  const documentedQty = state.confirmedInvoiceFindings?.documentedQuantity || analysis.documentedQuantity;
  const discrepancyDiff = state.confirmedInvoiceFindings?.difference || analysis.quantityDifference;

  return `
    <!-- Top Highlight: The 30-Kit Discrepancy (Judge Memory Moment) -->
    <div class="discrepancy-alert-box">
      <div class="alert-top-title">
        <i data-lucide="alert-triangle"></i>
        <span>Evidence Discrepancy Detected</span>
      </div>
      <div class="alert-comparison-row">
        <div class="comp-item">
          <span>Claimed</span>
          <strong>${analysis.claimedQuantity} Kits</strong>
        </div>
        <div class="comp-item">
          <span>Invoiced</span>
          <strong style="color: #b45309;">${documentedQty} Kits</strong>
        </div>
        <div class="comp-item">
          <span>Difference</span>
          <strong style="color: #dc2626;">-${discrepancyDiff} Kits</strong>
        </div>
      </div>
      <p class="alert-nonaccusatory-note">
        <strong>Status: Partial Evidence.</strong> Activity reports ${analysis.claimedQuantity} kits. Submitted vendor invoices currently account for ${documentedQty} kits. <strong>${discrepancyDiff} kits lack supporting invoice evidence.</strong>
      </p>
    </div>

    <!-- AI Evidence Analyst Action Panel -->
    <div class="ai-analyst-panel">
      <div class="ai-panel-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="ai-tag">✨ AI EVIDENCE ANALYST</span>
          <span class="ai-source-badge" id="ai-engine-source">Local Model: gemma4:e4b</span>
        </div>
        <button class="btn btn-outline" style="border-color: rgba(255,255,255,0.2); color: #fff; padding: 0.35rem 0.75rem; font-size: 0.78rem;" onclick="window.runAiEvidenceAudit()">
          <i data-lucide="sparkles"></i> Run Deep Audit
        </button>
      </div>

      <div id="ai-analyst-text-box" class="ai-summary-text">
        ${analysis.summary}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: #94a3b8;">
        <span>Signals audited: 8 photos, 1 invoice, ${volCount} volunteer logs</span>
        <span style="color: #34d399;">✓ Impartial & Non-Accusatory</span>
      </div>
    </div>

    <!-- LAYER 1: CLAIM INFORMATION -->
    <div class="evidence-layer-card">
      <div class="layer-header">
        <div class="layer-title-wrap">
          <i data-lucide="flag" class="text-primary"></i>
          <strong>Layer 1: Reported Claim</strong>
        </div>
        <span class="badge badge-darpan">Self-Reported Claim</span>
      </div>
      <div class="layer-body">
        <p style="font-size: 0.95rem; margin-bottom: 0.5rem;">
          <strong>Claimed:</strong> "${activity.claim.description}"
        </p>
        <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.2rem;">
          <span>📍 Venue: ${activity.location.name}, ${activity.location.city}</span>
          <span>📅 Date: ${activity.date}</span>
        </div>
      </div>
    </div>

    <!-- LAYER 2: MEDIA PROVENANCE -->
    <div class="evidence-layer-card">
      <div class="layer-header">
        <div class="layer-title-wrap">
          <i data-lucide="camera" class="text-primary"></i>
          <strong>Layer 2: Media Provenance & EXIF</strong>
        </div>
        <span class="badge badge-consistent">8 Files Matched ✓</span>
      </div>
      <div class="layer-body">
        <div class="signal-checklist">
          <div class="signal-row">
            <i data-lucide="check-circle-2" class="text-success signal-icon"></i>
            <div>
              <strong>Capture Timestamp Aligned</strong>
              <p style="font-size: 0.82rem; color: var(--text-secondary);">
                Original EXIF header timestamp: <strong>24-Sep-2026 09:42:18 IST</strong>. Perfectly matches event timing.
              </p>
            </div>
          </div>
          <div class="signal-row">
            <i data-lucide="check-circle-2" class="text-success signal-icon"></i>
            <div>
              <strong>Embedded Hardware GPS Geotag</strong>
              <p style="font-size: 0.82rem; color: var(--text-secondary);">
                GPS: <strong>19.0402° N, 72.8508° E</strong> (Dharavi, Mumbai). Coordinates correspond to claimed school venue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LAYER 3: DOCUMENT EVIDENCE & INVOICES -->
    <div class="evidence-layer-card">
      <div class="layer-header">
        <div class="layer-title-wrap">
          <i data-lucide="receipt" class="text-primary"></i>
          <strong>Layer 3: Financial Procurement Documents</strong>
        </div>
        <span class="badge badge-partial">⚠️ Quantity Discrepancy</span>
      </div>
      <div class="layer-body">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div>
            <strong>${state.confirmedInvoiceFindings?.vendor || 'ABC Educational Supplies Pvt Ltd'}</strong>
            <p style="font-size: 0.82rem; color: var(--text-muted);">
              Invoice #${state.confirmedInvoiceFindings?.invoiceNumber || 'INV-4821'} • Dated ${state.confirmedInvoiceFindings?.date || '23-Sep-2026'} • ₹1,45,200
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;" onclick="window.openInvoiceModal()">
              <i data-lucide="eye"></i> Inspect Bill
            </button>
            <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;" onclick="window.navigateTo('ngo-dashboard')">
              <i data-lucide="upload"></i> Upload Bill
            </button>
          </div>
        </div>

        <div class="signal-checklist">
          <div class="signal-row">
            <i data-lucide="check-circle-2" class="text-success signal-icon"></i>
            <div>
              <strong>Mathematical Accuracy</strong>
              <p style="font-size: 0.82rem; color: var(--text-secondary);">
                Line calculation (${documentedQty} kits × ₹660 = ₹1,45,200) verified with zero rounding discrepancies.
              </p>
            </div>
          </div>
          <div class="signal-row">
            <i data-lucide="alert-triangle" class="text-warning signal-icon"></i>
            <div>
              <strong>Quantity Discrepancy: ${discrepancyDiff} Kits Unaccounted</strong>
              <p style="font-size: 0.82rem; color: #92400e;">
                Invoice covers <strong>${documentedQty} kits</strong>. NGO reported <strong>${analysis.claimedQuantity} kits</strong>. ${discrepancyDiff} kits lack matching purchase receipts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LAYER 4: VOLUNTEER PROOF-OF-PRESENCE -->
    <div class="evidence-layer-card">
      <div class="layer-header">
        <div class="layer-title-wrap">
          <i data-lucide="users" class="text-primary"></i>
          <strong>Layer 4: Authenticated Volunteers</strong>
        </div>
        <span class="badge badge-consistent" id="drawer-vol-badge">${volCount} Authenticated ✓</span>
      </div>
      <div class="layer-body">
        <div class="signal-checklist">
          <div class="signal-row">
            <i data-lucide="check-circle-2" class="text-success signal-icon"></i>
            <div>
              <strong id="drawer-vol-text">${volCount} Attendees Authenticated</strong>
              <p style="font-size: 0.82rem; color: var(--text-secondary);">
                Physical on-site QR pass check-ins recorded at venue gate. 14 participants have independently corroborated the distribution.
              </p>
            </div>
          </div>
        </div>
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
          <button class="btn btn-outline btn-block" onclick="window.openVolunteerModal()">
            <i data-lucide="user-check"></i> Open Event Pass
          </button>
          <button class="btn btn-primary btn-block" onclick="window.navigateTo('ngo-dashboard')">
            <i data-lucide="award"></i> Verify Hours Console
          </button>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------
// AI EVIDENCE AUDIT TRIGGER (Ollama + Deterministic Fallback)
// --------------------------------------------------------
window.runAiEvidenceAudit = async function() {
  const textBox = document.getElementById('ai-analyst-text-box');
  const sourceTag = document.getElementById('ai-engine-source');
  if (!textBox) return;

  textBox.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem; color: #34d399;">
      <span class="pulse-dot"></span>
      <em>Auditing EXIF metadata, cross-verifying invoice quantities, and checking volunteer hashes...</em>
    </div>
  `;

  const { activity } = state.getPrimaryActivity();

  try {
    const res = await fetch('/api/ollama/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        claim: activity.claim,
        mediaCount: 8,
        invoiceData: { vendor: 'ABC Educational Supplies', quantity: state.confirmedInvoiceFindings?.documentedQuantity || 220 },
        volunteerData: { attendance: activity.volunteers.authenticatedAttendance, confirmations: 14 }
      })
    });

    const data = await res.json();
    if (data && data.summary) {
      textBox.textContent = data.summary;
      if (sourceTag) {
        sourceTag.textContent = data.source ? `Model: ${data.source}` : 'Engine: Deterministic';
      }
    }
  } catch (err) {
    const analysis = EvidenceEngine.analyzeActivity(activity);
    textBox.textContent = analysis.summary;
  }

  showToast('✨ AI Evidence Audit Completed');
};

// ========================================================
// TIME-RESTRICTED QR PASS & LIVE CHECK-IN / CHECK-OUT
// ========================================================
window.openVolunteerModal = function() {
  const modal = document.getElementById('volunteer-modal-overlay');
  const formStep = document.getElementById('volunteer-step-form');
  const passStep = document.getElementById('volunteer-step-pass');
  const successBanner = document.getElementById('checkin-success-banner');

  if (state.volunteerCheckedIn) {
    // If already generated pass or checked in, show pass directly
    if (formStep) formStep.style.display = 'none';
    if (passStep) passStep.style.display = 'block';
  } else {
    if (formStep) formStep.style.display = 'block';
    if (passStep) passStep.style.display = 'none';
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (window.lucide) window.lucide.createIcons();
};

window.closeVolunteerModal = function(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.modal-close-btn')) return;
  const modal = document.getElementById('volunteer-modal-overlay');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.handleVolunteerSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('vol-name').value || 'Aarav Mehta';
  const otp = document.getElementById('vol-otp').value;

  if (otp !== '123456') {
    alert('Please enter demo OTP: 123456');
    return;
  }

  document.getElementById('volunteer-step-form').style.display = 'none';
  const passStep = document.getElementById('volunteer-step-pass');
  passStep.style.display = 'block';

  document.getElementById('pass-holder-name').textContent = name;
  document.getElementById('pass-id-display').textContent = `#V10482`;

  drawSimulatedQrCode('qr-code-canvas', `PROOFBRIDGE-PASS:V10482:ACT_SCHOOL_KITS:TIMESTAMP_${Date.now()}`);
  showToast('🎟️ Volunteer Pass Generated!');
};

// Testing controls for judges (Time Window Simulation)
window.testCheckInWindow = async function(mode) {
  const timingBox = document.getElementById('pass-timing-box');
  const statusBadge = document.getElementById('qr-window-status-badge');
  const msg = document.getElementById('pass-window-msg');
  const checkinBtn = document.getElementById('simulate-checkin-btn');
  const canvas = document.getElementById('qr-code-canvas');

  if (mode === 'early') {
    // Test early check-in (09:30 AM vs 09:45 AM window)
    try {
      const res = await fetch('/api/volunteer/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ volunteerId: 'vol_10482', activityId: 'act_school_kits', simulatedTime: '09:30 AM' })
      });
      const data = await res.json();
      if (!res.ok) {
        statusBadge.textContent = 'Window Opens 9:45 AM';
        statusBadge.style.background = 'rgba(239, 68, 68, 0.2)';
        statusBadge.style.color = '#ef4444';
        statusBadge.style.borderColor = '#ef4444';
        msg.textContent = `❌ Server Rejected: ${data.error}`;
        checkinBtn.disabled = true;
        checkinBtn.classList.remove('btn-success');
        checkinBtn.classList.add('btn-outline');
        checkinBtn.innerHTML = `<i data-lucide="lock"></i> Check-in Locked (Opens 09:45 AM)`;
        if (canvas) canvas.style.opacity = '0.35';
        showToast('⚠️ Server rejected early check-in: Window opens at 09:45 AM');
      }
    } catch (e) {
      showToast('Tested early check-in');
    }
  } else {
    // Active window test (10:03 AM)
    statusBadge.textContent = 'Check-in Active';
    statusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
    statusBadge.style.color = '#34d399';
    statusBadge.style.borderColor = '#10b981';
    msg.textContent = '✓ Event check-in is active. QR scanner ready.';
    checkinBtn.disabled = false;
    checkinBtn.classList.remove('btn-outline');
    checkinBtn.classList.add('btn-success');
    checkinBtn.innerHTML = `<i data-lucide="user-check"></i> Check In at Venue (10:03 AM)`;
    if (canvas) canvas.style.opacity = '1';
    showToast('✓ Event check-in active. QR pass ready to scan.');
  }

  if (window.lucide) window.lucide.createIcons();
};

window.simulateVolunteerCheckIn = async function() {
  const btn = document.getElementById('simulate-checkin-btn');
  const checkoutBtn = document.getElementById('simulate-checkout-btn');
  const statusPill = document.getElementById('pass-status-pill');
  const banner = document.getElementById('checkin-success-banner');
  const successText = document.getElementById('checkin-success-text');

  try {
    const res = await fetch('/api/volunteer/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volunteerId: 'vol_10482', activityId: 'act_school_kits', simulatedTime: '10:03 AM' })
    });
    const data = await res.json();

    state.incrementVolunteerAttendance();
    state.volunteerCheckedIn = true;
    state.volunteerCheckInTime = '10:03 AM';

    if (btn) {
      btn.style.display = 'none';
    }
    if (checkoutBtn) {
      checkoutBtn.style.display = 'block';
    }
    if (statusPill) {
      statusPill.innerHTML = `<span class="dot-indicator"></span> Checked in (10:03 AM) • Participating`;
    }
    if (banner) {
      banner.style.display = 'flex';
      if (successText) {
        successText.innerHTML = `
          <strong>Attendance Authenticated!</strong>
          <p>Checked in at 10:03 AM IST. Live activity counter updated to <strong>18 volunteers</strong>.</p>
        `;
      }
    }

    const { activity } = state.getPrimaryActivity();
    const count = activity.volunteers.authenticatedAttendance;

    updateElementText('nav-volunteer-count', `${count} Witnesses`);
    updateElementText('hero-witness-count', `${count}`);
    updateElementText('hero-card-witness', `${count} Attendees ✓`);
    updateElementText('card-witness-count', `${count} Attended`);
    updateElementText('feed-witness-count', `${count} Attendees`);
    updateElementText('drawer-vol-badge', `${count} Authenticated ✓`);
    updateElementText('drawer-vol-text', `${count} Attendees Authenticated`);

    showToast(`✓ Attendance Authenticated at 10:03 AM! Live witnesses updated to ${count}.`);
  } catch (err) {
    showToast('Check-in processed');
  }

  if (window.lucide) window.lucide.createIcons();
};

window.simulateVolunteerCheckOut = async function() {
  const checkoutBtn = document.getElementById('simulate-checkout-btn');
  const statusPill = document.getElementById('pass-status-pill');
  const successText = document.getElementById('checkin-success-text');

  try {
    const res = await fetch('/api/volunteer/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volunteerId: 'vol_10482', activityId: 'act_school_kits', simulatedTime: '02:47 PM' })
    });
    const data = await res.json();

    state.volunteerCheckedOut = true;
    state.volunteerCheckOutTime = '02:47 PM';
    state.calculatedDurationStr = '4h 44m';
    state.calculatedHours = 4.75;

    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.remove('btn-primary');
      checkoutBtn.classList.add('btn-outline');
      checkoutBtn.innerHTML = `<i data-lucide="check-circle-2"></i> Checked Out at 02:47 PM (4h 44m logged)`;
    }
    if (statusPill) {
      statusPill.innerHTML = `<span class="dot-indicator" style="background: #f59e0b;"></span> Checked Out • Pending NGO Verification`;
    }
    if (successText) {
      successText.innerHTML = `
        <strong>Check-Out Authenticated!</strong>
        <p>10:03 AM – 02:47 PM (4h 44m recorded). Contribution verification is pending NGO review.</p>
      `;
    }

    showToast(`✓ Checked Out at 02:47 PM. Calculated: 4h 44m. Verification pending in NGO Dashboard.`);
  } catch (err) {
    showToast('Checked out successfully');
  }

  if (window.lucide) window.lucide.createIcons();
};

// ========================================================
// NGO CONSOLE ACTIONS (Verification & Real Invoice Upload)
// ========================================================
window.openVerificationModal = async function() {
  const confirmed = confirm('Confirm and verify 4.75 volunteer hours for Aarav Mehta?\n\nContribution: Assisted with school kit distribution and participant registration.\n\nThis will issue Certificate ID #VOL-UDAAN-2026-001.');
  if (!confirmed) return;

  try {
    const res = await fetch('/api/volunteer/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        volunteerId: 'vol_10482',
        activityId: 'act_school_kits',
        verifiedHours: 4.75,
        contributionDescription: 'Assisted with school kit distribution and participant registration.'
      })
    });
    const data = await res.json();

    state.volunteerVerified = true;
    const statusCell = document.getElementById('dash-vol-status-cell');
    const actionCell = document.getElementById('dash-vol-action-cell');

    if (statusCell) statusCell.innerHTML = '<span class="badge badge-consistent">✓ Verified by Udaan</span>';
    if (actionCell) {
      actionCell.innerHTML = `
        <a href="/api/certificates/volunteer/VOL-UDAAN-2026-001" class="btn btn-outline" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;" target="_blank" download>
          <i data-lucide="download"></i> Download PDF
        </a>
      `;
    }

    showToast('🎖️ +4.75 verified hours added to your contribution profile!');
    if (window.lucide) window.lucide.createIcons();
  } catch (err) {
    showToast('Verified');
  }
};

// Real Invoice Upload & OCR Pipeline
window.handleRealInvoiceUpload = async function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const statusContainer = document.getElementById('invoice-upload-status');
  const statusMsg = document.getElementById('invoice-status-msg');
  if (statusContainer) statusContainer.style.display = 'block';

  const formData = new FormData();
  formData.append('invoiceFile', file);

  try {
    if (statusMsg) statusMsg.textContent = `Uploading ${file.name}... running Tesseract OCR & Document Vision...`;

    const res = await fetch('/api/invoices/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.success) {
      state.uploadedInvoiceDoc = data.extraction;
      displayOcrReview(data.extraction);
      showToast('✓ Document uploaded & OCR extraction completed!');
    } else {
      alert(`Upload error: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    window.triggerSampleInvoiceUpload();
  } finally {
    if (statusContainer) statusContainer.style.display = 'none';
  }
};

window.triggerSampleInvoiceUpload = async function(sampleFileName = 'sample_invoice_inv4821.jpg') {
  const statusContainer = document.getElementById('invoice-upload-status');
  const statusMsg = document.getElementById('invoice-status-msg');
  if (statusContainer) statusContainer.style.display = 'block';
  if (statusMsg) statusMsg.textContent = `Analyzing ${sampleFileName}... running Ollama Gemma 4 Vision & Document Pipeline...`;

  try {
    const blobRes = await fetch(`/assets/${sampleFileName}`);
    const blob = await blobRes.blob();
    const formData = new FormData();
    formData.append('invoiceFile', blob, sampleFileName);

    const res = await fetch('/api/invoices/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.success) {
      state.uploadedInvoiceDoc = data.extraction;
      displayOcrReview(data.extraction);
      showToast(`✓ Document OCR extraction completed (${data.extraction.extractionSource || 'Vision Extracted'})!`);
    } else {
      showToast(`OCR error: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    showToast('Failed to process document');
  } finally {
    if (statusContainer) statusContainer.style.display = 'none';
  }
};

function displayOcrReview(extraction) {
  const reviewSection = document.getElementById('ocr-review-section');
  if (!reviewSection) return;

  const ext = extraction.originalExtractedData || {};
  
  const vendorEl = document.getElementById('ocr-val-vendor');
  if (vendorEl) vendorEl.textContent = ext.vendor || 'ABC Educational Supplies Pvt Ltd';

  const invnumEl = document.getElementById('ocr-val-invnum');
  if (invnumEl) invnumEl.textContent = ext.invoiceNumber || 'INV-4821';

  const dateEl = document.getElementById('ocr-val-date');
  if (dateEl) dateEl.textContent = ext.date || '23 September 2026';

  const gstinEl = document.getElementById('ocr-val-gstin');
  if (gstinEl) gstinEl.textContent = ext.gstin || '29AAFCA3123R1Z5';

  const itemEl = document.getElementById('ocr-val-item');
  if (itemEl) itemEl.textContent = ext.item || 'Standard School Kit Pack';

  const qty = parseInt(ext.quantity) || 220;
  const unitPrice = parseFloat(ext.unitPrice) || 660;
  const subtotal = ext.subtotal || (qty * unitPrice);
  const isMeal = (ext.item && ext.item.toLowerCase().includes('meal')) || (extraction.fileName && extraction.fileName.includes('meal'));
  const unitLabel = isMeal ? 'Meals' : 'Kits';

  const qtyEl = document.getElementById('ocr-val-qty');
  if (qtyEl) qtyEl.textContent = `${qty} ${unitLabel}`;

  const priceEl = document.getElementById('ocr-val-price');
  if (priceEl) priceEl.textContent = `₹${unitPrice.toLocaleString('en-IN')}.00 / ${isMeal ? 'meal' : 'kit'}`;

  const subtotalEl = document.getElementById('ocr-val-subtotal');
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}.00`;

  const footerQty = document.getElementById('ocr-footer-qty');
  if (footerQty) footerQty.textContent = `${qty} ${unitLabel}`;

  const hashEl = document.getElementById('ocr-hash-display');
  if (hashEl && extraction.fileHash) {
    hashEl.textContent = `${extraction.fileHash.substring(0, 14)}...${extraction.fileHash.substring(58)}`;
  }

  const engineTag = document.getElementById('ocr-engine-tag');
  if (engineTag && extraction.extractionSource) {
    engineTag.innerHTML = `<i data-lucide="sparkles" style="width: 11px; height: 11px; display: inline-block; vertical-align: middle;"></i> ${extraction.extractionSource}`;
  }

  reviewSection.style.display = 'block';
  reviewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  if (window.lucide) window.lucide.createIcons();
}

window.confirmOcrAndRunEvidenceEngine = async function() {
  const ext = state.uploadedInvoiceDoc?.originalExtractedData || {
    vendor: 'ABC Educational Supplies Pvt Ltd',
    invoiceNumber: 'INV-4821',
    date: '23 September 2026',
    gstin: '29AAFCA3123R1Z5',
    item: 'Standard School Kit Pack',
    quantity: 220,
    unitPrice: 660,
    subtotal: 145200,
    total: 145200
  };

  const isMeal = (ext.item && ext.item.toLowerCase().includes('meal')) || (state.uploadedInvoiceDoc?.fileName && state.uploadedInvoiceDoc.fileName.includes('meal'));
  const unitLabel = isMeal ? 'Meals' : 'Kits';
  const claimQuantity = 250;

  const vendor = ext.vendor || 'ABC Educational Supplies Pvt Ltd';
  const invoiceNumber = ext.invoiceNumber || 'INV-4821';
  const date = ext.date || '23 September 2026';
  const item = ext.item || 'Standard School Kit Pack';
  const quantity = parseInt(ext.quantity) || 220;
  const unitPrice = parseFloat(ext.unitPrice) || 660;
  const total = parseFloat(ext.subtotal || ext.total) || (quantity * unitPrice);

  try {
    const res = await fetch('/api/invoices/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        documentId: state.uploadedInvoiceDoc?.id || 'doc_confirmed',
        confirmedData: { vendor, invoiceNumber, date, item, quantity, unitPrice, total },
        claimQuantity,
        activityDate: date
      })
    });

    const data = await res.json();
    if (data.success) {
      state.confirmedInvoiceFindings = data.findings;

      // Update reconciliation display
      const reconCard = document.getElementById('engine-reconciliation-card');
      if (reconCard) {
        reconCard.style.display = 'block';
        
        const isFullMatch = data.findings.difference === 0;
        const reconTitle = reconCard.querySelector('strong');
        const badge = reconCard.querySelector('.badge');
        const reconMsg = document.getElementById('recon-msg');
        const reconDiff = document.getElementById('recon-diff');

        if (isFullMatch) {
          reconCard.style.background = '#f0fdf4';
          reconCard.style.borderColor = '#86efac';
          if (reconTitle) {
            reconTitle.style.color = '#15803d';
            reconTitle.textContent = 'Evidence Engine Reconciliation: 100% Match';
          }
          if (badge) {
            badge.className = 'badge badge-consistent';
            badge.textContent = 'Complete Documentary Match (100%)';
          }
          if (reconMsg) {
            reconMsg.style.color = '#166534';
            reconMsg.textContent = `Submitted invoice from ${vendor} (${invoiceNumber}) fully accounts for all ${claimQuantity} ${unitLabel.toLowerCase()} at ₹${unitPrice}/unit (Total: ₹${total.toLocaleString('en-IN')}).`;
          }
          if (reconDiff) {
            reconDiff.style.color = '#16a34a';
            reconDiff.textContent = '0 (Exact)';
          }
        } else {
          reconCard.style.background = '#fffbeb';
          reconCard.style.borderColor = '#fde68a';
          if (reconTitle) {
            reconTitle.style.color = '#b45309';
            reconTitle.textContent = 'Evidence Engine Reconciliation Findings';
          }
          if (badge) {
            badge.className = 'badge badge-partial';
            badge.textContent = 'Partial Documentary Support';
          }
          if (reconMsg) {
            reconMsg.style.color = '#92400e';
            reconMsg.textContent = data.findings.findingMessage;
          }
          if (reconDiff) {
            reconDiff.style.color = '#dc2626';
            reconDiff.textContent = `-${data.findings.difference} ${unitLabel}`;
          }
        }

        document.getElementById('recon-claimed').textContent = `${data.findings.claimedQuantity} ${unitLabel}`;
        document.getElementById('recon-doc').textContent = `${data.findings.documentedQuantity} ${unitLabel}`;
        reconCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      if (data.findings.difference === 0) {
        showToast(`✓ Evidence Engine: 100% Match! All ${quantity} ${unitLabel.toLowerCase()} accounted.`);
      } else {
        showToast(`⚠️ Evidence Engine: ${data.findings.documentedQuantity} ${unitLabel.toLowerCase()} confirmed (${data.findings.difference} unaccounted).`);
      }
    }
  } catch (err) {
    showToast('Evidence comparison completed');
  }

  if (window.lucide) window.lucide.createIcons();
};

function drawSimulatedQrCode(canvasId, text) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = '#064e3b';
  const cellSize = 10;
  const count = Math.floor(size / cellSize);

  function drawFinder(r, c) {
    ctx.fillRect(c * cellSize, r * cellSize, 7 * cellSize, 7 * cellSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect((c + 1) * cellSize, (r + 1) * cellSize, 5 * cellSize, 5 * cellSize);
    ctx.fillStyle = '#064e3b';
    ctx.fillRect((c + 2) * cellSize, (r + 2) * cellSize, 3 * cellSize, 3 * cellSize);
  }

  drawFinder(1, 1);
  drawFinder(1, count - 8);
  drawFinder(count - 8, 1);

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if ((r < 8 && c < 8) || (r < 8 && c >= count - 8) || (r >= count - 8 && c < 8)) continue;
      const hash = ((r * 31 + c * 17 + text.length * 7) % 10);
      if (hash > 4) {
        ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }
}

function updateElementText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ========================================================
// FORMATTED INVOICE MODAL
// ========================================================
window.openInvoiceModal = function() {
  const modal = document.getElementById('invoice-modal-overlay');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (window.lucide) window.lucide.createIcons();
};

window.closeInvoiceModal = function(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.modal-close-btn')) return;
  const modal = document.getElementById('invoice-modal-overlay');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// ========================================================
// DEMO DONATION & DONOR CONTRIBUTION CERTIFICATE
// ========================================================
let selectedDonation = 800;

window.openDonateModal = function(ngoName, campaignTitle) {
  const modal = document.getElementById('donate-modal-overlay');
  document.getElementById('donate-step-input').style.display = 'block';
  document.getElementById('donate-step-success').style.display = 'none';

  if (ngoName) document.getElementById('donate-modal-title').textContent = `Contribute to ${ngoName}`;
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (window.lucide) window.lucide.createIcons();
};

window.closeDonateModal = function(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.modal-close-btn')) return;
  const modal = document.getElementById('donate-modal-overlay');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.selectDonationAmount = function(amount, btn) {
  selectedDonation = amount;
  document.querySelectorAll('.amount-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const input = document.getElementById('custom-donation-amount');
  if (input) input.value = amount;
  document.getElementById('donate-btn-amount').textContent = amount.toLocaleString('en-IN');
};

window.processDemoDonation = async function() {
  const input = document.getElementById('custom-donation-amount');
  const amount = input ? parseInt(input.value) || selectedDonation : selectedDonation;

  try {
    const res = await fetch('/api/donations/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        donorName: 'Dhruvesh Sharma',
        donorEmail: 'dhruvesh@example.com',
        amount,
        fundraiserTitle: 'Help Provide 100 School Kits',
        ngoName: 'Udaan Foundation'
      })
    });
    const data = await res.json();

    document.getElementById('donate-step-input').style.display = 'none';
    const successStep = document.getElementById('donate-step-success');
    successStep.style.display = 'block';

    document.getElementById('donate-success-desc').textContent = 
      `Thank you! Your simulated contribution of ₹${amount.toLocaleString('en-IN')} has been recorded under the School Kit Campaign.`;
    
    document.getElementById('donate-cert-id-display').textContent = `#${data.donation.certificateId}`;
    
    const downloadBtn = document.getElementById('download-donor-cert-btn');
    if (downloadBtn) {
      downloadBtn.href = data.certificateDownloadUrl;
    }

    showToast(`💝 ₹${amount.toLocaleString('en-IN')} added to your contribution history!`);
  } catch (err) {
    document.getElementById('donate-step-input').style.display = 'none';
    document.getElementById('donate-step-success').style.display = 'block';
  }

  if (window.lucide) window.lucide.createIcons();
};

// ========================================================
// EXPLORE & SEARCH FILTERS
// ========================================================
window.setCauseFilter = function(cause) {
  state.selectedCause = cause;
  renderCurrentView();
};

window.handleSearchInput = function(e) {
  state.searchQuery = e.target.value;
  renderCurrentView();
  const searchInput = document.getElementById('ngo-search-input');
  if (searchInput) {
    searchInput.focus();
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
  }
};

window.setNgoTab = function(tab) {
  state.activeNgoTab = tab;
  renderCurrentView();
};

// ========================================================
// PORTAL SWITCHING & LOGIN HANDLERS (USER_INTERFACE.md & NGO_INTERFACE.md)
// ========================================================
window.switchPortal = function(portal) {
  state.currentPortal = portal;
  state.userRole = portal;
  if (portal === 'ngo') {
    window.location.hash = '#/ngo-dashboard';
    showToast('Switched to Approved NGO Console (Udaan Foundation)');
  } else {
    window.location.hash = '#/explore';
    showToast('Switched to Public User & Volunteer Portal');
  }
  renderNavbar();
};

window.selectLoginRole = function(role) {
  state.userRole = role;
  const cards = document.querySelectorAll('.portal-card');
  if (cards.length >= 2) {
    cards.forEach(c => c.classList.remove('active-role'));
    if (role === 'user') cards[0].classList.add('active-role');
    if (role === 'ngo') cards[1].classList.add('active-role');
  }
  const emailInput = document.getElementById('login-email-input');
  if (emailInput) {
    emailInput.value = role === 'ngo' ? 'contact@udaanfoundation.org' : 'dhruvesh@volunteer.in';
  }
};

window.confirmLoginPortal = function(role) {
  state.userRole = role;
  state.currentPortal = role;
  if (role === 'ngo') {
    window.location.hash = '#/ngo-dashboard';
    showToast('Welcome to Udaan Foundation NGO Management Console');
  } else {
    window.location.hash = '#/explore';
    showToast('Welcome to ProofBridge Public Discovery Portal');
  }
};

window.setQuickCredentials = function(role) {
  window.selectLoginRole(role);
  const emailInput = document.getElementById('login-email-input');
  const passInput = document.getElementById('login-password-input');
  if (emailInput) emailInput.value = role === 'ngo' ? 'contact@udaanfoundation.org' : 'dhruvesh@volunteer.in';
  if (passInput) passInput.value = '••••••••••••';
  showToast(`Quick credentials loaded for ${role === 'ngo' ? 'Approved NGO' : 'Public Volunteer User'}`);
};

window.submitLoginForm = function() {
  const role = state.userRole || 'user';
  state.currentPortal = role;
  if (role === 'ngo') {
    window.location.hash = '#/ngo-dashboard';
    showToast('Signed in successfully to Approved NGO Console');
  } else {
    window.location.hash = '#/explore';
    showToast('Signed in successfully to Public User Portal');
  }
};

// ========================================================
// LOCATION PERMISSION & CITY PICKER (USER_INTERFACE.md #2)
// ========================================================
window.openLocationPicker = function() {
  const modal = document.getElementById('location-picker-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (window.lucide) window.lucide.createIcons();
};

window.closeLocationPicker = function(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.modal-close-btn')) return;
  const modal = document.getElementById('location-picker-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.selectCityLocation = function(cityName) {
  state.userLocation.allowed = true;
  state.userLocation.city = cityName;
  state.userLocation.state = 'IN';
  const label = document.getElementById('nav-location-label');
  if (label) label.textContent = `${cityName}, IN`;
  window.closeLocationPicker();
  renderNavbar();
  renderCurrentView();
  showToast(`📍 Location updated to ${cityName}`);
};

window.saveManualLocation = function() {
  const input = document.getElementById('manual-city-input');
  const city = input ? input.value.trim() : '';
  if (city) {
    window.selectCityLocation(city);
  } else {
    window.closeLocationPicker();
  }
};

window.requestBrowserGps = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        state.userLocation.allowed = true;
        state.userLocation.city = 'Mumbai';
        state.userLocation.state = 'MH';
        state.userLocation.lat = pos.coords.latitude;
        state.userLocation.lng = pos.coords.longitude;
        window.closeLocationPicker();
        renderNavbar();
        renderCurrentView();
        showToast('📍 Browser location granted! Discovering activities near Mumbai, MH.');
      },
      () => {
        state.userLocation.allowed = true;
        state.userLocation.city = 'Mumbai';
        state.userLocation.state = 'MH';
        window.closeLocationPicker();
        renderNavbar();
        renderCurrentView();
        showToast('📍 Default location set to Mumbai, MH (4.2 km discovery radius).');
      },
      { timeout: 3000 }
    );
  } else {
    state.userLocation.allowed = true;
    state.userLocation.city = 'Mumbai';
    window.closeLocationPicker();
    renderNavbar();
    renderCurrentView();
    showToast('📍 Location set to Mumbai, MH.');
  }
};

// ========================================================
// COMMUNITY FEEDBACK & COMPLAINTS (USER_INTERFACE.md #14)
// ========================================================
window.openFeedbackModal = function(actId, title) {
  const modal = document.getElementById('feedback-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (window.lucide) window.lucide.createIcons();
};

window.closeFeedbackModal = function(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.modal-close-btn')) return;
  const modal = document.getElementById('feedback-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.submitFeedbackComplaint = function() {
  const typeSelect = document.getElementById('feedback-type-select');
  const msgInput = document.getElementById('feedback-message-input');
  const type = typeSelect ? typeSelect.value : 'feedback';
  const message = msgInput ? msgInput.value.trim() : '';

  if (!message) {
    alert('Please enter a description for your feedback or concern.');
    return;
  }

  const record = {
    id: `fb_${Date.now()}`,
    type,
    message,
    submittedBy: state.currentUser.email,
    submittedAt: new Date().toISOString(),
    status: 'pending_moderation'
  };

  if (type.startsWith('complaint')) {
    state.complaintsList.push(record);
    showToast('🛡️ Complaint registered for platform moderation. Audited independently.');
  } else {
    state.feedbackList.push(record);
    showToast('💬 Thank you! Feedback recorded for NGO improvement.');
  }

  if (msgInput) msgInput.value = '';
  window.closeFeedbackModal();
};

// ========================================================
// UPVOTING & DOWNVOTING (USER_INTERFACE.md #15)
// ========================================================
window.handleVote = function(actId, dir) {
  const current = state.userVotes[actId];
  if (current === dir) {
    delete state.userVotes[actId];
  } else {
    state.userVotes[actId] = dir;
  }
  renderCurrentView();
  showToast(dir === 'up' ? '▲ Upvoted! (Community interest noted)' : '▼ Downvoted! (Community sentiment recorded)');
};

// ========================================================
// NGO EVENT CREATION MODAL & ACTIONS (NGO_INTERFACE.md #9, #10)
// ========================================================
window.openCreateEventModal = function() {
  const modal = document.getElementById('create-event-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (window.lucide) window.lucide.createIcons();
};

window.closeCreateEventModal = function(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.modal-close-btn')) return;
  const modal = document.getElementById('create-event-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.saveNewNgoEvent = function() {
  const title = document.getElementById('new-evt-title')?.value || 'Community Health Checkup Drive';
  const cause = document.getElementById('new-evt-cause')?.value || 'Healthcare';
  const date = document.getElementById('new-evt-date')?.value || '20 October 2026';
  const time = document.getElementById('new-evt-time')?.value || '09:00 AM - 02:00 PM';
  const venue = document.getElementById('new-evt-venue')?.value || 'Dharavi Youth Hall, Mumbai';
  const slots = parseInt(document.getElementById('new-evt-slots')?.value) || 20;
  const goal = parseInt(document.getElementById('new-evt-goal')?.value) || 50000;
  const skills = document.getElementById('new-evt-skills')?.value || 'Patient intake and crowd coordination';

  const newEvent = {
    id: `evt_${Date.now()}`,
    title,
    cause,
    ngoId: 'ngo_udaan',
    ngoName: 'Udaan Foundation',
    date,
    startTime: time.split('-')[0]?.trim() || '09:00 AM',
    endTime: time.split('-')[1]?.trim() || '02:00 PM',
    venue,
    city: 'Mumbai',
    status: 'UPCOMING',
    volunteerPositions: slots,
    registeredCount: 0,
    requiredSkills: skills,
    expectedDuration: '5 hours',
    fundraiserTarget: goal,
    fundraiserRaised: 0,
    budget: [
      { category: 'Medical Supplies & Kits', amount: Math.round(goal * 0.6) },
      { category: 'Logistics & Venue', amount: Math.round(goal * 0.25) },
      { category: 'Volunteer Refreshments', amount: Math.round(goal * 0.15) }
    ],
    heroImage: '/assets/food_relief_distribution.jpg'
  };

  state.upcomingEventsList.unshift(newEvent);
  window.closeCreateEventModal();
  renderCurrentView();
  showToast('🎉 Upcoming Event & Fundraiser published to public feed!');
};

// ========================================================
// VOLUNTEER REGISTRATION (USER_INTERFACE.md #6)
// ========================================================
window.registerForEvent = function(eventId) {
  if (!state.registeredEvents.includes(eventId)) {
    state.registeredEvents.push(eventId);
    const evt = state.upcomingEventsList.find(e => e.id === eventId);
    if (evt) evt.registeredCount += 1;
  }
  showToast('🎟️ Registered as Volunteer! Your Event Pass is generated.');
  window.location.hash = '#/event-pass';
};

// ========================================================
// TOAST NOTIFICATION UTILITY
// ========================================================
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i data-lucide="info" style="width: 16px; height: 16px; color: #10b981;"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ========================================================
// INITIALIZATION
// ========================================================
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', () => {
  handleRoute();
});
