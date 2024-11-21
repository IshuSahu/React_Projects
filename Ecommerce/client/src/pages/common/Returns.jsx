import ShoppingHeader from "@/components/shopping-view/ShoppingHeader";
import React from "react";

function Returns() {
  return (
    <div>
      <ShoppingHeader />
      <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">
            Returns & Refund Policy
          </h1>
          <p className="mb-4">
            At ShopEase, we strive for your satisfaction. If you're not happy
            with your purchase, we're here to help.
          </p>
          <h2 className="text-xl font-bold mb-3">Return Conditions</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Items must be returned within 30 days of purchase.</li>
            <li>Products should be in their original packaging and unused.</li>
            <li>Proof of purchase is required for all returns.</li>
          </ul>
          <h2 className="text-xl font-bold mb-3">How to Initiate a Return</h2>
          <p className="mb-4">
            To start a return, please contact us at{" "}
            <a
              href="mailto:returns@shopease.com"
              className="text-blue-500 hover:underline"
            >
              returns@shopease.com
            </a>{" "}
            or call our returns department at{" "}
            <span className="font-bold">1-800-RETURN</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Returns;
