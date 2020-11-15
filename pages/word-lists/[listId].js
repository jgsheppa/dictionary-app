import Head from 'next/head';
import React, { useState } from 'react';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../../util/auth';
import Layout from '../../components/Layout';
import ListOfVocabLists from '../../components/WordList';
import WordList from '../../components/WordList';

export default function list(props) {
  const [wordList, setWordList] = useState(props.mapList);

  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div> {wordList[0]?.listName}</div>
        <ListOfVocabLists></ListOfVocabLists>
        <WordList words={props.words}></WordList>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const {
    getUserBySessionToken,
    getVocabLists,
    getWordsFromVocabList,
  } = await import('../../util/database');
  const idContext = parseInt(context.query.listId);

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
  const words = await getWordsFromVocabList();

  console.log('words', words);

  const mapList = vocabLists.filter((list) => {
    if (list.id === idContext) {
      return list;
    }
  });

  return { props: { user, loggedIn, vocabLists, mapList, words } };
}
