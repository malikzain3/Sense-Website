import React, { useEffect } from 'react'
import './LegalPage.css'

const TermsAndConditions = () => {

    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <div className="legal-page">
            <div className="legal-container">

                <div className="legal-header">
                    <p className="legal-org">Software Engineering Society for Excellence — IIUI</p>
                    <h1>Terms & <span>Conditions</span></h1>
                    <p className="legal-updated">Last updated: March 2026</p>
                </div>

                <div className="legal-content">

                    <section>
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to the official website of the Software Engineering Society for Excellence (SENSE),
                            a registered student society of the International Islamic University Islamabad (IIUI).
                            By accessing or using this website and registering for our events, you agree to be bound
                            by these Terms and Conditions. Please read them carefully before proceeding.
                        </p>
                    </section>

                    <section>
                        <h2>2. Eligibility</h2>
                        <p>Our events and activities are primarily open to:</p>
                        <ul>
                            <li>Currently enrolled students of IIUI</li>
                            <li>Students from other universities where explicitly stated (inter-university events)</li>
                            <li>Faculty members and invited guests where applicable</li>
                        </ul>
                        <p>SENSE reserves the right to verify eligibility and decline registration at its discretion.</p>
                    </section>

                    <section>
                        <h2>3. Event Registration</h2>
                        <p>When you register for an event through our website:</p>
                        <ul>
                            <li>You confirm that all information provided is accurate and truthful</li>
                            <li>You understand that registration does not guarantee participation if capacity is reached</li>
                            <li>You agree to abide by the specific rules and guidelines of each event</li>
                            <li>You acknowledge that SENSE may contact you regarding the event via the email provided</li>
                            <li>Duplicate registrations using the same Student ID or email for the same event are not permitted</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Code of Conduct</h2>
                        <p>
                            All participants in SENSE events are expected to maintain a respectful and professional
                            environment. The following behaviors are strictly prohibited:
                        </p>
                        <ul>
                            <li>Harassment, discrimination, or disrespectful conduct toward other participants</li>
                            <li>Plagiarism or academic dishonesty during competitions or workshops</li>
                            <li>Any conduct that violates IIUI's student code of conduct</li>
                            <li>Misuse of resources or facilities provided during events</li>
                        </ul>
                        <p>
                            Violation of this code may result in immediate disqualification and reporting to
                            the relevant university authorities.
                        </p>
                    </section>

                    <section>
                        <h2>5. Intellectual Property</h2>
                        <p>
                            All content on this website — including text, graphics, logos, and event materials —
                            is the property of SENSE IIUI and is protected under applicable intellectual property laws.
                            You may not reproduce, distribute, or use any content without prior written permission from SENSE.
                        </p>
                        <p>
                            Work submitted during competitions or hackathons remains the intellectual property of
                            the respective participants unless otherwise specified in event-specific rules.
                        </p>
                    </section>

                    <section>
                        <h2>6. Photographs & Media</h2>
                        <p>
                            SENSE may photograph or record events for promotional and archival purposes.
                            By attending an event, you grant SENSE permission to use your likeness in
                            event-related media, including social media, the society website, and university
                            publications. If you have objections, please notify us in advance.
                        </p>
                    </section>

                    <section>
                        <h2>7. Limitation of Liability</h2>
                        <p>
                            SENSE and IIUI shall not be held liable for any loss, injury, or damage arising
                            from participation in events, use of this website, or reliance on information
                            provided herein. Participation in all SENSE events is voluntary and at the
                            participant's own risk.
                        </p>
                    </section>

                    <section>
                        <h2>8. Changes to Terms</h2>
                        <p>
                            SENSE reserves the right to update these Terms and Conditions at any time.
                            Changes will be reflected on this page with an updated date. Continued use of
                            the website following any changes constitutes your acceptance of the revised terms.
                        </p>
                    </section>

                    <section>
                        <h2>9. Contact Us</h2>
                        <p>If you have any questions about these Terms and Conditions, please reach out to us:</p>
                        <div className="legal-contact">
                            <p><strong>Software Engineering Society for Excellence (SENSE)</strong></p>
                            <p>International Islamic University Islamabad</p>
                            <p>H-10, Islamabad, Pakistan</p>
                            <p>Email: <a href="mailto:sense@iiui.edu.pk">sense@iiui.edu.pk</a></p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions