/** @jsxRuntime classic */
import Head from 'next/head';
import Layout from '../../components/Layout.tsx';
import React from 'react';
import { useState } from 'react';
import useSWR from 'swr';
import { verbStylesUnvollendet, verbStylesVollendet } from '../../styles/style';
import Link from 'next/link';

const id = ['1', '2', '3', '4', '5'];

export default function Home(props) {
  const [word, setWord] = useState(props.data.def);
  console.log(word);

  if (!word) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div style={{ marginBottom: '100px' }}>
          {word.map((entry) => {
            return (
              <div>
                <div key={entry.id}>
                  <div className="translation-title">
                    <div>
                      <b>
                        {entry.text.charAt(0).toUpperCase() +
                          entry.text.slice(1)}
                      </b>{' '}
                      - <i>{entry.pos}</i>
                    </div>
                  </div>
                  {entry.tr.map((translation) => {
                    if (
                      translation.pos === 'verb' &&
                      translation?.asp === 'несов'
                    ) {
                      return (
                        <div style={verbStylesVollendet}>
                          <div className="verb-styles">
                            <div className="russian-verb-unvollendet">
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
                        <div className="verb-styles">
                          <div className="russian-verb-vollendet">
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
                                <div style={{ margin: '10px' }}>
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
                      );
                    } else if (translation.pos === 'noun') {
                      return (
                        <div className="noun-styles">
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

  const res = await fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${searchTerm}`,
  );
  const data = await res.json();

  return {
    props: {
      searchTerm,
      data,
    },
  };
}
