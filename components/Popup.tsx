import React, { useState } from 'react';
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
`;

type Props = {
  searchTerm;
  vocabLists;
  user;
  toggle;
  wholeVocabList;
  setVocabList;
  wordsArray;
};

export default function Popup(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [newListName, setNewListName] = useState('');
  const [id, setId] = useState(props.user.id);
  const [wordList, setWordList] = useState(props.wholeVocabList);
  const [term, setTerm] = useState(props.searchTerm);
  const [wordsArray, setWordsArray] = useState(props.wordsArray);

  const onlyListIds = wordsArray.map((word) => word.listId);
  console.log('only list ids', onlyListIds);
  console.log('props', props.wordsArray);
  console.log('word list', wordList);

  let wholeList = [...wordList];

  function handelSubmit() {
    wholeList.push({ listName: newListName });
    setWordList(wholeList);
  }

  function handleCheckBox(e, id, checked) {
    console.log(e, id, checked);
    e.target.checked = !checked;
    console.log('only list ids', onlyListIds);

    // if (e === id) {
    //   return !checked;
    // }
  }

  // If onlyWords.includes(term) and

  return (
    <>
      <Draggable>
        <div css={popUpStyles}>
          <div css={popUpStyles}>
            <div className="modal-content">
              {/* <span className="close" onClick={props.handleClick}></span> */}
              <span onClick={() => props.toggle()} className="close">
                &times;
              </span>
              <h3>List</h3>

              <div>
                {wordList.map((list) => {
                  const wordListId = list.wordlistsId;
                  const checked = onlyListIds.includes(wordListId);

                  return (
                    <div key={wordListId}>
                      <input
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
                              setErrorMessage('');
                            }
                          } else if (checked) {
                            const response = await fetch(`/api/words/${term}`, {
                              method: 'DELETE',
                              headers: {
                                'Content-Type': 'application/json',
                                'Accept-Language': '*',
                              },
                              body: JSON.stringify({
                                wordListId,
                                term: term,
                              }),
                            });

                            const { success } = await response.json();

                            if (!success) {
                              setErrorMessage('Word not added to list!');
                            } else {
                              setErrorMessage('');
                              handleCheckBox(e, wordListId, checked);
                              props.setVocabList(wholeList);
                            }
                          }
                        }}
                      />
                      <label>{list.listName}</label>
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
                  />
                </label>
                <br />
                <input type="submit" />
              </form>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}
