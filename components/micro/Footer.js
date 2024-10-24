import React from 'react'
import userData from '../../constants/data'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="lg:mt-52 mt-52 py-6  sm:py-12 sm:pb-36">
        <div className="mx-auto max-w-4xl px-4">
          {/* <div className="dark:border-white-300 mb-2 border-t-2 border-gray-300 pb-3"></div> */}
          <h1 className="text-[14px] font-regular text-gray-900 dark:text-white lg:text-[14px] text-center animate-fade-in">
          © Arya Sagitarisandy &copy; {currentYear}<br/>
          Designed with Figma and built on Next.js. 
          </h1>
          {/* <div className="text-center my-3 text-gray-800 dark:text-white">
                  <p className="mb-7">
                  With my network of millions in design, we've got you covered.<br/>
                  Contact me at sagitarisandybusiness@gmail.com
                  </p>
          </div> */}
          <div className='mt-8 flex justify-center'>
            <div className="flex flex-wrap space-x-4 pt-2 font-medium lg:pt-0">
              {userData.social.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className={'transition-colors hover:text-yellow-500 underline tooltip'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="dark:invert"
                    src={item.icon}
                    alt={item.name}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* <div className="flex flex-col items-center justify-between lg:flex-row">
            <p>Copyright &copy; {currentYear} Arya Fadhil Sagitarisandy</p>

            <div className="flex flex-wrap space-x-4 pt-2 font-medium lg:pt-0">
              {userData.social.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className={'transition-colors hover:text-yellow-500'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="dark:invert"
                    src={item.icon}
                    alt={item.name}
                  />
                </a>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
