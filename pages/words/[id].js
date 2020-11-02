import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import useSWR from 'swr';
import Link from 'next/link';
import { isSessionTokenValid } from '../../util/auth';

import Popup from '../../components/Popup.tsx';
import Layout from '../../components/Layout.tsx';

const id = ['1', '2', '3', '4', '5'];

const style = css`
  margin-bottom: 100px;
`;

const partOfSpeechContainer = css`
  margin-bottom: 40px;
`;
const nounStyles = css`
  display: flex;
  flex-direction: row;

  div {
    margin: 10px;
    text-align: left;
  }
`;

const verbStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  width: 800px;
`;
const russianVerbImperfective = css`
  background-color: #ffe216;
  border-radius: 8px;
  padding: 0.3rem 1rem 0.3rem 0.25rem;
  width: 8rem;
`;

const russianVerbPerfective = css`
  background-color: #34a1ff;
  border-radius: 8px;
  padding: 0.3rem 1rem 0.3rem 0.25rem;
  width: 8rem;
`;

const verbStylesContainer = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border: solid;
  border-color: #5054f5;
  padding: 10px 30px;
`;

export default function Id(props) {
  const wordListNames = ['Poem', 'Novel', 'Article'];

  const [word, setWord] = useState(props.data.def);
  const [toggle, setToggle] = useState(false);
  const [wordList, setWordList] = useState(wordListNames);

  console.log(wordList);

  const newWordList = [...wordList];

  function togglePop() {
    setToggle(!toggle);
  }

  if (!word) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <div css={style}>
          <div>
            <button onClick={togglePop}>Add To List</button>
            {toggle ? (
              <Popup
                vocabLists={props.vocabLists}
                searchTerm={props.searchTerm}
                wordList={wordList}
                toggle={togglePop}
              />
            ) : null}
          </div>
          {word.map((entry) => {
            return (
              <div css={partOfSpeechContainer}>
                <div key={entry.id}>
                  <div className="translation-title">
                    <div>
                      <i>
                        {entry.pos.charAt(0).toUpperCase() + entry.pos.slice(1)}
                      </i>
                    </div>
                  </div>
                  {entry.tr.map((translation) => {
                    if (
                      translation.pos === 'verb' &&
                      translation?.asp === 'несов'
                    ) {
                      return (
                        <div css={verbStylesContainer}>
                          <div css={verbStyles}>
                            <div css={russianVerbImperfective}>
                              {translation.text}
                            </div>
                            {/* Meaning of the verb */}
                            <div>
                              {translation.mean?.map((example) => {
                                return (
                                  <div>
                                    <div>{example.text}</div>
                                    <div>
                                      {example.tr?.map((translation) => {
                                        return <div>{translation.text}</div>;
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            {/* Examples of the verb in use*/}
                            <div>
                              {translation.ex?.map((example) => {
                                return (
                                  <div>
                                    <div>{example.text}</div>
                                    <div>
                                      {example.tr.map((translation) => {
                                        return <div>{translation.text}</div>;
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          {/* <div className="russian-verb-unvollendet">
                            {translation.text}
                          </div>
                          <div>
                            {translation.ex?.map((example) => {
                              return (
                                <div>
                                  <div>{example.text}</div>
                                  <div>
                                    {example.tr.map((translation) => {
                                      return <div>{translation.text}</div>;
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            {translation.mean?.map((example) => {
                              return (
                                <div>
                                  <div>{example.text}</div>
                                  <div>
                                    {example.tr?.map((translation) => {
                                      return <div>{translation.text}</div>;
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div> */}
                        </div>
                      );
                    } else if (
                      translation.pos === 'verb' &&
                      translation?.asp === 'сов'
                    ) {
                      return (
                        <div css={verbStylesContainer}>
                          <div css={verbStyles}>
                            <div css={russianVerbPerfective}>
                              {translation.text}
                            </div>
                            <div>
                              {translation.syn?.map((synonym) => {
                                return (
                                  <div>
                                    <div>{synonym.text}</div>
                                  </div>
                                );
                              })}
                            </div>
                            <div>
                              {translation.ex?.map((example) => {
                                return (
                                  <div>
                                    <div>{example.text}</div>
                                    <div>
                                      {example.tr.map((translation) => {
                                        return <div>{translation.text}</div>;
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div>
                              {translation.mean?.map((example) => {
                                return (
                                  <div>
                                    <div>{example.text}</div>
                                    <div>
                                      {example.tr?.map((translation) => {
                                        return <div>{translation.text}</div>;
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    } else if (translation.pos === 'noun') {
                      return (
                        <div css={nounStyles}>
                          <div className="panel">
                            <div>{translation.text}</div>
                            <div>{translation.asp}</div>

                            <div>
                              {translation.syn?.map((synonym) => {
                                return (
                                  <div>
                                    <div>{synonym.text}</div>
                                    <div>{synonym.asp}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div>
                            {translation.mean?.map((example) => {
                              return (
                                <div>
                                  <div>{example.text}</div>
                                  <div>
                                    {example.tr?.map((translation) => {
                                      return <div>{translation.text}</div>;
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            {translation.ex?.map((example) => {
                              return (
                                <div>
                                  <div>{example.text}</div>
                                  <div>
                                    {example.tr.map((translation) => {
                                      return <div>{translation.text}</div>;
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    } else if (translation.pos === 'adjective') {
                      return (
                        <div>
                          <div>{translation.text}</div>
                          <div>{translation.asp}</div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const searchTerm = context.query.id;
  const key = process.env.customKey;
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const { getVocabLists } = await import('../../util/database');

  const res = await fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${searchTerm}`,
  );
  const data = await res.json();

  const vocabLists = await getVocabLists();

  return {
    props: {
      searchTerm,
      data,
      loggedIn,
      vocabLists,
    },
  };
}
