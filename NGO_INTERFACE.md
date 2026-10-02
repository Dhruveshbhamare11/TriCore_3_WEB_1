# NGO_INTERFACE.md

## Purpose

The NGO Interface is the management portal for approved NGOs.

It allows NGOs to:

1. Create and publish upcoming events.
2. Register volunteers.
3. Create fundraisers and provide budget distribution.
4. Generate live-event QR attendance.
5. Track volunteer check-in/check-out.
6. Verify volunteer hours and contribution.
7. Post completed activities in a social-media-style feed.
8. Upload activity photos/videos.
9. Analyse uploaded media for possible AI generation/provenance concerns.
10. Upload invoices and supporting documents.
11. Provide measurable activity claims.
12. Show funds collected and volunteer statistics.
13. Build an evidence-backed activity history.

Only platform-approved NGOs should have access.

---

# 1. Authentication and Access

Use the existing Supabase email/password authentication.

NGO login fields:
- Email
- Password

NGO dashboard access requires:
- authenticated user
- NGO account
- platform approval status = approved

Pending/rejected/blocked NGOs must not receive dashboard access.

Suggested route:
`/ngo/dashboard`

---

# 2. NGO Dashboard

Dashboard overview should show:
- NGO name
- Profile image/logo
- Platform approval status
- Total activities
- Upcoming activities
- Ongoing activities
- Completed activities
- Last documented activity
- Days since last documented activity
- Registered volunteers
- Verified volunteer hours
- Total funds collected
- Evidence requiring review

Quick actions:
- Create Event
- Add Activity Update
- Create Fundraiser
- Upload Evidence
- Review Volunteers

---

# 3. Past Activities Feed

Route:
`/ngo/dashboard/activities`

Completed activities should be displayed in a social-media-style feed.

Each activity card/post should show:
- NGO name
- NGO logo
- Activity title
- Activity description
- Date
- Location
- Photos
- Videos
- Measurable impact claims
- Volunteer statistics
- Funds collected
- Evidence status

Example:
> School Kit Distribution  
> Dharavi, Mumbai  
> 24 September 2026  
>
> 250 school kits distributed  
> 17 authenticated volunteers  
> ₹62,400 raised

The NGO can:
- Add photos
- Add videos
- Edit description
- Add/update measurable claims
- Upload invoices
- Add supporting documents
- View evidence findings

Published past activities appear in the public user feed.

---

# 4. Activity Media Upload

NGOs should be able to upload:
- JPG
- JPEG
- PNG
- supported video formats

Store media in Supabase Storage.

Each uploaded media file should be connected to:
- NGO ID
- Activity ID
- uploaded_by
- upload timestamp
- original file metadata
- analysis status

Do not store uploads only in temporary browser state.

---

# 5. AI / Provenance Media Analysis

Every uploaded photo should pass through a media-analysis layer where technically available.

Possible checks:
- file metadata
- capture timestamp
- available GPS metadata
- provenance signals
- AI-generation detector/model

Important:
AI-generated-image detection is probabilistic.
The platform must NOT claim definitive proof from an AI detector.

Use statuses:
- No AI-generation signal detected
- Possible AI-generated media — review recommended
- Analysis inconclusive
- Not checked

If media is flagged:
- keep the file
- mark it for admin review
- show the NGO that review is required

Do not automatically ban the NGO solely because of an AI-image detector result.

---

# 6. Activity Description

For every activity, NGO provides:
- Title
- Description
- Cause
- Date
- Location
- City
- Start time
- End time

The description may be natural language.

Example:
> On 24 September, our volunteers distributed school kits to students in Dharavi.

An LLM may help extract structured information, but the NGO must review the suggested values.

---

# 7. Generic Measurable Activity Claims

Do NOT hardcode activity fields for meals only.
Use a generic claim structure.
One activity may contain multiple measurable claims.

Example:
```json
{
  "metric": "Meals provided",
  "quantity": 250,
  "unit": "meals"
}
```

Other examples:
```json
{
  "metric": "Trees planted",
  "quantity": 500,
  "unit": "trees"
}
```

```json
{
  "metric": "Patients examined",
  "quantity": 180,
  "unit": "patients"
}
```

```json
{
  "metric": "Participants completed training",
  "quantity": 45,
  "unit": "participants"
}
```

Activity creation form should provide:
- Metric
- Quantity
- Unit
- Add Another Claim

---

# 8. Activity Statistics

Completed activity page should show:

## Volunteer Stats
- Volunteers registered
- Volunteers checked in
- Volunteers checked out
- Contributions verified
- Total verified volunteer hours

