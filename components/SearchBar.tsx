import React from 'react';
import { useState } from 'react';
import { css } from '@emotion/core';
import {
  setLanguage,
  getSearchInfo,
  addSearchTermCookie,
} from './../util/cookie';

const searchStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  div input {
    padding: 10px 30px;
    border: solid 2px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  div input:focus {
    outline: none !important;
    border: solid 2px #1ac23f;
  }

  div .searchLink {
    color: #fff;
    padding: 4.5px 30px;
    text-decoration: none;
    text-align: center;
    background-color: #1ac23f;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border: none;
  }
`;

export default function SearchBar({ data, setWord }) {
  const [searchTerm, setSearchTerm] = useState('');

  const cookie = getSearchInfo();

  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div css={searchStyles}>
        <div>
          <input
            tabIndex={1}
            type="text"
            value={searchTerm}
            placeholder="Search for a term"
            onChange={handleTermChange}
          />
        </div>
        <div>
          {' '}
          <a
            href={`/words/${searchTerm}`}
            onClick={() => setWord(data.def)}
            className="searchLink"
          >
            Search
          </a>
        </div>
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value={cookie.language}>{cookie.language}</option>
          <option value="de-en">de-en</option>
          <option value="de-fr">de-fr</option>
          <option value="de-ru">de-ru</option>
          <option value="en-de">en-de</option>
          <option value="en-fr">en-fr</option>
          <option value="en-ru">en-ru</option>
          <option value="fr-en">fr-en</option>
          <option value="fr-de">fr-de</option>
          <option value="fr-ru">fr-ru</option>
          <option value="ru-en">ru-en</option>
          <option value="ru-de">ru-de</option>
          <option value="ru-ru">ru-ru</option>
        </select>
      </div>
    </>
  );
}
