import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="py-12 px-4 bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 p-8 md:p-12">
        <div className="mb-8 flex items-center">
          <Link to="/portal?mode=register" className="text-smb-blue dark:text-blue-400 font-bold hover:underline">
            <i className="fas fa-arrow-left mr-2"></i> Back to Registration
          </Link>
        </div>

        <h1 className="text-4xl font-black text-smb-blue dark:text-white mb-8 border-b-4 border-amber-500 pb-4 inline-block">
          Terms & Conditions
        </h1>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-smb-blue dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the SMB Visa Consultancy Portal ("the Portal") and creating an account, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services or create an account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-smb-blue dark:text-white mb-4">2. Description of Service</h2>
            <p>
              SMB Visa Consultancy ("we," "us," or "our") provides a platform for individuals to assess their potential eligibility for various international visa programs, book consultations with legal experts, and track their application progress.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-smb-blue dark:text-white mb-4">3. User Account and Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Accuracy:</strong> You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate and complete.
              </li>
              <li>
                <strong>Security:</strong> You are responsible for safeguarding your password and for any activities or actions under your account. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers and symbols).
              </li>
              <li>
                <strong>Unauthorized Use:</strong> You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-smb-blue dark:text-white mb-4">4. Visa Eligibility Assessment Disclaimer</h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded">
              <p className="font-bold text-amber-800 dark:text-amber-400 mb-2">IMPORTANT NOTICE:</p>
              <p>
                The results of the Visa Eligibility Assessment are based on the information you provide and current immigration criteria. However, <strong>this assessment does not guarantee visa approval</strong>. Immigration laws and policies are subject to change without notice. Official decisions are made solely by the respective government immigration authorities.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-smb-blue dark:text-white mb-4">5. Use of the Site</h2>
            <p>
              You agree not to use the Portal for any purpose that is unlawful or prohibited by these Terms. You may not use the Portal in any manner that could damage, disable, overburden, or impair any of our servers or the network(s) connected to any of our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-smb-blue dark:text-white mb-4">6. Privacy Policy</h2>
            <p>
              Your use of the Portal is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information, including document uploads (Resumes, Photos) and assessment data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-smb-blue dark:text-white mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall SMB Visa Consultancy be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses, resulting from your access to or use of or inability to access or use the Portal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-smb-blue dark:text-white mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-smb-blue dark:text-white mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              <span className="font-bold">Email:</span> legal@smbconsultancy.com
              <br />
              <span className="font-bold">Address:</span> Metro Manila, Philippines
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-700 text-center">
           <Link to="/portal?mode=register" className="bg-smb-blue hover:bg-blue-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest transition shadow-lg inline-block">
             I Understand & Back to Register
           </Link>
        </div>
      </div>
    </div>
  );
}
