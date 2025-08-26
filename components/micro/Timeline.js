import React from 'react'
import userData from '../../constants/data'

export default function Timeline() {
  return (
    <>
      <div className="mt-12 p-4">
        <h1 className="mb-6 text-left text-3xl font-semibold">💼 My Work Experiences</h1>
        <div className="container">
          <div className="flex grid-cols-100 flex-col text-gray-50 md:grid ">
            {userData.timeline.map((item) => (
              <div key={item.id} className="flex md:contents">
                <div className="relative col-start-2 col-end-4 mr-10 md:mx-auto">
                  <div className="flex h-full w-6 items-center justify-center">
                    <div className="pointer-events-none h-full w-0.5 bg-slate-300"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-slate-800 text-center shadow duration-500 ease-in-out hover:scale-105">
                    
                  </div>
                </div>
                <div className="col-start-4 col-end-12 my-4 mr-auto w-full rounded-md bg-slate-800 p-4 shadow-md duration-500 ease-in-out hover:scale-105 hover:cursor-default hover:shadow-xl">
                  <h3 className="mb-1 text-lg font-semibold">
                    {item.title}
                    <span className="ml-2 inline-flex items-center justify-center rounded bg-yellow-700 px-2 py-1 text-xs font-bold leading-none text-indigo-100">
                      {item.year}
                    </span>
                  </h3>
                  <p className="w-full leading-tight" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
