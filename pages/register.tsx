import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from './../components/Layout';
import { useState } from 'react';
import { User } from '../util/types';
import { registerFormStyles } from '../styles/style';
import { css } from '@emotion/core';
import { isSessionTokenValid } from './../util/auth';

type Props = {
  token;
  loggedIn;
  users;
};

const headerStyles = css`
  font-family: Roboto, 'Helvetica Neue', sans-serif;
  text-align: center;
  font-size: 32px;
  font-weight: 100;
`;

const formContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -24px 0 100px;

  form:focus-within {
    background: #f4d35e;
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.7);
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 24px 24px;
    border-radius: 4px;
    transition: all 0.3s ease;
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0);

    label {
      display: flex;
      flex-direction: column;
      margin-top: 28px;
    }

    label input {
      padding: 8px 24px;
      border: solid 1px #8c8c8c;
      border-radius: 4px;
      font-size: 24px;
      width: 300px;
      margin: 8px 0 0;
    }
    label input:focus {
      outline: none !important;
      border: solid 2px #e02e2e;
      border-radius: 4px;
    }

    button {
      color: #fff;
      padding: 10px 30px;
      text-decoration: none;
      text-align: center;
      background-color: #6121c9;
      border-radius: 4px;
      border: none;
      width: 300px;
      font-size: 24px;
      transition: ease background-color 0.5s;
      cursor: pointer;
    }
    button:hover {
      background-color: #874de4;
    }
    button:focus {
      outline: none !important;
      border: solid 2px #e02e2e;
      border-radius: 4px;
    }
  }

  .checkIfUserExists {
    color: #e02e2e;
    font-size: 16px;
    margin: 8px 0 0;
  }

  .last-input {
    margin-bottom: 24px;
  }
`;

const buttonStyles = css`
  button {
    color: #fff;
    padding: 10px 30px;
    text-decoration: none;
    text-align: center;
    background-color: #6121c9;
    border-radius: 4px;
    border: none;
    width: 300px;
    font-size: 24px;
    transition: ease background-color 0.5s;
    cursor: pointer;
  }

  button:hover {
    background-color: #35df5a;
  }
`;

export default function Register(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const arrayOfUsernames = props.users.map((user) => user.username);

  console.log('users', arrayOfUsernames);
  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout loggedIn={props.loggedIn} user={null} username={null}>
        <h1 css={headerStyles}>Create an Account</h1>
        <div css={formContainerStyles}>
          <form
            onSubmit={async (e) => {
              // Prevent the default browser behavior of forms
              e.preventDefault();

              if (arrayOfUsernames.includes(username)) {
                window.alert('This username already exists.');
              } else {
                // Send the username, password and token to the
                // API route
                const response = await fetch('/api/words/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    username: username,
                    password: password,
                    token: props.token,
                  }),
                });

                const { success } = await response.json();

                if (success) {
                  // Redirect to the homepage if successfully registered
                  router.push('/');
                } else {
                  // If the response status code (set using response.status()
                  // in the API route) is 409 (Conflict) then show an error
                  // message that the user already exists
                  if (response.status === 409) {
                    setErrorMessage('User already exists!');
                  } else {
                    setErrorMessage('Failed!');
                  }
                }
              }
            }}
          >
            <label>
              First Name
              <input
                tabIndex={7}
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
              />
            </label>
            <label>
              Last Name
              <input
                tabIndex={8}
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
              />
            </label>
            <label>
              E-mail
              <input
                tabIndex={9}
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </label>
            <label>
              Username
              <input
                tabIndex={10}
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
              {arrayOfUsernames.includes(username) ? (
                <div className="checkIfUserExists">
                  This user already exists
                </div>
              ) : null}
            </label>
            <label>
              Password
              <input
                tabIndex={11}
                type="password"
                className="last-input"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
            <button tabIndex={12} css={buttonStyles}>
              Create Account
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getUsers } = await import('../util/database');
  // Import and instantiate a CSRF tokens helper
  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;
  // const { session: token } = nextCookies(context);
  const users = await getUsers();
  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  // Create a CSRF token based on the secret
  const token = tokens.create(secret);
  const loggedIn = await isSessionTokenValid(token);
  return { props: { token, loggedIn, users } };
}
