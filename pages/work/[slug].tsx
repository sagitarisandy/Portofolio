import React from 'react'
import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Case from '../../components/Case'
import { cases, caseSlugs } from '../../constants/cases'

export default function CasePage({ data }: any) {
  return (
    <>
      <Head>
        <title>{`${data.name} — Work`}</title>
        <meta name="description" content={data.sheet.desc[0]} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Archivo:wdth,wght@62..125,600..800&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="antialiased">
        <Case data={data} />
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: caseSlugs.map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { data: (cases as any)[params?.slug as string] },
})
