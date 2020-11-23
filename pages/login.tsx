import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';
import Layout from './../components/Layout';

const headerStyles = css`
  text-align: center;
  font-weight: 100;
`;
const formContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form:focus-within {
    background: #f4d35e;
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.7);
  }

  form {
    padding: 25px;
    border-radius: 4px;
    transition: all 0.3s ease;
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0);
  }

  form div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;

    label {
      display: flex;
      flex-direction: column;
    }

    label input {
      padding: 10px 30px;
      border: solid 1px #8c8c8c;
      border-radius: 4px;
      font-size: 24px;
      width: 300px;
      margin: 8px 0 40px;
    }
    label input:focus {
      outline: none !important;
      border: solid 2px #e02e2e;
    }

    button {
      color: #fff;
      padding: 10px 30px;
      text-decoration: none;
      text-align: center;
      background-color: #6121c9;
      border-radius: 4px;
      border: none;
      margin-bottom: 20px;
      width: 300px;
      font-size: 24px;
      transition: ease background-color 0.5s;
      cursor: pointer;
    }
    button:hover {
      background-color: #7838e0;
    }
    button:focus {
      outline: none !important;
      border: solid 2px #e02e2e;
    }
  }

  .register {
    text-decoration: none;
    color: #6526ca;
    font-size: 16px;
    padding: 0 4px;

    p {
      color: #6526ca;
    }
  }
  .register:focus {
    outline: none !important;
    border: solid 2px #e02e2e;
    border-radius: 4px;
  }
`;

type Props = { loggedIn: boolean; redirectDestination: string; user: string };

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout loggedIn={props.loggedIn} user={null} username={null}>
        <h1 css={headerStyles}>Sign In</h1>
        <div css={formContainerStyles}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const response = await fetch('/api/words/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
              });

              const { success } = await response.json();

              if (!success) {
                setErrorMessage('Login failed!');
              } else {
                setErrorMessage('');
                router.push(props.redirectDestination);
              }
            }}
          >
            <div>
              <label>
                Username
                <input
                  data-cy="username"
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                />
              </label>

              <label>
                Password
                <input
                  data-cy="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </label>

              <button data-cy="login">Log in</button>
            </div>
          </form>
          <Link href="/register" data-cy="go-to-register">
            <a data-cy="go-to-register" className="register">
              Don't have an account? Register here.
            </a>
          </Link>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const redirectDestination = context?.query?.returnTo ?? '/';

  if (await isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: redirectDestination,
        permanent: false,
      },
    };
  }

  return {
    props: { loggedIn: false, redirectDestination: redirectDestination },
  };
}
