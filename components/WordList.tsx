import React, { useState } from 'react';
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

type Props = {
  words;
};

function WordList(props: Props) {
  const [listOfWords, setListOfWords] = useState(props.words);
  console.log('list of words', listOfWords);

  if (listOfWords === undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <ul css={unorderedListStyles}>
          <div>
            <li>
              <b>{''}</b>
            </li>
            {listOfWords === undefined ? (
              <div>Loading...</div>
            ) : (
              listOfWords.map((word, index) => (
                <li key={index}>
                  <Link href={`/words/${word.lang1}`}>
                    <a>{word.lang1}</a>
                  </Link>
                  {word.ru}
                  <div>
                    <button>X</button>
                  </div>
                </li>
              ))
            )}
          </div>
        </ul>
      </div>
    );
  }
}

export default WordList;
