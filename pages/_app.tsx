import '../styles/globals.css'
import Navbar from '../components/micro/Navbar'
import Footer from '../components/micro/Footer'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class" enableSystem={false}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default MyApp
