import React, { useState } from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';

const listContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const unorderedListStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  /* margin-bottom: 200px; */

  > div {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    width: 450px;
  }

  li {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    border-width: 4px;
    border-radius: 8px;
    height: 36px;
  }

  .listOfWordsRowStyle {
    padding: 8px;
    transition: background-color 0.3s ease;
  }

  .listOfWordsRowStyle:hover {
    color: #fff;
    background-color: #f4d35e;
  }

  li .listNameLink {
    color: #2d2525;
    font-size: 24px;
    height: 32px;
    border: 2px;
    text-decoration: none !important;
    transition: color 0.3s, border 0.3s ease;
  }

  li .listNameLink:hover {
    color: blue;
  }

  li .listNameLink:focus {
    outline: none !important;
    border: solid 2px #e02e2e;
    border-radius: 4px;
  }
`;

const deleteButtonStyles = css`
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
`;

const editButtonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    font-size: 16px;
    color: #fff;
    padding: 10px 30px;
    text-decoration: none;
    text-align: center;
    background-color: #6121c9;
    width: 200px;
    border-radius: 4px;
    margin: 20px 24px 0 24px;
    cursor: pointer;
  }
`;

const noListStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #ece9e9;
`;

const listStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px 0 0;
  border-radius: 8px;
  background-color: #ece9e9;
`;

function ListOfVocabLists({ setList, list, deleteList }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [editClicked, setEditClicked] = useState(false);
  setList(list);

  const updatedList = [...list];

  function handleEdit() {
    setEditClicked(!editClicked);
  }

  return (
    <div css={listContainer}>
      <h3>Your Vocabulary Lists</h3>
      <div css={listStyles}>
        <ul css={unorderedListStyles}>
          <div>
            {updatedList.length > 0 ? (
              updatedList.map((doc) => (
                <>
                  <li className="listOfWordsRowStyle" key={doc.wordlistsId}>
                    <Link
                      href={`/word-lists/${doc.wordlistsId}`}
                      data-cy="click-on-list-link"
                    >
                      <a
                        data-cy={`click-on-list-link`}
                        className="listNameLink"
                      >
                        {doc.listName}
                      </a>
                    </Link>
                    <div css={deleteButtonStyles} data-cy="click-delete-button">
                      {editClicked ? (
                        <button
                          className="delete-button"
                          onClick={async (e) => {
                            // e.preventDefault();

                            let id = doc.wordlistsId;
                            const response = await fetch(`/api/words/profile`, {
                              method: 'DELETE',
                              headers: {
                                'Content-Type': 'application/json',
                                'Accept-Language': '*',
                              },
                              body: JSON.stringify({
                                id,
                              }),
                            });

                            const { success } = await response.json();

                            if (!success) {
                              setErrorMessage('Word not deleted from list!');
                            } else {
                              setErrorMessage('Success!');
                              deleteList(id, updatedList);
                              console.log('list after deletion', list);
                            }
                          }}
                        >
                          Delete List
                        </button>
                      ) : null}
                    </div>
                  </li>
                </>
              ))
            ) : (
              <div css={noListStyles}>
                {' '}
                <p>You currently have no lists</p>
              </div>
            )}
          </div>
        </ul>
      </div>

      <div css={editButtonStyles}>
        <button data-cy="click-edit-list" onClick={handleEdit}>
          Edit Lists
        </button>
      </div>
    </div>
  );
}

export default ListOfVocabLists;
