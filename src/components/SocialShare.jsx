import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Twitter } from "lucide-react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"

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
        
        <FontAwesomeIcon icon={faWhatsapp} className="w-7 h-7"/>
      </a>
    </div>
  );
}
