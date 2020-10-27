import '../styles/globals.css';
import { CacheProvider } from '@emotion/core';
import { cache } from 'emotion';
import { globalStyles } from '../styles/style';

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      {globalStyles}
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
