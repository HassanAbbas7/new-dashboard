// components/Header.jsx
"use client";

import { useState, useEffect } from "react";
import {
  HiOutlineChartBar,
  HiOutlineDocumentReport,
  HiOutlineUsers,
  HiOutlineAdjustments,
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
// import { FaRegChartLine } from "react-icons/fa";

const Header = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: HiOutlineChartBar },
    // { id: "reports", label: "Reports", icon: HiOutlineDocumentReport },
    // { id: "accounts", label: "Accounts", icon: HiOutlineUsers },
    // { id: "settings", label: "Settings", icon: HiOutlineAdjustments },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`
      sticky top-0 z-50 transition-all duration-300
      ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50"
          : "bg-white border-b border-slate-200"
      }
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section - Responsive */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-1.5 sm:p-2 rounded-lg shadow-md">
              <FaRegChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div> */}
            <div>
              <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r  text-indigo-700 bg-clip-text ">
                Major
              </span>
              <span className=" xs:inline text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Qadir
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium 
                    transition-all duration-200 whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? "bg-indigo-50 text-indigo-700 shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }
                  `}
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* Search Button - Hide on very small screens */}
            <button className="hidden sm:flex p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition">
              <HiOutlineSearch className="w-5 h-5" />
            </button>

            {/* Notifications with Badge */}
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition">
              <HiOutlineBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* User Avatar - Hide text on small screens */}
            <div className="flex items-center gap-2 ml-1 sm:ml-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs sm:text-sm font-medium shadow-md">
                AD
              </div>
              <span className="hidden sm:inline text-sm font-medium text-slate-700">
                Admin
              </span>
            </div>

            {/* Mobile Menu Button - Visible only on mobile/tablet */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition ml-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <HiOutlineX className="w-5 h-5" />
              ) : (
                <HiOutlineMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown - Responsive */}
        <div
          className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <div className="py-3 border-t border-slate-100 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                    ${
                      activeTab === tab.id
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-100"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                  )}
                </button>
              );
            })}

            {/* Mobile-only search option */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition sm:hidden">
              <HiOutlineSearch className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .md\\:hidden {
            display: flex;
          }
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
        }

        @media (max-width: 479px) {
          .xs\\:inline {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
