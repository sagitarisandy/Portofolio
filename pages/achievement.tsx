import React from 'react'
import Head from 'next/head'
import About from '../components/Certificate'
import Certificate from '../components/Certificate'
export default function achievement() {
  return (
    <>
      <div className="space-y-14 lg:space-y-24">
        <Head>
          <title>My Achievement</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="My little appreciation continues to make me advance in my career in the programming field."
          />
          <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"/>
        </Head>

        <main className="mx-auto mt-16 max-w-4xl antialiased">
          <Certificate />
        </main>
      </div>
    </>
  )
}
