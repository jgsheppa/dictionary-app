import Head from 'next/head';
import React, { useState } from 'react';
import { css } from '@emotion/core';
import Layout from '../../components/Layout';
import ListOfVocabLists from '../../components/WordList';

export default function list(props) {
  const [wordList, setWordList] = useState(props.mapExampleList);
  console.log('list', wordList);
  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>Example {props.id}</div>
        <ListOfVocabLists wordList={wordList}></ListOfVocabLists>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const idContext = parseInt(context.query.listId);

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

  const mapExampleList = exampleList.lists.filter((list) => {
    if (list.id === idContext) {
      return list;
    }
  });

  return {
    props: { idContext, mapExampleList },
  };
}
