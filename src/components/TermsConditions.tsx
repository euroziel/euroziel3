// src/components/TermsConditions.tsx
import React from 'react';

interface PolicyPageProps {
    theme: 'light' | 'dark';
}

export default function TermsConditions({ theme }: PolicyPageProps) {
    const dark = theme === 'dark';

    const sectionHeading = `text-base font-bold mt-8 mb-3 ${dark ? 'text-slate-100' : 'text-slate-900'}`;
    const paragraph = 'mb-3 leading-relaxed';
    const list = 'list-disc pl-5 space-y-1 mb-3';

    return (
        <div className={`max-w-3xl mx-auto px-4 py-28 mobile-m:px-6 laptop:px-8 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
            <h1 className={`text-2xl mobile-m:text-3xl font-bold mb-2 ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                Terms & Conditions
            </h1>
            <p className={`text-xs uppercase tracking-wider mb-8 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                Last updated: July 29, 2026
            </p>

            <div className="text-sm font-sans">

                <p className={paragraph}>
                    These Terms & Conditions govern your use of the EuroZiel Consultancy website and the educational
                    consultancy services provided by EuroZiel. By accessing our website or using our services, you agree
                    to these Terms & Conditions.
                </p>

                <h2 className={sectionHeading}>1. Services</h2>
                <p className={paragraph}>
                    EuroZiel provides educational consultancy services relating to higher education opportunities,
                    including but not limited to:
                </p>
                <ul className={list}>
                    <li>University selection</li>
                    <li>Admission guidance</li>
                    <li>Application assistance</li>
                    <li>SOP/LOR guidance</li>
                    <li>APS guidance</li>
                    <li>Visa assistance</li>
                    <li>Accommodation guidance</li>
                    <li>Pre-departure assistance</li>
                    <li>Career and educational counselling</li>
                </ul>
                <p className={paragraph}>Our services are advisory in nature.</p>

                <h2 className={sectionHeading}>2. Eligibility</h2>
                <p className={paragraph}>
                    You must provide accurate and complete information while using our services. You agree not to submit
                    false, misleading, or fraudulent documents.
                </p>

                <h2 className={sectionHeading}>3. No Admission Guarantee</h2>
                <p className={paragraph}>EuroZiel does not guarantee:</p>
                <ul className={list}>
                    <li>Admission to any university.</li>
                    <li>Visa approval.</li>
                    <li>Scholarships.</li>
                    <li>Employment opportunities.</li>
                    <li>Permanent residency.</li>
                    <li>Immigration outcomes.</li>
                </ul>
                <p className={paragraph}>
                    Final decisions are solely made by universities, government authorities, visa officers, or other
                    competent organizations.
                </p>

                <h2 className={sectionHeading}>4. User Responsibilities</h2>
                <p className={paragraph}>You agree to:</p>
                <ul className={list}>
                    <li>Provide truthful information.</li>
                    <li>Submit genuine documents.</li>
                    <li>Respond promptly to requests.</li>
                    <li>Meet application deadlines.</li>
                    <li>Comply with university and government requirements.</li>
                </ul>
                <p className={paragraph}>
                    Any delay caused by inaccurate or incomplete information is the responsibility of the applicant.
                </p>

                <h2 className={sectionHeading}>5. Fees</h2>
                <p className={paragraph}>
                    Consultation fees and service charges will be communicated separately. Unless otherwise stated in
                    writing:
                </p>
                <ul className={list}>
                    <li>Fees paid are non-transferable.</li>
                    <li>Refunds, if applicable, are governed by EuroZiel's Refund Policy or written agreement.</li>
                </ul>

                <h2 className={sectionHeading}>6. Intellectual Property</h2>
                <p className={paragraph}>
                    All website content including text, graphics, logos, branding, images, videos, and educational
                    materials are the intellectual property of EuroZiel unless otherwise stated. Unauthorized reproduction,
                    distribution, or commercial use is prohibited.
                </p>

                <h2 className={sectionHeading}>7. Website Usage</h2>
                <p className={paragraph}>Users agree not to:</p>
                <ul className={list}>
                    <li>Attempt unauthorized access.</li>
                    <li>Upload malicious software.</li>
                    <li>Disrupt website operations.</li>
                    <li>Copy website content without permission.</li>
                    <li>Use the website for unlawful activities.</li>
                </ul>

                <h2 className={sectionHeading}>8. Limitation of Liability</h2>
                <p className={paragraph}>EuroZiel shall not be liable for:</p>
                <ul className={list}>
                    <li>University admission decisions.</li>
                    <li>Visa refusals.</li>
                    <li>Delays caused by third parties.</li>
                    <li>Government policy changes.</li>
                    <li>Scholarship decisions.</li>
                    <li>Website interruptions.</li>
                    <li>Indirect or consequential losses.</li>
                </ul>
                <p className={paragraph}>Our liability shall be limited to the extent permitted by applicable law.</p>

                <h2 className={sectionHeading}>9. Third-Party Services</h2>
                <p className={paragraph}>
                    The website may reference or link to third-party websites or services. EuroZiel is not responsible for
                    their content, policies, products, or services.
                </p>

                <h2 className={sectionHeading}>10. Privacy</h2>
                <p className={paragraph}>Your use of the website is also governed by our Privacy Policy.</p>

                <h2 className={sectionHeading}>11. Modifications</h2>
                <p className={paragraph}>
                    EuroZiel reserves the right to update these Terms & Conditions at any time. Continued use of the
                    website constitutes acceptance of the revised Terms.
                </p>

                <h2 className={sectionHeading}>12. Governing Law</h2>
                <p className={paragraph}>
                    These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India.
                    Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the competent
                    courts in India.
                </p>

                <h2 className={sectionHeading}>13. Contact</h2>
                <p className={paragraph}>
                    For questions regarding these Terms & Conditions, please contact EuroZiel using the official support
                    email address and telephone number available on our website.
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