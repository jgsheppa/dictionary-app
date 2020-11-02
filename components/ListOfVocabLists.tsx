import React from 'react';
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
`;

function ListOfVocabLists(props) {
  console.log(props);
  return (
    <div>
      <ul css={unorderedListStyles}>
        <div>
          {props.list.lists.map((doc) => (
            <li key={doc.id}>
              <Link href={`/word-lists/${doc.id}`}>
                <a>{doc.title}</a>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default ListOfVocabLists;
