import React, { useState } from 'react';
export default function CardProject(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const truncatedDesc = props.project.desc.length > 150 ? props.project.desc.substring(0, 100) + '...' : props.project.desc;

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const openProject = () => {
    window.open(props.project.url, '_blank');
  }

  return (
    <>
      <a
        className="my-3 mx-3 block rounded-xl duration-500 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-xl dark:text-white dark:bg-slate-800"
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        onClick={toggleModal}
      >
        <img
          className="h-56 w-full rounded-xl object-cover shadow-xl"
          src={props.project.img}
          alt={props.project.name}
        />

        <div className="p-4 transition duration-300">
          {props.project.stack.split(',').map((item, index) => (
            <span
              key={index}
              className="my-3 mr-2 inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-bold leading-none text-gray-800 dark:text-white border border-gray-300"
            >
              {item}
            </span>
          ))}
          {props.project.country.split(',').map((item, index) => (
            <span
              key={index}
              className="my-3 mr-2 inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-bold leading-none text-gray-800 dark:text-white border border-gray-300"
            >
              {item}
            </span>
          ))}
          <h5 className="text-xl font-bold text-slate-900 dark:text-white">{props.project.nama}</h5>
          <div className="my-4"></div>
        </div>
      </a>

      {isModalVisible && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75 cursor-pointer overflow-hidden" onClick={toggleModal}></div>
            </div>
            <div className="relative bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
              <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-[600px]">
                <h3 className="pt-2 text-center text-2xl font-semibold text-gray-900">{props.project.nama}</h3>
                <div className="pb-2 text-center">
                  {props.project.stack.split(',').map((item, index) => (
                    <span
                      key={index}
                      className="my-3 mr-2 items-center justify-center rounded-md px-2 py-1 text-xs font-bold leading-none text-gray-800 dark:text-white border border-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                  {props.project.country.split(',').map((item, index) => (
                    <span
                      key={index}
                      className="my-3 mr-2 items-center justify-center rounded-md px-2 py-1 text-xs font-bold leading-none text-gray-800 dark:text-white border border-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <img
                  className="w-full rounded-xl object-cover shadow-xl"
                  src={props.project.img}
                  alt={props.project.name}
                />
                <p className="pt-12 pb-12 text-base leading-relaxed text-gray-500">
                  {props.project.desc}
                </p>
                <img
                  className="w-full rounded-xl object-cover shadow-xl"
                  src={props.project.img2}
                  alt={props.project.name}
                />
                <p className="pt-12 pb-12 text-base leading-relaxed text-gray-500">
                  {props.project.desc2}
                </p>
              </div>
              <div className="grid gap-2 flex flex-col p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button onClick={openProject} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">See live project</button>
                <button className="text-zinc-600 hover:text-white border border-zinc-300 hover:bg-zinc-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={toggleModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
