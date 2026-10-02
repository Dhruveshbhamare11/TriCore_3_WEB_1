# Architecture

## 1. Technical Goal

Build a hackathon-ready NGO transparency platform focused on evidence-backed impact.

The architecture must prioritize:

1. Fast development
2. Reliable demo behaviour
3. Reusable components
4. Seeded demo data
5. Clear separation between evidence and interpretation
6. Easy Phase 2 extension

Do not overengineer production infrastructure during Phase 1.

---

# 2. Application Flow

### PUBLIC USER
```
Home
  ↓
Explore NGOs
  ↓
NGO Profile
  ↓
Activity
  ↓
Evidence Viewer
  ↓
Evidence Analysis
  ↓
Donate / Volunteer
```

### VOLUNTEER
```
Activity
  ↓
Join Activity
  ↓
Demo Authentication
  ↓
Volunteer Pass
  ↓
QR Check-In
  ↓
Authenticated Attendance
  ↓
Activity Confirmation
```

### NGO - PHASE 2
```
NGO Dashboard
  ↓
Create Activity
  ↓
Upload Evidence
  ↓
Evidence Processing
  ↓
Conflict Detection
  ↓
Publish Activity
```

---

# 3. Routes

### Phase 1 routes:

* `/` — Landing page
* `/explore` — NGO discovery
* `/ngo/:id` — NGO profile
* `/activity/:id` — Activity and Evidence Passport
* `/fundraiser/:id` — Fundraiser details
* `/volunteer` — Volunteer opportunities
* `/profile` — Volunteer Passport

### Phase 2:

* `/ngo-dashboard` — NGO activity/evidence submission

---

# 4. Core Data Models

## NGO

```typescript
NGO {
    id
    name
    slug
    logo
    coverImage
    description

    causes[]
    city
    state

    identity {
        darpanId?
        darpanStatus
        registrationNumber?
        registrationStatus
        eightyGAvailable
        fcraStatus?
    }

    stats {
        activities
        volunteers
        volunteerHours
        fundsRaised
    }

    activities[]
    fundraisers[]
    volunteerOpportunities[]
}
```

---

## Activity

```typescript
Activity {
    id
    ngoId

    title
    description
    cause
    date

    location {
        name
        city
        latitude?
        longitude?
    }

    claim {
        description
        metric?
        claimedQuantity?
        unit?
    }

    media[]
    documents[]

    volunteers {
        registered
        authenticatedAttendance
        confirmations
    }

    evidenceAnalysis
}
```

---

## MediaEvidence

```typescript
MediaEvidence {
    id
    type
    url

    metadata {
        available
        captureDate?
        gpsAvailable
        latitude?
        longitude?
    }

    checks {
        dateConsistency
        locationConsistency
        duplicateStatus
    }
}
```

---

## DocumentEvidence

```typescript
DocumentEvidence {
    id

    type
    fileName

    extractedData {
        vendor?
        invoiceNumber?
        date?
        quantity?
        unit?
        unitPrice?
        subtotal?
        tax?
        total?
        gstin?
    }

    checks {
        calculationConsistency?
        dateConsistency?
        quantityConsistency?
        duplicateStatus?
        vendorIdentifierStatus?
    }
}
```

---

## Evidence Status

Use only:
- `consistent`
- `partial`
- `conflict`
- `not_available`
- `not_checked`

Do not create a numerical trust score.

---

## Volunteer

```typescript
Volunteer {
    id
    name
    email?
    phone?

    authenticationStatus

    activities[]

    totalHours
}
```

---

## VolunteerParticipation

```typescript
VolunteerParticipation {
    activityId

    registrationStatus

    attendanceStatus

    checkInTime?

    confirmationStatus

    volunteerHours?
}
```

**Important:**
`registered != attended != confirmed`  
Keep all three separate.

---

## Fundraiser

```typescript
Fundraiser {
    id
    ngoId

    title
    description

    targetAmount
    raisedAmount

    impactExamples[]

    expenditures[]
}
```

