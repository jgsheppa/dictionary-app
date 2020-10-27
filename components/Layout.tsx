import Head from 'next/head';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
