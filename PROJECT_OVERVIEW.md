# Project Overview

## Working Product Name
ProofBridge

The name may be changed later. Do not hardcode the product name unnecessarily throughout components.

## Product Type
NGO discovery, transparency, volunteering, fundraising, and evidence-backed impact platform.

## Core Problem

People who want to support NGOs often have difficulty answering:

1. Which NGOs work on causes I care about?
2. What activities has an NGO actually carried out?
3. What evidence supports the NGO's claims?
4. Where did donated money go?
5. Are activity photos, invoices, and other evidence consistent with the claim?
6. Can people who actually participated independently confirm an activity?

Existing NGO discovery experiences often focus on profiles, descriptions, donation requests, and self-reported impact.

This platform focuses on connecting impact claims to supporting evidence.

## Core Product Philosophy

DO NOT tell users:

"This NGO is trustworthy."

DO NOT generate arbitrary trust scores such as:

"Trust Score: 92%"

Instead, expose evidence and allow the user to make their own decision.

Core principle:

"Don't tell users who to trust. Show them the evidence."

## Product Flow

```
DISCOVER
    ↓
UNDERSTAND
    ↓
INSPECT EVIDENCE
    ↓
CONTRIBUTE
    ↓
TRACE IMPACT
```

Users should be able to:

- discover NGOs
- explore NGO profiles
- browse NGO activities
- inspect evidence behind an activity
- see inconsistencies in submitted evidence
- see authenticated volunteer participation
- explore fundraisers
- volunteer for activities
- see how reported funds were used

## Core Differentiator

Every major NGO impact claim can have an Evidence Passport.

An Evidence Passport connects:

- the NGO's claim
- media evidence
- documents
- invoices
- location signals
- date/time signals
- volunteer participation
- financial records

The system should display:

- what evidence exists
- what evidence is missing
- what signals are consistent
- what signals conflict

It should NOT automatically accuse an NGO of fraud.

## Main Demo Story

Use one primary demo NGO:

**Udaan Foundation**  
Cause: Education  
Location: Mumbai, Maharashtra  
*DEMO DATA*

**Primary activity:**

School Kit Distribution  
Location: Dharavi, Mumbai  
Date: September 24, 2026  

**Claim:**

"250 school kits distributed to students."

**Submitted evidence:**

- 8 photos
- available metadata
- location information consistent with Mumbai
- invoice supporting 220 kits
- 17 authenticated volunteer participants
- 14 volunteers independently confirmed participation

**Main discrepancy:**

Claimed quantity = 250 kits  
Document-supported quantity = 220 kits  
Unsupported by submitted invoice evidence = 30 kits  

This discrepancy should be prominently demonstrated.

## Primary User Types

### Public User
Can:
- discover NGOs
- inspect activities
- inspect evidence
- view fundraisers
- donate through demo flow
- browse volunteer opportunities

### Volunteer
Can:
- register for an activity
- authenticate using demo OTP
- receive volunteer pass
- check in
- confirm participation
- build volunteer history

### NGO
Can eventually:
- create NGO profile
- create activities
- upload evidence
- create fundraisers
- create volunteer opportunities
- see evidence conflicts

Phase 1 focuses mainly on public users and volunteers.

## Hackathon Constraint

Phase 1 development time: 3 hours.

Phase 2 development time: 1.5 hours.

Therefore prioritize:

1. UI quality
2. complete demo journey
3. evidence experience
4. volunteer validation
5. visible functional interactions

Do NOT prioritize production integrations during Phase 1.
