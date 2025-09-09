'use client';

import Toggle from './Toggle';
import SearchBar from './SearchBar';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setChat } from '../redux/slicer/CheckChat';
import Link from 'next/link';
import { Unlock, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';

interface NavigateProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navigate({ darkMode, setDarkMode }: NavigateProps) {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chatCheck.value);

  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => {
    if (searchOpen) setSearchOpen(false); // close search when menu opens
    dispatch(setChat(!chat));
  };

  const toggleSearch = () => {
    if (chat) dispatch(setChat(false)); // close menu when search opens
    setSearchOpen(!searchOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 shadow-md backdrop-blur-md ${
        darkMode ? 'bg-[#76767625] text-white' : 'bg-white/80 text-gray-800'
      }`}
    >
      <div className="flex justify-center flex-col items-center mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex container justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Unlock className="text-blue-600 w-6 h-6" />
            <span className="font-bold text-xl">KALIFA OS</span>
          </Link>

          <div className="flex flex-row h-full items-center justify-center space-x-4">
            {/* Search Button */}
            <button onClick={toggleSearch}>
              {searchOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
            </button>

            {/* Toggle Dark Mode */}
            <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6">
              <Link
                href="/"
                className={`font-semibold hover:text-blue-500 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                href="/frp-tools-apk-download"
                className={`font-semibold hover:text-blue-500 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                FRP tools apk
              </Link>
              <Link
                href="/system-apps"
                className={`font-semibold hover:text-blue-500 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                System apps
              </Link>
              <Link
                href="/windows-tools?list_page=1"
                className={`font-semibold hover:text-blue-500 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Windows tools
              </Link>
              <Link
                href="/about"
                className={`font-semibold hover:text-blue-500 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                About
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden h-full flex justify-center items-center">
              <button onClick={toggleMenu}>
                {chat ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Slide-down Search */}
        <SearchBar darkMode={darkMode} open={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Mobile Menu */}
        {chat && (
          <div
            className={`md:hidden w-full${
              darkMode ? ' text-gray-200' : ' text-gray-700'
            }`}
          >
            <div className="container mx-auto px-2 sm:px-6 lg:px-8 max-w-7xl py-2 space-y-2">
              <Link
                href="/"
                className="block font-semibold hover:text-blue-500"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/frp-tools-apk-download"
                className="block font-semibold hover:text-blue-500"
                onClick={toggleMenu}
              >
                FRP Tools apk
              </Link>
              <Link
                href="/system-apps"
                className="block font-semibold hover:text-blue-500"
                onClick={toggleMenu}
              >
                System Apps
              </Link>
              <Link
                href="/setting-and-lock-screen"
                className="block font-semibold hover:text-blue-500"
                onClick={toggleMenu}
              >
                Setting and lock screen
              </Link>
              <Link
                href="/windows-tools?list_page=1"
                className="block font-semibold hover:text-blue-500"
                onClick={toggleMenu}
              >
                Windows tools
              </Link>
              <Link
                href="/about"
                className="block font-semibold hover:text-blue-500"
                onClick={toggleMenu}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}