import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import {Toaster} from 'react-hot-toast';
import "./app.css"

function MyApp({Component, pageProps}) {
  return (
      <>
        <Head>
          <title>
            ZaloPay Dynamic QR payment integration demo
          </title>
          <meta
              name="description"
              content="ZaloPay Dynamic QR payment integration demo"
          />
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div className="min-h-screen flex flex-col">
          {/*<Header />*/}
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          {/*<Footer />*/}
        </div>
        <Toaster/>
      </>
  );
}

export default MyApp;
