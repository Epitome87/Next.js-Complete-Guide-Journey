import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next.js Events</title>
        <meta name='description' content='Explore Events' />
        <meta name='viewport' content='initial-scale=1.0 width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
