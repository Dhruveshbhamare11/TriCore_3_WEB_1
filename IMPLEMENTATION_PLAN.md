# 🌐 ProofGraph — 4.5-Hour Hackathon Implementation Plan

> ### **"A proof-first platform for social impact."**
> *"Most platforms show you what an organisation says it did. We connect every impact claim to its underlying evidence—documents, media, financial records and authenticated participants—and surface inconsistencies instead of hiding them behind a trust score."*

---

## 🎯 Overall Build Target & Demo Storyline

**Discover NGO → Verify NGO Legitimacy (NGO DARPAN) → See Activity Claim → Inspect Evidence → AI Explains Inconsistencies → Authenticated Volunteers Corroborate Participation → Contribute / Volunteer → Trace Impact & ProofGraph**

---

## 🏛️ Official NGO Legitimacy Verification Layer: NGO DARPAN
We verify foundational NGO legitimacy using India's official government portal **[NGO DARPAN (NITI Aayog)](https://ngodarpan.gov.in/#/)**:
* **Unique DARPAN ID:** Every listed NGO displays its verified Unique ID (e.g., `MH/2021/0298412`).
* **External Verification Link:** One-click direct redirection to the [NGO DARPAN Portal](https://ngodarpan.gov.in/#/) record for transparent validation.
* **Legitimacy Triad in Transparency Card:**
  1. **DARPAN Registration:** Matched & Verified via [ngodarpan.gov.in](https://ngodarpan.gov.in/#/) ✓
  2. **Society / Trust Registration:** Registration Act Certificate Matched ✓
  3. **Tax Exemption Status:** 80G / 12A Exemption Validated ✓
*(Note: Visual badges display "Record Matched on NGO DARPAN Registry" avoiding misleading claims of government endorsement).*

---

## ⏱️ Development Timeline Overview

```text
┌────────────────────────────────────────┬────────────────────────────────────────┐
│          PHASE 1 (3.0 Hours)           │          PHASE 2 (1.5 Hours)           │
│    "Make them WANT the product"        │ "Make them BELIEVE the product works"  │
├────────────────────────────────────────┼────────────────────────────────────────┤
│ • Foundation & Design Tokens (20m)     │ • Interactive Proof Trail (25m)        │
│ • Core 4 Pages (40m)                   │ • Evidence Conflict Engine (20m)       │
│ • Killer Feature: Evidence Card (45m)  │ • Duplicate Evidence Detection (20m)   │
│ • AI Evidence Analyst Panel (20m)      │ • NGO-side Upload & Analyzer (15m)     │
│ • Volunteer Auth & QR Pass (25m)       │ • Final Rehearsal & Freeze (10m)       │
│ • Fundraiser Demo Experience (15m)     │                                        │
│ • Development Freeze & Rehearsal (15m) │                                        │
└────────────────────────────────────────┴────────────────────────────────────────┘
```

---

# 🚀 PHASE 1 — 3 HOURS (Polished, Clickable, Convincing MVP)

### 0:00 – 0:20 | Foundation & Seed Setup
* **Brand & Shell:** Product name (`ProofGraph`), Logo, Navbar, typography, CSS tokens, and responsive shell.
* **Seed Data:** 5–6 NGOs with **1 Deeply Detailed NGO** (e.g., *Udaan Foundation — Education — Mumbai*):
  * **NGO DARPAN ID:** `MH/2021/0298412` (with direct link to [ngodarpan.gov.in](https://ngodarpan.gov.in/#/))
  * 3 activities
  * 1 fundraiser
  * 2 volunteer opportunities
  * Registration & DARPAN match records (clearly marked demo data)
  * 17 authenticated volunteers
  * Uploaded invoices and media metadata

---

### 0:20 – 1:00 | Core UI (4 Essential Pages)
1. **Landing Page:**
   * Hero: *"See the impact. Verify the evidence. Be part of it."*
   * Action buttons: `Explore NGOs` | `Volunteer`
   * Featured NGOs, Trending Causes, Impact Statistics, How Verification Works (including NGO DARPAN integration).
2. **Explore / Directory:**
   * Live filterable cards by category (`Education`, `Environment`, `Health`, `Disaster Relief`).
   * Organization record badges (DARPAN Verified ✓) & evidence counts.
3. **NGO Profile Page:**
   * Tabs: `Overview` | `Activities` | `Fundraisers` | `Volunteer` | `Transparency`.
   * **Transparency Tab:**
     * **NGO DARPAN Record:** Matched ✓ ([Verify on ngodarpan.gov.in](https://ngodarpan.gov.in/#/))
     * **Registration:** Matched (Societies Registration Act XXI of 1860) ✓
     * **80G / 12A Status:** Active & Tax Exempt ✓
4. **Activity Feed:**
   * Social-style post cards with media carousel, location tags, and live **"View Evidence →"** trigger.
Flag blacklisted NGO'S
---

### 1:00 – 1:45 | 🌟 Hero Feature: Interactive Evidence Card / Drawer
* Clicking **`View Evidence`** opens a deep-dive evidence inspection drawer containing 4 core verification layers:
  * **CLAIM:** 250 school kits distributed • September 24 • Dharavi, Mumbai.
  * **MEDIA:** 8 files submitted (EXIF metadata verified, timestamp consistent, location consistent).
  * **DOCUMENTS:** Invoice #EDU0924 (Quantity: 220 kits • Calculation consistent • ⚠️ Quantity discrepancy).
  * **VOLUNTEERS:** 17 authenticated participants • 14 independently confirmed activity.
* **Highlight Banner (The Memory Moment):**
  > ⚠️ **Evidence Discrepancy:** Activity claims **250 kits**. Submitted invoices currently account for **220 kits**. **30 kits lack supporting invoice evidence.**

---

### 1:45 – 2:05 | ✨ AI Evidence Analyst Panel
* Dedicated analysis trigger (`✨ Analyse Evidence`) powered by structured analysis (and local Ollama `gemma4:e4b` where connected):
  * **Analysed:** 8 media files, 2 documents, 17 volunteer records, 1 activity claim, NGO DARPAN registry status.
  * **Consistent:** Date ✓, Location ✓, Volunteer participation ✓, DARPAN Identity ✓.
  * **Needs Clarification:** ⚠️ Quantity (Claimed: 250 kits | Documented: 220 kits | Difference: 30 kits).
  * **AI Summary:** *"Available evidence supports the reported activity date and location. Submitted documents currently support 220 of the 250 reported kits."*

---

### 2:05 – 2:30 | 🎟️ Authenticated Volunteer Proof-of-Presence
* **Step 1:** Click `Volunteer for this event`.
* **Step 2:** Fast auth form (Name, Phone/Email, Demo OTP).
* **Step 3:** Generate branded **Volunteer Pass** with unique QR & ID (`#V10482`).
* **Step 4:** Simulate event check-in (`✓ Attendance authenticated • September 24 • 9:03 AM`).
* **Step 5 (Live State Change):** Activity post live updates from **17 authenticated volunteers → 18 authenticated volunteers**.

---

### 2:30 – 2:45 | 💸 Fundraiser & Financial Traceability Entry
* Campaign: *Help provide another 100 school kits* (₹62,400 / ₹80,000 — 78%).
* Preset chips: `[₹200]` `[₹500]` `[₹800]` `[Custom]` → Demo Donate modal.
* Direct bridge button to Phase 2: **`See how previous funds were used →`**.

---

### 2:45 – 3:00 | 🛑 Phase 1 Development Freeze & Rehearsal
* Zero new code.
* Rehearse exact demo path: **Home → Explore (Filter) → NGO Profile (DARPAN Check) → Activity Feed → Evidence Drawer → AI Analyst → Volunteer Registration → QR Check-in**.
* Fix broken routes, overflow, spacing, and placeholder artifacts.

---

# 🔬 PHASE 2 — 1.5 HOURS (Deep Trust Infrastructure)

### 0:00 – 0:25 | 🕸️ Proof Trail & Interactive ProofGraph
* Add **`Trace this impact`** visual explorer:
  ```text
  DONATIONS (₹62,400)
         │
         ▼
  CAMPAIGN (School Kit Drive)
         │
         ▼
  PURCHASE (₹48,400) ──► [Invoice 01: 220 kits] & [Invoice 02: Transport]
         │
         ▼
  ACTIVITY (School Kit Distribution) ──► [Media ✓] [Location ✓] [17 Volunteers ✓]
         │
         ▼
  OUTCOME (250 kits reported)
  ```
* Every node is interactive: Click Invoice → View bill; Click Volunteers → View check-in log; Click Media → View EXIF.

---

### 0:25 – 0:45 | 🚨 Evidence Conflict Engine
* Create a **second intentional demo activity** (*Food Distribution — Pune*):
  * **Claimed:** 500 food packets • Pune • September 20.
  * **Invoice:** 300 packets • September 19.
  * **Photo EXIF:** Location: Mumbai • September 3.
  * **Volunteers:** 12 check-ins • Pune • September 20.
* **Engine Alert Display:**
  > ⚠️ **2 Discrepancies Detected**  
  > • **Location Conflict:** Activity: Pune vs Media EXIF: Mumbai  
  > • **Quantity Conflict:** Claimed: 500 packets vs Invoices: 300 packets

---

### 0:45 – 1:05 | 🔍 Duplicate Evidence Detection
* Showcase cross-activity asset reuse detection:
  * Two activities reusing the same invoice or cropped photo.
  * Comparison Drawer: Current Submission vs Previous Submission (98% match alert).

---

### 1:05 – 1:20 | 📤 NGO-Side Upload & Auto-Analyzer
* NGO Dashboard `+ Add Activity` form:
  * Title, Date, Location, Impact Claim + File upload dropzones (Photos, Invoices, Documents).
* Real-time automated verification scan simulation:
  * Extracting document data ✓ → Checking metadata ✓ → Checking duplicate evidence ✓ → Comparing claim vs receipts.

---

### 1:20 – 1:30 | 🛑 Final Demo Freeze
* End-to-end rehearsal showing complete loop from NGO post upload to donor proof trace.

---

## 🚫 What NOT to Build (Save Time)

| ❌ Strictly Avoid | Why |
|---|---|
| Blockchain / Smart Contracts | Wastes hours, doesn't improve UI demo |
| Live Scraper for DARPAN Captchas | Fragile, can fail during demo; use verified DARPAN link + ID badges |
| Real Payment Gateways | Setup overhead; mock checkout is better |
| Aadhaar / Face Recognition | High complexity, privacy rabbit hole |
| Deep AI Fake-Image Classifiers | Unreliable to defend against judges |
| Mobile Apps / Push Notifications | Web app works faster for presentations |

---

## 👥 Team Workload Distribution (If Parallelizing)

| Role | Phase 1 (3 Hours) | Phase 2 (1.5 Hours) |
|---|---|---|
| **Member A (Frontend Core)** | Landing + Explore Filter (Disaster, Edu, etc.) + NGO Profile (DARPAN tab) | ProofGraph Interactive Visualizer |
| **Member B (Evidence UI)** | Activity Feed + Evidence Card & Drawer | NGO Upload Dashboard & Pre-scan |
| **Member C (Logic & Engine)** | Seed Data Models + AI Analyst Panel | Conflict Engine + Duplicate Detection |
| **Member D (Product & Flows)** | Volunteer QR Flow + Fundraiser Modal | Integration, Testing & Pitch Demo |

---

## 🏆 Development Priority Hierarchy

1. **Level 1 (Essential Core):** NGO Discovery → Profile (DARPAN Verified) → Activity Feed → Evidence Card & Drawer.
2. **Level 2 (Differentiation):** AI Evidence Analyst → Volunteer Proof-of-Presence QR Flow.
3. **Level 3 (Standout Wow Factor):** Interactive ProofGraph → Evidence Conflict Engine → Duplicate Detection.
4. **Level 4 (Nice to Have):** Extra NGO cards, micro-animations, custom donor checkout inputs.

---

## 🛑 Status
**Implementation plan updated with NGO DARPAN verification integration. Standing by for your command to begin Phase 1 execution.**
