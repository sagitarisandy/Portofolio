import Head from 'next/head'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <div className="space-y-14 lg:space-y-24">
      <Head>
        <title>Arya Fadhil Sagitarisandy</title>
        <meta
          name="description"
          content="I am currently a Backend Developer! I enjoy learning about technology and business. One day, I want to have my own team and contribute to Digitalization in Indonesia and beyond."
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
        <Hero />
      </main>
    </div>
  )
}
