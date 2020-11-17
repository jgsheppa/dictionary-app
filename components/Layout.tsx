import Head from 'next/head';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children;
  loggedIn: boolean;
  user: any;
  username: string;
};

export default function Layout(props: Props) {
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header username={props.username} loggedIn={props.loggedIn} />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
