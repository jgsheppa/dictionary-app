import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { Style } from '../util/types';

const headerStyles = css`
  margin: 0 10%;
`;

const headerContainerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  margin-top: 10px;
`;

const dropdownAndProfileStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 180px;

  > div a {
    text-decoration: none;
    color: #000000;
    padding: 12px 24px;
    border: solid 2px #fff;
    border-color: #fff;
    border-radius: 4px;
    transition: border 0.2s ease-in-out;
  }

  > div a:hover {
    text-decoration: none;
    color: #000000;
    border-color: #666;
    border: solid;
    border-width: 2px;
    border-radius: 4px;
  }
`;
const navContainerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  max-width: 600px;
`;

const navStyles = css`
  font-size: 24px;
  font-weight: 300;
  margin-left: 20px;
  cursor: pointer;
`;

const dropdown = css`
  > div {
    position: relative;
    display: inline-block;
  }

  .dropdownbtn {
    background-color: #6121c9;
    color: white;
    padding: 16px;
    font-size: 24px;
    border: none;
    border-radius: 4px;
    margin-left: 2rem;
    transition: ease background-color 0.5s;
    cursor: pointer;
    transition: ease 0.3s background-color;
  }

  .dropdownbtn:hover {
    background-color: #874de4;
  }

  .dropdownbtn:focus {
    outline: none !important;
    border: solid 2px #e02e2e;
    border-radius: 4px;
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    width: 180px;
    z-index: 2;
    border: 1px solid #874de4;
    background: #f4d35e;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 8px 12px;
      }

      li:hover {
        background-color: #874de4;
        cursor: pointer;
      }
    }
    a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      border: solid #f4d35e;
      transition: font-color 0.4s, background-color 0.4s, border 0.4s, ease;
    }

    a:focus {
      outline: none !important;
      border: solid 2px #e02e2e;
      border-radius: 4px;
    }

    a:hover {
      color: #fff;
      background-color: #874de4;
    }
  }
`;

// type Props = { user: any, loggedIn: boolean, username: string };

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  const [menuOpen, setMenuopen] = useState(false);
  console.log(typeof props.username);

  function handleMenuClick() {
    setMenuopen(!menuOpen);
  }

  let container = React.createRef();

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!menuOpen) return;
    function handleClick(event) {
      if (container.current && !container.current.contains(event.target)) {
        setMenuopen(false);
      }
    }
    window.addEventListener('click', handleClick);
    // clean up
    return () => window.removeEventListener('click', handleClick);
  }, [menuOpen]);

  return (
    <>
      <Head>
        <title>WordDivan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header css={headerStyles}>
        <div css={headerContainerStyles}>
          <Link href="/">
            <a css={navStyles}>WordDivan</a>
          </Link>
          <div css={dropdownAndProfileStyles}>
            {typeof props.username === 'string' ? (
              <div>
                <Link href="/profile" data-cy="go-to-profile">
                  <a data-cy="go-to-profile">{props.username}</a>
                </Link>
              </div>
            ) : null}
            <div css={navContainerStyles}>
              <div css={dropdown}>
                <div className="container" ref={container}>
                  <button
                    tabIndex={4}
                    className="dropdownbtn"
                    onClick={handleMenuClick}
                    data-cy="hamburger-menu"
                    disabled={false}
                  >
                    ☰
                  </button>
                  {menuOpen && (
                    <div className="dropdown-content">
                      <ul>
                        <li>
                          {' '}
                          <Link href="/profile">
                            <a tabIndex={5} className="dropdownitem">
                              Profile
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/masthead">
                            <a tabIndex={6} className="dropdownitem">
                              Impressum
                            </a>
                          </Link>
                        </li>
                        <li>
                          {' '}
                          {!loggedInPassed ? null : props.loggedIn ? (
                            <Link href="/logout" data-cy="go-to-logout">
                              <a
                                data-cy="go-to-logout"
                                tabIndex={7}
                                className="dropdownitem"
                              >
                                Log out
                              </a>
                            </Link>
                          ) : (
                            <Link href="/login" data-cy="go-to-login">
                              <a
                                tabIndex={7}
                                data-cy="go-to-login"
                                className="dropdownitem"
                              >
                                Log in
                              </a>
                            </Link>
                          )}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
