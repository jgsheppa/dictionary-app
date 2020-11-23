import React, { useState } from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';
import Draggable from 'react-draggable';
import WordList from './WordList';

const popUpStyles = css`
  cursor: move;

  > div {
    /* display: flex; */
    position: fixed;
    z-index: 1;
    width: 200px;
    height: auto;
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.7);
  }

  .modal-content {
    background-color: white;
    position: absolute;
    top: -50px;
    left: 0px;
    /* width: 40%; */
    padding: 20px;
    border-radius: 5px;
    border: 2px solid black;
  }

  .close {
    color: Black;
    float: right;
  }

  .close:hover {
    color: red;
    cursor: pointer;
  }

  form {
    margin-top: 20px;
  }
`;

const vocabListStyles = css`
  margin-bottom: 8px;

  input {
    height: 1.5em;
    width: 1.5em;
  }
  .listNameStyles {
    text-decoration: none;
    color: black;
    margin-left: 8px;
  }

  .listNameStyles:hover {
    color: blue;
  }
`;
type Props = {
  searchTerm;
  vocabLists;
  user;
  toggle;
  wholeVocabList;
  setVocabList;
  wordsArray;
  setWordsArray;
};

export default function Popup(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [newListName, setNewListName] = useState('');
  const [id, setId] = useState(props.user.id);
  // const [wordList, setWordList] = useState(props.wholeVocabList);
  const [wordList, setWordList] = useState(props.vocabLists);
  const [term, setTerm] = useState(props.searchTerm);
  const [wordsArray, setWordsArray] = useState(props.wordsArray);

  console.log('vocab lists', props.vocabLists);

  const onlyListIds = wordsArray.map((word) => word.listId);
  console.log('only list ids', onlyListIds);

  // console.log('only list ids', onlyListIds);
  // console.log('props', props.wordsArray);

  let wholeList = [...wordList];
  console.log('word list', wordList);

  function handelSubmit() {
    wholeList.push({ listName: newListName });
    setWordList(wholeList);
    props.setVocabList(wholeList);
  }

  function handleCheckBox(e, id, checked) {
    console.log(e, id, checked);
    e.target.checked = !checked;
    props.setVocabList(props.vocabLists);
    console.log('only list ids', onlyListIds);
  }

  return (
    <>
      <Draggable>
        <div css={popUpStyles}>
          <div css={popUpStyles}>
            <div className="modal-content">
              {/* <span className="close" onClick={props.handleClick}></span> */}
              <span
                data-cy="close-list-box"
                onClick={() => props.toggle()}
                className="close"
              >
                &times;
              </span>
              <h3>List</h3>

              <div>
                {wordList.map((list) => {
                  const wordListId = list.wordlistsId;
                  let checked = onlyListIds.includes(wordListId);
                  console.log('did checked change', checked);

                  return (
                    <div key={wordListId} css={vocabListStyles}>
                      <input
                        data-cy="add-to-list"
                        type="checkbox"
                        checked={checked}
                        value={wordListId}
                        onChange={async (e) => {
                          e.preventDefault();

                          if (!checked) {
                            const response = await fetch(
                              `/api/words/checkbox`,
                              {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Accept-Language': '*',
                                },
                                body: JSON.stringify({
                                  wordListId,
                                  term: term,
                                }),
                              },
                            );

                            const { success } = await response.json();

                            if (!success) {
                              setErrorMessage('Word not added to list!');
                            } else {
                              handleCheckBox(e, wordListId, checked);
                              console.log('is box chekced', checked);
                              setErrorMessage('');
                            }
                          } else if (checked) {
                            const response = await fetch(
                              `/api/words/checkbox`,
                              {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Accept-Language': '*',
                                },
                                body: JSON.stringify({
                                  wordListId,
                                  term: term,
                                }),
                              },
                            );

                            const { success } = await response.json();

                            if (!success) {
                              setErrorMessage('Word not added to list!');
                            } else {
                              setErrorMessage('');
                              handleCheckBox(e, wordListId, checked);
                            }
                          }
                        }}
                      />
                      <label>
                        <Link href={`/word-lists/${wordListId}`}>
                          <a className="listNameStyles">{list.listName}</a>
                        </Link>
                      </label>
                    </div>
                  );
                })}
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const response = await fetch(`/api/words/${term}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept-Language': '*',
                    },
                    body: JSON.stringify({
                      newListName,
                      id,
                      term,
                    }),
                  });

                  const { success } = await response.json();

                  if (!success) {
                    setErrorMessage('Word not added to list!');
                  } else {
                    setErrorMessage('');
                    handelSubmit();

                    setNewListName('');
                  }
                }}
              >
                <label>
                  New List:
                  <input
                    type="text"
                    name="name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    data-cy="enter-list-name"
                  />
                </label>
                <br />
                <input data-cy="submit-list" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}
