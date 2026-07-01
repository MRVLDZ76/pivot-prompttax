import { Metadata } from 'next'

import { PromptOSLegalPage } from '@/components/marketing/promptos/PromptOSLegalPage'
import { Reveal } from '@/components/marketing/promptos/Reveal'

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for Prompt.tax desktop.',
}

export default function TermsPage() {
    return (
        <PromptOSLegalPage
            title="Terms of Service"
            eyebrow="Legal"
            description="These terms govern access to Prompt.tax, including the current desktop-first experience, any supporting hosted services, and your use of our document, workflow, and tax-preparation features."
            lastUpdated="June 28, 2026"
            navItems={[
                { id: 'acceptance', label: 'Acceptance of Terms' },
                { id: 'service', label: 'Description of Service' },
                { id: 'accounts', label: 'Accounts and Access' },
                { id: 'payments', label: 'Subscriptions and Payment' },
                { id: 'privacy', label: 'Privacy and Data' },
                { id: 'use', label: 'Acceptable Use' },
                { id: 'liability', label: 'Limitation of Liability' },
                { id: 'termination', label: 'Termination' },
                { id: 'changes', label: 'Changes to Terms' },
                { id: 'contact', label: 'Contact Information' },
            ]}
        >
            <LegalSection id="acceptance" title="1. Acceptance of Terms">
                By accessing or using Prompt.tax, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the service.
            </LegalSection>

            <LegalSection id="service" title="2. Description of Service">
                Prompt.tax is a tax and financial workflow platform that helps users organize documents, understand tax-relevant information, generate outputs, and manage related processes. We currently offer a desktop-first experience and may provide supporting online services, updates, and related features.
            </LegalSection>

            <LegalSection id="accounts" title="3. Accounts and Access">
                <p>You may need an account to access certain features. You agree to:</p>
                <LegalList
                    items={[
                        'Provide accurate, current, and complete information.',
                        'Maintain and promptly update your account information.',
                        'Keep your credentials secure and remain responsible for activity under your account.',
                        'Notify us promptly of unauthorized use or security issues involving your account.',
                    ]}
                />
            </LegalSection>

            <LegalSection id="payments" title="4. Subscriptions and Payment">
                <p>If you purchase a subscription or paid feature, you agree to:</p>
                <LegalList
                    items={[
                        'Pay all fees associated with your selected plan or feature.',
                        'Provide accurate billing and payment information.',
                        'Authorize recurring charges where applicable unless you cancel in accordance with the plan terms.',
                        'Understand that fees are non-refundable except where required by law or expressly stated otherwise.',
                    ]}
                />
            </LegalSection>

            <LegalSection id="privacy" title="5. Privacy and Data">
                <p>
                    Your privacy matters. Please review our Privacy Policy for details on how we collect, use, retain, and protect information. As between you and us, you retain ownership of your content and data, subject to the rights needed for us to operate and support the service.
                </p>
                <p>
                    Prompt.tax may process sensitive financial or tax-related information at your direction. You are responsible for ensuring that you have the right to upload, process, and manage the information you provide.
                </p>
            </LegalSection>

            <LegalSection id="use" title="6. Acceptable Use">
                <p>You agree not to use the service to:</p>
                <LegalList
                    items={[
                        'Upload malicious code or conduct unauthorized security testing.',
                        'Attempt to gain unauthorized access to the service, other accounts, or supporting systems.',
                        'Violate applicable laws, regulations, or third-party rights.',
                        'Interfere with the service, infrastructure, or other users’ access.',
                        'Upload or distribute material that infringes intellectual property or privacy rights.',
                    ]}
                />
            </LegalSection>

            <LegalSection id="liability" title="7. Limitation of Liability">
                Prompt.tax is provided on an “as is” and “as available” basis, without warranties of any kind except where warranties cannot be excluded by law. To the maximum extent permitted by law, RED PILL SOFTWARE, LLC will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of profits, revenues, data, business opportunities, or goodwill arising from or related to the service.
            </LegalSection>

            <LegalSection id="termination" title="8. Termination">
                We may suspend or terminate access to the service if you violate these terms, create risk for the platform or other users, or if continued access is not commercially or legally feasible. Upon termination, your right to use the service ends immediately, subject to any rights you may have under applicable law.
            </LegalSection>

            <LegalSection id="changes" title="9. Changes to Terms">
                We may update these terms from time to time. If we make material changes, we may provide notice through the service, by email, or by other reasonable means. Continued use after the effective date of revised terms constitutes acceptance of the updated terms.
            </LegalSection>

            <LegalSection id="contact" title="10. Contact Information">
                <p>If you have questions about these Terms of Service, contact us at:</p>
                <p>
                    hi@prompt.tax
                    <br />
                    RED PILL SOFTWARE, LLC
                    <br />
                    7901 4TH ST N, STE 300
                    <br />
                    ST. PETERSBURG, FL 33702 - USA
                </p>
            </LegalSection>
        </PromptOSLegalPage>
    )
}

function LegalSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <Reveal as="section" className="po-legal-section po-glow-border po-hairline" delay={0.03}>
            <section id={id}>
                <div className="po-legal-section-inner">
                    <div className="po-legal-section-kicker">{title}</div>
                    <div className="po-legal-copy">{children}</div>
                </div>
            </section>
        </Reveal>
    )
}

function LegalList({ items }: { items: string[] }) {
    return (
        <ul className="po-legal-list">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
}
