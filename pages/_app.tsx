import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BR Contrast</title>
        <meta name="description" content="Calculates WCAG contrast ratio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <Script 
          onLoad={() => {
            if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark')
            }
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
