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
  }

  .word-name {
    text-decoration: none;
    color: black;
    transition: color 0.4s ease;
  }

  .word-name:hover {
    color: red;
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
    font-size: 12px;
    border: solid;
    border-color: #666;
    border-radius: 5px;
    border-width: 2px;
    background-color: #ffffff;
  }
`;

function WordList({ words, setListWords }) {
  const [listOfWords, setListOfWords] = useState(words || []);
  const [errorMessage, setErrorMessage] = useState('');
  const [editClicked, setEditClicked] = useState(false);

  // setListOfWords(words);
  // const updatedList = [...Object.values(listOfWords)];

  function handleEdit() {
    setEditClicked(!editClicked);
  }

  function deleteWord(wordID, word) {
    const itemToDelete = word.filter((info) => info.id === wordID);
    const indexOfItemToDelete = word.indexOf(itemToDelete[0]);

    if (indexOfItemToDelete > -1) {
      word.splice(indexOfItemToDelete, 1);
    }

    setListOfWords(word);
  }

  useEffect(() => {
    setListOfWords(words);
  }, []);

  if (!listOfWords) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <ul css={unorderedListStyles}>
          <button onClick={handleEdit}>Edit</button>
          <div>
            <li>
              <b>{''}</b>
            </li>
            {listOfWords === 'undefined'
              ? null
              : listOfWords.map((word) => (
                  <li key={word.id}>
                    <Link href={`/words/${word.lang1}`}>
                      <a className="word-name">{word.lang1}</a>
                    </Link>
                    {word.ru}
                    <div>
                      {editClicked ? (
                        <button
                          onClick={async (e) => {
                            // e.preventDefault();

                            let id = word.id;
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
                                }),
                              },
                            );

                            const { success } = await response.json();

                            if (!success) {
                              setErrorMessage('Word not deleted from list!');
                            } else {
                              setErrorMessage('Success!');
                              deleteWord(id, listOfWords);
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
