import React from "react";
import { FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
function Footer() {
  return (
    <div className="pt-12 pb-6  text-center text-xs bg-gradient-to-br from-slate-50 to-gray-100 text-slate-400 border-t border-slate-200  flex flex-wrap justify-center gap-4">
      <span className="flex items-center gap-1">
        <FaTwitter className="text-sm text-[#1DA1F2]" /> Twitter analytics
      </span>
      <span className="flex items-center gap-1">
        <FaFacebook className="text-sm text-[#1877F2]" /> Facebook insights
      </span>
      <span className="flex items-center gap-1">
        <FaYoutube className="text-sm text-red-600" /> YouTube studio
      </span>
      <span>Updated in realtime • smart card loop</span>
    </div>
  );
}

export default Footer;