---

# 5. Evidence Engine

The Evidence Engine compares an NGO's claim against submitted evidence.

It DOES NOT decide whether the NGO is trustworthy.

```
INPUT
Activity claim + Documents + Media + Location signals + Volunteer participation + Financial evidence
   ↓
ANALYSIS
Quantity, Date, Location, Documents, Volunteers, Duplicates
   ↓
OUTPUT
Consistent signals, Partial support, Conflicts, Missing evidence
```

---

# 6. Quantity Logic

**Example:**

Claim: `250 school kits`  
Invoice: `220 school kits`  

**Calculate:**
`difference = claimedQuantity - documentedQuantity`  
`250 - 220 = 30`

**Result:**
`status = partial`

**Message:**
*"Submitted invoice evidence currently accounts for 220 of the 250 reported school kits. 30 kits are not accounted for by the currently submitted invoice evidence."*

*Never say:* "The NGO lied about 30 kits."

---

# 7. Invoice Logic

Invoices can have different layouts. Normalize them into:
Vendor, Invoice number, Date, Items, Quantity, Unit price, Subtotal, Tax, Total, GSTIN.

Then perform checks:

### Mathematical
`quantity × unitPrice ≈ subtotal`  
`subtotal + tax ≈ total`  
(Allow small rounding tolerance)  
*Result:* `"Invoice calculations consistent"` (NOT: `"Invoice authentic"`)

### Quantity
Sum quantities from relevant documents.  
*Example:* Invoice A = 150 kits, Invoice B = 70 kits → Total documented = 220. Compare with activity claim.

### Date
Purchase shortly before an event may be consistent.  
*Example:* Invoice: September 23, Activity: September 24 → Result: `consistent`.

---

# 8. Date Logic

Compare: Activity date, Media capture date, Invoice date, Volunteer check-in date.

*Example:* Activity: September 20, Photo: September 3 → Result: `conflict`.  
*Message:* `"Media capture date does not align with the reported activity date."`

---

# 9. Location Logic

Compare: Activity location with available Media GPS and Volunteer check-in location.

*Example:* Claim: Pune, Media: Mumbai → Result: `conflict`.  
*Message:* `"Available media location information does not align with the reported activity location."`

Missing GPS is NOT a conflict. Use: `"Location metadata unavailable."`

---

# 10. Volunteer Logic

Always distinguish:
* Registered volunteers
* Authenticated attendees
* Post-event confirmations

*Example:* 25 registered, 17 authenticated attendees, 14 confirmations.  
Display exactly those separate numbers. Volunteer attendance supports that the authenticated account participated; it does NOT prove every other NGO claim.

---

# 11. Evidence Analysis

`generateEvidenceAnalysis(activity)` should evaluate:
- quantity
- date
- location
- documents
- volunteers
- duplicates if available

**Return format:**
```json
{
    "consistentSignals": [],
    "conflicts": [],
    "missingEvidence": [],
    "summary": ""
}
```

---

# 12. AI Evidence Analyst

The LLM is an explanation layer. It receives structured evidence.

**It may:**
- summarize evidence
- compare evidence
- explain discrepancies
- identify missing evidence
- answer evidence questions

**It must NOT:**
- assign trustworthiness
- declare fraud
- declare invoices authentic
- declare images genuine
- invent evidence

**Example output:**
* **CONSISTENT:**
  * ✓ Activity date aligns with available records.
  * ✓ Available location signals align with Mumbai.
  * ✓ 17 authenticated volunteer attendance records support participation.
* **NEEDS CLARIFICATION:**
  * ⚠ Activity reports 250 kits. Submitted invoices currently account for 220 kits. 30 kits are not currently supported by submitted invoice evidence.

Always provide: `"View underlying evidence"`.

*Phase 1 may use deterministic seeded analysis rather than a live LLM. Do not falsely present seeded output as live AI analysis.*

---

# 13. Volunteer Authentication Logic

