import React from 'react'
import Head from 'next/head'
import Articles from '../components/Articles'

export default function articles() {
  return (
    <>
      <div className="space-y-14 lg:space-y-24">
        <Head>
          <title>Articles</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Some of the articles I write are based on things that are on my mind."
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
            rel="stylesheet"
          />
        </Head>

        <main className="mx-auto mt-16 max-w-4xl antialiased">
          <Articles />
        </main>
      </div>
    </>
  )
}
