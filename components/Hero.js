import React, { useState } from 'react';
import Link from 'next/link';
import arya from '../public/arya2.png'
import Image from 'next/image'
import userData from '../constants/data'

export default function Hero() {
  const navLinks = userData.navLink;
  const [activeLinks, setActiveLinks] = useState(Array(navLinks.length).fill(false));

  const linkClick = (index) => {
    const newActiveLinks = [...activeLinks];
    newActiveLinks[index] = !newActiveLinks[index];
    setActiveLinks(newActiveLinks);
    handleClick();
  };
  return (
    <>
      <div className="container mx-auto px-4">
          <div className="text-left">
              <Image
                src={arya}
                alt="Profile"
                priority={true}
                className="rounded"
                width={250}
                height={250}
                placeholder="blur"
                
              />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white lg:text-3xl mt-4">
                👋 Hi, I'm {userData.fullname}
              </h1>
              <div className="my-3 text-gray-800 dark:text-white">
                <p className="mb-7">{userData.title}</p>
              </div>
              {/* <Link href="/about" onClick={linkClick} legacyBehavior>
                <a
                  className="h-10 rounded-md bg-gray-800 py-2 px-6 font-semibold text-white hover:bg-black transition duration-300"
                >
                  Get more about me
                </a>
              </Link> */}

              <Link href="https://drive.google.com/file/d/1_6LoLRxurPZxoqK9fQKOgVeKbAaULUAK/view?usp=drive_link" onClick={linkClick} legacyBehavior>
                <a
                  className="h-10 rounded-md bg-gray-800 py-2 px-6 font-semibold text-white hover:bg-black transition duration-300"
                >
                  📃 View My Resume
                </a>
              </Link>
           </div>

           <div className="text-left my-24 rounded-md bg-gray-100 dark:bg-gray-800 p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                📬 Feel free to ask me anything!
              </h3>
              <div className="my-3 text-gray-800 dark:text-white">
                <p className="mb-7">I'm willing to hear about new opportunities from you, don't hesitate to send me a message</p>
              </div>
              <Link href="/link" onClick={linkClick} legacyBehavior>
                <a
                  className="h-10 rounded-md border border-gray-800 bg-white py-2 px-6 font-semibold text-gray-800 hover:bg-gray-800 hover:text-white transition duration-300"
                >
                  Get in Touch
                </a>
              </Link>
           </div>
      </div>
    </>
  )
}
