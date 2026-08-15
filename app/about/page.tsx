import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { tools, categories } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "About ToolsWonder – Free Online Calculators",
  description: "Learn about ToolsWonder, your trusted platform for free online calculators and tools. We provide accurate, easy-to-use calculators for everyone.",
  alternates: { canonical: "https://toolswonder.com/about" },
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "About" }]} />

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">About ToolsWonder</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Making useful tools accessible to everyone, everywhere.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400">
            ToolsWonder is dedicated to providing free, accurate, and easy-to-use online calculators and tools for everyone. Whether you need to calculate your taxes, plan your finances, or figure out construction materials, we've got you covered.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            We believe that useful tools shouldn't require a subscription or cost money. That's why all our calculators are completely free to use.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Why Choose ToolsWonder?</h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Free to Use:</strong> All calculators are completely free, no hidden charges.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Accurate Calculations:</strong> Built with industry-standard formulas and best practices.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Mobile Friendly:</strong> Works perfectly on desktop, tablet, and mobile devices.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>No Signup Required:</strong> Use our tools without creating an account.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Privacy First:</strong> Your data is never stored or shared.</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Our Tools</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We offer {tools.length}+ calculators across {categories.length} categories including Finance, Agriculture, Construction, Automotive, Trade &amp; Import, and Health. Each tool is designed with precision and user experience in mind.
          </p>
        </section>

        <section className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have a question or feedback? We'd love to hear from you!
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Email:{" "}
            <a href="mailto:aayushman6139@gmail.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              aayushman6139@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
