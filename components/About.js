import React, { useState, useEffect } from 'react'
import userData from '../constants/data'
import Timeline from './micro/Timeline'
import Arya from '../public/arya.png'
import Image from 'next/image'

export default function About() {
  const [data, setData] = useState([])

  // Readmore desc
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxLength = 150;

  // fetch data from github api
  const urlGithub = `https://api.github.com/users/${userData.githubUsername}`
  const getUserGithub = async () => {
    const response = await fetch(urlGithub)
    const jsonData = await response.json()
    setData(jsonData)
  }
  useEffect(() => {
    getUserGithub()
  }, [])
  return (
    <>
      <div className="mt-4 p-4">
        <h1 className="mb-6 text-left text-3xl font-semibold">
          Glad to see, You can call me Arya
        </h1>
        <div className="">
          <div className="flex items-center justify-normal">
            <Image
              src={Arya}
              alt="Profile"
              priority={true}
              className="rounded-full"
              width={150}
              height={150}
              placeholder="blur"
            />
            <div>
              <span className="ml-5 mb-4 inline-block italic bg-gray-100 dark:bg-neutral-800 rounded-md p-2">{userData.country}</span>
              <div className="ml-5">
  <p>{showFullDescription ? userData.desc : userData.desc.slice(0, maxLength)}{userData.desc.length > maxLength && !showFullDescription && '...'}</p>
  {!showFullDescription && userData.desc.length > maxLength && (
    <button className="text-late-800 hover:underline font-bold" onClick={() => setShowFullDescription(true)}>Read More</button>
  )}
</div>
            </div>
          </div>
          <div className="my-5">
            <Timeline />
          </div>
        </div>

        {/* Stack section */}
        <h2 className="mt-9 mb-5 text-left text-3xl font-semibold">
        💪 Tools I frequently use
        </h2>
        <div className="xs:grid-cols-3 grid grid-cols-3 items-center justify-center gap-4 py-2 px-2 md:grid-cols-3 lg:grid-cols-2">
          {userData.techStack.map((item) => (
            <div className="justify-center overflow-hidden rounded-xl p-4 text-center shadow-md duration-500 ease-in-out hover:scale-105 hover:cursor-default hover:shadow-xl dark:bg-slate-800">
              <img
                src={item.icon}
                alt={item.name}
                className="mx-auto mb-3 h-10 w-10"
              />
              <div className="flex flex-col items-center justify-center">
                {item.name}
              </div>
              <div className="italic text-slate-600 dark:text-slate-300">
                {item.year} experience
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
