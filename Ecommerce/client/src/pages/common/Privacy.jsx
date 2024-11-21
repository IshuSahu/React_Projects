import React from "react";

function Privacy() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. At ShopEase, we ensure that your
          personal information is protected.
        </p>
        <h2 className="text-xl font-bold mb-3">Information We Collect</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Personal details such as name, email, and address.</li>
          <li>Payment details for processing orders.</li>
          <li>Website usage data to enhance your shopping experience.</li>
        </ul>
        <h2 className="text-xl font-bold mb-3">How We Use Your Information</h2>
        <p>
          We use your information to process orders, provide customer support,
          and improve our services. For more details, contact us at{" "}
          <a
            href="mailto:privacy@shopease.com"
            className="text-blue-500 hover:underline"
          >
            privacy@shopease.com
          </a>.
        </p>
      </div>
    </div>
  );
}

export default Privacy;
