import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { SiAndroid, SiAppstore } from "react-icons/si";
import { BotMessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950/90 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col">
          {/* Logo and App Buttons */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-2">
              <BotMessageSquare className="h-9 w-9 text-purple-400" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-100 bg-clip-text text-transparent">
                PreHire
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Your AI-Powered Interview Buddy
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="flex-1 flex items-center justify-center bg-gray-300 px-4 py-3 rounded-xl hover:bg-gray-800 text-black hover:text-white"
              >
                <SiAppstore className="text-2xl mr-2" />
                <span>iOS</span>
              </a>
              <a
                href="#"
                className="flex-1 flex items-center justify-center bg-gray-800 px-4 py-3 rounded-xl hover:bg-gray-300 text-white hover:text-black"
              >
                <SiAndroid className="text-2xl mr-2" />
                <span>Android</span>
              </a>
            </div>
          </div>

          {/* About and Project Links side by side */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-300 mb-2">About</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li className="hover:text-gray-600"><a href="#">About Us</a></li>
                <li className="hover:text-gray-600"><a href="#">Contact Us</a></li>
                <li className="hover:text-gray-600"><a href="https://github.com/Kushagra395/PreHire_AI_Interviewer">Code</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-300 mb-2">Projects</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li className="hover:text-gray-600">
                  <a href="https://vibely-fymd.onrender.com/login">Vibely-Chatbot</a>
                </li>
                <li className="hover:text-gray-600">
                  <a href="#">B_A_B</a>
                </li>
                <li className="hover:text-gray-600">
                  <a href="#">Blogyy-App</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Made By - single line */}
          <div className="space-y-2 mb-8">
            <h3 className="font-semibold text-gray-300 mb-2">Made by</h3>
            <div className="text-sm text-gray-400">
              <span className="font-bold hover:text-gray-600"><a href="#">Kushagra Malviya</a></span>
              <span className="mx-2">|</span>
              <span className="hover:text-gray-600"><a href="#">IIIT Ranchi</a></span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BotMessageSquare className="h-9 w-9 text-purple-400" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-100 bg-clip-text text-transparent">
                PreHire
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Your AI-Powered Interview Buddy
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="flex items-center bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-800 text-black"
              >
                <SiAppstore className="hover:text-white text-2xl mr-2 text-black" />
                <span>iOS</span>
              </a>
              <a
                href="#"
                className="flex items-center bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300"
              >
                <SiAndroid className="hover:text-black text-2xl mr-2" />
                <span>Android</span>
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-300 mb-2">About</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li className="hover:text-gray-600"><a href="#">About Us</a></li>
              <li className="hover:text-gray-600"><a href="#">Contact Us</a></li>
              <li className="hover:text-gray-600"><a href="https://github.com/Kushagra395/PreHire_AI_Interviewer">Code</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-300 mb-2">Project Links</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li className="hover:text-gray-600">
                <a href="https://vibely-fymd.onrender.com/login">Vibely-Chatbot</a>
              </li>
              <li className="hover:text-gray-600">
                <a href="#">B_A_B</a>
              </li>
              <li className="hover:text-gray-600">
                <a href="#">Blogyy-App</a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-300 mb-2">Made by</h3>
            <div className="text-sm text-gray-400 leading-relaxed">
              <ul className="space-y-1 text-sm text-gray-400">
                <li className="font-bold hover:text-gray-600"><a href="#">Kushagra Malviya</a></li>
                <li className="hover:text-gray-600"><a href="#">IIIT Ranchi</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-800"></div>

        {/* Bottom Section (same for both) */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/Kushagra395"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaGithub />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} PreHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;