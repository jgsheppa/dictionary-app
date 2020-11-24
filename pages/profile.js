import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { css } from '@emotion/core';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ListOfVocabLists from '../components/ListOfVocabLists';
import SearchBar from '../components/SearchBar';

const profileContainerStyles = css`
  display: flex;
  flex-direction: row;
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
      margin: 8px 4px 0;
    }
    input:focus {
      outline: none !important;
      border: solid 2px #e02e2e;
      border-radius: 4px;
    }
  }

  .buttonContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    height: 100px;
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

const h2Styles = css`
  font-size: 28px;
`;

const listOfVocabListsStyles = css`
  margin: 32px 0 0;
`;

const deleteButtonStyles = css`
  font-size: 16px;
  text-align: center;
  color: #fff;
  border: solid;
  border-radius: 5px;
  border-width: 2px;
  border-color: #6121c9;
  padding: 4px;
  background-color: #6121c9;
  cursor: pointer;
`;

const editButtonStyles = css`
  font-size: 16px;
  text-align: center;
  color: #fff;
  border: solid;
  border-radius: 5px;
  border-width: 2px;
  border-color: #6121c9;
  padding: 4px;
  background-color: #6121c9;
  cursor: pointer;
  margin-bottom: 8px;
`;

const buttonContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 16px;
`;

export default function Profile(props) {
  const [user, setUser] = useState(props.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const userFirstAndLast = `${
    firstName.charAt(0).toUpperCase() + firstName.slice(1)
  } ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;

  const [list, setList] = useState(props.vocabLists);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [nameOfUser, setNameOfUser] = useState(userFirstAndLast);
  const [userName, setUsername] = useState(user.username);
  const [userEmail, setUserEmail] = useState(user.email);
  const [id, setId] = useState(user.id);
  const [errorMessage, setErrorMessage] = useState('');

  function deleteList(listID, listfunction) {
    const itemToDelete = listfunction.filter(
      (info) => info.wordlistsId === listID,
    );
    const indexOfItemToDelete = listfunction.indexOf(itemToDelete[0]);

    if (indexOfItemToDelete > -1) {
      listfunction.splice(indexOfItemToDelete, 1);
    }

    setList(listfunction);
  }

  function handleToggleEdit() {
    setToggleEdit(!toggleEdit);
  }

  function handleFirstNameChange(e) {
    setFirstName(e);
  }

  function handleLastNameChange(e) {
    setLastName(e);
  }

  function handleUsernameChange(e) {
    setUsername(e);
  }

  function handleEmailChange(e) {
    setUserEmail(e);
  }

  function handleSubmit() {
    setToggleEdit(!toggleEdit);
  }

  return (
    <Layout loggedIn={props.loggedIn} username={userName}>
      <Head>
        <title>Profile</title>
      </Head>
      <div css={searchBarStyles}>
        <SearchBar></SearchBar>
      </div>
      <div css={profileContainerStyles}>
        {!toggleEdit ? (
          <aside className="userInfoStyles">
            <h2 css={h2Styles}>Profile</h2>
            <div className="userInfo">
              <b>Name:</b>
              <p>{userFirstAndLast}</p>
            </div>
            <div className="userInfo">
              <b>Username: </b>
              <p> {userName}</p>
            </div>
            <div className="userInfo">
              <b>E-mail: </b>
              <p> {userEmail}</p>
            </div>
            <div className="buttonContainer">
              <button
                css={editButtonStyles}
                data-cy="edit-user-info"
                onClick={handleToggleEdit}
              >
                Edit User Info
              </button>
              <Link href="/deleteAccount" data-cy="go-to-delete-account">
                <a css={deleteButtonStyles} data-cy="go-to-delete-account">
                  Delete Account
                </a>
              </Link>
            </div>
          </aside>
        ) : (
          <aside className="userInfoStyles">
            <h2 css={h2Styles}>Profile</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const response = await fetch(`/api/changeProfileInfo/profile`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': '*',
                  },
                  body: JSON.stringify({
                    id,
                    nameOfUser,
                    userName,
                    userEmail,
                    firstName,
                    lastName,
                  }),
                });

                const { success } = await response.json();

                if (!success) {
                  setErrorMessage('Word not added to list!');
                } else {
                  setErrorMessage('');
                  handleSubmit();
                }
              }}
            >
              <div className="userInfo">
                <b>Name:</b>
                <input
                  data-cy="edit-user-firstname"
                  value={firstName}
                  onChange={(e) => handleFirstNameChange(e.target.value)}
                />
                <input
                  data-cy="edit-user-lastname"
                  value={lastName}
                  onChange={(e) => handleLastNameChange(e.target.value)}
                />
              </div>
              <div className="userInfo">
                <b>Username: </b>
                <input
                  data-cy="edit-user-username"
                  value={userName}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                />
              </div>
              <div className="userInfo">
                <b>E-mail: </b>
                <input
                  data-cy="edit-user-email"
                  value={userEmail}
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
              </div>
              <div css={buttonContainer}>
                <button
                  css={editButtonStyles}
                  data-cy="submit-edits"
                  type="submit"
                  onSubmit={handleToggleEdit}
                >
                  Submit
                </button>
              </div>
            </form>
            <Link href="/deleteAccount" data-cy="go-to-delete-account">
              <a css={deleteButtonStyles} data-cy="go-to-delete-account">
                Delete Account
              </a>
            </Link>
          </aside>
        )}
        <div css={listOfVocabListsStyles}>
          {' '}
          <ListOfVocabLists
            deleteList={deleteList}
            list={list}
            setList={setList}
          ></ListOfVocabLists>
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
