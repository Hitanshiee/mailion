import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onBack?: () => void;
  onSignIn?: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[10000] px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
              <Mail size={24} />
            </div>
            <span className="text-xl font-['Playfair_Display'] italic font-bold tracking-tight text-black">AutoMailor</span>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Terms of Service</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose prose-neutral max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-neutral-700 leading-relaxed">
                By accessing and using AutoMailor ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Description of Service</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                AutoMailor is an AI-powered email automation platform that helps users:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>Create and manage email campaigns</li>
                <li>Automate email responses using AI</li>
                <li>Track email engagement (opens, clicks, replies)</li>
                <li>Manage email templates and sequences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. User Accounts and Eligibility</h2>
              <div className="space-y-4">
                <p className="text-neutral-700 leading-relaxed">
                  To use our Service, you must:
                </p>
                <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Have a valid Google Account for Gmail integration</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account</li>
                </ul>
                <p className="text-neutral-700 leading-relaxed mt-4">
                  You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Acceptable Use</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                You agree NOT to use the Service to:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>Send spam, phishing, or fraudulent emails</li>
                <li>Harass, threaten, or defame others</li>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Distribute malware or viruses</li>
                <li>Send unsolicited commercial messages (except as part of legitimate business communications)</li>
                <li>Attempt to gain unauthorized access to other systems</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                We reserve the right to suspend or terminate accounts that violate these rules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Email Compliance & Limits</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                When using AutoMailor for email campaigns, you must comply with:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li><strong>CAN-SPAM Act:</strong> Include accurate sender identification and opt-out mechanisms</li>
                <li><strong>GDPR:</strong> Obtain proper consent for recipients in the EU</li>
                <li><strong>CASL:</strong> Comply with Canadian anti-spam laws if applicable</li>
                <li>Include a valid physical postal address in all commercial emails</li>
                <li>Honor all unsubscribe requests within 10 business days</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-4">Gmail Sending Limits</h3>
              <p className="text-neutral-700 leading-relaxed mb-4">
                AutoMailor uses your Gmail account to send emails. Please be aware of the following limits:
              </p>
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-5 mb-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="py-2 text-neutral-700">Free Gmail Account</td>
                      <td className="py-2 text-neutral-900 font-medium text-right">50 emails/day</td>
                    </tr>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="py-2 text-neutral-700">Google Workspace</td>
                      <td className="py-2 text-neutral-900 font-medium text-right">1,000 emails/day</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-neutral-700">Hourly Rate Limit (Free)</td>
                      <td className="py-2 text-neutral-900 font-medium text-right">~10 emails/hour</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Recommended Guidelines</h3>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2 mb-4">
                <li><strong>Schedule 10 emails per hour</strong> to stay within Gmail's rate limits</li>
                <li><strong>Maximum 50 emails per day</strong> recommended for free Gmail accounts</li>
                <li><strong>Avoid sending to unengaged recipients</strong> to prevent spam classification</li>
                <li>Warm up new Gmail accounts gradually (start with 10-20 emails/day)</li>
              </ul>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                  <strong>Warning:</strong> Exceeding Gmail's limits may result in your account being temporarily locked or marked as spam. AutoMailor's free plan includes a 100 emails/day limit as an additional safeguard to help protect your Gmail account.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Intellectual Property</h2>
              <p className="text-neutral-700 leading-relaxed">
                The Service and its original content, features, and functionality are owned by AutoMailor and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. User Content</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                You retain ownership of all content you create using our Service, including:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>Email templates and sequences</li>
                <li>Campaign content and subject lines</li>
                <li>Contact lists (to the extent you have rights to them)</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                By using the Service, you grant us permission to use your content solely for providing and improving our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Payment and Subscription</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Some features of our Service require payment. By subscribing, you agree to:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>Pay all fees and charges in a timely manner</li>
                <li>Provide valid payment information</li>
                <li>Accept our pricing and billing terms</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                Subscriptions auto-renew unless cancelled. You can cancel at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-neutral-700 leading-relaxed">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-neutral-700 leading-relaxed">
                IN NO EVENT SHALL INBOXAI, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR USE OR INABILITY TO USE THE SERVICE; (II) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS; (III) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">11. Indemnification</h2>
              <p className="text-neutral-700 leading-relaxed">
                You agree to defend, indemnify, and hold harmless AutoMailor and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">12. Termination</h2>
              <p className="text-neutral-700 leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">13. Governing Law</h2>
              <p className="text-neutral-700 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which AutoMailor operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">14. Changes to Terms</h2>
              <p className="text-neutral-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">15. Contact Us</h2>
              <p className="text-neutral-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at: <br />
                <strong>Email:</strong> tandelhitanshi@gmail.com
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm">
            <Mail size={16} />
            <span>© 2024 AutoMailor. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="/terms" className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="/privacy" className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
