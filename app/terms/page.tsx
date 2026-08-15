import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service – ToolsWonder",
  description: "Read the terms of service for ToolsWonder. Learn about usage rights and responsibilities.",
  alternates: { canonical: "https://toolswonder.com/terms" },
};

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Terms of Service" }]} />

      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Terms of Service</h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: August 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h2>
          <p className="text-gray-600 dark:text-gray-400">
            By accessing and using ToolsWonder (https://toolswonder.com), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">2. Use License</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Permission is granted to temporarily download one copy of the materials (information or software) on ToolsWonder for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-4">
            <li>• Modifying or copying the materials</li>
            <li>• Using the materials for any commercial purpose or for any public display</li>
            <li>• Attempting to decompile or reverse engineer any software contained on ToolsWonder</li>
            <li>• Removing any copyright or other proprietary notations from the materials</li>
            <li>• Transferring the materials to another person or "mirroring" the materials on any other server</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">3. Disclaimer</h2>
          <p className="text-gray-600 dark:text-gray-400">
            The materials on ToolsWonder are provided on an 'as is' basis. ToolsWonder makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">4. Limitations</h2>
          <p className="text-gray-600 dark:text-gray-400">
            In no event shall ToolsWonder or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ToolsWonder, even if ToolsWonder or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">5. Accuracy of Materials</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We strive to provide accurate calculations and information on ToolsWonder. However, ToolsWonder does not warrant the accuracy, completeness, or usefulness of the information. Your use of such information is entirely at your own risk, for which ToolsWonder shall not be liable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">6. Links</h2>
          <p className="text-gray-600 dark:text-gray-400">
            ToolsWonder has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ToolsWonder of the site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">7. Modifications</h2>
          <p className="text-gray-600 dark:text-gray-400">
            ToolsWonder may revise these Terms of Service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">8. Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-400">
            These conditions and terms are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">9. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400">
            If you have any questions about these Terms of Service, please contact us at:{" "}
            <a href="mailto:aayushman6139@gmail.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              aayushman6139@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
