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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0 100px;
`;

const searchBarContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const introStyles = css`
  display: block;
  max-width: 500px;
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
  return (
    <>
      <Head>
        <title>WordDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <div css={pageContainer}>
          <div css={searchBarContainer}>
            <SearchBar></SearchBar>
          </div>
          <div css={introStyles}>
            <h4 style={{ color: '#4D13AD' }}>
              Store Your Words With WordDiwan
            </h4>
            <p>
              If you have ever tried to learn a language, then you have probably
              spent time making lists of words. Perhaps you read a Russian poem,
              but you didn't know that{' '}
              <a
                tabIndex={7}
                onClick={() => setLanguage('ru-en')}
                href="/words/свобода"
              >
                свобода
              </a>{' '}
              means{' '}
              <a
                tabIndex={8}
                onClick={() => setLanguage('en-ru')}
                href="/words/freedom"
              >
                freedom
              </a>{' '}
              in English. You write your translation down on scrap paper, but
              when you look for your translation a few days later, it has
              disappeared. At WordDiwan, we're all about scribbling words down,
              but we offer a way to save your lists.{' '}
            </p>
          </div>
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
