import React from 'react'
import Head from 'next/head'
import Files from '../components/Files'

export default function work() {
  return (
    <>
      <Head>
        <title>Work — Selected Files</title>
        <meta
          name="description"
          content="Fifteen digital products shipped with teams across eight countries — academic systems, solar fleets, rare-disease platforms and the brands wrapped around them."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Archivo:wdth,wght@62..125,600..800&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="antialiased">
        <Files />
      </main>
    </>
  )
}
