import Head from 'next/head';
import React from 'react';
import Layout from './../components/Layout';
import { useState } from 'react';
import { User } from '../util/types';
import { registerFormStyles } from '../styles/style';
import { css } from '@emotion/core';
import { isSessionTokenValid } from './../util/auth';

type Props = {
  token;
  loggedIn;
};

const url = 'word-divan.herokuapp.com';

export default function Register(props: Props) {
  return (
    <>
      <Head>
        <title>Impressum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout loggedIn={props.loggedIn} user={null} username={null}>
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
  // Import and instantiate a CSRF tokens helper
  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;
  // const { session: token } = nextCookies(context);

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  // Create a CSRF token based on the secret
  const token = tokens.create(secret);
  const loggedIn = await isSessionTokenValid(token);
  return { props: { token, loggedIn } };
}
