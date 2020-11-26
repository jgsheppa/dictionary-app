import React from 'react';
import Head from 'next/head';
import nextCookies from 'next-cookies';
import { css } from '@emotion/core';
import Layout from './../components/Layout.tsx';
import SearchBar from './../components/SearchBar.tsx';
import { isSessionTokenValid } from './../util/auth';
import { setLanguage } from './../util/cookie';

const pageContainer = css`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  margin: 50px 0 100px;
`;

const searchBarContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const introStyles = css`
  display: block;
  max-width: 420px;
  line-height: 1.6;
  background-color: #ece9e9;
  padding: 4px 40px;
  margin-top: 40px;

  p a {
    text-decoration: none;
    color: #4d13ad;
    transition: color;
  }

  p a:hover {
    color: #3475ef;
  }

  p a:focus {
    outline: none !important;
    border: solid 2px #e02e2e;
    border-radius: 4px;
  }
`;

export default function Home(props) {
  setLanguage('en-ru');
  return (
    <>
      <Head>
        <title>WordDivan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props?.user?.username} loggedIn={props.loggedIn}>
        <div css={pageContainer}>
          <div css={searchBarContainer}>
            <SearchBar></SearchBar>
          </div>
          <div css={introStyles}>
            <h4 style={{ color: '#4D13AD' }}>
              Store Your Words With WordDivan
            </h4>
            <p>
              If you have ever tried to learn a language, then you have probably
              spent time making lists of words. Perhaps you read a Russian poem,
              but you didn't know that{' '}
              <a
                tabIndex={8}
                onClick={() => setLanguage('ru-en')}
                href="/words/свобода"
              >
                свобода
              </a>{' '}
              means{' '}
              <a
                tabIndex={9}
                onClick={() => setLanguage('en-ru')}
                href="/words/freedom"
              >
                freedom
              </a>{' '}
              in English. At WordDiwan, we're all about scribbling words down,
              but we also offer a way to save your lists - just in case.{' '}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getUserBySessionToken } = await import('./../util/database');

  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const user = await getUserBySessionToken(token);

  if (typeof user === 'undefined') {
    return {
      props: {
        loggedIn,
      },
    };
  } else {
    return {
      props: {
        loggedIn,
        user,
      },
    };
  }
}
