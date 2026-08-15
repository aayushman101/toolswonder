import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact Us – ToolsWonder",
  description: "Get in touch with ToolsWonder. Send us your feedback, questions, or suggestions.",
  alternates: { canonical: "https://toolswonder.com/contact" },
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Contact" }]} />

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            We'd love to hear from you. Have a question, feedback, or suggestion? Reach out!
          </p>
        </div>

        <section className="space-y-6 bg-blue-50 dark:bg-blue-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Whether you have a question about our calculators, want to suggest a new tool, or just want to say hello, feel free to reach out. We read and respond to all inquiries.
            </p>

            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Email:</strong>
              </p>
              <a
                href="mailto:aayushman6139@gmail.com"
                className="inline-block text-lg text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline"
              >
                aayushman6139@gmail.com
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How We Can Help</h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span><strong>Report a Bug:</strong> Found an error in one of our calculators? Let us know!</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span><strong>Suggest a Tool:</strong> Have an idea for a new calculator? We'd love to hear it.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span><strong>Share Feedback:</strong> Help us improve by sharing your experience.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span><strong>Partnership Inquiries:</strong> Interested in working together? Let's talk!</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span><strong>General Questions:</strong> Anything else on your mind? We're here to help.</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Response Time</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We aim to respond to all emails within 24-48 hours. Thank you for your patience!
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Follow Us</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Check out our sister projects:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              <a href="https://textwonder.com" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                TextWonder ↗
              </a>
              {" "}— Free text tools and utilities
            </li>
            <li>
              <a href="https://aaobanao.com" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                AaoBanao ↗
              </a>
              {" "}— Creative DIY projects and guides
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
