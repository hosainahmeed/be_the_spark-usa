import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import SectionLayout from '@/components/component-layout/SectionLayout'
import React from 'react'

function page() {
    return (
        <>
            <PageTopBanner
                title="Privacy Policy"
                description="The Sport families are searching for most — find events in one click."
            />
            <SectionLayout className='mt-12'>
                <div
                    style={{ fontFamily: 'sans-serif' }}
                    dangerouslySetInnerHTML={{
                        __html: `<html>
<body>
<!--StartFragment--><p><span style="white-space:pre-wrap;"><strong>Privacy Policy</strong></span>
<br>
<br>Welcome to PlayFinder (“we,” “us,” or “our”). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website and mobile application (collectively, the “Platform”).
By accessing or using PlayFinder, you agree to the terms of this Privacy Policy. If you do not agree, please do not use the Platform.
<br>Information We Collect
1. Personal Information You Provide
When you create an account or interact with PlayFinder, we may collect:
Name, email address, phone number
Child’s name, age, sport preferences (provided by parent/guardian)<br>Payment information (via Stripe/PayPal — we do not store full card details)<br>Location (ZIP code or city for event search)<br>Communications (messages to coaches, support tickets)<br><br><strong>2. Automatic Data Collection</strong><br>We may automatically collect:
IP address, browser type, device information
Pages visited, time spent, clicks (via analytics tools)<br>Cookies and similar technologies to improve experience<br><br><strong>3. Information from Children</strong>﻿<br>We do not knowingly collect personal data from children under 13 without parental consent. All child profiles are created and managed by verified adult accounts.
﻿How We Use Your Information
We use your information to:
﻿Provide, maintain, and improve the Platform
Process event registrations and payments
Send notifications (email/SMS) about events, reminders, or account updates
Personalize your experience (e.g., recommend events by sport/age/location)
Respond to your inquiries and provide customer support
Comply with legal obligations and enforce our Terms
Data Sharing &amp; Disclosure
We do not sell your personal information. We may share data only in these cases:
﻿With Service Providers: Payment processors (Stripe, PayPal), cloud hosting, email/SMS platforms — under strict confidentiality agreements.
With Coaches/Organizations: Only the information necessary to fulfill your event registration (e.g., child’s name, age, emergency contact — if provided).
Legal Requirements: If required by law, subpoena, or to protect our rights, users, or public safety.
Business Transfers: In case of merger, acquisition, or sale — users will be notified.
Payments
All payments are processed securely through Stripe and/or PayPal. We do not store your full credit card number or CVV. Payment data is encrypted and handled in compliance with PCI-DSS standards.
﻿Parental Consent &amp; Child Safety
All accounts registering children under 18 must be created and managed by a parent or legal guardian.
We encourage parents to review their child’s activity and event registrations regularly.
Coaches and organizations are vetted before listing events — but we recommend families review event details and communicate directly before registering.
Your Rights &amp; Choices
Depending on your location (including under CCPA/CPRA), you may:
﻿<br>Access, correct, or delete your personal data
Opt out of marketing communications (via email footer or account settings)
Disable cookies in your browser settings
Request data portability or restriction of processing
To exercise these rights, contact us at: privacy@playfinder.com
﻿Data Security
We implement industry-standard security measures (encryption, access controls, audits) to protect your data. However, no online platform is 100% secure — we cannot guarantee absolute security.

Third-Party Links &amp; Services
Our Platform may link to third-party sites (e.g., event venues, partner organizations). We are not responsible for their privacy practices. Please review their policies separately.
﻿<br>Changes to This Policy
We may update this Privacy Policy from time to time. If changes are material, we will notify you via email or a notice on the Platform. Your continued use after the update means you accept the changes.

Contact Us
If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact us:

PlayFinder Support
Email: privacy@playfinder.com
Mailing Address: [Your Business Address]
Phone: [Your Support Phone Number]</span>﻿</p><!--EndFragment-->
</body>
</html> `
                    }} />
            </SectionLayout>
        </>
    )
}

export default page