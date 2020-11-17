import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ListOfVocabLists from '../components/ListOfVocabLists';
import SearchBar from '../components/SearchBar';

// type Props = {
//   loggedIn;
//   user: User;
//   vocabLists;
//   data;
// };

export default function Profile(props) {
  const [user, setUser] = useState(props.user);
  const [data, setData] = useState(props.data);
  const [list, setList] = useState(props.vocabLists);

  function deleteList(listID, listfunction) {
    const itemToDelete = listfunction.filter(
      (info) => info.wordlistsId === listID,
    );
    const indexOfItemToDelete = listfunction.indexOf(itemToDelete[0]);

    if (indexOfItemToDelete > -1) {
      listfunction.splice(indexOfItemToDelete, 1);
    }

    setList(listfunction);
  }

  return (
    <Layout loggedIn={props.loggedIn} username={user.username}>
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
        <ListOfVocabLists
          deleteList={deleteList}
          list={list}
          setList={setList}
        ></ListOfVocabLists>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const searchTerm = encodeURIComponent(context.query.id);
  const key = process.env.customKey;
  const currentLanguage = nextCookies(context).language?.language;
  console.log('language', nextCookies(context).language);
  const { getVocabLists, getUserBySessionToken } = await import(
    '../util/database'
  );

  const res = await fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${currentLanguage}&text=${searchTerm}`,
  );
  const data = await res.json();
  console.log(data);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  const user = await getUserBySessionToken(token);
  const vocabLists = await getVocabLists(user?.id);
  console.log('server list', vocabLists);

  return { props: { user, loggedIn, vocabLists, searchTerm, data } };
}
