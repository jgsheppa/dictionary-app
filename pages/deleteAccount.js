import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

const profileContainerStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 200px;

  aside {
    background-color: #ece9e9;
    height: 400px;
    margin-top: 32px;
  }

  .userInfoStyles {
    padding: 12px 20px;
    border-radius: 8px;
  }

  .userInfo {
    b {
      font-size: 20px;
      margin: 8px 0;
    }

    p {
      font-size: 20px;
      margin: 0 0 16px;
    }
    input {
      padding: 4px 12px;
      border: solid 1px #8c8c8c;
      border-radius: 4px;
      font-size: 20px;
      width: 100px;
      margin: 8px 0 0;
    }
    input:focus {
      outline: none !important;
      border: solid 2px #e02e2e;
      border-radius: 4px;
    }
  }
`;

const searchBarStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-bottom: solid 2px #666;
  padding: 0 0 28px;
`;

const deleteButtonStyles = css`
  font-size: 16px;
  text-align: center;
  color: #fff;
  border: solid;
  border-radius: 5px;
  border-width: 2px;
  border-color: #ff3a3a;
  padding: 4px;
  background-color: #ff3a3a;
  cursor: pointer;
`;

export default function Profile(props) {
  const [user, setUser] = useState(props.user);

  const [userName, setUsername] = useState(user.username);
  const [id, setId] = useState(user.id);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Layout loggedIn={props.loggedIn} username={userName}>
      <Head>
        <title>Profile</title>
      </Head>
      <div css={searchBarStyles}>
        <SearchBar></SearchBar>
      </div>
      <div>
        <div css={profileContainerStyles}>
          <label>A List of Reasons to Delete Your Account</label>
          <ul>
            <li>It's not me, it's you</li>
            <li>You're seeing another dictionary</li>
            <li>You like pushing the red button</li>
            <li>You never want to see your friends again...</li>
            <li>...wait, this isn't a social media site</li>
          </ul>
          {/* <form> */}
          <Link href="/logout" data-cy="delete-profile">
            <a
              css={deleteButtonStyles}
              data-cy="delete-profile"
              onClick={async (e) => {
                const response = await fetch(
                  `/api/changeProfileInfo/deleteAccount`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept-Language': '*',
                    },
                    body: JSON.stringify({
                      id,
                    }),
                  },
                );

                const { success } = await response.json();

                if (!success) {
                  setErrorMessage('Word not added to list!');
                } else {
                  setErrorMessage('');
                }
              }}
            >
              Delete Your Account, Like, Really - Forever
            </a>
          </Link>

          {/* </form> */}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const searchTerm = encodeURIComponent(context.query.id);
  const key = process.env.customKey;
  const currentLanguage = nextCookies(context).language?.language;
  const { getVocabLists, getUserBySessionToken } = await import(
    '../util/database'
  );

  const res = await fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${currentLanguage}&text=${searchTerm}`,
  );
  const data = await res.json();

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  const user = await getUserBySessionToken(token);
  const vocabLists = await getVocabLists(user?.id);

  console.log(vocabLists);

  return { props: { user, loggedIn, vocabLists, searchTerm, data } };
}
