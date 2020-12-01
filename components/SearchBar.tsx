import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { css } from '@emotion/core';
import {
  setLanguage,
  getSearchInfo,
  showDictionaryWithCookieInfo,
  getFullLanguagePair,
} from './../util/cookie';

const searchComponentStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  height: 150px;
`;

const searchStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  div input {
    padding: 8px 30px;
    border: solid 2px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-size: 28px;
  }
  div input:focus {
    /* outline: none !important;
    border: solid 2px #6121c9; */
    outline: none !important;
    border: solid 2px #e02e2e;
    border-top-left-radius: 4px;
    border-top-left-radius: 4px;
  }

  div .searchLink {
    color: #fff;
    padding: 8px 28px;
    text-decoration: none;
    text-align: center;
    background-color: #6121c9;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border: solid 2px #6121c9;
    font-size: 28px;
    transition: ease 0.3s background-color;
  }

  div .searchLink:hover {
    background-color: #874de4;
  }

  div .searchLink:focus {
    outline: none !important;
    border: solid 2px #e02e2e;
    border-radius: 4px;
  }
`;

const selectStyles = css`
  select {
    display: block;
    font-size: 16px;
    font-family: Roboto, sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: 0.6em 1.4em 0.5em 0.8em;
    width: 225px;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
    border-radius: 0.5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
  select::-ms-expand {
    display: none;
  }
  select:hover {
    border-color: #888;
  }
  select:focus {
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none !important;
    border: solid 2px #e02e2e;
    border-radius: 4px;
  }
  select option {
    font-weight: normal;
  }

  *[dir='rtl'] select,
  :root:lang(ar) select,
  :root:lang(iw) select {
    background-position: left 0.7em top 50%, 0 0;
    padding: 0.6em 0.8em 0.5em 1.4em;
  }

  /* Disabled styles */
  select:disabled,
  select[aria-disabled='true'] {
    color: graytext;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  }
  select:disabled:hover,
  select[aria-disabled='true'] {
    border-color: #aaa;
  }
`;

type Props = {
  data: any;
  setWord: any;
};

export default function SearchBar({ data, setWord }) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // let cookie = getSearchInfo();
  const [cookieState, setCookieState] = useState(getSearchInfo());
  const [entireLanguagePair, setEntireLanguagePair] = useState(
    getFullLanguagePair(),
  );

  // let fullDictionaryName = showDictionaryWithCookieInfo(cookieState.language);
  // console.log(fullDictionaryName);

  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    data ? setWord(data.def) : null;
  };

  return (
    <>
      <div css={searchComponentStyles}>
        <div css={selectStyles}>
          <select
            aria-label="dictionary choice dropdown"
            tabIndex={1}
            onChange={(e) => {
              setLanguage(e.target.value);
              showDictionaryWithCookieInfo(cookieState.language);
            }}
            data-cy="change-language"
          >
            <option value="en-ru">Select a dictionary</option>
            <option value="de-en">German - English</option>
            <option value="de-ru">German - Russian</option>
            <option value="en-de">English - German</option>
            <option value="en-fr">English - French</option>
            <option value="en-it">English - Italian</option>
            <option data-cy="en-ru" value="en-ru">
              English - Russian
            </option>
            <option value="fr-en">French - English</option>
            <option value="fr-ru">French - Russian</option>
            <option value="it-en">Italian - English</option>
            <option value="ru-en">Russian - English</option>
            <option value="ru-de">Russian - German</option>
            <option value="ru-fr">Russian - French</option>
          </select>
        </div>
        <div css={searchStyles}>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                searchTerm === ''
                  ? router.push(`/words/`)
                  : router.push(`/words/${searchTerm}`);
              }}
            >
              <input
                aria-label="search bar"
                tabIndex={2}
                type="text"
                value={searchTerm}
                placeholder="Search for a term"
                onChange={handleTermChange}
                onKeyPress={handleKeypress}
                data-cy="search-for-term"
              />
            </form>
          </div>
          <div>
            {' '}
            <a
              data-cy="search"
              type="submit"
              tabIndex={3}
              href={`/words/${searchTerm}`}
              className="searchLink"
            >
              Search
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
