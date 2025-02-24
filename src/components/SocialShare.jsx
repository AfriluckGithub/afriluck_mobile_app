import { Facebook, Twitter } from "lucide-react";

export default function SocialShare({ url }) {
  //const currentUrl = encodeURIComponent(window.location.href);
  const message = encodeURIComponent(
    "Afriluck 70 million jackpot. Just a step away from winning big. Play now and win big."
  );

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${message}`,
    whatsapp: `https://wa.me/?text=${message}%20${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${message}`,
  };

  return (
    <div className="flex space-x-6 justify-center items-center p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700">Share:</h3>

      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600"
      >
        <Twitter size={28} />
      </a>

      <a
        href={shareLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22 11 13 2 9l20-7z" />
        </svg>
      </a>

      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-700 hover:text-green-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.52 3.48A12 12 0 103 20.52L3 24l3.48-1.44A12 12 0 0024 12a12 12 0 00-3.48-8.52z" />
          <path d="M16.21 14.3a3.47 3.47 0 01-1.17-.27l-.83-.39a1.37 1.37 0 00-1.64.34l-.25.31a5.08 5.08 0 01-4.09-4.1l.3-.25a1.37 1.37 0 00.34-1.64l-.39-.83a3.46 3.46 0 01-.27-1.17 1.1 1.1 0 00-1.08-1.1H6.48a2.62 2.62 0 00-1.92.79A6.24 6.24 0 008.28 16a6.19 6.19 0 003.48 1.08 2.63 2.63 0 002.62-2.63V14.3z" />
        </svg>
      </a>
    </div>
  );
}
