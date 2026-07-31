// src/components/RefundCancellationPolicy.tsx
import React from 'react';

interface PolicyPageProps {
    theme: 'light' | 'dark';
}

export default function RefundCancellationPolicy({ theme }: PolicyPageProps) {
    const dark = theme === 'dark';

    const sectionHeading = `text-base font-bold mt-8 mb-3 ${dark ? 'text-slate-100' : 'text-slate-900'}`;
    const paragraph = 'mb-3 leading-relaxed';
    const list = 'list-disc pl-5 space-y-1 mb-3';

    return (
        <div className={`max-w-3xl mx-auto px-4 py-28 mobile-m:px-6 laptop:px-8 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
            <h1 className={`text-2xl mobile-m:text-3xl font-bold mb-2 ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                Refund & Cancellation Policy
            </h1>
            <p className={`text-xs uppercase tracking-wider mb-8 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                Last updated: July 29, 2026
            </p>

            <div className="text-sm font-sans">

                <p className={paragraph}>
                    At EuroZiel Consultancy, we strive to provide transparent, professional, and high-quality educational
                    consultancy services. This Refund & Cancellation Policy outlines the terms governing cancellations and
                    refunds for services offered through our website and consultancy. By engaging our services, you agree
                    to this Refund & Cancellation Policy.
                </p>

                <h2 className={sectionHeading}>1. Scope</h2>
                <p className={paragraph}>
                    This policy applies to all consultancy services provided by EuroZiel, including but not limited to:
                </p>
                <ul className={list}>
                    <li>Educational counselling</li>
                    <li>University selection and application guidance</li>
                    <li>Statement of Purpose (SOP) and Letter of Recommendation (LOR) guidance</li>
                    <li>APS guidance</li>
                    <li>Visa assistance</li>
                    <li>Accommodation guidance</li>
                    <li>Pre-departure support</li>
                    <li>Career counselling</li>
                    <li>Any other consultancy services offered by EuroZiel</li>
                </ul>

                <h2 className={sectionHeading}>2. Cancellation by the Client</h2>
                <p className={paragraph}>
                    You may request to cancel a service by contacting EuroZiel using the official support email address or
                    phone number provided on our website.
                </p>
                <p className={paragraph}>Cancellation requests should include:</p>
                <ul className={list}>
                    <li>Full Name</li>
                    <li>Registered Email Address</li>
                    <li>Contact Number</li>
                    <li>Description of the service</li>
                    <li>Reason for cancellation</li>
                </ul>
                <p className={paragraph}>Cancellation requests are processed during normal business hours.</p>

                <h2 className={sectionHeading}>3. Refund Eligibility</h2>
                <p className={paragraph}>Refunds will be considered only in accordance with this policy. A refund may be approved if:</p>
                <ul className={list}>
                    <li>Payment was made more than once due to a technical or billing error.</li>
                    <li>EuroZiel is unable to provide the purchased service due to reasons solely within our control.</li>
                    <li>A refund is otherwise agreed upon in writing by EuroZiel.</li>
                </ul>
                <p className={paragraph}>Approved refunds will be processed using the original payment method wherever possible.</p>

                <h2 className={sectionHeading}>4. Non-Refundable Services</h2>
                <p className={paragraph}>
                    Unless otherwise agreed in writing, fees paid for consultancy services are generally non-refundable
                    once any of the following has occurred:
                </p>
                <ul className={list}>
                    <li>A counselling session has been conducted.</li>
                    <li>Student profile evaluation has commenced.</li>
                    <li>University shortlisting has begun.</li>
                    <li>Application preparation or document review has started.</li>
                    <li>SOP or LOR guidance has been provided.</li>
                    <li>Applications have been submitted.</li>
                    <li>APS or visa guidance has commenced.</li>
                    <li>Pre-departure support has begun.</li>
                    <li>Any personalized consultancy service has been delivered.</li>
                </ul>
                <p className={paragraph}>
                    Fees paid to third parties, including universities, government authorities, visa authorities,
                    examination agencies, courier providers, or other external organizations, are not refundable by
                    EuroZiel.
                </p>

                <h2 className={sectionHeading}>5. Admission and Visa Decisions</h2>
                <p className={paragraph}>EuroZiel provides guidance and consultancy services only. Refunds will not be issued because:</p>
                <ul className={list}>
                    <li>A university rejects an application.</li>
                    <li>A visa application is refused.</li>
                    <li>A scholarship is not awarded.</li>
                    <li>An applicant chooses not to continue after services have commenced.</li>
                    <li>Government regulations or university policies change.</li>
                    <li>Processing timelines are extended by third parties.</li>
                </ul>
                <p className={paragraph}>
                    Admission, visa, scholarship, and immigration decisions are made solely by the relevant institutions
                    and authorities.
                </p>

                <h2 className={sectionHeading}>6. Cancellation by EuroZiel</h2>
                <p className={paragraph}>EuroZiel reserves the right to refuse or discontinue services if:</p>
                <ul className={list}>
                    <li>False or misleading information is provided.</li>
                    <li>Fraudulent or altered documents are submitted.</li>
                    <li>The client engages in abusive, unlawful, or inappropriate conduct.</li>
                    <li>Continued service would violate applicable laws or regulations.</li>
                </ul>
                <p className={paragraph}>
                    Where appropriate, any refund will be determined at EuroZiel's sole discretion, taking into account
                    the work already completed.
                </p>

                <h2 className={sectionHeading}>7. Processing of Approved Refunds</h2>
                <p className={paragraph}>Where a refund is approved:</p>
                <ul className={list}>
                    <li>It will be processed through the original payment method, wherever feasible.</li>
                    <li>Processing times may vary depending on the payment provider or financial institution.</li>
                    <li>Any transaction fees or third-party charges that cannot be recovered may be deducted where permitted by law.</li>
                </ul>

                <h2 className={sectionHeading}>8. Changes to Booked Appointments</h2>
                <p className={paragraph}>
                    Clients who wish to reschedule a consultation should notify EuroZiel as early as reasonably possible.
                    Rescheduling requests are subject to consultant availability and may not always be accommodated.
                </p>
                <p className={paragraph}>
                    Repeated missed appointments without prior notice may be treated as cancelled appointments, and the
                    applicable service fee may be forfeited.
                </p>

                <h2 className={sectionHeading}>9. Exceptional Circumstances</h2>
                <p className={paragraph}>
                    EuroZiel may, at its sole discretion, consider refund requests arising from exceptional circumstances
                    on a case-by-case basis. Any such decision does not create an obligation to provide refunds in similar
                    future cases.
                </p>

                <h2 className={sectionHeading}>10. Changes to This Policy</h2>
                <p className={paragraph}>
                    EuroZiel may update this Refund & Cancellation Policy from time to time. The latest version will
                    always be available on our website with the updated effective date.
                </p>

                <h2 className={sectionHeading}>11. Contact Us</h2>
                <p className={paragraph}>
                    If you have any questions regarding this Refund & Cancellation Policy or wish to request a
                    cancellation or refund, please contact EuroZiel using the official support email address and telephone
                    number provided on our website.
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