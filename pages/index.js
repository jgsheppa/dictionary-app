import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import nextCookies from 'next-cookies';
import { useState } from 'react';
import { css } from '@emotion/core';
import Layout from './../components/Layout.tsx';
import { isSessionTokenValid } from './../util/auth';
import { setLanguage, getLanguageFromCookie } from './../util/cookie';

const searchStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  div input {
    padding: 10px 30px;
    border: solid 2px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  div input:focus {
    outline: none !important;
    border: solid 2px #1ac23f;
  }

  div .searchLink {
    color: #fff;
    padding: 4.5px 30px;
    text-decoration: none;
    text-align: center;
    background-color: #1ac23f;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border: none;
  }
`;

export default function Home(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const cookie = getLanguageFromCookie();

  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Head>
        <title>WordDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <div css={searchStyles}>
          <div>
            <input
              type="text"
              value={searchTerm}
              placeholder="Search for a term"
              onChange={handleTermChange}
            />
          </div>
          <div>
            {' '}
            <Link href={`/words/${searchTerm}`}>
              <a className="searchLink">Search</a>
            </Link>
          </div>
          <select onChange={(e) => setLanguage(e.target.value)}>
            <option value={cookie.language}>{cookie.language}</option>
            <option value="de-en">de-en</option>
            <option value="de-fr">de-fr</option>
            <option value="de-ru">de-ru</option>
            <option value="en-de">en-de</option>
            <option value="en-fr">en-fr</option>
            <option value="en-ru">en-ru</option>
            <option value="fr-en">fr-en</option>
            <option value="fr-de">fr-de</option>
            <option value="fr-ru">fr-ru</option>
            <option value="ru-en">ru-en</option>
            <option value="ru-de">ru-de</option>
            <option value="ru-ru">ru-ru</option>
          </select>
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
