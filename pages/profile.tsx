import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { useState } from 'react';
import { getUserBySessionToken } from '../util/database';
import { User } from '../util/types';
import Layout from '../components/Layout';
import WordList from '../components/WordList';
import ListOfVocabLists from '../components/ListOfVocabLists';

type Props = {
  loggedIn: boolean;
  user: User;
  vocabLists;
};

const exampleList = {
  lists: [
    {
      id: 1,
      title: 'Poem',
      words: [
        { id: 1, en: 'house', ru: 'дом' },
        { id: 2, en: 'car', ru: 'машина' },
        { id: 3, en: 'dog', ru: 'собока' },
      ],
    },
    {
      id: 2,
      title: 'Novel',
      words: [
        { id: 1, en: 'work', ru: 'работа' },
        { id: 2, en: 'university', ru: 'университет' },
        { id: 3, en: 'water', ru: 'вода' },
      ],
    },
    {
      id: 3,
      title: 'Article',
      words: [
        { id: 1, en: 'meat', ru: 'мясо' },
        { id: 2, en: 'fish', ru: 'рыба' },
        { id: 3, en: 'toilet', ru: 'туалет' },
      ],
    },
  ],
};

export default function Profile(props: Props) {
  console.log(props);
  const [user, setUser] = useState(props.user);
  const [list, setList] = useState(exampleList);

  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Profile</title>
      </Head>

      <h1>Profile</h1>

      <h3>Name</h3>
      <p>
        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}{' '}
        {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
      </p>

      <h3>Username</h3>
      <p>{user.username}</p>

      <h3>Your Lists</h3>
      <ListOfVocabLists list={props.vocabLists}></ListOfVocabLists>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const { getUserBySessionToken, getVocabLists } = await import(
    './../util/database'
  );

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
  console.log('vocab list', vocabLists);

  return { props: { user, loggedIn, vocabLists } };
}
