import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { useState, useEffect } from 'react';
import { getUserBySessionToken } from '../util/database';
import { User } from '../util/types';
import Layout from '../components/Layout';
import WordList from '../components/WordList';
import ListOfVocabLists from '../components/ListOfVocabLists';
import SearchBar from '../components/SearchBar';

type Props = {
  loggedIn: boolean;
  user: User;
  vocabLists;
  data;
};

export default function Profile(props: Props) {
  console.log(props);
  const [user, setUser] = useState(props.user);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  });
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Profile</title>
      </Head>
      <SearchBar></SearchBar>
      <h1>Profile</h1>

      <h3>Name</h3>
      <p>
        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}{' '}
        {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
      </p>

      <h3>Username</h3>
      <p>{user.username}</p>
      <div style={{ marginBottom: '100px' }}>
        {' '}
        <h3>Your Lists</h3>
        <ListOfVocabLists list={props.vocabLists}></ListOfVocabLists>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const searchTerm = encodeURIComponent(context.query.id);
  const key = process.env.customKey;
  const currentLanguage = nextCookies(context).language?.language;
  const { getVocabLists, getUserBySessionToken } = await import(
    './../util/database'
  );

  const res = await fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${currentLanguage}&text=${searchTerm}`,
  );
  const data = await res.json();

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  // TODO: Actually, you could do this with one query
  // instead of two like done here
  const user = await getUserBySessionToken(token);
  const vocabLists = await getVocabLists(user?.id);

  return { props: { user, loggedIn, vocabLists, searchTerm, data } };
}

// export async function getServerSideProps(context) {

//   if (!user) {
//     return {
//       props: {
//         searchTerm,
//         data,
//         loggedIn,
//       },
//     };
//   } else {
//     return {
//       props: {},
//     };
//   }
// }
