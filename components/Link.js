import React from 'react'
import userData from '../constants/data'

export default function Link() {
  return (
    <div className="items-center">
      <h1 className="mb-6 text-center text-4xl font-semibold">
        Anything about me
      </h1>
      {userData.link.map((item) => (
        <div className="mx-5">
          <a
            href={item.url}
            className="ease hover:scale-2 text-slate-80 mb-3 block w-full rounded border-2 border-slate-700 py-2 text-center uppercase leading-normal transition duration-300 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-0 dark:text-white"
          >
            {item.text}
          </a>
        </div>
      ))}
    </div>
  )
}
