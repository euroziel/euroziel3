// src/components/Disclaimer.tsx
import React from 'react';

interface PolicyPageProps {
    theme: 'light' | 'dark';
}

export default function Disclaimer({ theme }: PolicyPageProps) {
    const dark = theme === 'dark';

    const sectionHeading = `text-base font-bold mt-8 mb-3 ${dark ? 'text-slate-100' : 'text-slate-900'}`;
    const paragraph = 'mb-3 leading-relaxed';
    const list = 'list-disc pl-5 space-y-1 mb-3';

    return (
        <div className={`max-w-3xl mx-auto px-4 py-28 mobile-m:px-6 laptop:px-8 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
            <h1 className={`text-2xl mobile-m:text-3xl font-bold mb-2 ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                Disclaimer
            </h1>
            <p className={`text-xs uppercase tracking-wider mb-8 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                Last updated: July 29, 2026
            </p>

            <div className="text-sm font-sans">

                <p className={paragraph}>
                    The information provided on the EuroZiel Consultancy website is intended for general informational
                    and educational purposes only. By accessing and using this website, you acknowledge and agree to the
                    terms of this Disclaimer.
                </p>

                <h2 className={sectionHeading}>1. General Information</h2>
                <p className={paragraph}>
                    The content published on this website, including text, graphics, videos, blogs, guides, webinars,
                    downloadable resources, and other materials, is provided in good faith to assist prospective students
                    in understanding higher education opportunities and related processes.
                </p>
                <p className={paragraph}>
                    While we strive to ensure that the information is accurate and up to date, EuroZiel makes no
                    representations or warranties, express or implied, regarding the completeness, accuracy, reliability,
                    suitability, or availability of any information on this website.
                </p>

                <h2 className={sectionHeading}>2. Educational Consultancy Services</h2>
                <p className={paragraph}>
                    EuroZiel provides educational consultancy and guidance services only. Our services include, but are
                    not limited to:
                </p>
                <ul className={list}>
                    <li>Educational counselling</li>
                    <li>University selection</li>
                    <li>Admission guidance</li>
                    <li>Application assistance</li>
                    <li>SOP and LOR guidance</li>
                    <li>APS guidance</li>
                    <li>Visa application support</li>
                    <li>Accommodation guidance</li>
                    <li>Pre-departure assistance</li>
                    <li>Career counselling</li>
                </ul>
                <p className={paragraph}>
                    Our role is advisory in nature. All final decisions are made by the respective universities,
                    government authorities, visa offices, scholarship providers, and other relevant organizations.
                </p>

                <h2 className={sectionHeading}>3. No Guarantee of Admission or Visa</h2>
                <p className={paragraph}>EuroZiel does not guarantee:</p>
                <ul className={list}>
                    <li>Admission to any university or educational institution.</li>
                    <li>Approval of student visas or other visas.</li>
                    <li>Scholarships or financial aid.</li>
                    <li>Employment opportunities.</li>
                    <li>Internship placements.</li>
                    <li>Permanent residency or immigration outcomes.</li>
                    <li>Acceptance of any application by a third party.</li>
                </ul>
                <p className={paragraph}>
                    Admission and visa decisions depend on multiple factors, including eligibility, academic performance,
                    submitted documents, institutional policies, and applicable government regulations.
                </p>

                <h2 className={sectionHeading}>4. Accuracy of Information</h2>
                <p className={paragraph}>
                    Higher education policies, visa regulations, tuition fees, scholarship opportunities, eligibility
                    requirements, and immigration rules may change without prior notice.
                </p>
                <p className={paragraph}>
                    Although EuroZiel makes reasonable efforts to keep the information current, we recommend that
                    applicants verify important information directly with the relevant university, embassy, consulate, or
                    government authority before making decisions.
                </p>

                <h2 className={sectionHeading}>5. Student Responsibilities</h2>
                <p className={paragraph}>Applicants are solely responsible for:</p>
                <ul className={list}>
                    <li>Providing accurate and truthful information.</li>
                    <li>Submitting genuine and complete documents.</li>
                    <li>Meeting application and visa deadlines.</li>
                    <li>Carefully reviewing all documents before submission.</li>
                    <li>Complying with the requirements of universities and government authorities.</li>
                </ul>
                <p className={paragraph}>
                    EuroZiel shall not be responsible for delays, rejections, or other adverse outcomes resulting from
                    incorrect, incomplete, misleading, or fraudulent information provided by an applicant.
                </p>

                <h2 className={sectionHeading}>6. Third-Party Websites and Services</h2>
                <p className={paragraph}>
                    Our website may contain links to third-party websites, educational institutions, payment providers,
                    social media platforms, or other external resources.
                </p>
                <p className={paragraph}>
                    These links are provided solely for convenience. EuroZiel does not control, endorse, or assume
                    responsibility for the content, accuracy, privacy practices, products, or services offered by any
                    third-party website.
                </p>
                <p className={paragraph}>Users access third-party websites at their own risk.</p>

                <h2 className={sectionHeading}>7. Limitation of Liability</h2>
                <p className={paragraph}>
                    To the fullest extent permitted by applicable law, EuroZiel shall not be liable for any direct,
                    indirect, incidental, consequential, special, or punitive damages arising out of or related to:
                </p>
                <ul className={list}>
                    <li>Use of this website.</li>
                    <li>Reliance on information published on this website.</li>
                    <li>Admission decisions.</li>
                    <li>Visa refusals or delays.</li>
                    <li>Scholarship decisions.</li>
                    <li>Government policy changes.</li>
                    <li>Actions or omissions of third parties.</li>
                    <li>Technical interruptions, website downtime, or system failures.</li>
                </ul>
                <p className={paragraph}>Your use of this website and our services is at your own discretion and risk.</p>

                <h2 className={sectionHeading}>8. Intellectual Property</h2>
                <p className={paragraph}>
                    Unless otherwise stated, all content available on this website, including text, logos, graphics,
                    images, videos, branding, downloadable materials, and educational resources, is the intellectual
                    property of EuroZiel or is used with appropriate permission.
                </p>
                <p className={paragraph}>
                    No part of this website may be copied, reproduced, distributed, modified, or used for commercial
                    purposes without prior written permission from EuroZiel.
                </p>

                <h2 className={sectionHeading}>9. Testimonials and Success Stories</h2>
                <p className={paragraph}>
                    Testimonials, student reviews, case studies, and success stories presented on this website reflect the
                    individual experiences of specific students.
                </p>
                <p className={paragraph}>
                    These testimonials are shared for informational purposes only and should not be interpreted as a
                    guarantee that future applicants will achieve similar outcomes.
                </p>
                <p className={paragraph}>
                    Individual results vary depending on academic qualifications, eligibility, documentation, university
                    requirements, visa decisions, and other factors beyond EuroZiel's control.
                </p>

                <h2 className={sectionHeading}>10. Marketing Communications</h2>
                <p className={paragraph}>
                    Any educational opportunities, promotional offers, webinars, events, newsletters, or informational
                    updates shared by EuroZiel are provided for informational purposes only and do not constitute a
                    contractual commitment unless expressly stated in writing.
                </p>

                <h2 className={sectionHeading}>11. Changes to This Disclaimer</h2>
                <p className={paragraph}>
                    EuroZiel reserves the right to modify, update, or replace this Disclaimer at any time without prior
                    notice. The latest version will always be published on this website with the updated effective date.
                </p>

                <h2 className={sectionHeading}>12. Contact Us</h2>
                <p className={paragraph}>
                    If you have any questions regarding this Disclaimer or the information published on this website,
                    please contact EuroZiel using the official support email address and telephone number provided on our
                    website.
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