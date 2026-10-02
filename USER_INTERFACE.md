# USER_INTERFACE.md

## Purpose

The User Interface is the public-facing side of the platform for individual users, donors, and volunteers.

The main goals are:

1. Help users discover NGOs and social-impact events near them.
2. Show ongoing and upcoming activities in a social-media-style feed.
3. Let users register as volunteers or contribute to fundraisers.
4. Let volunteers check in and check out using a live event QR.
5. Track volunteer hours.
6. Generate volunteer certificates after the work is completed and verified.
7. Let users react to NGO activity posts and submit feedback or complaints.
8. Let users inspect activity evidence instead of relying on a generic trust score.

---

# 1. Authentication

Use the existing Supabase email/password authentication.

User login fields:
- Email
- Password

User registration fields:
- Full name
- Email
- Password
- Confirm password

After successful login, redirect to:
`/explore`

---

# 2. Location Permission

When the user opens the platform, ask for browser location permission.

Example:
> Find social-impact activities near you

Buttons:
- Allow Location
- Choose Location Manually

Use browser geolocation only after explicit permission.
Do not expose exact user coordinates publicly.
Store/use the location only as needed for nearby-event discovery.

If location access is denied:
- allow manual city/locality selection
- continue to show events normally

---

# 3. Home / Explore Page

Primary route:
`/explore`

The page should show:

## Nearby Events
Sections:
- Happening Now
- Upcoming Near You
- Volunteer Opportunities
- Fundraisers Near You
- Recently Completed Activities

Filtering options:
- Distance
- Cause
- Date
- Event type
- Volunteer opportunities
- Fundraisers
- NGO

Examples of causes:
- Education
- Healthcare
- Environment
- Animal welfare
- Women empowerment
- Food security
- Disaster relief
- Skill development
- Community development

---

# 4. Event Discovery Cards

Each event card should show:
- NGO name
- NGO logo
- Event title
- Cause
- Date
- Time
- Location
- Distance from user
- Event status
- Volunteer slots
- Fundraiser status if applicable
- Event cover image
- Short description

Status examples:
- LIVE NOW
- UPCOMING
- COMPLETED

Available actions:
- View Event
- Register
- Donate
- Save
- Share

---

# 5. Social-Media-Style Activity Feed

Users should see NGO activities in a feed similar to a social platform.

A completed activity post can contain:
- NGO name
- NGO profile image
- Activity title
- Date
- Location
- Description
- Photos
- Videos
- Measurable impact claims
- Volunteer statistics
- Funds collected
- Evidence summary

Example:
> Udaan Foundation  
> School Kit Distribution  
> Dharavi, Mumbai  
> 24 September 2026  
>
> 250 school kits distributed  
> 17 authenticated volunteers  
> ₹62,400 raised

Users can:
- Upvote
- Downvote
- Save
- Share
- Open Evidence
- Submit Feedback
- Register Complaint

Do not treat votes as proof that an NGO activity is genuine.

---

# 6. Event Detail Page

Route:
`/event/[id]`

The page should contain:

## Event Information
- Event title
- NGO
- Cause
- Description
- Date
- Start time
- End time
- Venue
- Map / location
- Distance from user
- Event status

## Registration
If volunteering is available:
- Register as Volunteer
- Number of available positions
- Number already registered
- Required skills
- Expected duration

## Fundraiser
If fundraiser exists:
- Funding goal
- Amount raised
- Amount remaining
- Fundraiser description
- Budget breakdown
- Contribution amounts
- Custom contribution
- Donate button

## Social Feed
Show:
- Photos
- Videos
- Event updates
- Evidence summaries
- Volunteer count
- Funds collected

---

# 7. Ongoing Event Volunteer Flow

If the logged-in user has registered for an event, show:
`My Event Pass`

Before the check-in window:
> Check-in opens at 9:45 AM

During the allowed event period:
- Show Scan Event QR
- Show event status as LIVE
- Allow check-in

After successful check-in:
> Checked in at 10:03 AM

The platform must use server-side timestamps.
The user must not be allowed to manually enter attendance time.

---

# 8. Live QR Attendance

The user interface should provide a QR scan option for registered volunteers.

Flow:
Register  
→ Event becomes live  
→ Scan event QR  
→ Server validates event  
→ Check in  
→ Work  
→ Scan QR again / use checkout action  
→ Check out  
→ Hours calculated

The QR should only be usable during the valid event window.
Do not rely only on frontend visibility.

Backend must reject:
- early check-in
- duplicate check-in
- checkout without check-in
- duplicate checkout
- invalid event QR
- attendance outside permitted event time

---

# 9. Live Volunteer Hours

After check-in, show a live timer.

Example:
> Checked in: 10:03 AM  
> Current volunteer time: 2h 16m

