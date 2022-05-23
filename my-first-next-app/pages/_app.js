import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import '../styles/globals.css';
import { NotificationContextProvider } from '../store/notificationContext';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next.js Events</title>
          <meta name='description' content='Explore Events' />
          <meta name='viewport' content='initial-scale=1.0 width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