* **Phase 1 demo OTP:** `123456`
* **Flow:**
  `registerVolunteer() → verifyDemoOTP() → generateVolunteerPass() → checkInVolunteer() → confirmParticipation()`
* Registration: `attendanceStatus = not_checked_in`
* Check-in: `attendanceStatus = checked_in`, `checkInTime = current timestamp`
* Prevent duplicate check-in.

**Example demo:**
* Before: `17 authenticated attendees`
* After check-in: `18 authenticated attendees` (UI updates immediately).

---

# 14. ProofGraph - Phase 2

ProofGraph visualizes relationships:
`Donation → Fundraiser → Expenditure → Invoice → Activity → Claim → Evidence → Reported Outcome`

**Node types:**
`NGO`, `Fundraiser`, `Donation`, `Expenditure`, `Document`, `Activity`, `Claim`, `Media`, `Volunteer Evidence`, `Outcome`

Clicking a node opens details. ProofGraph is NOT blockchain; it represents relationships between records.

---

# 15. Duplicate Detection - Phase 2

Check: exact file hash, invoice number, vendor, amount, date. Future: perceptual image similarity.

If a likely duplicate exists: `"Possible reused evidence detected."` (Never automatically: `"Fraud detected."`).

---

# 16. Component Architecture

### LAYOUT
* `Navbar`, `Footer`, `PageContainer`, `SectionHeader`

### NGO
* `NGOCard`, `NGOGrid`, `NGOSearch`, `NGOFilters`, `NGOHeader`, `NGOTabs`, `IdentityPanel`

### ACTIVITY
* `ActivityCard`, `ActivityFeed`, `ActivityHeader`, `ClaimCard`

### EVIDENCE
* `EvidenceSummary`, `EvidenceStatusBadge`, `EvidenceCard`, `EvidenceDrawer`, `MediaEvidencePanel`, `DocumentEvidencePanel`, `VolunteerEvidencePanel`, `LocationEvidencePanel`, `ConflictAlert`, `MissingEvidenceAlert`, `EvidenceAnalyst`

### VOLUNTEER
* `VolunteerOpportunityCard`, `VolunteerRegistrationModal`, `OTPModal`, `VolunteerPass`, `QRCodeCard`, `CheckInModal`, `VolunteerPassport`, `ParticipationHistory`

### FUNDRAISING
* `FundraiserCard`, `FundraiserProgress`, `DonationAmountSelector`, `DonationModal`, `ExpenditureBreakdown`

### PHASE 2
* `ProofGraph`, `ProofGraphNode`, `ProofGraphDrawer`, `ConflictComparison`, `DuplicateEvidenceComparison`, `ActivitySubmissionForm`, `EvidenceUpload`, `AnalysisProgress`

Evidence statuses MUST use `EvidenceStatusBadge`.

---

# 17. State Management

The hackathon demo should be deterministic.
Important states:
- NGO selection
- Activity selection
- Evidence drawer state
- Evidence analysis state
- Volunteer registration
- Volunteer authentication
- Volunteer attendance
- Donation amount
- ProofGraph selection

The main demo must not depend on unstable external APIs.

---

# 18. Demo Data

**Primary NGO:**
* Udaan Foundation (DEMO DATA)
* Cause: Education
* Location: Mumbai

**Primary Activity:**
* School Kit Distribution (Dharavi, Mumbai • September 24, 2026)
* Claim: 250 school kits distributed.
* Media: 8 files (Date consistent, Location consistent)
* Invoice: ABC Educational Supplies, INV-4821, September 23, 2026, 220 school kits, ₹660/kit, ₹145,200 subtotal
* Volunteers: 25 registered, 17 authenticated attendees, 14 confirmations
* Expected discrepancy: Claimed 250, Documented 220, Difference 30.

**Fundraiser:**
* "Help provide another 100 school kits"
* Target: ₹80,000 | Raised: ₹62,400 (₹800 ≈ one school kit)

Create 4-5 additional fictional NGOs for Explore (do not build equally detailed datasets for them; Udaan Foundation is the primary demo NGO).
