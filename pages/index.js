import React from 'react';
import Head from 'next/head';
import nextCookies from 'next-cookies';
import { css } from '@emotion/core';
import Layout from './../components/Layout.tsx';
import SearchBar from './../components/SearchBar.tsx';
import { isSessionTokenValid } from './../util/auth';

const searchBarContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home(props) {
  return (
    <>
      <Head>
        <title>WordDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <div css={searchBarContainer}>
          <SearchBar></SearchBar>
        </div>
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
