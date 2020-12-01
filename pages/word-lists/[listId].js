import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../../util/auth';
import Layout from '../../components/Layout';
import ListOfVocabLists from '../../components/WordList';
import SearchBar from '../../components/SearchBar.tsx';
import WordList from '../../components/WordList';

const pageContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default function list(props) {
  const [wordList, setWordList] = useState(props.mapList);
  const [listWords, setListWords] = useState(props.words || []);

  function deleteWord(wordID, word) {
    const itemToDelete = word.filter((info) => info.id === wordID);
    const indexOfItemToDelete = word.indexOf(itemToDelete[0]);

    if (indexOfItemToDelete > -1) {
      word.splice(indexOfItemToDelete, 1);
    }

    setListWords(word);
  }

  return (
    <>
      <Head>
        <title>TransDivan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.user?.username} loggedIn={props.loggedIn}>
        <div css={pageContainer}>
          <div>
            <b>{wordList[0]?.listName}</b>
          </div>
          <WordList
            deleteWord={deleteWord}
            words={listWords}
            setListWords={setListWords}
          />
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const termFromContext = context.query.listId;
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

  if (words === 'undefined') {
    return { props: { user, loggedIn, vocabLists, mapList } };
  } else {
    return { props: { user, loggedIn, vocabLists, mapList, words } };
  }
}
