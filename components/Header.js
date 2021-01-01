import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import cookies from 'js-cookie';
import { css } from '@emotion/core';
import { getImageUrl } from '../util/cookie';

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
    transition: border 0.3s ease;
  }

  > div a:hover {
    text-decoration: none;
    color: #000000;
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
    border: solid 2px #6121c9;
    border-radius: 4px;
    margin-left: 2rem;
    cursor: pointer;
    transition: 0.3s background-color ease;
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
      border: none;
      /* border: solid #f4d35e; */
      transition: font-color 0.3s, background-color 0.3s, border 0.3s, ease;
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

  function handleMenuClick() {
    setMenuopen(!menuOpen);
  }

  const profilePhotoUrl = getImageUrl();

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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '200px',
            }}
          >
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
                              <Link href="/logout">
                                <a
                                  data-cy="go-to-logout"
                                  tabIndex={7}
                                  className="dropdownitem"
                                  onClick={() => cookies.set('userImage', '')}
                                >
                                  Log out
                                </a>
                              </Link>
                            ) : (
                              <Link href="/login">
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
            {profilePhotoUrl.length > 0 && (
              <Link href="/profile">
                <a>
                  <img
                    style={{
                      borderRadius: '50%',
                      height: '60px',
                      width: '60px',
                      marginTop: '4px',
                    }}
                    src={profilePhotoUrl}
                  />
                </a>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
