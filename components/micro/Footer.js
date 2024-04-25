import React from 'react'
import userData from '../../constants/data'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="lg:mt-18 mt-12 py-6  sm:py-12 sm:pb-36">
        <div className="mx-auto max-w-4xl px-4">
          <div className="dark:border-white-300 mb-2 border-t-2 border-gray-300 pb-3"></div>
          <div className="flex flex-col items-center justify-between lg:flex-row">
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
          </div>
        </div>
      </div>
    </>
  )
}
