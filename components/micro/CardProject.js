import React, { useState } from 'react'

export default function CardProject(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const truncatedDesc = (props.project.desc.length > 150)
    ? props.project.desc.substring(0, 100) + '...'
    : props.project.desc;
  return (
    <>
      <a
        key={props.project.id}
        className="my-3 mx-3 block rounded-xl duration-500 ease-in-out hover:scale-105 hover:cursor-default hover:shadow-xl dark:text-white dark:bg-slate-800"
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        
        <img
          className="h-56 w-full rounded-xl object-cover shadow-xl "
          src={props.project.img}
          alt={props.project.name}
        />
        <div className="p-4 transition duration-300"
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
        >
          {/* <p className="text-uppercase text-xs text-slate-800 dark:text-white">
            {props.project.type}
          </p>
          {props.project.stack.split(',').map((item) => (
            <span className="my-3 mr-2 inline-flex items-center justify-center rounded-full bg-slate-700 px-2 py-1 text-xs font-bold leading-none text-white">
              {item}
            </span>
          ))} */}
          {props.project.country.split(',').map((item, index) => (
                    <span
                      key={index}
                      className="my-3 mr-2 inline-flex items-center justify-center rounded-full bg-slate-700 px-2 py-1 text-xs font-bold leading-none text-white"
                    >
                      {item}
                    </span>
                  ))}
          {/* <p className="text-slate-600 py-1 text-xs dark:text-white">
              Release date: July, 2020
          </p> */}
          <h5 className="text-xl font-bold text-slate-900 dark:text-white">
            {props.project.nama}
          </h5>
          <p
            className="mt-2 text-gray-500 dark:text-white overflow-hidden transition duration-300"
          >
            {isHovered ? props.project.desc : truncatedDesc}
          </p>
          <div className="my-4"></div>
          <a
            href={props.project.url}
            className="mt-4 h-4 rounded-md bg-slate-500 py-2 dark:bg-slate-600 px-3 font-semibold text-white hover:bg-slate-900 transition duration-300"
          >
            👉 See Live / Documentation
          </a>
        </div>
      </a>
    </>
  )
}