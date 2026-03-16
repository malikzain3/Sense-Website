import React, { useEffect } from 'react'
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {

    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <div className="legal-page">
            <div className="legal-container">

                <div className="legal-header">
                    <p className="legal-org">Software Engineering Society for Excellence — IIUI</p>
                    <h1>Privacy <span>Policy</span></h1>
                    <p className="legal-updated">Last updated: March 2026</p>
                </div>

                <div className="legal-content">

                    <section>
                        <h2>1. Introduction</h2>
                        <p>
                            The Software Engineering Society for Excellence (SENSE) at the International Islamic
                            University Islamabad (IIUI) is committed to protecting the privacy of our members
                            and event participants. This Privacy Policy explains what data we collect, how we
                            use it, and your rights regarding your personal information.
                        </p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <p>We collect the following types of information when you use our website or register for events:</p>
                        <ul>
                            <li><strong>Identity Information:</strong> Full name and Student ID</li>
                            <li><strong>Contact Information:</strong> Email address and phone number</li>
                            <li><strong>Academic Information:</strong> University name, department, and semester (for applicable events)</li>
                            <li><strong>Event-specific Information:</strong> Any additional fields required for specific events (e.g. experience level, motivation)</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>The information you provide is used solely for the following purposes:</p>
                        <ul>
                            <li>Processing and confirming your event registration</li>
                            <li>Communicating event details, schedules, and updates</li>
                            <li>Verifying eligibility for restricted events</li>
                            <li>Issuing certificates or prizes where applicable</li>
                            <li>Improving the quality of future events and society activities</li>
                            <li>Maintaining records of society participation for institutional reporting</li>
                        </ul>
                        <p>We do not use your information for advertising or sell it to any third parties.</p>
                    </section>

                    <section>
                        <h2>4. Data Storage & Security</h2>
                        <p>
                            Your data is securely stored in our database. We implement reasonable technical
                            and organizational measures to protect your personal information against unauthorized
                            access, alteration, or disclosure. Only authorized SENSE members have access to
                            registration data.
                        </p>
                        <p>
                            However, no method of transmission over the internet is 100% secure, and we cannot
                            guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2>5. Data Retention</h2>
                        <p>
                            We retain your registration data for a period of one academic year following the
                            event for record-keeping purposes. After this period, data is either anonymized
                            or permanently deleted.
                        </p>
                    </section>

                    <section>
                        <h2>6. Sharing of Information</h2>
                        <p>We do not sell, trade, or rent your personal information to third parties. Your data may be shared only in the following limited circumstances:</p>
                        <ul>
                            <li>With IIUI administration for official university reporting</li>
                            <li>With co-organizing universities for inter-university events (only relevant fields)</li>
                            <li>When required by law or university policy</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal data (subject to retention requirements)</li>
                            <li><strong>Withdrawal:</strong> Withdraw consent for optional data processing at any time</li>
                        </ul>
                        <p>To exercise any of these rights, contact us using the details below.</p>
                    </section>

                    <section>
                        <h2>8. Cookies</h2>
                        <p>
                            This website does not currently use tracking cookies. If this changes in the future,
                            this policy will be updated accordingly and users will be informed.
                        </p>
                    </section>

                    <section>
                        <h2>9. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted
                            on this page with a revised date. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    <section>
                        <h2>10. Contact Us</h2>
                        <p>For any privacy-related questions or requests, please contact us:</p>
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

export default PrivacyPolicy