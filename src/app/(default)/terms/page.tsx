import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import SectionLayout from '@/components/component-layout/SectionLayout'
import React from 'react'

function page() {
    return (
        <div>
            <PageTopBanner
                title="Terms and Conditions"
                description="The Sport families are searching for most — find events in one click."
            />
            <SectionLayout className='mt-12'>
                <div
                    style={{ fontFamily: 'sans-serif' }}
                    dangerouslySetInnerHTML={{
                        __html: `
                    <html>
<body>
<!--StartFragment--><p><span style="white-space:pre-wrap;"><strong>Terms and Conditions</strong>
<br>
<strong>1. Introduction</strong><br>Welcome to PlayFinder (“we,” “us,” or “our”). These Terms and Conditions (“Terms”) govern your use of our website and mobile application (collectively, the “Platform”)<br>By accessing or using PlayFinder, you agree to comply with and be bound by these Terms. If you do not agree, please do not use the Platform.</span></p><p><span style="white-space:pre-wrap;"><br><strong>2. Services</strong><br>PlayFinder is a digital marketplace that connects families with youth Sport events (camps, tryouts, tournaments) listed by coaches and organizations (“Partners”).<br>We facilitate discovery, registration, and payment — but we do not organize, host, or supervise events. All events are operated solely by independent Partners. PlayFinder is not responsible for the quality, safety, or conduct of any event or Partner.
<br>3. User Responsibilities<br><br><strong>➤ Account Creation</strong></span><span style="white-space:pre-wrap;"><br>To register for events or list events, you must create an account. You agree to:<br>Provide accurate, current, and complete information.<br>Update your profile (including child’s age, contact info) as needed.<br>Maintain only one account per person/organization.<br><br><strong>➤ Confidentiality</strong><br>You are responsible for:
Keeping your password secure.
Notifying us immediately of any unauthorized use.
Logging out after each session (especially on shared devices).
<br><strong>➤ Lawful Use</strong>
You agree to use PlayFinder only for lawful purposes. You will not:
Post false, misleading, or harmful content.
Harass other users or Partners.
Use bots, scrapers, or automated tools.
Interfere with the Platform’s operation or other users’ experience.
4. Event Registration &amp; Cancellations
<br><strong>➤ Booking</strong>
By registering for an event, you agree to:
Provide accurate participant information (child’s name, age, emergency contact).
Comply with the Partner’s rules (skill level, equipment, code of conduct).
Understand that the Partner may cancel or reschedule the event at their discretion.
<br><strong>➤ Cancellations &amp; Refunds</strong>
Family Cancellations: Subject to the Partner’s policy (displayed on event page). Some events are non-refundable.
Partner Cancellations: If a Partner cancels, you’ll receive a full refund or credit (your choice).
No-Shows: Failure to attend without notice may forfeit fees and affect future registration eligibility.
5. Payments
<strong><br>➤ Fees</strong>
Event fees and membership fees are set by Partners or PlayFinder (as applicable).
All prices are in USD ($) and include applicable taxes (if any).<br>
<strong>➤ Payment Processing</strong>
Payments are securely processed via Stripe and/or PayPal.
You authorize us to charge your selected payment method.
We do not store your full credit card number or CVV.<br>
<strong>➤ Sponsored Listings (For Partners)</strong>
Partners may pay to promote (“Sponsor”) their events.
Sponsored status does not imply endorsement or guarantee of quality by PlayFinder.
6. Disclaimers and Limitation of Liability
<br><strong>➤ No Endorsement</strong>
PlayFinder does not endorse, verify, or guarantee:
The qualifications of any Partner.
The safety, quality, or outcome of any event.
The accuracy of event descriptions (though we moderate for basic compliance).
<br><strong>➤ “As Is” Service</strong>
The Platform is provided “as is” and “as available” without warranties of any kind, express or implied — including merchantability, fitness for a particular purpose, or non-infringement.
<br>➤ Limitation of Liability
To the fullest extent permitted by law, PlayFinder shall not be liable for:
Indirect, incidental, special, consequential, or punitive damages.
Loss of profits, data, goodwill, or opportunity.
Injuries, accidents, or disputes occurring at events.
Errors or delays caused by third-party services (payment gateways, maps, etc.).
<br><strong>7. Intellectual Property</strong>
All content, logos, and software on PlayFinder are owned by us or our licensors. You may not copy, modify, distribute, or create derivative works without our written permission.
8. Termination
We may suspend or terminate your account if you:
Violate these Terms.
Engage in fraudulent, abusive, or harmful behavior.
Pose a risk to other users or the Platform.
You may delete your account anytime via Settings — but past transactions and event history may be retained for legal/compliance reasons.
<br>9. Changes to Terms
We may update these Terms from time to time. If changes are material, we will notify you via:
Email
In-app banner
Updated “Last Updated” date at the top
Your continued use after changes means you accept them.<br><br>10. Governing Law
These Terms are governed by the laws of the State of [Your State, e.g., Delaware], without regard to conflict of law principles. Any disputes will be resolved in the state or federal courts located in [Your County, State].</span></p><!--EndFragment-->
</body>
</html>
                    ` }} />
            </SectionLayout>
        </div>
    )
}

export default page