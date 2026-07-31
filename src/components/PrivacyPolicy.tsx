// src/components/PrivacyPolicy.tsx
import React from 'react';

interface PolicyPageProps {
    theme: 'light' | 'dark';
}

export default function PrivacyPolicy({ theme }: PolicyPageProps) {
    const dark = theme === 'dark';

    const sectionHeading = `text-base font-bold mt-8 mb-3 ${dark ? 'text-slate-100' : 'text-slate-900'}`;
    const subHeading = `font-bold mt-4 mb-1.5 ${dark ? 'text-slate-200' : 'text-slate-800'}`;
    const paragraph = 'mb-3 leading-relaxed';
    const list = 'list-disc pl-5 space-y-1 mb-3';

    return (
        <div className={`max-w-3xl mx-auto px-4 py-28 mobile-m:px-6 laptop:px-8 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
            <h1 className={`text-2xl mobile-m:text-3xl font-bold mb-2 ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                Privacy Policy
            </h1>
            <p className={`text-xs uppercase tracking-wider mb-8 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                Last updated: July 29, 2026
            </p>

            <div className="text-sm font-sans">

                <p className={paragraph}>
                    We are committed to protecting your privacy and ensuring that your personal information is handled
                    securely and responsibly. This Privacy Policy explains how we collect, use, disclose, and safeguard
                    your information when you visit our website or use our educational consultancy services.
                </p>

                <h2 className={sectionHeading}>1. Information We Collect</h2>
                <p className={subHeading}>Personal Information</p>
                <ul className={list}>
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Mobile Number</li>
                    <li>City and Country</li>
                    <li>Educational Qualifications</li>
                    <li>Academic Records</li>
                    <li>Resume/CV</li>
                    <li>Passport details (only when required for application processing)</li>
                    <li>Work Experience</li>
                    <li>Any other information voluntarily provided by you</li>
                </ul>

                <p className={subHeading}>Technical Information</p>
                <p className={paragraph}>When you visit our website, we may automatically collect:</p>
                <ul className={list}>
                    <li>IP Address</li>
                    <li>Browser Type</li>
                    <li>Device Information</li>
                    <li>Operating System</li>
                    <li>Pages Visited</li>
                    <li>Time Spent on Website</li>
                    <li>Cookies and Similar Technologies</li>
                </ul>

                <h2 className={sectionHeading}>2. How We Use Your Information</h2>
                <p className={paragraph}>We use your information to:</p>
                <ul className={list}>
                    <li>Provide educational consultancy services.</li>
                    <li>Evaluate your eligibility for higher education opportunities.</li>
                    <li>Assist with university admissions.</li>
                    <li>Guide you through APS, visa, accommodation, and related procedures.</li>
                    <li>Respond to your enquiries.</li>
                    <li>Improve our website and services.</li>
                    <li>Send important service updates.</li>
                    <li>Share educational opportunities, webinars, and promotional communications (you may opt out at any time).</li>
                    <li>Comply with applicable legal obligations.</li>
                </ul>

                <h2 className={sectionHeading}>3. Information Sharing</h2>
                <p className={paragraph}>We do not sell your personal information.</p>
                <p className={paragraph}>Your information may be shared only when necessary with:</p>
                <ul className={list}>
                    <li>Universities and educational institutions.</li>
                    <li>Government authorities where legally required.</li>
                    <li>Visa processing agencies.</li>
                    <li>Trusted service providers assisting in delivering our services.</li>
                    <li>Technology vendors supporting our website.</li>
                </ul>
                <p className={paragraph}>All third parties are expected to protect your information appropriately.</p>

                <h2 className={sectionHeading}>4. Cookies</h2>
                <p className={paragraph}>
                    Our website may use cookies to improve user experience, analyze website traffic, and enhance website
                    performance. You may disable cookies through your browser settings; however, some website features
                    may not function properly.
                </p>

                <h2 className={sectionHeading}>5. Data Security</h2>
                <p className={paragraph}>
                    We implement reasonable administrative, technical, and organizational safeguards to protect your
                    information against unauthorized access, alteration, disclosure, or destruction. While we strive to
                    protect your data, no method of electronic transmission or storage is completely secure.
                </p>

                <h2 className={sectionHeading}>6. Data Retention</h2>
                <p className={paragraph}>We retain personal information only as long as necessary to:</p>
                <ul className={list}>
                    <li>Deliver our services.</li>
                    <li>Meet legal obligations.</li>
                    <li>Resolve disputes.</li>
                    <li>Maintain business records.</li>
                </ul>
                <p className={paragraph}>
                    When information is no longer required, it is securely deleted or anonymized where reasonably
                    practicable.
                </p>

                <h2 className={sectionHeading}>7. Your Rights</h2>
                <p className={paragraph}>Subject to applicable laws, you may:</p>
                <ul className={list}>
                    <li>Request access to your personal information.</li>
                    <li>Request correction of inaccurate information.</li>
                    <li>Request deletion of your personal data where applicable.</li>
                    <li>Withdraw consent for marketing communications.</li>
                    <li>Raise concerns regarding data processing.</li>
                </ul>
                <p className={paragraph}>Requests may be submitted using the contact details available on our website.</p>

                <h2 className={sectionHeading}>8. Third-Party Links</h2>
                <p className={paragraph}>
                    Our website may contain links to third-party websites. EuroZiel is not responsible for the privacy
                    practices or content of external websites.
                </p>

                <h2 className={sectionHeading}>9. Children's Privacy</h2>
                <p className={paragraph}>
                    Our services are intended for individuals who are eligible to pursue higher education or their
                    parents/legal guardians. We do not knowingly collect personal information from children without
                    appropriate consent where required.
                </p>

                <h2 className={sectionHeading}>10. Changes to This Policy</h2>
                <p className={paragraph}>
                    We may update this Privacy Policy periodically. The latest version will always be published on our
                    website with the revised effective date.
                </p>

                <h2 className={sectionHeading}>11. Contact Us</h2>
                <p className={paragraph}>
                    If you have any questions regarding this Privacy Policy or the processing of your personal
                    information, please contact EuroZiel using the support email address and telephone number provided
                    on our website.
                </p>
                <p className={`font-semibold ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
                    <a href="mailto:info@euroziel.com" className="hover:underline text-[#1b73ba]">
                        info@euroziel.com
                    </a>
                </p>

            </div>
        </div>
    );
}