import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsConditionsApply({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#f7faf4] text-gray-900">
      <Navbar currentPage="terms-conditions-apply" onNavigate={onNavigate} />
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <header className="space-y-4 border-b border-[#dfe8d8] pb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-600">
            Save Medha Foundation
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-wide">
            Terms &amp; Conditions Apply
          </h1>
          <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
            <p>Effective Date: [DD Month YYYY]</p>
            <p>Last Updated: [DD Month YYYY]</p>
          </div>
          <p className="text-base text-gray-700 leading-relaxed">
            These Terms &amp; Conditions apply to the use of the Save Medha
            Foundation website and related services. By accessing or using this
            website, you acknowledge that you have read, understood, and agree
            to be bound by these Terms. If you do not agree, do not use this
            website.
          </p>
        </header>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            1. Introduction &amp; Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms form a legally binding agreement between you and Save
            Medha Foundation (India). Continued use of the website constitutes
            acceptance of these Terms, including any updates made under Section
            13.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            2. Nature of Services (Educational, Non-Emergency)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The content and services provided are informational and educational
            in nature. Save Medha Foundation promotes Natural Immunotherapy as a
            holistic wellness approach and does not provide emergency services
            or substitute for professional medical advice, diagnosis, or
            treatment.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            3. No Medical Guarantee / Disclaimer
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The website does not make any medical claims or guarantees of cure,
            recovery, or specific outcomes. Results vary based on individual
            circumstances. You must consult a licensed medical professional for
            any health-related decision.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            4. User Responsibility
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to provide accurate information, use the website
            responsibly, and seek independent medical advice when appropriate.
            You are solely responsible for any decisions made based on the
            website content.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            5. Consultations &amp; Communication
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Any consultations or communications are intended to provide general
            information and guidance. They are not a substitute for in-person
            clinical evaluation or emergency care. Response times may vary, and
            no immediate response is guaranteed.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            6. Payments &amp; Donations (Non-Refund Clause)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All payments and donations made to Save Medha Foundation are final
            and non-refundable, except where a refund is required by applicable
            law. Donation acknowledgements, if issued, do not constitute a
            promise of specific outcomes.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            7. Intellectual Property Rights
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All content on this website, including text, graphics, logos, and
            design elements, is owned by or licensed to Save Medha Foundation.
            You may view and print content for personal, non-commercial use
            only. Any other use requires prior written permission.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            8. Website Usage Restrictions
          </h2>
          <ul className="list-disc pl-5 text-gray-700 leading-relaxed space-y-2">
            <li>Do not use the website for unlawful, harmful, or misleading purposes.</li>
            <li>Do not attempt to interfere with site security or performance.</li>
            <li>Do not copy, scrape, or redistribute content without permission.</li>
            <li>Do not submit false, defamatory, or deceptive information.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            9. Privacy &amp; Data Protection (DPDP Act, 2023)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Save Medha Foundation processes personal data in accordance with
            the Digital Personal Data Protection Act, 2023 (India). By
            submitting your information, you provide explicit consent for its
            collection and processing for the purposes described in our Privacy
            Policy. You may withdraw consent as outlined in that policy. Please
            refer to the Privacy Policy for full details.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            10. Third-Party Links Disclaimer
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The website may include links to third-party websites for reference.
            Save Medha Foundation does not control or endorse third-party
            content and is not responsible for their practices or policies.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            11. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To the maximum extent permitted by law, Save Medha Foundation shall
            not be liable for any direct, indirect, incidental, consequential,
            or punitive damages arising from your use of the website or reliance
            on its content.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            12. Modification of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Save Medha Foundation may modify these Terms at any time. Updates
            will be posted on this page with a revised "Last Updated" date.
            Continued use after changes constitutes acceptance of the revised
            Terms.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            13. Governing Law &amp; Jurisdiction (West Bengal, India)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms are governed by the laws of India. Any disputes shall be
            subject to the exclusive jurisdiction of the competent courts in
            West Bengal, India.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">
            14. Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            For questions or concerns about these Terms, contact Save Medha
            Foundation at:
          </p>
          <ul className="list-disc pl-5 text-gray-700 leading-relaxed space-y-2">
            <li>Email: info@savemedha.com</li>
            <li>Phone: +91 9800808595</li>
          </ul>
        </section>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
