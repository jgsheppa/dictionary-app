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

  /* Show the dropdown menu on hover */
  /* > div:hover .dropdown-content {
    display: block;
  } */

  .dropdownbtn {
    background-color: #1ac23f;
    color: white;
    padding: 16px;
    font-size: 24px;
    border: none;
    border-radius: 4px;
    transition: ease background-color 0.5s;
    cursor: pointer;
  }

  /* .dropdownbtn:hover {
    background-color: #35df5a;
  } */

  .dropdown-content {
    /* display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 4px; */
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

    a:hover {
      background-color: #ddd;
    }
  }
  /* Change the background color of the dropdown button when the dropdown content is shown */
  /* .dropdown:hover .dropbtn {
    background-color: #3e8e41;
  } */
`;

type Props = { user: string; loggedIn: boolean };

export default function Header(props: Props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  const [menuOpen, setMenuopen] = useState(false);

  function handleMenuClick() {
    setMenuopen(!menuOpen);
  }

  const container = React.createRef();

  console.log('container', container);

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
                <button className="dropdownbtn" onClick={handleMenuClick}>
                  ☰
                </button>
                {menuOpen && (
                  <div className="dropdown-content">
                    <ul>
                      <li>
                        {' '}
                        <Link href="/profile">
                          <a className="dropdownitem">Profile</a>
                        </Link>
                      </li>
                      <li>
                        {' '}
                        {!loggedInPassed ? null : props.loggedIn ? (
                          <Link href="/logout">
                            <a className="dropdownitem">Log out</a>
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
