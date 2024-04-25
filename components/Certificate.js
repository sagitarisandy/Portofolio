import React, { useState } from 'react';
import userData from '../constants/data';
import Image from 'next/image';

export default function Certificate() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className="mt-4 p-4">
        <h1 className="mb-6 text-left text-3xl font-semibold">💬 Testimonials</h1>
        <div className="xs:grid-cols-1 grid grid-cols-1 items-left justify-left gap-4 py-2 px-2 md:grid-cols-3 lg:grid-cols-2">
          {userData.testimonials.map((item) => (
            <div
              key={item.id} // Assuming each testimonial has a unique id
              className="justify-left overflow-hidden rounded-xl p-4 text-left shadow-md duration-500 ease-in-out hover:scale-105 hover:cursor-default hover:shadow-xl dark:bg-slate-800"
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            >
              <div className="inline-flex justify-center">
                <img src={item.profile} alt={item.name} className="rounded-md mt-0.5 h-10 w-10" />
                <div className='pl-3'>
                  <div className="font-bold">{item.name}</div>
                  <div className="inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-bold leading-none text-gray-800 dark:text-white border border-gray-300">{item.country}</div>
                </div>
              </div>
              <p className="mt-2 text-gray-500 dark:text-white overflow-hidden transition duration-300">
                {isHovered ? item.desc : item.desc.length > 150 ? item.desc.substring(0, 100) + '...' : item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
