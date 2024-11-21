import ShoppingHeader from "@/components/shopping-view/ShoppingHeader";
import React from "react";

function Help() {
  return (
    <div>
      <ShoppingHeader />
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Help Center</h1>
        <p className="mb-4">
          Welcome to the ShopEase Help Center! We're here to assist you with
          any questions or concerns.
        </p>
        <h2 className="text-xl font-bold mb-3">Frequently Asked Questions</h2>
        <ul className="list-disc list-inside mb-6">
          <li>How do I track my order?</li>
          <li>What are the shipping options available?</li>
          <li>How can I contact customer support?</li>
        </ul>
        <h2 className="text-xl font-bold mb-3">Contact Us</h2>
        <p>
          If you need further assistance, please email us at{" "}
          <a
            href="mailto:support@shopease.com"
            className="text-blue-500 hover:underline"
          >
            support@shopease.com
          </a>{" "}
          or call us at <span className="font-bold">1-800-SHOPEASE</span>.
        </p>
      </div>
    </div>
    </div>
  );
}

export default Help;
