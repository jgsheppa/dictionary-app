import React, { useState } from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';

const unorderedListStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 200px;

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
    padding: 5px 0;
  }

  li .listNameLink {
    color: #666;
    font-size: 32px;
    text-decoration: none !important;
    transition: color 0.3s ease;
  }

  li .listNameLink:hover {
    color: #e02e2e;
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
    padding: 4px;
    background-color: #ff3a3a;
    cursor: pointer;
  }

  .delete-button:hover {
    border-color: #3a2f2f;
  }
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
    <div>
      <button onClick={handleEdit}>Edit Lists</button>
      <ul css={unorderedListStyles}>
        <div>
          {updatedList.map((doc) => (
            <li key={doc.wordlistsId}>
              <Link href={`/word-lists/${doc.wordlistsId}`}>
                <a className="listNameLink">{doc.listName}</a>
              </Link>
              <div css={deleteButtonStyles}>
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
          ))}
        </div>
      </ul>
    </div>
  );
}

export default ListOfVocabLists;
