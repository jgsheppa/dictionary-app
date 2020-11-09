import Head from 'next/head';
import React from 'react';
import { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import useSWR from 'swr';
import Link from 'next/link';
import { isSessionTokenValid } from '../../util/auth';
import Popup from '../../components/Popup.tsx';
import Layout from '../../components/Layout.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import { getSearchInfo } from '../../util/cookie';

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

const russianVerbUndecided = css`
  background-color: #fff;
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

const exampleStyles = css`
  div {
    margin-bottom: 4px;
  }
`;

const exampleStylesContainer = css`
  margin: 8px 0;
`;

export default function Id(props) {
  const [data, setData] = useState(props.data);
  console.log('data', data);
  const [word, setWord] = useState(data.def);
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState(props.searchTerm);
  const [vocabList, setVocabList] = useState(props.vocabLists);

  const container = React.createRef();
  const container1 = React.createRef();
  const nounContainer = React.createRef();
  const adjectiveContainer = React.createRef();
  const adverbContainer = React.createRef();

  const [nounExamplesOpen, setNounExamplesOpen] = useState(false);
  const [verbExamplesOpen, setVerbExamplesOpen] = useState(false);
  const [adjectiveExamplesOpen, setAdjectiveExamplesOpen] = useState(false);
  const [adverbExamplesOpen, setAdverbExamplesOpen] = useState(false);

  function togglePop() {
    setToggle(!toggle);
  }

  function handleVerbExampleClick() {
    setVerbExamplesOpen(!verbExamplesOpen);
  }

  function handleNounExampleClick() {
    setNounExamplesOpen(!nounExamplesOpen);
  }

  function handleAdjectiveExampleClick() {
    setAdjectiveExamplesOpen(!adjectiveExamplesOpen);
  }

  function handleAdverbExampleClick() {
    setAdverbExamplesOpen(!adverbExamplesOpen);
  }

  useEffect(() => {
    setData(props.data);
    setVocabList(props.vocabLists);
    console.log(vocabList);
    // only add the event listener when the dropdown is opened
    if (!verbExamplesOpen) return;
    if (!nounExamplesOpen) return;
    if (!adjectiveExamplesOpen) return;

    function handleVerbClick(event) {
      if (container1.current && !container1.current.contains(event.target)) {
        setVerbExamplesOpen(false);
      }
    }

    function handleNounClick(event) {
      if (
        nounContainer.current &&
        !nounContainer.current.contains(event.target)
      ) {
        setNounExamplesOpen(false);
      }
    }

    function handleAdjectiveClick(event) {
      if (
        adjectiveContainer.current &&
        !adjectiveContainer.current.contains(event.target)
      ) {
        setVerbExamplesOpen(false);
      }
    }

    function handleAdverbClick(event) {
      if (
        adverbContainer.current &&
        !adverbContainer.current.contains(event.target)
      ) {
        setVerbExamplesOpen(false);
      }
    }

    window.addEventListener('click', handleVerbClick);
    window.addEventListener('click', handleNounClick);
    window.addEventListener('click', handleAdjectiveClick);
    window.addEventListener('click', handleAdverbClick);
    // clean up
    return () => {
      window.removeEventListener('click', handleVerbClick);
      window.removeEventListener('click', handleNounClick);
      window.removeEventListener('click', handleAdjectiveClick);
      window.removeEventListener('click', handleAdverbClick);
    };
  }, [verbExamplesOpen, nounExamplesOpen, adjectiveExamplesOpen]);

  if (!data) return <div>Term not found</div>;

  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <SearchBar
          data={data}
          setWord={setWord}
          // searchTerm={searchTerm}
        ></SearchBar>
        <div css={style}>
          <div>
            <button
              onClick={() => {
                togglePop();
              }}
            >
              Add To List
            </button>
            {toggle ? (
              <Popup
                user={props.user}
                vocabLists={vocabList}
                searchTerm={props.searchTerm}
                toggle={togglePop}
              />
            ) : null}
          </div>
          {word.map((entry) => {
            if (entry.pos) {
              return (
                <div css={partOfSpeechContainer}>
                  <div key={entry.text}>
                    <div className="translation-title">
                      <div>
                        <i>
                          {entry.pos?.charAt(0).toUpperCase() +
                            entry.pos?.slice(1)}
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

                              {/* <div className="container1" ref={container1}>
                              <button
                                className="dropdownbtn"
                                onClick={handleVerbExampleClick}
                              >
                                Examples
                              </button> */}
                              {translation.ex?.map((example) => {
                                return (
                                  <div className="container1" ref={container1}>
                                    <button
                                      className="dropdownbtn"
                                      onClick={handleVerbExampleClick}
                                    >
                                      Examples
                                    </button>
                                    {verbExamplesOpen && (
                                      <div css={exampleStylesContainer}>
                                        <div css={exampleStyles}>
                                          {example.text}
                                        </div>
                                        <div>
                                          {example.tr.map((translation) => {
                                            return (
                                              <div>
                                                <i css={exampleStyles}>
                                                  {translation.text}
                                                </i>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            {/* </div> */}
                          </div>
                        );
                      } else if (
                        translation.pos === 'verb' &&
                        translation?.asp === 'сов'
                      ) {
                        return (
                          <div css={verbStylesContainer}>
                            <div css={verbStyles}>
                              <p css={russianVerbPerfective}>
                                {translation.text}
                              </p>
                              <div>
                                {translation.syn?.map((synonym) => {
                                  return (
                                    <div>
                                      <p>Synonyms</p>
                                      <p>{synonym.text}</p>
                                    </div>
                                  );
                                })}
                              </div>
                              <div></div>
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
                              <div className="container" ref={container}>
                                <button
                                  className="dropdownbtn"
                                  onClick={handleVerbExampleClick}
                                >
                                  Examples
                                </button>
                                {verbExamplesOpen &&
                                  translation.ex?.map((example) => {
                                    return (
                                      <div>
                                        <div css={exampleStyles}>
                                          {example.text}
                                        </div>
                                        <div>
                                          {example.tr.map((translation) => {
                                            return (
                                              <div>
                                                <i css={exampleStyles}>
                                                  {translation.text}
                                                </i>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}
                                {/* </div> */}
                              </div>
                            </div>
                          </div>
                        );
                      } else if (
                        translation.pos === 'verb' &&
                        !translation.asp
                      ) {
                        return (
                          <div css={verbStylesContainer}>
                            <div css={verbStyles}>
                              <div css={russianVerbUndecided}>
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
                                          return (
                                            <div>
                                              <i>{translation.text}</i>
                                            </div>
                                          );
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
                            <div>
                              <div>
                                <p>{translation.text}</p>
                              </div>

                              <div>
                                {translation.syn?.map((synonym) => {
                                  return (
                                    <div>
                                      <p>{synonym.text}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div>
                              {translation.mean?.map((example) => {
                                return (
                                  <div>
                                    <p>{example.text}</p>
                                    <div>
                                      {example.tr?.map((translation) => {
                                        return <p>{translation.text}</p>;
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div>
                              <div
                                className="nounContainer"
                                ref={nounContainer}
                              >
                                <button
                                  className="dropdownbtn"
                                  onClick={handleNounExampleClick}
                                >
                                  Examples
                                </button>
                                {nounExamplesOpen &&
                                  translation.ex?.map((example) => {
                                    return (
                                      <div>
                                        <div>
                                          <p>{example.text}</p>
                                        </div>
                                        <div>
                                          {example.tr.map((translation) => {
                                            return (
                                              <p>
                                                <i>{translation.text}</i>
                                              </p>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        );
                      } else if (translation.pos === 'adjective') {
                        return (
                          <div>
                            <p>{translation.text}</p>
                            <div>{translation.asp}</div>
                            <div
                              className="adjectiveContainer"
                              ref={adjectiveContainer}
                            >
                              <button
                                className="dropdownbtn"
                                onClick={handleAdjectiveExampleClick}
                              >
                                Examples
                              </button>
                              {adjectiveExamplesOpen &&
                                translation.ex?.map((example) => {
                                  return (
                                    <div>
                                      <div>{example.text}</div>
                                      <div>
                                        {example.tr.map((translation) => {
                                          return (
                                            <div>
                                              <i>{translation.text}</i>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      } else if (translation.pos === 'adverb') {
                        return (
                          <div css={verbStylesContainer}>
                            <div css={verbStyles}>
                              <div css={russianVerbUndecided}>
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
                                <div
                                  className="adverbContainer"
                                  ref={adverbContainer}
                                >
                                  <button
                                    className="dropdownbtn"
                                    onClick={handleAdverbExampleClick}
                                  >
                                    Examples
                                  </button>
                                  {adverbExamplesOpen &&
                                    translation.ex?.map((example) => {
                                      return (
                                        <div>
                                          <div>{example.text}</div>
                                          <div>
                                            {example.tr.map((translation) => {
                                              return (
                                                <div>
                                                  <i>{translation.text}</i>
                                                </div>
                                              );
                                            })}
                                          </div>
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
                            </div>
                          </div>
                        );
                      } else if (!translation.pos) {
                        return null;
                      }
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const searchTerm = encodeURIComponent(context.query.id);
  const key = process.env.customKey;
  const { session: token } = nextCookies(context);
  const currentLanguage = nextCookies(context).language?.language;
  const loggedIn = await isSessionTokenValid(token);
  const {
    getVocabLists,
    getUserBySessionToken,
    getListBySessionToken,
  } = await import('../../util/database');

  const user = await getUserBySessionToken(token);

  const res = await fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${currentLanguage}&text=${searchTerm}`,
  );
  const data = await res.json();

  const vocabLists = await getVocabLists(user?.id);
  console.log('vocab lists', vocabLists);

  if (!user) {
    return {
      props: {
        searchTerm,
        data,
        loggedIn,
      },
    };
  } else {
    return {
      props: {
        searchTerm,
        data,
        loggedIn,
        vocabLists,
        user,
      },
    };
  }
}
