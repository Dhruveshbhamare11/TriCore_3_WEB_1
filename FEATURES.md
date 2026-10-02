# Features

# PRODUCT PRINCIPLE

The platform follows:

```
DISCOVER → VERIFY EVIDENCE → CONTRIBUTE → TRACE IMPACT
```

The standout experience is not NGO discovery itself. The standout experience is connecting NGO impact claims to inspectable evidence.

---

# PHASE 1

* **Time:** 3 hours
* **Goal:** Create a polished functional vertical slice capable of clearing Round 1.
* **Focus:** Approximately 70% UI/UX, 30% functionality.

---

# P0 — MUST COMPLETE

## 1. Landing Page
* **Route:** `/`
* **Hero:** *"See the impact. Verify the evidence. Be part of it."*
* **Supporting text:** *"Discover organisations, explore evidence behind their work, and contribute through donations or volunteering."*
* **Buttons:** `Explore NGOs` | `Find Volunteer Opportunities`
* **Sections:** Hero, Search, Featured NGOs, Causes, How Evidence Works, Volunteer Opportunities, CTA.
* The page should immediately communicate: NGOs, Evidence, Donations, Volunteering.

---

## 2. Explore NGOs
* **Route:** `/explore`
* **Search:** Live keyword search.
* **Filters:** Cause, Location, Volunteer Opportunities, Fundraisers, Organisation Record Status.
* **NGO cards display:** Logo, Name, Cause, Location, Description, Evidence-backed activity count, Volunteer opportunities.
* **Rule:** No numerical trust scores.

---

## 3. NGO Profile
* **Route:** `/ngo/:id`
* **Header:** Logo, NGO name, Location, Causes.
* **Actions:** Follow, Donate, Volunteer.
* **Tabs:** Overview, Activities, Fundraisers, Volunteer, Transparency.

---

