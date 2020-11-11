import React, { useState } from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';

const unorderedListStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

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
    border-color: red;
    border-radius: 8px;
    border-width: 4px;
    padding: 5px 0;
  }

  li a:focus {
    outline: none !important;
    border: solid 2px #e02e2e;
    border-radius: 4px;
    padding: 10px;
  }
`;

function ListOfVocabLists(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [list, setList] = useState(props.list);

  return (
    <div>
      <ul css={unorderedListStyles}>
        <div>
          {list.map((doc) => (
            <li key={doc.id}>
              <Link href={`/word-lists/${doc.id}`}>
                <a>{doc.listName}</a>
              </Link>
              <button
                onClick={async (e) => {
                  e.preventDefault();

                  let id = doc.id;
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
                    setErrorMessage('Word not added to list!');
                  } else {
                    setErrorMessage('');
                    setList(props.list);
                  }
                }}
              >
                X
              </button>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default ListOfVocabLists;
