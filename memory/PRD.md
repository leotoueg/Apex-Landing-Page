# Apex Bath Remodeling Pros - Landing Page PRD

## Original Problem Statement
Create a high-converting Google Ads landing page for a bathroom remodeling company.
- Company: Apex Bath Remodeling Pros
- Service Area: Dallas–Fort Worth (DFW) & North Central Texas
- Phone: +1 (817)-506-9696
- Goal: Generate leads + push appointment bookings + encourage phone calls

## User Personas
- **Primary**: Homeowners (35–65) in DFW searching for bathroom remodel services
- **Keywords**: Bathroom remodel near me, shower remodel DFW, tub to shower conversion Texas

## Core Requirements (Static)
- Brand Colors: Blue #003A75, Orange #FF6C00
- Custom booking calendar (Mon-Sat, 10AM/2PM/4PM/6PM slots)
- No database storage - webhook integration (URLs to be provided)
- GTM dataLayer events: form_submit, click_call_button, book_appointment
- Mobile-first responsive design with sticky CTA bar

## What's Been Implemented (December 2025)

### Landing Page Sections
1. ✅ Hero Section - Headline, value prop, offer badge ($2,500 OFF)
2. ✅ Lead Capture Form - Name, Phone, Email, Zip, Project Type dropdown
3. ✅ Wistia Video Embed - Autoplay muted
4. ✅ Offer Section - $2,500 discount promotion
5. ✅ Social Proof - 5 testimonials with star ratings
6. ✅ Project Showcase - 5 user-provided bathroom images
7. ✅ Process Section - 3 steps with icons
8. ✅ Trust/Authority Section - 6 trust badges
9. ✅ FAQ Section - 4 expandable questions
10. ✅ Final CTA Section - Dual buttons

### Booking Flow
- ✅ Form submission stores data in sessionStorage
- ✅ Redirect to /booking page after form submit
- ✅ Custom calendar showing next 7 weekdays (Mon-Sat only)
- ✅ 4 time slots per day (10AM, 2PM, 4PM, 6PM)
- ✅ Confirmation screen after booking

### Technical Features
- ✅ GTM dataLayer pushes for all conversion events
- ✅ Sticky mobile bar with Call Now + Get Quote buttons
- ✅ Click-to-call phone buttons (tel: links)
- ✅ Backend API endpoints (/api/lead, /api/booking) with webhook support
- ✅ Responsive design (mobile, tablet, desktop)

## Prioritized Backlog

### P0 (Blocking)
- None

### P1 (Important)
- [ ] Connect form submit to user's webhook URL (awaiting URL)
- [ ] Connect booking to user's webhook URL (awaiting URL)

### P2 (Nice to Have)
- [ ] Add loading skeleton states
- [ ] Implement form field validation with better UX feedback
- [ ] Add scroll-triggered animations

## Next Tasks
1. User to provide webhook URLs for form submissions
2. User to provide webhook URLs for booking submissions
3. Configure GTM container and verify dataLayer events fire correctly
