// src/components/CookiePolicy.tsx
import React from 'react';

interface PolicyPageProps {
    theme: 'light' | 'dark';
}

export default function CookiePolicy({ theme }: PolicyPageProps) {
    const dark = theme === 'dark';

    const sectionHeading = `text-base font-bold mt-8 mb-3 ${dark ? 'text-slate-100' : 'text-slate-900'}`;
    const subHeading = `font-bold mt-4 mb-1.5 ${dark ? 'text-slate-200' : 'text-slate-800'}`;
    const paragraph = 'mb-3 leading-relaxed';
    const list = 'list-disc pl-5 space-y-1 mb-3';

    return (
        <div className={`max-w-3xl mx-auto px-4 py-28 mobile-m:px-6 laptop:px-8 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
            <h1 className={`text-2xl mobile-m:text-3xl font-bold mb-2 ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                Cookie Policy
            </h1>
            <p className={`text-xs uppercase tracking-wider mb-8 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                Last updated: July 29, 2026
            </p>

            <div className="text-sm font-sans">

                <p className={paragraph}>
                    This Cookie Policy explains how EuroZiel Consultancy uses cookies and similar technologies when you
                    visit our website. By continuing to use our website, you consent to the use of cookies in accordance
                    with this Cookie Policy, unless you choose to disable them through your browser settings.
                </p>

                <h2 className={sectionHeading}>1. What Are Cookies?</h2>
                <p className={paragraph}>
                    Cookies are small text files that are stored on your computer, smartphone, or other device when you
                    visit a website. They help websites function efficiently, remember your preferences, improve user
                    experience, and provide insights into website performance.
                </p>
                <p className={paragraph}>
                    Cookies do not typically contain personally identifiable information. However, in some cases,
                    information collected through cookies may be associated with personal information that you
                    voluntarily provide to us.
                </p>

                <h2 className={sectionHeading}>2. Why We Use Cookies</h2>
                <p className={paragraph}>EuroZiel uses cookies to:</p>
                <ul className={list}>
                    <li>Ensure the website functions properly.</li>
                    <li>Improve website speed and performance.</li>
                    <li>Remember your preferences and settings.</li>
                    <li>Understand how visitors interact with our website.</li>
                    <li>Measure the effectiveness of our marketing campaigns.</li>
                    <li>Enhance security and detect fraudulent activity.</li>
                    <li>Improve the overall user experience.</li>
                </ul>

                <h2 className={sectionHeading}>3. Types of Cookies We Use</h2>

                <p className={subHeading}>Essential Cookies</p>
                <p className={paragraph}>
                    These cookies are necessary for the operation of our website. They enable core functionality such as
                    page navigation, security features, and access to certain areas of the website. Without these cookies,
                    the website may not function correctly.
                </p>

                <p className={subHeading}>Performance and Analytics Cookies</p>
                <p className={paragraph}>These cookies collect anonymous information about how visitors use our website, including:</p>
                <ul className={list}>
                    <li>Number of visitors</li>
                    <li>Pages visited</li>
                    <li>Time spent on pages</li>
                    <li>Traffic sources</li>
                    <li>Device and browser information</li>
                </ul>
                <p className={paragraph}>This information helps us improve our website and the services we provide.</p>

                <p className={subHeading}>Functional Cookies</p>
                <p className={paragraph}>
                    Functional cookies remember your preferences, such as language settings or previously entered
                    information, to provide a more personalized browsing experience.
                </p>

                <p className={subHeading}>Marketing and Advertising Cookies</p>
                <p className={paragraph}>
                    These cookies help us understand the effectiveness of our advertising campaigns and may be used to
                    display relevant advertisements based on your interests. If enabled, these cookies may be placed by
                    EuroZiel or trusted third-party advertising partners.
                </p>

                <h2 className={sectionHeading}>4. Third-Party Cookies</h2>
                <p className={paragraph}>
                    Our website may use trusted third-party services that place cookies on your device, including services
                    used for:
                </p>
                <ul className={list}>
                    <li>Website analytics</li>
                    <li>Performance monitoring</li>
                    <li>Marketing campaign measurement</li>
                    <li>Embedded videos</li>
                    <li>Social media integrations</li>
                </ul>
                <p className={paragraph}>
                    These third parties have their own privacy and cookie policies, which govern how they collect and use
                    your information.
                </p>

                <h2 className={sectionHeading}>5. Managing Cookies</h2>
                <p className={paragraph}>You can control or disable cookies through your web browser settings. Most browsers allow you to:</p>
                <ul className={list}>
                    <li>View stored cookies.</li>
                    <li>Delete existing cookies.</li>
                    <li>Block all cookies.</li>
                    <li>Block cookies from specific websites.</li>
                    <li>Receive notifications before cookies are stored.</li>
                </ul>
                <p className={paragraph}>
                    Please note that disabling certain cookies may affect the functionality and performance of the
                    website, and some features may not operate as intended.
                </p>

                <h2 className={sectionHeading}>6. Consent</h2>
                <p className={paragraph}>
                    Where required by applicable law, we will request your consent before placing non-essential cookies
                    on your device.
                </p>
                <p className={paragraph}>
                    You may withdraw or modify your cookie preferences at any time through your browser settings or any
                    cookie preference tools made available on our website.
                </p>

                <h2 className={sectionHeading}>7. Updates to This Cookie Policy</h2>
                <p className={paragraph}>
                    We may update this Cookie Policy from time to time to reflect changes in technology, legal
                    requirements, or our business practices. The revised version will be published on this page with an
                    updated effective date.
                </p>

                <h2 className={sectionHeading}>8. Contact Us</h2>
                <p className={paragraph}>
                    If you have any questions about this Cookie Policy or our use of cookies, please contact EuroZiel
                    using the official support email address and telephone number provided on our website.
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