import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';

const unorderedListStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    width: 450px;
    padding: 32px 40px;
    border: solid #6121c9;
    border-radius: 8px;
  }

  .word-name {
    text-decoration: none;
    color: black;
    transition: color 0.4s ease;
  }

  .word-name:hover {
    color: blue;
  }

  div b {
    margin-right: 5px;
  }

  div i {
    margin-right: 20px;
  }

  li {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    border-color: red;
    border-radius: 8px;
    border-width: 4px;
    padding: 5px 0;
  }

  li div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  button {
    font-size: 24px;
    color: #fff;
    border: solid;
    border-radius: 5px;
    border-width: 2px;
    background-color: #6121c9;
    padding: 8px 12px;
    cursor: pointer;
  }

  .delete-button {
    font-size: 16px;
    color: #fff;
    border: solid;
    border-radius: 5px;
    border-width: 2px;
    border-color: #ff3a3a;
    padding: 4px;
    background-color: #ff3a3a;
    cursor: pointer;
  }

  .delete-button:hover {
    border-color: #3a2f2f;
  }

  .word-row {
    padding: 8px;
    transition: background-color 0.3s ease;
  }

  .word-row:hover {
    color: #fff;
    background-color: #f4d35e;
  }
`;

function WordList({ words, setListWords, deleteWord }) {
  const [listOfWords, setListOfWords] = useState(words || []);
  const [errorMessage, setErrorMessage] = useState('');
  const [editClicked, setEditClicked] = useState(false);

  console.log(listOfWords);
  setListWords(words);
  const updatedList = [...words];
  console.log('updated list', updatedList);

  function handleEdit() {
    setEditClicked(!editClicked);
  }

  useEffect(() => {
    setListOfWords(words);
  }, []);

  if (typeof listOfWords === 'undefined') {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <button onClick={handleEdit}>Edit</button>
        <ul css={unorderedListStyles}>
          <div>
            <li>
              <b>{''}</b>
            </li>
            {listOfWords === 'undefined'
              ? null
              : updatedList.map((word) => (
                  <li className="word-row" key={word.id}>
                    <Link href={`/words/${word.lang1}`}>
                      <a className="word-name">{word.lang1}</a>
                    </Link>
                    {word.ru}
                    <div>
                      {editClicked ? (
                        <button
                          className="delete-button"
                          onClick={async (e) => {
                            // e.preventDefault();
                            const wordId = word.id;
                            const id = word.listId;
                            const response = await fetch(
                              `/api/word-lists/${word.listId}`,
                              {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Accept-Language': '*',
                                },
                                body: JSON.stringify({
                                  id,
                                  lang1: word.lang1,
                                }),
                              },
                            );

                            const { success } = await response.json();

                            if (!success) {
                              setErrorMessage('Word not deleted from list!');
                            } else {
                              setErrorMessage('Success!');
                              deleteWord(wordId, updatedList);
                            }
                          }}
                        >
                          Delete Word
                        </button>
                      ) : null}
                    </div>
                  </li>
                ))}
          </div>
        </ul>
      </div>
    );
  }
}

export default WordList;
