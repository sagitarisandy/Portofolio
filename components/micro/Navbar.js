import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeSwitch from './ThemeSwitch';
import data from '../../constants/data';

export default function Navbar() {
  const navLinks = data.navLink;
  const router = useRouter();

  const [active, setActive] = useState(false);
  const [activeLinks, setActiveLinks] = useState(Array(navLinks.length).fill(false));

  const handleClick = () => {
    setActive(!active);
  };

  const linkClick = (index) => {
    const newActiveLinks = [...activeLinks];
    newActiveLinks[index] = !newActiveLinks[index];
    setActiveLinks(newActiveLinks);
    handleClick();
  };

  const renderNavLinks = () =>
    navLinks.slice(1).map((link, index) => (
      <Link href={link.href} key={index} legacyBehavior>
        <a
          onClick={() => linkClick(index)}
          className={`font-medium py-3 text-gray-800 dark:text-white ${
            router.pathname === link.href && activeLinks[index] ? 'underline' : ''
          }`}
        >
          {link.label}
        </a>
      </Link>
    ));

  return (
    <>
      <div className="sticky top-0 z-50 bg-white py-2 dark:bg-black md:mb-6 md:py-">
        <div className="container mx-auto flex items-center justify-between px-4 lg:max-w-4xl">
          <Link href="/" onClick={linkClick}legacyBehavior>
            <a className={`colors font-medium uppercase tracking-wider text-gray-900 hover:text-slate-800 dark:text-white`}>
              {navLinks[0].label}
            </a>
          </Link>

          <div className="hidden items-center lg:flex space-x-4">
            {renderNavLinks()}
          </div>

          <div className="flex items-center">
            <ThemeSwitch className="mx-2" />
            <button
              onClick={handleClick}
              className="ml-auto inline-flex justify-between rounded p-2 ml-5 text-gray-900 outline-none hover:bg-slate-800 hover:text-gray-200 dark:text-white lg:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`${active ? '' : 'hidden'} responsive-menu container mx-auto flex items-center justify-between px-4 lg:hidden lg:max-w-4xl`}>
          <div className="flex my-5 w-full flex-col items-start lg:space-x-4 lg:flex-row lg:items-center">
            {renderNavLinks()}
          </div>
        </div>
      </div>
    </>
  );
}
