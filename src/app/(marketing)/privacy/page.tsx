import { Metadata } from 'next'

import { PromptOSLegalPage } from '@/components/marketing/promptos/PromptOSLegalPage'
import { Reveal } from '@/components/marketing/promptos/Reveal'

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Prompt.tax desktop and related services.',
}

export default function PrivacyPage() {
    return (
        <PromptOSLegalPage
            title="Privacy Policy"
            eyebrow="Legal"
            description="This Privacy Policy explains how RED PILL SOFTWARE, LLC collects, uses, protects, and retains information when you use Prompt.tax, including our desktop-first product and any related support or billing services."
            lastUpdated="June 28, 2026"
            navItems={[
                { id: 'collect', label: 'Information We Collect' },
                { id: 'use', label: 'How We Use Information' },
                { id: 'sharing', label: 'Information Sharing' },
                { id: 'security', label: 'Data Security' },
                { id: 'retention', label: 'Data Retention' },
                { id: 'rights', label: 'Your Rights' },
                { id: 'cookies', label: 'Cookies and Tracking' },
                { id: 'third-party', label: 'Third-Party Services' },
                { id: 'children', label: 'Children’s Privacy' },
                { id: 'changes', label: 'Changes to this Policy' },
                { id: 'contact', label: 'Contact Us' },
            ]}
        >
            <LegalSection id="collect" title="1. Information We Collect">
                <p>We collect information you provide directly to us and information generated through your use of the service.</p>
                <p>Examples may include:</p>
                <LegalList
                    items={[
                        'Account information such as name, email address, and login credentials.',
                        'Billing and payment information when you purchase a subscription or related service.',
                        'Documents, files, and data you choose to upload, process, or link to Prompt.tax.',
                        'Usage, device, diagnostic, and security information needed to operate and improve the service.',
                    ]}
                />
            </LegalSection>

            <LegalSection id="use" title="2. How We Use Information">
                <p>We use information we collect to:</p>
                <LegalList
                    items={[
                        'Provide, maintain, support, and improve Prompt.tax.',
                        'Process your documents and generate related workflows or outputs at your direction.',
                        'Authenticate users, manage accounts, and administer subscriptions.',
                        'Communicate technical notices, billing information, service updates, and support responses.',
                        'Detect fraud, abuse, service misuse, and security incidents.',
                    ]}
                />
            </LegalSection>

            <LegalSection id="sharing" title="3. Information Sharing">
                <p>We do not sell your personal information. We may disclose information only in limited circumstances, such as:</p>
                <LegalList
                    items={[
                        'To service providers acting on our behalf for infrastructure, payments, support, or analytics.',
                        'To comply with legal obligations or respond to valid legal process.',
                        'To protect our rights, users, systems, or the public from harm, fraud, or abuse.',
                        'In connection with a merger, financing, acquisition, reorganization, or sale of assets.',
                        'With your explicit consent or at your direction.',
                    ]}
                />
            </LegalSection>

            <LegalSection id="security" title="4. Data Security">
                <p>We use reasonable technical and organizational safeguards designed to protect information against unauthorized access, alteration, disclosure, or destruction.</p>
                <LegalList
                    items={[
                        'Encryption in transit where appropriate.',
                        'Access controls, authentication, and internal authorization boundaries.',
                        'Monitoring and security review practices designed to reduce platform risk.',
                        'Operational controls for personnel and third-party providers handling protected data.',
                    ]}
                />
            </LegalSection>

            <LegalSection id="retention" title="5. Data Retention">
                <p>We retain information only as long as reasonably necessary for the purposes described in this policy, including providing the service, satisfying legal obligations, resolving disputes, and enforcing our agreements.</p>
                <p>Where appropriate, we may delete, de-identify, or anonymize information when it is no longer needed.</p>
            </LegalSection>

            <LegalSection id="rights" title="6. Your Rights">
                <p>Depending on where you live, you may have legal rights regarding your personal information, including rights to access, correct, delete, export, or object to certain processing.</p>
                <p>To make a privacy request, contact us at hi@prompt.tax.</p>
            </LegalSection>

            <LegalSection id="cookies" title="7. Cookies and Tracking">
                <p>We may use cookies, local storage, and similar technologies to support authentication, preferences, security, diagnostics, and service performance.</p>
                <LegalList
                    items={[
                        'Keep you signed in when appropriate.',
                        'Remember interface and account preferences.',
                        'Measure reliability and improve service performance.',
                        'Support product analytics, security review, and operational debugging.',
                    ]}
                />
                <p>You can manage many browser-based tracking settings directly through your browser or device preferences.</p>
            </LegalSection>

            <LegalSection id="third-party" title="8. Third-Party Services">
                <p>Prompt.tax may integrate with or rely on third-party services for payments, infrastructure, analytics, email, or other operational needs. Those services operate under their own terms and privacy practices.</p>
                <p>We encourage you to review the privacy policies of any third-party services you use in connection with Prompt.tax.</p>
            </LegalSection>

            <LegalSection id="children" title="9. Children’s Privacy">
                Prompt.tax is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided personal information to us, contact us so we can investigate and take appropriate action.
            </LegalSection>

            <LegalSection id="changes" title="10. Changes to this Privacy Policy">
                We may update this Privacy Policy from time to time. When material changes are made, we may provide notice through the service, by email, or by other reasonable means, and we will revise the effective date above.
            </LegalSection>

            <LegalSection id="contact" title="11. Contact Us">
                <p>If you have questions about this Privacy Policy or our data practices, contact us at:</p>
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
