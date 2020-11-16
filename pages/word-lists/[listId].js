import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../../util/auth';
import Layout from '../../components/Layout';
import ListOfVocabLists from '../../components/WordList';
import WordList from '../../components/WordList';

export default function list(props) {
  console.log(props.words);
  const [wordList, setWordList] = useState(props.mapList);
  const [listWords, setListWords] = useState(props.words || []);

  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <div>{wordList[0]?.listName}</div>
        <WordList words={listWords} setListWords={setListWords} />
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
  const wordsObject = await getWordsFromVocabList(idContext);

  console.log('words', wordsObject);

  const mapList = vocabLists.filter((list) => {
    if (list.wordlistsId === idContext) {
      return list;
    }
  });

  const words = wordsObject.map((list) => {
    if (list.listId === mapList[0].wordlistsId) {
      return list;
    }
    list;
  });

  console.log('words after map', typeof words);
  console.log('mapList', mapList);
  console.log('vocab list', vocabLists);

  if (words === 'undefined') {
    return { props: { user, loggedIn, vocabLists, mapList } };
  } else {
    return { props: { user, loggedIn, vocabLists, mapList, words } };
  }
}
