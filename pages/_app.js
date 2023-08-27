import Layout from '../components/layout/Layout';
import MainNavigation from '@/components/layout/MainNavigation';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