This live timer is a visual estimate.
The authoritative volunteer hours must come from:
`check_out_time - check_in_time`
using server-side timestamps.

After checkout:
> Participation duration: 4h 44m

Then show:
> Awaiting NGO verification

---

# 10. Volunteer Certificate

A certificate should NOT be generated immediately at checkout.

Required conditions:
- volunteer registered
- volunteer authenticated
- valid check-in
- valid check-out
- work completed
- NGO verifies contribution
- NGO verifies final volunteer hours

Only then:
> Certificate Available

Certificate fields:
- Volunteer name
- NGO name
- Event name
- Event date
- Event location
- Verified volunteer hours
- Contribution description
- Certificate ID
- Issue date

Button:
`Download Certificate`

The certificate should state:
> Contribution verified by [NGO Name]

Do not imply government certification.

---

# 11. Volunteer Passport

Route:
`/profile/volunteering`

Show:
- Total completed activities
- Verified volunteer hours
- NGOs volunteered with
- Certificates earned

Activity history:

| Activity | NGO | Date | Verified Hours | Status |
|---|---|---|---|---|
| School Kit Distribution | Udaan Foundation | 5 Oct 2026 | 4.75 | Verified |
| Tree Plantation Drive | Green Roots | 18 Sep 2026 | 3.5 | Verified |

Each verified activity should include:
- View activity
- View certificate

---

# 12. Donation / Fundraiser Flow

Users can open a fundraiser from:
- Explore page
- NGO profile
- Event page
- Social feed

Fundraiser detail should show:
- Goal
- Raised amount
- Remaining amount
- NGO
- Activity/event
- Budget distribution
- Previous spending evidence if available

Donation options:
- ₹200
- ₹500
- ₹800
- Custom

If the current hackathon flow uses demo payments, clearly label:
`Demo Contribution`

Do not pretend that a real payment was processed.

---

# 13. Budget and Funding Transparency

Users should be able to inspect how the NGO plans to use funding.

Example:

| Category | Planned Amount |
|---|---:|
| Food | ₹30,000 |
| Transportation | ₹8,000 |
| Venue | ₹5,000 |
| Medical supplies | ₹12,000 |

After the event, where applicable, show:
- Actual amount spent
- Uploaded invoices
- Remaining funds
- Evidence findings

---

# 14. User Feedback and Complaints

Every completed/ongoing activity page should allow:
`Submit Feedback`
and
`Report / Complaint`

Feedback form:
- Category
- Message
- Optional attachment

Complaint categories may include:
- Activity information inaccurate
- Event did not occur as described
- Volunteer issue
- Donation/fundraising issue
- Media concern
- Other

A complaint should create a moderation record for platform admins.
Do not automatically label an NGO fraudulent because of a complaint.

---

# 15. Upvote / Downvote

Users may upvote or downvote completed activity posts.

Purpose:
- community engagement
- surfacing useful activity posts
- gathering public sentiment

Votes must NOT be used as:
- NGO verification
- fraud detection
- trust score
- proof of impact

---

# 16. Evidence View

Users should be able to click:
`View Evidence`

Evidence may include:
- Activity photos/videos
- Available metadata
- AI/provenance analysis
- Uploaded invoices
- Budget
- Volunteer attendance
- Claims
- Financial records
- Evidence discrepancies

Use factual statuses:
- Consistent
- Partial
- Conflict
- Not available
- Not checked

Never use:
- Trusted NGO
- Fake NGO
- Fraud detected
- AI verified
- Invoice verified

---

# 17. User Routes

Suggested routes:
```text
/login
/explore
/event/[id]
/ngo/[id]
/fundraiser/[id]
/profile
/profile/volunteering
/profile/certificates
/profile/donations
```

---

# 18. Supabase Usage

Use the already implemented Supabase backend.

User-side Supabase responsibilities:
- email/password authentication
- user profile
- event registrations
- volunteer participation
- check-in/check-out state
- verified volunteer hours
- certificates
- donations
- votes
- feedback
- complaints
- saved events

Do not store important attendance state only in local React state.
Refreshing the page must not erase attendance, registrations, or certificates.

---

# 19. Acceptance Criteria

The User Interface is complete when:
- User can register/login using email and password
- Location permission is requested appropriately
- User can manually choose location if permission is denied
- Nearby ongoing/upcoming events are shown
- User can open event details
- User can register for volunteering
- User can open fundraiser details
- User can make a demo/real contribution depending on implemented payment system
- User can view NGO activity feed
- User can upvote/downvote
- User can submit feedback/complaints
- Registered volunteer can scan QR during valid event time
- Check-in is stored
- Checkout is stored
- Volunteer hours are calculated
- Volunteer sees verification pending after checkout
- Certificate appears only after NGO verifies work/hours
- Certificate can be downloaded
- Evidence can be inspected from completed activities
