import { HousePlug } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <HousePlug className="h-5 w-5 md:h-10 md:w-10" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                ShopEase
              </span>
            </a>
          </div>
          <div className="flex md:grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-3 md:mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">
                Shop
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2 md:mb-4">
                  <a href="/user/listing" className="hover:underline">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="/user/home" className="hover:underline">
                    Deals
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-3 md:mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">
                Support
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-1 md:mb-4">
                  <a href="/common/help" className="hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/common/returns" className="hover:underline">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-3 md:mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-1 md:mb-4">
                  <a href="/common/privacy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/common/terms" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-col md:flex-row items-center justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="/" className="hover:underline">
              ShopEase
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex space-x-5">
            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 20"
              >
                <path d="M13.125 0H7.875C3.53 0 0 3.53 0 7.875v5.25C0 16.47 3.53 20 7.875 20h5.25C16.47 20 20 16.47 20 13.125v-5.25C20 3.53 16.47 0 13.125 0Zm6.25 13.125a6.259 6.259 0 0 1-6.25 6.25H7.875a6.259 6.259 0 0 1-6.25-6.25v-5.25a6.259 6.259 0 0 1 6.25-6.25h5.25a6.259 6.259 0 0 1 6.25 6.25v5.25Zm-7.5-3.75A3.75 3.75 0 1 0 15.625 13.125 3.753 3.753 0 0 0 11.875 9.375Zm0 6.25a2.5 2.5 0 1 1 2.5-2.5 2.503 2.503 0 0 1-2.5 2.5Zm4.375-7.5a.938.938 0 1 0-.938-.938.94.94 0 0 0 .938.938Z" />
              </svg>
              <span className="sr-only">Instagram</span>
            </a>

            {/* Twitter */}
            <a
              href="https://www.twitter.com"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path d="M6.29 16.845c7.548 0 11.675-6.251 11.675-11.675 0-.178 0-.355-.012-.532A8.352 8.352 0 0 0 20 2.92a8.19 8.19 0 0 1-2.357.646 4.108 4.108 0 0 0 1.804-2.265 8.211 8.211 0 0 1-2.605.996A4.1 4.1 0 0 0 9.83 6.344a11.635 11.635 0 0 1-8.449-4.281 4.1 4.1 0 0 0 1.27 5.477A4.072 4.072 0 0 1 .8 6.578v.052a4.1 4.1 0 0 0 3.292 4.014 4.095 4.095 0 0 1-1.084.144 4.12 4.12 0 0 1-.772-.074 4.1 4.1 0 0 0 3.833 2.85A8.227 8.227 0 0 1 .975 15.6a8.32 8.32 0 0 1-.975-.056 11.615 11.615 0 0 0 6.29 1.845" />
              </svg>
              <span className="sr-only">Twitter</span>
            </a>

            {/* Email */}
            <a
              href="mailto:support@shopease.com"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2ZM2 2h16l-8 5L2 2Zm16 12H2V4l8 5 8-5v10Z" />
              </svg>
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
