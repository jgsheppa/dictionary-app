import Head from 'next/head';
import React from 'react';
import nextCookies from 'next-cookies';
import { useState } from 'react';
import { User } from '../util/types';
import { registerFormStyles } from '../styles/style';
import { css } from '@emotion/core';
import { isSessionTokenValid } from './../util/auth';
import Layout from './../components/Layout';

type Props = {
  token;
  loggedIn;
  user;
};

const url = 'word-divan.herokuapp.com';

export default function Register(props: Props) {
  return (
    <>
      <Head>
        <title>Impressum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        loggedIn={props.loggedIn}
        user={props.user}
        username={props.user?.username}
      >
        <h1>Impressum und Offenlegung </h1>
        <p>Offenlegung gem. Mediengesetz: WORD-DIVAN.HEROKUAPP.com</p>
        <div>
          <p>
            <b>Medieninhaber:</b>
          </p>
          <p>James Sheppard</p>
          <p>Liechtensteinstrasse 63/13</p>
          <p>A-1090 Wien</p>
          <p>Österreich</p>
        </div>
        <div>
          <p>E: jgsheppa@protonmail.com</p>
          <p>W: {url}</p>
        </div>
        <div>
          <p>
            <b>Unternehmensgegenstand:</b>
          </p>
          <p>Online-Wörterbuch</p>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getUserBySessionToken } = await import('./../util/database');
  // Import and instantiate a CSRF tokens helpe
  const { session: token } = nextCookies(context);
  const user = await getUserBySessionToken(token);
  // const { session: token } = nextCookies(context);

  // Create a CSRF token based on the secret
  const loggedIn = await isSessionTokenValid(token);

  if (typeof user === 'undefined') {
    return {
      props: { loggedIn },
    };
  }
  return { props: { user, loggedIn } };
}
