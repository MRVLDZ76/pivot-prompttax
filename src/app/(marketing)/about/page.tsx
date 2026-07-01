import Link from 'next/link'

export default function About() {
    return (
        <div className="bg-background text-foreground">
            <section className="container mx-auto px-4 py-16">
                <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                    <p>
                        <br />
                    </p>
                    <p>About Prompt.tax</p>
                </div>
                <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                    Revolutionizing tax preparation with AI + human expertise. We combine intelligent automation with
                    mandatory CPA review to deliver accurate, affordable tax preparation for everyone.
                </p>
            </section>

            <section className="container mx-auto px-4 pb-12">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="rounded-lg border border-border p-6">
                        <h2 className="text-2xl font-semibold">Our Mission</h2>
                        <p className="mt-3 text-muted-foreground">
                            Bridge the gap between expensive traditional services and unreliable DIY software by pairing
                            cutting-edge AI with professional CPA oversight.
                        </p>
                    </div>
                    <div className="rounded-lg border border-border p-6">
                        <h2 className="text-2xl font-semibold">Why We Exist</h2>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <li>Traditional CPA services cost $300–$800+ per return</li>
                            <li>DIY tools miss deductions and offer little guidance</li>
                            <li>Complex situations demand real expertise</li>
                            <li>People fear audits and penalties from filing incorrectly</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold">For Individual Taxpayers</h2>
                <p className="mt-2 max-w-3xl text-muted-foreground">
                    Premium tax preparation at a fraction of the cost.
                </p>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">AI + CPA Review</h3>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <li>AI scans documents and finds every eligible deduction</li>
                            <li>Every return is reviewed by a licensed CPA</li>
                            <li>Maximum refund guarantee</li>
                            <li>Audit protection with full documentation</li>
                        </ul>
                    </div>
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">Why Hybrid Wins</h3>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <li>Traditional CPA: accurate but expensive and time‑consuming</li>
                            <li>DIY: affordable but risky and easy to miss deductions</li>
                            <li>Prompt.tax: accurate, affordable, and always reviewed by a CPA</li>
                        </ul>
                    </div>
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">Perfect For</h3>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <li>Busy professionals</li>
                            <li>Small business owners</li>
                            <li>Freelancers & contractors (1099)</li>
                            <li>First‑time filers and anyone seeking confidence</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold">For CPAs</h2>
                <p className="mt-2 max-w-3xl text-muted-foreground">Unprecedented productivity and practice growth.</p>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">Document Intelligence</h3>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <li>Automatic extraction and categorization</li>
                            <li>OCR for receipts, W‑2s, 1099s</li>
                            <li>AI organizes data before review</li>
                        </ul>
                    </div>
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">Automated Prep & Review</h3>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <li>AI completes initial preparation</li>
                            <li>Flags issues and optimization opportunities</li>
                            <li>Streamlined approval workflow</li>
                        </ul>
                    </div>
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">Results</h3>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <li>5× capacity increase</li>
                            <li>Higher margins and year‑round revenue</li>
                            <li>Faster turnaround and happier clients</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold">Our Technology</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">Enterprise‑Grade AI</h3>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <li>Azure Document Intelligence for 99.7% accuracy</li>
                            <li>OpenAI GPT‑4 for complex reasoning</li>
                            <li>ML that continually improves deduction identification</li>
                            <li>Bank‑level security and SOC 2 alignment</li>
                        </ul>
                    </div>
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">Professional Network</h3>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <li>Licensed CPAs across all states</li>
                            <li>Continuous training and quality assurance</li>
                            <li>Multi‑tier review and professional liability coverage</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold">Pricing</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">Simple Returns</h3>
                        <p className="mt-2 text-muted-foreground">$99 • W‑2 with standard deductions.</p>
                    </div>
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">Complex Returns</h3>
                        <p className="mt-2 text-muted-foreground">$199 • 1099s, Schedule C, multiple income sources.</p>
                    </div>
                    <div className="rounded-lg border border-border p-6">
                        <h3 className="text-xl font-semibold">Premium Returns</h3>
                        <p className="mt-2 text-muted-foreground">$299 • Rentals, investments, business ownership.</p>
                    </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                    All plans include AI preparation + mandatory CPA review + audit support.
                </p>
            </section>
        </div>
    )
}
