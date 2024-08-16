import React, { useState } from 'react';
import Link from 'next/link';
import arya from '../public/arya2.png'
import Image from 'next/image'
import userData from '../constants/data'
import logo1 from '../public/Logo/logo 1.png'
import logo2 from '../public/Logo/logo 2.png'
import logo3 from '../public/Logo/logo 3.png'
import logo4 from '../public/Logo/logo 4.png'
import logo5 from '../public/Logo/logo 5.png'
import logo6 from '../public/Logo/logo 6.png'
import logo7 from '../public/Logo/logo 7.png'
import logo8 from '../public/Logo/logo 8.png'
import logo9 from '../public/Logo/logo 9.png'

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
          <div>
            <div className="flex flex-col-reverse md:flex-row items-start md:items-center">
              <Image
                src={arya}
                alt="Profile"
                priority={true}
                className="rounded-2xl animate-fade-in"
                width={450}
                height={450}
                placeholder="blur"
              />
              <div className="p-8">
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 animate-fade-in">
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white lg:text-3xl">
                  Design for Digital Products in tech
                </h1>
                <div className="my-3 text-gray-800 dark:text-white">
                  <p className="mb-7">
                    <span className='mr-1'>With</span>
                    <span className='underline tooltip'>
                      🔨 engineering
                      <span className='tooltiptext'>With a bachelor's degree in computer engineering, familiar with components in react, react native, and widgets in flutter</span>
                    </span>
                    <span className='ml-1 mr-1'>&</span>
                    <span className='underline tooltip'>
                      💼 business
                      <span className='tooltiptext'>Thanks to my family's background in printing and design. Growing up, I was always surrounded by creativity, and I started using tools like Photoshop and CorelDraw at a young age.</span>
                    </span>
                    background
                    </p>
                </div>
                <div className='my-8'>
                  <Link href="https://drive.google.com/file/d/1_6LoLRxurPZxoqK9fQKOgVeKbAaULUAK/view?usp=drive_link" onClick={linkClick} legacyBehavior>
                    <a
                      className="h-10 rounded-md bg-gray-800 py-3 px-6 font-semibold text-white hover:bg-black transition duration-300 animate-fade-in"
                    >
                      📃 View My Resume
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-52 container mx-auto px-4">
            <h1 className="text-[24px] font-bold text-gray-900 dark:text-white lg:text-[24px] text-left md:text-center animate-fade-in">
              I've worked with several startups across a wide range of industries in a total of 22+ countries.
            </h1>
            <div className="flex flex-wrap justify-center items-center mt-8 gap-12 animate-fade-in">
              <Image src={logo8} className="dark:mt-6 dark:bg-[#1e293b] dark:rounded-lg h-12 md:h-16 lg:h-20 object-contain" />
              <Image src={logo9} className="dark:mt-6 dark:bg-[#1e293b] dark:rounded-lg h-12 md:h-16 lg:h-20 object-contain" />
              <Image src={logo1} className="dark:mt-6 dark:bg-[#1e293b] dark:rounded-lg h-12 md:h-16 lg:h-20 object-contain" />
              <Image src={logo5} className="dark:mt-6 dark:bg-[#1e293b] dark:rounded-lg h-12 md:h-16 lg:h-20 object-contain" />
              <Image src={logo6} className="dark:mt-6 dark:bg-[#1e293b] dark:rounded-lg h-12 md:h-16 lg:h-20 object-contain" />
              <Image src={logo2} className="dark:mt-6 dark:bg-[#1e293b] dark:rounded-lg h-12 md:h-16 lg:h-20 object-contain" />
              <Image src={logo3} className="dark:mt-6 dark:bg-[#1e293b] dark:rounded-lg h-12 md:h-16 lg:h-20 object-contain" />
              <Image src={logo4} className="dark:mt-6 dark:bg-[#1e293b] dark:rounded-lg h-12 md:h-16 lg:h-20 object-contain" />
              <Image src={logo7} className="dark:mt-6 dark:bg-[#1e293b] dark:rounded-lg h-12 md:h-16 lg:h-20 object-contain" />
            </div>
          </div>



           {/* <div className="text-left my-24 rounded-md bg-gray-100 dark:bg-gray-800 p-6">
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
           </div> */}
      </div>
    </>
  )
}
