import Head from 'next/head';
import React from 'react';
import { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import Draggable from 'react-draggable';
import Popup from '../../components/Popup.js';
import Layout from '../../components/Layout.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import { isSessionTokenValid } from '../../util/auth';
import { searchTermCookie } from '../../util/cookie';

const style = css`
  margin-bottom: 100px;

  h3 {
    padding: 0 0 8px;
    border-bottom: double;
  }
`;

const partOfSpeechContainer = css`
  margin-bottom: 40px;
`;

const wordPositionStyles = css`
  i {
    font-size: 24px;
  }

  button {
    font-size: 20px;
    color: #fff;
    border-radius: 0.5em;
    padding: 4px 8px;
    background-color: #6121c9;
    cursor: pointer;
    transition: ease 0.3s background-color;
    margin-bottom: 16px;
    border: solid 2px #6121c9;
  }

  button:hover {
    background-color: #874de4;
  }

  button:focus {
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #fff;
    outline: none !important;
    border: solid 2px #e02e2e;
    border-radius: 4px;
  }
`;

const nounStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: double;

  div {
    margin: 10px;
    text-align: left;
  }
`;

const prepositionStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const particleStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const verbStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;
const russianVerbImperfective = css`
  background-color: #ffe216;
  border-radius: 8px;
  padding: 0.3rem 1rem 0.3rem 0.25rem;
`;

const meaningStyles = css`
  .meaning-text {
    margin-bottom: 8px;
  }
`;

const russianVerbPerfective = css`
  background-color: #34a1ff;
  border-radius: 8px;
  padding: 0.3rem 1rem 0.3rem 0.25rem;
`;

const russianVerbUndecided = css`
  background-color: #fff;
  border-radius: 8px;
  padding: 0.3rem 1rem 0.3rem 0.25rem;
`;

const verbStylesContainer = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: double;
  padding: 10px 30px;
`;

const exampleStyles = css`
  div {
    margin-bottom: 4px;
  }
`;

const exampleStylesContainer = css`
  display: flex;
  flex-direction: column;

  margin: 8px 0;
`;

const adjectiveStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const addToListButtonStyles = css`
  button {
    font-size: 20px;
    color: #fff;
    border-radius: 4px;
    padding: 12px 24px;
    background-color: #6121c9;
    cursor: pointer;
    transition: ease 0.3s background-color;
  }

  button:hover {
    background-color: #874de4;
  }

  button:focus {
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #fff;
    outline: none !important;
    border: solid 2px #e02e2e;
    border-radius: 4px;
  }
`;

const verbInfoStyles = css`
  cursor: move;

  > div {
    position: fixed;
    z-index: 1;
    width: 400px;
    height: auto;
    background-color: #fff;
    border: solid #6121c9;
    padding: 0 0 0 12px;
  }

  .modal-content {
    background-color: white;
    position: absolute;
    top: 100px;
    left: -60px;
    padding: 20px;
    border-radius: 5px;
    border: 2px solid black;
  }

  p {
    line-height: 1.6;

    .yellow-word {
      background-color: #ffe216;
      border-radius: 4px;
      padding: 4px;
    }

    .blue-word {
      background-color: #34a1ff;
      border-radius: 4px;
      padding: 4px;
    }
  }

  span {
    color: Black;
    float: right;
  }

  span:hover {
    color: red;
    cursor: pointer;
  }
`;

const verbExamplePopUpStyles = css`
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1; */
  cursor: move;

  > div {
    position: fixed;
    z-index: 1;
    width: 300px;
    background-color: #fff;
    border: solid #6121c9;
    padding: 12px 24px;
    margin-bottom: 200px;
    background-color: white;
    right: 200px;
    padding: 20px;
    border-radius: 5px;
    border: 2px solid black;
  }

  .modal-content {
    /* background-color: white;
    position: absolute;
    top: 100px;
    right: 400px;
    padding: 20px;
    border-radius: 5px;
    border: 2px solid black; */
  }

  p {
    line-height: 1.6;
  }

  span {
    color: Black;
    float: right;
  }

  span:hover {
    color: red;
    cursor: pointer;
  }
`;

const notFoundStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ece9e9;
  border-radius: 8px;
  width: 400px;
  height: 160px;
  margin-top: 40px;

  p {
    font-size: 40px;
  }
`;

const exampleButton = css`
  font-size: 16px;
  color: #fff;
  border-radius: 4px;
  padding: 8px 20px;
  background-color: #6121c9;
  cursor: pointer;
  transition: ease 0.3s background-color;
`;

export default function Id(props) {
  console.log(props.data);
  searchTermCookie(props.searchTerm);

  const [data, setData] = useState(props.data);
  const [word, setWord] = useState(data.def);
  const [toggle, setToggle] = useState(false);
  const [toggleVerb, setToggleVerb] = useState(false);
  const [searchTerm, setSearchTerm] = useState(props.searchTerm);
  const [vocabList, setVocabList] = useState(props.vocabLists || []);
  const [arrayOfWordsInDB, setArrayOfWordsInDB] = useState(props.wordsArray);
  const wholeVocabList = [...vocabList] || [];

  const foreignTerm = props.data.def[0]?.tr[0].text;

  const container = React.createRef();
  const container1 = React.createRef();
  const nounContainer = React.createRef();
  const adjectiveContainer = React.createRef();
  const adverbContainer = React.createRef();
  const addToListContainer = React.createRef();

  const [nounExamplesOpen, setNounExamplesOpen] = useState(false);
  const [verbExamplesOpen, setVerbExamplesOpen] = useState(false);
  const [adjectiveExamplesOpen, setAdjectiveExamplesOpen] = useState(false);
  const [adverbExamplesOpen, setAdverbExamplesOpen] = useState(false);
  const [addListOpen, setAddListOpen] = useState(false);

  function togglePop() {
    setToggle(!toggle);
  }

  function handleToggleVerb() {
    setToggleVerb(!toggleVerb);
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

  function handleAdverbExampleClick() {
    setAdverbExamplesOpen(!adverbExamplesOpen);
  }

  useEffect(() => {
    setData(props.data);

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

  if (data.def.length === 0)
    return (
      <>
        <Head>
          <title>TransDivan</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout username={props?.user?.username} loggedIn={props.loggedIn}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginBottom: '20px',
            }}
          >
            <SearchBar data={data} setWord={setWord}></SearchBar>
            <div css={notFoundStyles}>
              {' '}
              <p>Term not found</p>
            </div>
          </div>
        </Layout>
      </>
    );
  return (
    <>
      <Head>
        <title>TransDivan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props?.user?.username} loggedIn={props.loggedIn}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: '20px',
          }}
        >
          <SearchBar data={data} setWord={setWord}></SearchBar>
          <div css={addToListButtonStyles}>
            <>
              {props.loggedIn ? (
                <>
                  <button
                    data-cy="click-on-list"
                    tabIndex={8}
                    onClick={() => togglePop()}
                  >
                    Add To List
                  </button>

                  {toggle ? (
                    <Popup
                      foreignTerm={foreignTerm}
                      wordsArray={arrayOfWordsInDB}
                      setWordsArray={setArrayOfWordsInDB}
                      wholeVocabList={wholeVocabList}
                      user={props.user}
                      vocabLists={vocabList}
                      setVocabList={setVocabList}
                      searchTerm={props.searchTerm}
                      toggle={togglePop}
                    />
                  ) : null}
                </>
              ) : null}
            </>
          </div>
        </div>

        <div css={style}>
          <h3>{searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)}</h3>
          {word.map((entry) => {
            if (entry.pos) {
              return (
                <div css={partOfSpeechContainer}>
                  <div key={entry.text}>
                    <div className="translation-title">
                      <div css={wordPositionStyles}>
                        {entry.pos !== 'verb' ? (
                          <i>
                            {entry.pos?.charAt(0).toUpperCase() +
                              entry.pos?.slice(1)}
                          </i>
                        ) : (
                          <>
                            <button
                              tabIndex={7}
                              key={entry.text}
                              onClick={handleToggleVerb}
                            >
                              <i>
                                {entry.pos?.charAt(0).toUpperCase() +
                                  entry.pos?.slice(1)}
                              </i>
                            </button>
                            {toggleVerb ? (
                              <>
                                <Draggable>
                                  <div css={verbInfoStyles}>
                                    <div>
                                      <p className="verb-content">
                                        Verbs with{' '}
                                        <b className="yellow-word">yellow</b>{' '}
                                        backgrounds denote the imperfective
                                        form, while verbs with{' '}
                                        <b className="blue-word">blue</b>{' '}
                                        backgrounds represent the perfective
                                        form.
                                      </p>
                                    </div>
                                  </div>
                                </Draggable>
                              </>
                            ) : null}
                          </>
                        )}
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
                                {translation.text.charAt(0).toUpperCase() +
                                  translation.text.slice(1)}
                              </div>
                              {/* Meaning of the verb */}
                              <div>
                                {translation.mean?.map((example) => {
                                  return (
                                    <div css={meaningStyles}>
                                      <div className="meaning-text">
                                        {example.text.charAt(0).toUpperCase() +
                                          example.text.slice(1)}
                                      </div>

                                      <div>
                                        {example.tr?.map((translation) => {
                                          return (
                                            <div>
                                              {translation.text
                                                .charAt(0)
                                                .toUpperCase() +
                                                translation.text.slice(1)}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              {translation.ex ? (
                                <>
                                  <button
                                    css={exampleButton}
                                    className="dropdownbtn"
                                    onClick={handleVerbExampleClick}
                                  >
                                    Examples
                                  </button>
                                  {verbExamplesOpen && (
                                    <div>
                                      {translation.ex?.map((example) => {
                                        return (
                                          <Draggable>
                                            <div css={verbExamplePopUpStyles}>
                                              <div
                                                className="container1"
                                                ref={container1}
                                              >
                                                {
                                                  <div className="modal-content">
                                                    <div
                                                      css={
                                                        exampleStylesContainer
                                                      }
                                                    >
                                                      <div css={exampleStyles}>
                                                        {example.text}
                                                      </div>
                                                      <div>
                                                        {example.tr.map(
                                                          (translation) => {
                                                            return (
                                                              <div>
                                                                <i
                                                                  css={
                                                                    exampleStyles
                                                                  }
                                                                >
                                                                  {translation.text
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    translation.text.slice(
                                                                      1,
                                                                    )}
                                                                </i>
                                                              </div>
                                                            );
                                                          },
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                }
                                              </div>
                                            </div>
                                          </Draggable>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </div>
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
                                {translation.text.charAt(0).toUpperCase() +
                                  translation.text.slice(1)}
                              </p>

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
                                {translation.ex ? (
                                  <>
                                    {' '}
                                    <button
                                      css={exampleButton}
                                      className="dropdownbtn"
                                      onClick={handleVerbExampleClick}
                                    >
                                      Examples
                                    </button>
                                    {verbExamplesOpen &&
                                      translation.ex?.map((example) => {
                                        return (
                                          <div>
                                            <div css={verbExamplePopUpStyles}>
                                              {example.text}
                                            </div>
                                            <div>
                                              {example.tr.map((translation) => {
                                                return (
                                                  <div>
                                                    <i css={exampleStyles}>
                                                      {translation.text
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        translation.text.slice(
                                                          1,
                                                        )}
                                                    </i>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        );
                                      })}{' '}
                                  </>
                                ) : null}
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
                                {translation.text.charAt(0).toUpperCase() +
                                  translation.text.slice(1)}
                              </div>
                              {/* <div>
                                {translation.syn?.map((synonym) => {
                                  return (
                                    <div>
                                      <div>{synonym.text}</div>
                                    </div>
                                  );
                                })}
                              </div> */}
                              <div>
                                {translation.ex?.map((example) => {
                                  return (
                                    <div>
                                      <div>{example.text}</div>
                                      <div>
                                        {example.tr.map((translation) => {
                                          return (
                                            <div>
                                              <i>
                                                {translation.text
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  translation.text.slice(1)}
                                              </i>
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
                                          return (
                                            <div>
                                              {translation.text
                                                .charAt(0)
                                                .toUpperCase() +
                                                translation.text.slice(1)}
                                            </div>
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
                      } else if (translation.pos === 'noun') {
                        return (
                          <div css={nounStyles}>
                            <div>
                              <div>
                                <p>
                                  {translation.text.charAt(0).toUpperCase() +
                                    translation.text.slice(1)}
                                </p>
                              </div>
                            </div>
                            <div>
                              {translation.mean?.map((example) => {
                                return (
                                  <div>
                                    <p>
                                      {example.text.charAt(0).toUpperCase() +
                                        example.text.slice(1)}
                                    </p>

                                    <div>
                                      {example.tr?.map((translation) => {
                                        return (
                                          <p>
                                            {translation.text
                                              .charAt(0)
                                              .toUpperCase() +
                                              translation.text.slice(1)}
                                          </p>
                                        );
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
                                {translation.ex ? (
                                  <>
                                    <button
                                      css={exampleButton}
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
                                              <p>
                                                {example.text
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  example.text.slice(1)}
                                              </p>
                                            </div>
                                            <div>
                                              {example.tr.map((translation) => {
                                                return (
                                                  <p>
                                                    <i>
                                                      {translation.text
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        translation.text.slice(
                                                          1,
                                                        )}
                                                    </i>
                                                  </p>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        );
                                      })}{' '}
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        );
                      } else if (translation.pos === 'adjective') {
                        return (
                          <div css={adjectiveStyles}>
                            <div>
                              <p>
                                {translation.text.charAt(0).toUpperCase() +
                                  translation.text.slice(1)}
                              </p>
                            </div>
                            <div
                              className="adjectiveContainer"
                              ref={adjectiveContainer}
                            >
                              {translation.ex ? (
                                <>
                                  <button
                                    css={exampleButton}
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
                                                  <i>
                                                    {translation.text
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                      translation.text.slice(1)}
                                                  </i>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      );
                                    })}
                                </>
                              ) : null}
                            </div>
                          </div>
                        );
                      } else if (translation.pos === 'adverb') {
                        return (
                          <div css={verbStylesContainer}>
                            <div css={verbStyles}>
                              <div css={russianVerbUndecided}>
                                {translation.text.charAt(0).toUpperCase() +
                                  translation.text.slice(1)}
                              </div>

                              <div>
                                {translation.ex ? (
                                  <div
                                    className="adverbContainer"
                                    ref={adverbContainer}
                                  >
                                    <button
                                      css={exampleButton}
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
                                ) : null}
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
                      } else if (translation.pos === 'participle') {
                        return (
                          <div css={verbStylesContainer}>
                            <div css={verbStyles}>
                              <div css={russianVerbUndecided}>
                                {translation.text.charAt(0).toUpperCase() +
                                  translation.text.slice(1)}
                              </div>
                              <div>
                                <div
                                  className="adverbContainer"
                                  ref={adverbContainer}
                                >
                                  {translation.ex ? (
                                    <button
                                      css={exampleButton}
                                      className="dropdownbtn"
                                      onClick={handleAdverbExampleClick}
                                    >
                                      Examples
                                    </button>
                                  ) : null}
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
                      } else if (translation.pos === 'preposition') {
                        return (
                          <div css={verbStylesContainer}>
                            <div css={verbStyles}>
                              <div>
                                {translation.text.charAt(0).toUpperCase() +
                                  translation.text.slice(1)}
                              </div>
                              {/* Meaning of the verb */}
                              <div>
                                {translation.mean?.map((example) => {
                                  return (
                                    <div>
                                      <div>
                                        {example.text.charAt(0).toUpperCase() +
                                          example.text.slice(1)}
                                      </div>

                                      <div>
                                        {example.tr?.map((translation) => {
                                          return (
                                            <div>
                                              {translation.text
                                                .charAt(0)
                                                .toUpperCase() +
                                                translation.text.slice(1)}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              {translation.ex ? (
                                <>
                                  <button
                                    css={exampleButton}
                                    className="dropdownbtn"
                                    onClick={handleVerbExampleClick}
                                  >
                                    Examples
                                  </button>
                                  {verbExamplesOpen && (
                                    <div>
                                      {translation.ex?.map((example) => {
                                        return (
                                          <Draggable>
                                            <div css={verbExamplePopUpStyles}>
                                              <div
                                                className="container1"
                                                ref={container1}
                                              >
                                                {
                                                  <div className="modal-content">
                                                    <div
                                                      css={
                                                        exampleStylesContainer
                                                      }
                                                    >
                                                      <div css={exampleStyles}>
                                                        {example.text}
                                                      </div>
                                                      <div>
                                                        {example.tr.map(
                                                          (translation) => {
                                                            return (
                                                              <div>
                                                                <i
                                                                  css={
                                                                    exampleStyles
                                                                  }
                                                                >
                                                                  {translation.text
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    translation.text.slice(
                                                                      1,
                                                                    )}
                                                                </i>
                                                              </div>
                                                            );
                                                          },
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                }
                                              </div>
                                            </div>
                                          </Draggable>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </div>
                          </div>
                        );
                      } else if (translation.pos === 'particle') {
                        return (
                          <div css={verbStylesContainer}>
                            <div css={verbStyles}>
                              <div>
                                {translation.text.charAt(0).toUpperCase() +
                                  translation.text.slice(1)}
                              </div>
                              {/* Meaning of the verb */}
                              <div>
                                {translation.mean?.map((example) => {
                                  return (
                                    <div>
                                      <div>
                                        {example.text.charAt(0).toUpperCase() +
                                          example.text.slice(1)}
                                      </div>

                                      <div>
                                        {example.tr?.map((translation) => {
                                          return (
                                            <div>
                                              {translation.text
                                                .charAt(0)
                                                .toUpperCase() +
                                                translation.text.slice(1)}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              {translation.ex ? (
                                <>
                                  <button
                                    css={exampleButton}
                                    className="dropdownbtn"
                                    onClick={handleVerbExampleClick}
                                  >
                                    Examples
                                  </button>
                                  {verbExamplesOpen && (
                                    <div>
                                      {translation.ex?.map((example) => {
                                        return (
                                          <Draggable>
                                            <div css={verbExamplePopUpStyles}>
                                              <div
                                                className="container1"
                                                ref={container1}
                                              >
                                                {
                                                  <div className="modal-content">
                                                    <div
                                                      css={
                                                        exampleStylesContainer
                                                      }
                                                    >
                                                      <div css={exampleStyles}>
                                                        {example.text}
                                                      </div>
                                                      <div>
                                                        {example.tr.map(
                                                          (translation) => {
                                                            return (
                                                              <div>
                                                                <i
                                                                  css={
                                                                    exampleStyles
                                                                  }
                                                                >
                                                                  {translation.text
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    translation.text.slice(
                                                                      1,
                                                                    )}
                                                                </i>
                                                              </div>
                                                            );
                                                          },
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                }
                                              </div>
                                            </div>
                                          </Draggable>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              ) : null}
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
  const { getVocabLists, getUserBySessionToken, getWordsArray } = await import(
    '../../util/database'
  );

  const user = (await getUserBySessionToken(token)) || [];

  const res = await fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${currentLanguage}&text=${searchTerm}`,
  );
  const data = await res.json();
  console.log('data', data);
  const vocabLists = await getVocabLists(user?.id);
  const wordsArray = await getWordsArray(searchTerm);

  if (typeof user === 'undefined') {
    return {
      props: {
        searchTerm,
        data,
        loggedIn,
      },
    };
  } else if (!token) {
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
        wordsArray,
      },
    };
  }
}
