import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../../util/auth';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import SearchBar from '../../components/SearchBar';

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const searchBarStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 0 0 28px;
`;

const notFoundStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ece9e9;
  border-radius: 8px;
  width: 400px;
  margin-top: 40px;

  p {
    font-size: 40px;
  }
`;

export default function Profile(props) {
  const [userName, setUsername] = useState(props?.user?.username);

  return (
    <>
      <Layout loggedIn={props.loggedIn} username={userName}>
        <Head>
          <title>Profile</title>
        </Head>
        <div css={container}>
          <div css={searchBarStyles}>
            <SearchBar></SearchBar>
          </div>
          <div css={notFoundStyles}>
            <p>Term Not Found</p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  const key = process.env.customKey;
  const currentLanguage = nextCookies(context).language?.language;
  const { getUserBySessionToken } = await import('../../util/database');

  // const res = await fetch(
  //   `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${currentLanguage}&text=${searchTerm}`,
  // );
  // const data = await res.json();

  // if (!(await isSessionTokenValid(token))) {
  //   return {
  //     redirect: {
  //       destination: '/login?returnTo=/profile',
  //       permanent: false,
  //     },
  //   };
  // }

  const user = await getUserBySessionToken(token);

  if (user) {
    return { props: { user, loggedIn } };
  }
  return { props: { loggedIn } };
}