## Funding Stats
- Funding target
- Funds collected
- Actual amount spent
- Remaining amount

## Evidence Stats
- Photos/videos uploaded
- Supporting documents
- Invoice count
- Media requiring review
- Evidence findings

---

# 9. Upcoming Events

Route:
`/ngo/dashboard/events`

NGO can create an upcoming event.

Fields:
- Event title
- Description
- Cause
- Date
- Start time
- End time
- Venue
- City
- Volunteer registration enabled
- Number of volunteer positions
- Required skills
- Fundraiser enabled
- Event budget

Public users should be able to see the event after it is published.

---

# 10. Volunteer Registration Configuration

For each event NGO can configure:
- Registration open / closed
- Maximum volunteer positions
- Required skills
- Expected duration
- Registration deadline

NGO dashboard should show:
- Registered volunteers
- Registration time
- Attendance status
- Check-in time
- Check-out time

---

# 11. Event Budget

Before an event, NGO should provide planned budget.
Support multiple budget categories.

Example:

| Category | Planned Amount |
|---|---:|
| Food | ₹30,000 |
| Transport | ₹8,000 |
| Venue | ₹5,000 |
| Supplies | ₹12,000 |

Fields:
- Category
- Description
- Planned amount

Allow:
`Add Budget Item`

Budget should be visible to users on the fundraiser/event transparency page.

---

# 12. Fundraiser Creation

For eligible events, NGO can create a fundraiser.

Fields:
- Fundraiser title
- Description
- Funding goal
- Start date
- End date
- Linked event
- Budget distribution
- Suggested contribution amounts

Public fundraiser page should show:
- Goal
- Amount raised
- Remaining amount
- Budget
- Event
- NGO

---

# 13. Live Event QR Generation

Every event should have an attendance QR system.

QR states:

## Before allowed check-in time
> Check-in opens at [time]
QR should not allow attendance.

## Event is live
> Check-in active
Show live QR.

## Volunteer already checked in
Status:
> Checked in

## Checkout period
Allow valid checkout.

The backend must validate event time using server time.
Do not rely only on frontend visibility.

---

# 14. QR Attendance Rules

The system must reject:
- check-in before allowed time
- duplicate check-in
- checkout without check-in
- duplicate checkout
- invalid event QR
- attendance outside valid window

Store:
- check_in_time
- check_out_time
- calculated_hours

Use server-side timestamps.

---

# 15. Volunteer Hours

After checkout calculate:
`calculated_hours = check_out_time - check_in_time`

Example:
Check-in: 10:03 AM  
Check-out: 2:47 PM  
Calculated duration: 4h 44m

This calculation must use deterministic backend code.
Do not use an LLM.

---

# 16. NGO Volunteer Verification

After the event, NGO must review volunteer participation.

Show table:

| Volunteer | Check In | Check Out | Calculated | Verification |
|---|---|---|---|---|
| Aarav Mehta | 10:03 | 14:47 | 4h 44m | Pending |

NGO can enter:
- Verified hours
- Contribution description

Example:
Verified hours:
`4.75`

Contribution:
> Assisted with meal distribution and participant registration.

Action:
`Verify Contribution`

After verification:
- contribution status = verified
- verified hours saved
- certificate becomes eligible

---

# 17. Volunteer Certificate Trigger

Certificate must only be generated after:
- valid registration
- valid check-in
- valid check-out
- event completed
- NGO verifies contribution
- NGO verifies volunteer hours

Then:
`Generate Certificate`
or auto-generate after successful verification.

Certificate contains:
- Volunteer name
- NGO name
- Activity/event title
- Date
- Location
- Verified volunteer hours
- Contribution description
- Certificate ID
- Issue date

Certificate wording:
> Contribution verified by [NGO Name]

Do not imply government certification.

---

# 18. Invoice Upload After Event Completion

After every completed event, NGO should be prompted to upload relevant bills/invoices where applicable.

Button:
`Upload Supporting Invoice`

Accept:
- JPG
- JPEG
- PNG
- PDF

Flow:
Upload actual file  
→ Supabase Storage  
→ OCR / document vision  
→ structured extraction  
→ NGO reviews extracted values  
→ NGO confirms/corrects  
→ evidence engine runs  
→ findings saved  
→ Evidence Passport updates

Do not replace real uploaded documents with dummy invoice values.

---

# 19. Invoice Review

Before analysis, show extracted invoice fields.

Example:
- Vendor
- Invoice number
- Invoice date
- Items
- Quantity
- Unit price
- Subtotal
- Tax
- Total

Buttons:
- Correct Fields
- Confirm & Analyse

Store:
- original extracted data
- confirmed/corrected extracted data

