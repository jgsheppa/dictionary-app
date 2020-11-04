import React from 'react';
import Head from 'next/head';
import nextCookies from 'next-cookies';
import Layout from './../components/Layout.tsx';
import SearchBar from './../components/SearchBar.tsx';
import { isSessionTokenValid } from './../util/auth';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>WordDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <SearchBar></SearchBar>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  return {
    props: {
      loggedIn,
    },
  };
}
