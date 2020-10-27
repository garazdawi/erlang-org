import '../styles/bootstrap.css'
import '../styles/new-style.css'
import { AppProps } from 'next/app'

// This default export is required in a new `pages/_app.js` file.
export default function ErlangOrg({ Component, pageProps } : AppProps) {
    return <Component {...pageProps } />
}