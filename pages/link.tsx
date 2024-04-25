import React from 'react'
import Head from 'next/head'
import LinkContact from '../components/Link'

export default function link() {
  return (
    <div className="space-y-14 lg:space-y-24">
      <Head>
        <title>Ryan Dinul Fatah</title>
        <meta
            name="description"
            content="Hi, I'm Ryan, nice to meet you. I am someone who likes learning and working in the IT field."
          />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="mx-auto mt-16 max-w-4xl antialiased">
        <LinkContact />
      </main>
    </div>
  )
}
