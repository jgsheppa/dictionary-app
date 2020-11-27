import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import { css } from '@emotion/core';
import Draggable from 'react-draggable';
import WordList from './WordList';

const popUpStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
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

  .submit {
    font-size: 16px;
    color: #fff;
    padding: 10px 30px;
    text-decoration: none;
    text-align: center;
    background-color: #6121c9;
    width: 200px;
    border-radius: 4px;
    margin-top: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit:hover {
    background-color: #874de4;
  }

  .new-list-input {
    font-size: 16px;
    border: solid 2px #635757;
    border-radius: 8px;
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

export default function Popup(props) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  console.log('fetcher', fetcher);
  const { data, mutate, error } = useSWR('/api/word-lists/', fetcher);

  const [errorMessage, setErrorMessage] = useState('');
  const [newListName, setNewListName] = useState('');
  const [id, setId] = useState(props.user.id);
  const [term, setTerm] = useState(props.searchTerm);

  const onlyListIds = data?.wordArray.map((word) => word.listId);

  function handleCheckBox(e, id, checked) {
    e.target.checked = !checked;
    props.setVocabList(props.vocabLists);
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
                {data?.vocabLists.map((list) => {
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
                              mutate();
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
                              mutate();
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
                    setNewListName('');
                    mutate();
                  }
                }}
              >
                <label>
                  New List:
                  <input
                    type="text"
                    name="name"
                    className="new-list-input"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    data-cy="enter-list-name"
                  />
                </label>
                <br />
                <input className="submit" data-cy="submit-list" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}