Do not overwrite the original extraction.

---

# 20. Claim vs Document Comparison

The system should compare generic measurable claims with relevant document evidence.

Example:
Activity claim:
> 250 meals provided

Invoice:
> 250 meals purchased

Possible result:
> Submitted invoice evidence accounts for 250 meals.

Another example:
Claim:
> 250 school kits distributed

Invoice:
> 220 school kits

Result:
> Submitted invoice evidence currently accounts for 220 of the 250 reported school kits.

Do not say:
- NGO lied
- Fraud detected
- Invoice verified

---

# 21. Funding Distribution After Event

After completion, NGO should be able to update actual spending.

Example:

| Category | Planned | Actual |
|---|---:|---:|
| Food | ₹30,000 | ₹29,500 |
| Transport | ₹8,000 | ₹7,600 |
| Venue | ₹5,000 | ₹5,000 |

Allow linking uploaded invoices to spending categories.

Show:
- Total raised
- Total spent
- Remaining funds

---

# 22. Recent Activity Tracking

The platform should calculate recent NGO activity automatically.
Use completed/published activity records.

Example:
> Last documented activity: 8 days ago

If no activity exists for a period:
> No documented activity in the last 6 months

Do not automatically label NGO as:
- inactive
- suspicious

---

# 23. Public Feed Publishing

Completed activities should be publishable to the public user feed.

Before publishing, show NGO:
- Description
- Claims
- Photos/videos
- Volunteer stats
- Funds collected
- Documents
- Evidence findings

Once published, users can:
- view
- upvote/downvote
- submit feedback
- submit complaint
- inspect evidence

---

# 24. NGO Routes

Suggested routes:
```text
/ngo/dashboard
/ngo/dashboard/events
/ngo/dashboard/events/new
/ngo/dashboard/events/[id]
/ngo/dashboard/activities
/ngo/dashboard/activities/[id]
/ngo/dashboard/volunteers
/ngo/dashboard/fundraisers
/ngo/dashboard/evidence
```

---

# 25. Supabase Usage

Use the existing Supabase implementation.

NGO-side Supabase responsibilities:
- NGO authentication
- NGO profile
- activity records
- activity claims
- event records
- budget items
- fundraisers
- volunteer registrations
- check-in/check-out records
- verified volunteer hours
- certificate eligibility
- uploaded media
- uploaded invoices
- media-analysis results
- document extraction
- evidence findings

Use Supabase Storage for:
- activity photos
- activity videos
- invoices
- supporting documents
- generated certificates

---

# 26. Suggested Core Data Relationships

```text
NGO
 |
 +-- Activities
 |     |
 |     +-- Activity Claims
 |     +-- Activity Media
 |     +-- Media Analysis
 |     +-- Uploaded Documents
 |     +-- Evidence Findings
 |     +-- Volunteer Participation
 |
 +-- Events
 |     |
 |     +-- Volunteer Registrations
 |     +-- QR Attendance
 |     +-- Budget
 |     +-- Fundraiser
 |
 +-- Fundraisers
 |
 +-- Certificates
```

One activity should support many claims.
Do not create columns such as:
- meals_provided
- trees_planted
- patients_helped

Use generic activity claims instead.

---

# 27. Important Language Rules

Do not use:
- Trusted NGO
- Government Verified NGO
- NITI Aayog Verified
- Fraud detected
- Fake photo
- AI verified photo
- Invoice verified

Use:
- Platform approved
- DARPAN record matched
- Possible AI-generated media — review recommended
- Analysis inconclusive
- Evidence consistent
- Partial documentary support
- Evidence discrepancy detected
- Document evidence
- Contribution verified by NGO

---

# 28. Acceptance Criteria

The NGO Interface is complete when:
- Approved NGO can login
- NGO dashboard loads from Supabase
- NGO can create upcoming event
- NGO can configure volunteer registration
- NGO can provide date/time/place
- NGO can enter event budget
- NGO can create fundraiser
- NGO can publish event
- Live-event QR is generated
- QR only works in valid event window
- Volunteer attendance is visible
- Check-in/check-out timestamps are stored
- Volunteer hours are calculated
- NGO can verify contribution/hours
- Volunteer certificate becomes available only after verification
- NGO can create completed activity
- NGO can enter generic measurable claims
- NGO can upload photos/videos
- Media analysis can flag possible AI-generated content
- Media flag uses cautious wording
- NGO can upload real invoice files
- OCR/document extraction is reviewable
- Evidence engine compares claims and documents
- NGO can report actual post-event spending
- Completed activity can be published to public feed
- Last documented activity is calculated automatically
