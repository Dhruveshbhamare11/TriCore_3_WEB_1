# Agent Instructions

You are building a time-constrained hackathon prototype.

Read:
- [PROJECT_OVERVIEW.md](file:///c:/Users/Dhruvesh/Desktop/ACM%20hack/PROJECT_OVERVIEW.md)
- [ARCHITECTURE.md](file:///c:/Users/Dhruvesh/Desktop/ACM%20hack/ARCHITECTURE.md)
- [FEATURES.md](file:///c:/Users/Dhruvesh/Desktop/ACM%20hack/FEATURES.md)

before making major architectural changes.

---

# PRIMARY OBJECTIVE

Build a polished, reliable vertical slice of an NGO transparency platform.

The main differentiator is:
```
NGO CLAIM → EVIDENCE → CONSISTENCY CHECKS → DISCREPANCY DETECTION → HUMAN-READABLE EXPLANATION → USER DECISION
```
The platform must NOT decide which NGOs users should trust.

---

# DEVELOPMENT PRIORITY

Always prioritize in this order:
1. Existing functionality must not break
2. Main demo flow
3. UI quality
4. Evidence experience
5. Functional interactions
6. Reusable architecture
7. Additional features

Do not sacrifice working functionality to add unnecessary features.

---

# PHASE RULE

* If implementing Phase 1: **DO NOT implement Phase 2 unless explicitly instructed.**
* If implementing Phase 2: **DO NOT redesign Phase 1. Extend existing components.**

---

# DESIGN RULES

* The application should feel: **modern, credible, human, clean, premium, transparent**.
* **Avoid:** Government portal appearance, generic admin dashboard appearance, excessive gradients, excessive glassmorphism, random colors, huge amounts of text, AI-generated visual clutter.
* **Use:** Light neutral background, deep green/emerald primary accent.
  * Green = `consistent`
  * Amber = `partial / needs clarification`
  * Red = `conflict`
  * Grey = `unavailable / not checked`
* Never rely only on color. Use **icon + text + color**.

---

# COMPONENT RULE

* Before creating a component, check whether an equivalent reusable component exists.
* Do not duplicate components unnecessarily.
* Evidence statuses MUST use `EvidenceStatusBadge`.
* Activity evidence should use shared evidence components.

---

# DATA RULE

* Use structured data from [ARCHITECTURE.md](file:///c:/Users/Dhruvesh/Desktop/ACM%20hack/ARCHITECTURE.md).
* Do not hardcode unrelated versions of the same NGO/activity across multiple pages.
* Updating a demo activity state should propagate to relevant UI (e.g., `authenticatedAttendance: 17` → after check-in `18` on Activity page and Evidence Viewer).

---

# DEMO DATA RULE

* All fictional NGOs and records are demo data. Do not present fictional registration information as real.
* **Primary demo NGO:** Udaan Foundation
* **Primary demo activity:** School Kit Distribution (Claim: 250 kits | Documented: 220 kits | Difference: 30 kits). This discrepancy MUST remain deterministic.

---

# EVIDENCE LANGUAGE

**Never say:**
- "100% verified"
- "Trustworthy NGO"
- "Government approved"
- "NITI Aayog verified"
- "AI verified"
- "Image is real"
- "Invoice is authentic"
- "Fraud detected"

*(unless independently established through an appropriate authoritative process)*

**Prefer:**
- "Organisation records checked"
- "DARPAN record matched"
- "Document checks completed"
- "Available provenance signals are consistent"
- "Evidence discrepancy detected"
- "Possible reused evidence"
- "Needs clarification"
- "Authenticated volunteer participation"

---

# DARPAN RULE

* Display: `"DARPAN record matched"`
* Never: `"NITI Aayog verified"` or `"Government approved"`
* Do not use NITI Aayog branding or National Emblem.
* Include: *"DARPAN record matching does not constitute endorsement, affiliation, or recognition by NITI Aayog."*

---

# EVIDENCE PRINCIPLES

1. **Absence of evidence != conflict.**
   * *Example:* No GPS metadata.
   * *Correct:* `"Location metadata unavailable."`
   * *Incorrect:* `"Location verification failed."`

2. **Consistency != proof.**
   * *Correct:* `"Available location information is consistent with Mumbai."`
   * *Incorrect:* `"Location proven."`

3. **Volunteer confirmation != proof of all claims.**
   * *Correct:* `"14 authenticated participants confirmed participation."`
   * *Incorrect:* `"14 volunteers verified that exactly 250 kits were distributed."`

4. **Invoice mathematics != invoice authenticity.**
   * *Correct:* `"Invoice calculations are consistent."`
   * *Incorrect:* `"Invoice verified as authentic."`

---

# AI RULE

The LLM is an explanation layer. The database/evidence engine provides structured evidence.

* **The LLM:** summarizes, compares, explains, identifies inconsistencies.
* **The LLM does NOT:** assign trust, determine fraud, authenticate invoices, authenticate photographs, invent evidence.

---

# UI RULE

* The **Evidence Viewer** is the most important screen. Spend more visual attention on it than secondary screens.
* Structure: `CLAIM → EVIDENCE SOURCES → CONSISTENT SIGNALS → NEEDS CLARIFICATION → UNDERLYING EVIDENCE`.
* Do not bury evidence behind multiple clicks.

---

# FUNCTIONALITY RULE

* No visible primary CTA in the demo journey should be dead.
* If a feature cannot be implemented: either hide the CTA or provide a clearly labelled demo interaction.

---

# LOADING STATES & ERROR HANDLING

* Use polished loading states for Evidence Analysis, Volunteer authentication, Evidence upload, ProofGraph loading.
* Keep demo interactions fast (no excessive artificial delays).
* Never leave users on blank screens. Provide clear error messages, retry actions, and back navigation.

---

# MAIN DEMO PATHS

### Phase 1 Main Path (MUST work before adding secondary features):
```
Home → Explore → Udaan Foundation → School Kit Distribution → View Evidence 
  → See quantity discrepancy → Analyse Evidence → Volunteer → Demo OTP 
  → Volunteer Pass → Check In → Attendance update (17 → 18)
```
*If this path breaks, STOP adding features and fix it.*

### Phase 2 Main Path:
```
Preserve Phase 1 → Trace Impact → ProofGraph → Evidence Conflict 
  → Compare conflicting evidence → Duplicate Evidence → Compare documents 
  → NGO Dashboard → Submit Activity → Analyse Evidence → Publish
```

---

# HACKATHON TIME RULE

* Prefer working seeded data over unfinished production API integration.
* Prefer deterministic demo over unstable AI behaviour.
* Prefer one excellent activity over twenty incomplete activities.
* Prefer clear evidence explanation over complex technical claims.

---

# FINAL PRODUCT PRINCIPLE

> **"We don't tell people which NGO to trust. We give them the evidence to decide."**
