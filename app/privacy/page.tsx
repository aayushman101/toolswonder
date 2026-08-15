import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy – ToolsWonder",
  description: "Read our privacy policy to understand how ToolsWonder protects your data and respects your privacy.",
  alternates: { canonical: "https://toolswonder.com/privacy" },
};

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />

      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Privacy Policy</h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: August 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">1. Introduction</h2>
          <p className="text-gray-600 dark:text-gray-400">
            ToolsWonder ("we", "our", or "us") operates the https://toolswonder.com website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">2. Information Collection and Use</h2>
          <p className="text-gray-600 dark:text-gray-400">
            ToolsWonder collects minimal information from users:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-4">
            <li>• <strong>Usage Data:</strong> We collect information about how you use our website (IP address, browser type, pages visited) through Google Analytics</li>
            <li>• <strong>Calculator Data:</strong> All calculations are performed locally in your browser and are never stored on our servers</li>
            <li>• <strong>No Personal Data:</strong> We do not collect, store, or share any personal information unless you voluntarily contact us</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">3. Cookies</h2>
          <p className="text-gray-600 dark:text-gray-400">
            ToolsWonder uses cookies to enhance your browsing experience. Cookies may be used for:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-4">
            <li>• Remembering your theme preference (light/dark mode)</li>
            <li>• Google Analytics tracking</li>
            <li>• Google AdSense advertising</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            You can control cookie settings through your browser settings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">4. Third-Party Services</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We use the following third-party services:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-4">
            <li>• <strong>Google Analytics:</strong> For website usage analytics</li>
            <li>• <strong>Google AdSense:</strong> For displaying advertisements</li>
            <li>• <strong>Vercel:</strong> For website hosting</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">5. Data Security</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your data security is important to us. Since ToolsWonder does not collect or store personal data, there is minimal risk of data breach. All data transmission is encrypted using HTTPS.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">6. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400">
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:aayushman6139@gmail.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              aayushman6139@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
