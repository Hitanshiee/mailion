import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack?: () => void;
  onSignIn?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
              className="flex items-center gap-2 text-neutral-600 hover:text-emerald-600 transition-colors"
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
          <h1 className="text-4xl font-bold text-neutral-900 mb-8">Privacy Policy</h1>
          <p className="text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose prose-neutral max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. Introduction</h2>
              <p className="text-neutral-700 leading-relaxed">
                AutoMailor ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, disclosed, and safeguarded by us when you use our email automation services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-neutral-900">Personal Information</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                  <li>Name and email address (when you sign up)</li>
                  <li>Google Account information (for Gmail integration)</li>
                  <li>Profile information you provide</li>
                </ul>

                <h3 className="text-lg font-medium text-neutral-900 mt-4">Usage Data</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                  <li>Email campaign data (subjects, content, recipients)</li>
                  <li>Interaction data (opens, clicks, replies)</li>
                  <li>Analytics and usage statistics</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>Provide and maintain our email automation services</li>
                <li>Process and send email campaigns on your behalf</li>
                <li>Track and analyze email engagement (opens, clicks, replies)</li>
                <li>Improve and optimize our services</li>
                <li>Communicate with you about your account and support</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Data Storage and Security</h2>
              <p className="text-neutral-700 leading-relaxed">
                Your data is stored securely using Firebase (Google Cloud Platform). We implement appropriate technical and organizational measures to protect your personal information, including encryption in transit and at rest. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Gmail API Data Usage</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                When you connect your Gmail account, we access only the data necessary to provide our email automation services:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li><strong>Read emails:</strong> To detect replies and analyze email threads</li>
                <li><strong>Send emails:</strong> To deliver your email campaigns</li>
                <li><strong>Manage labels:</strong> To organize sent messages</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                We <strong>do not</strong> read, store, or analyze the content of your personal emails for advertising or any purpose other than providing our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Third-Party Services</h2>
              <p className="text-neutral-700 leading-relaxed">
                We use Firebase (Google Cloud Platform) for data storage and authentication. Their privacy policies apply to how they handle your data. We may also use third-party analytics tools to understand how our service is used.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. Data Retention</h2>
              <p className="text-neutral-700 leading-relaxed">
                We retain your personal information and email campaign data as long as your account is active. You may request deletion of your data at any time by contacting us. Upon account deletion, we will remove your data within 30 days, except where retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Your Rights</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Object to processing of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">9. Children's Privacy</h2>
              <p className="text-neutral-700 leading-relaxed">
                Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-neutral-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">11. Contact Us</h2>
              <p className="text-neutral-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at: <br />
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

export default PrivacyPolicy;
