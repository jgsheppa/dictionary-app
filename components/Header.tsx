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
    transition: ease background-color 0.5s;
    cursor: pointer;
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
    width: 300px;
    z-index: 2;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 8px 12px;
      }

      li:hover {
        background-color: rgba(0, 0, 0, 0.14);
        cursor: pointer;
      }
    }
    a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }

    a:focus {
      outline: none !important;
      border: solid 2px #e02e2e;
      border-radius: 4px;
    }

    a:hover {
      background-color: #ddd;
    }
  }
`;

type Props = { user: string; loggedIn: boolean };

export default function Header(props: Props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  const [menuOpen, setMenuopen] = useState(false);

  function handleMenuClick() {
    setMenuopen(!menuOpen);
  }

  const container = React.createRef();

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
        <title>WordDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header css={headerStyles}>
        <div css={headerContainerStyles}>
          <Link href="/">
            <a css={navStyles}>WordDiwan</a>
          </Link>
          <div css={navContainerStyles}>
            <div css={dropdown}>
              <div className="container" ref={container}>
                <button
                  tabIndex={4}
                  className="dropdownbtn"
                  onClick={handleMenuClick}
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
                        {' '}
                        {!loggedInPassed ? null : props.loggedIn ? (
                          <Link href="/logout">
                            <a tabIndex={6} className="dropdownitem">
                              Log out
                            </a>
                          </Link>
                        ) : (
                          <Link href="/login">
                            <a className="dropdownitem">Log in</a>
                          </Link>
                        )}
                      </li>
                    </ul>
                    {/* /* <div className="dropdown-content">
                  <Link href="/profile">
                    <a className="dropdownitem">Profile</a>
                  </Link>{' '}
                  {!loggedInPassed ? null : props.loggedIn ? (
                    <Link href="/logout">
                      <a className="dropdownitem">Log out</a>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <a className="dropdownitem">Log in</a>
                    </Link>
                  )}
                </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
