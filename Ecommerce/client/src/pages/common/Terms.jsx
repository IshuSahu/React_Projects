import ShoppingHeader from "@/components/shopping-view/ShoppingHeader";
import React from "react";

function Terms() {
  return (
    <div> 
    <ShoppingHeader/>
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Terms & Conditions</h1>
        <p className="mb-4">
          Welcome to ShopEase! By using our website, you agree to the following
          terms and conditions.
        </p>
        <h2 className="text-xl font-bold mb-3">General Terms</h2>
        <ul className="list-disc list-inside mb-6">
          <li>All users must be 18 years or older.</li>
          <li>Products are for personal use only and not for resale.</li>
          <li>We reserve the right to update our terms at any time.</li>
        </ul>
        <h2 className="text-xl font-bold mb-3">Limitation of Liability</h2>
        <p>
          ShopEase is not liable for damages arising from the use of our
          website. For full details, contact us at{" "}
          <a
            href="mailto:terms@shopease.com"
            className="text-blue-500 hover:underline"
          >
            terms@shopease.com
          </a>.
        </p>
      </div>
    </div>
    </div>
  );
}

export default Terms;