## 4. Transparency Tab
* Show separate identity information.
* **Example:**
  * DARPAN record: Matched ([NGO DARPAN Portal](https://ngodarpan.gov.in/#/))
  * Registration: Matched
  * 80G information: Available
  * FCRA: Not applicable / available / not checked
* **Crucial Rule:** Never say *"NITI Aayog verified NGO"*. Include disclaimer: *"DARPAN record matching does not constitute endorsement, affiliation, or recognition by NITI Aayog."*

---

## 5. Activity Feed
* Social-media-style activity cards.
* Each activity includes: Media, Title, Description, Date, Location, Impact claim, Evidence preview, Volunteer participation.
* **CTA:** `View Evidence`
* **Primary example:** School Kit Distribution (Claim: 250 school kits distributed).

---

## 6. Evidence Passport
**THIS IS THE PRIMARY DIFFERENTIATING FEATURE.**
Every important activity can have an Evidence Passport.
* **Sections:** CLAIM, MEDIA, DOCUMENTS, LOCATION, VOLUNTEERS, FINANCIAL EVIDENCE (if applicable).

---

## 7. Evidence Viewer
* Click **`View Evidence`** to open a polished drawer/modal/page.
* **Primary example data:**
  * **CLAIM:** 250 school kits distributed • Dharavi • September 24
  * **MEDIA:** 8 files (✓ Date consistent, ✓ Location consistent)
  * **DOCUMENTS:** Invoice INV-4821 (220 school kits, ₹145,200, ✓ Calculations consistent, ✓ Date consistent, ⚠️ Quantity partially supports claim)
  * **VOLUNTEERS:** 25 registered, 17 authenticated attendees, 14 confirmations
  * **MAIN FINDING:** ⚠️ Needs clarification (Claimed: 250 kits | Documented: 220 kits | Difference: 30 kits)

---

## 8. AI Evidence Analyst
* Button: **`Analyse Evidence`**
* Show loading: *"Reviewing available evidence..."*
* **Output sections:** Evidence Reviewed, Consistent Signals, Needs Clarification, Missing Information, Summary.
* **Example text:** *"Available evidence supports the reported activity date and location. Authenticated volunteer attendance supports participation in the event. Submitted invoice evidence currently accounts for 220 of the 250 reported school kits."*
* **CTA:** `View underlying evidence`
* *The analyst explains evidence; it does not determine trust.*

---

## 9. Volunteer Authentication
* **Flow:** `Join Activity → Enter name + phone/email → Demo OTP → Volunteer Pass → QR → Check In → Authenticated Attendance`
* **Phase 1 OTP:** `123456` (clearly prototype authentication).

---

## 10. Volunteer Pass
* **Show:** Volunteer name, Volunteer ID, NGO, Activity, Date, Location, QR code, Status.

---

## 11. Functional Check-In
* **Before:** 17 authenticated attendees
* **After successful demo check-in:** 18 authenticated attendees
* The Evidence Viewer should update immediately to make the prototype visibly functional.

---

## 12. Fundraiser
* **Route:** `/fundraiser/:id`
* **Primary fundraiser:** *"Help provide another 100 school kits"* (Target: ₹80,000 | Raised: ₹62,400 | Progress: 78%).
* **Suggested contributions:** `₹200`, `₹500`, `₹800`, `Custom` (e.g., ₹800 ≈ supplies for one student).
* **CTA:** `Donate`

---

## 13. Demo Donation
* Click Donate → opens checkout modal.
* Do NOT process real money (clearly labeled as demo payment flow).
* Include bridge button: **`See how previous funds were used`**.

---

# P1 — COMPLETE IF TIME ALLOWS

### Volunteer Passport
* **Route:** `/profile`
* **Display:** Authenticated activities, Volunteer hours, NGOs supported, Activity history (e.g., 7 activities, 31 volunteer hours, 3 NGOs supported).

### Fund Utilisation
* Display reported expenditure: `₹62,400 raised → School supplies, Transport, Packaging → Supporting documents → Related activity`.

---

# PHASE 1 DEMO FLOW
The complete flow must work:
```
HOME → EXPLORE → UDAAN FOUNDATION → SCHOOL KIT DISTRIBUTION → VIEW EVIDENCE 
  → SEE 250 VS 220 DISCREPANCY → ANALYSE EVIDENCE → VOLUNTEER → DEMO OTP 
  → VOLUNTEER PASS → CHECK IN → ATTENDANCE 17 → 18 → RETURN TO EVIDENCE
```

---

# PHASE 2

* **Time:** 1.5 hours
* **Rule:** Do NOT redesign Phase 1. Do NOT rebuild working components. Extend the product.

### Priority 1: ProofGraph / Trace Impact
* Button: **`Trace Impact`**
* Visualize: `DONATION → FUNDRAISER → EXPENDITURE → INVOICE → ACTIVITY → CLAIM → EVIDENCE → OUTCOME`
* Every node clickable, opening supporting details.

### Priority 2: Evidence Conflict Engine
* Second intentionally problematic activity: *Food Distribution (500 food packets, Pune, Sept 20)*.
* Evidence: Invoice (300 packets, Sept 19), Media (Mumbai, Sept 3), Volunteers (12 check-ins, Pune, Sept 20).
* **Expected:** ⚠️ 3 discrepancies detected (Quantity, Location, Date).
* *Do NOT say: "Fraud detected." Say: "Evidence discrepancy detected."*

### Priority 3: Duplicate Evidence Detection
* Two activities containing the same or near-identical evidence.
* Display: *"Possible reused evidence detected."*
* Comparison view: Current Activity vs Previous Activity (Invoice #, Vendor, Amount, Date, % match).

### Priority 4: NGO Dashboard
* **Route:** `/ngo-dashboard`
* Form: Title, Description, Date, Location, Impact claim (Quantity, Unit) + File uploads (Photos, Invoices, Documents).
* **Automated pre-scan:** Extracting info → Checking dates → Checking location → Checking quantities → Checking duplicates → Comparing evidence → Findings → `Publish with evidence`.

---

# DO NOT BUILD DURING HACKATHON
* Real payment processing
* Aadhaar integration
* Face recognition
* Blockchain
* Production DARPAN scraping
* Production GST verification
* Complex OCR pipeline
* Production AI image detection
* Messaging / Chat
* Push notifications
* Recommendation engine
* Complex admin system
* Full social network

---

# STANDOUT FEATURES TO EMPHASIZE
1. Evidence Passport
2. AI Evidence Analyst
3. Authenticated Volunteer Validation
4. Evidence Conflict Engine
5. ProofGraph
6. Duplicate Evidence Detection
