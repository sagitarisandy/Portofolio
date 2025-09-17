import Head from 'next/head'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <div className="space-y-14 lg:space-y-24">
      <Head>
        <title>Arya Fadhil Sagitarisandy</title>
        <meta
          name="description"
          content="Proficient in React, React Native, Flutter, Next.js, and NestJS, with global team experience across 22+ countries delivering user-centered digital products from UI/UX to IoT and cloud."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"/>
      </Head>

      <main className="mx-auto mt-16 max-w-4xl antialiased">
        <Hero />
      </main>
    </div>
  )
}
