import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';
import { User, Session, WordList } from './types';
import extractHerokuDatabaseEnvVars from './extractHerokuDatabaseEnvVars';

extractHerokuDatabaseEnvVars();

dotenv.config();

const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres({
        // Avoid the error below of using too many connection slots with
        // Next.js hot reloading
        //
        // Example error message:
        //
        // Error: remaining connection slots are reserved for non-replication superuser connectionsError: remaining connection slots are reserved for non-replication superuser connections
        idle_timeout: 5,
      });

export async function insertUser(user: User) {
  const requiredProperties = ['firstName', 'lastName', 'email'];
  const userProperties = Object.keys(user);

  if (userProperties.length !== requiredProperties.length) {
    return undefined;
  }

  const difference = userProperties.filter(
    (prop) => !requiredProperties.includes(prop),
  );

  if (difference.length > 0) {
    return undefined;
  }

  const users = await sql<User[]>`
    INSERT INTO users
      (first_name, last_name, email)
    VALUES
      (${user.firstName}, ${user.lastName}, ${user.email})
    RETURNING *;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  passwordHash: string,
) {
  const users = await sql<User[]>`
    INSERT INTO users
      (first_name, last_name, email, username, password_hash)
    VALUES
      (${firstName}, ${lastName}, ${email}, ${username}, ${passwordHash})
    RETURNING *;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUsers() {
  const users = await sql<User[]>`
    SELECT * FROM users;
  `;
  return users.map((u) => camelcaseKeys(u));
}

export async function getUserById(id: string) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const users = await sql<User[]>`
    SELECT * FROM users WHERE id = ${id};
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUserByUsername(username: string) {
  const users = await sql<User[]>`
    SELECT * FROM users WHERE username = ${username};
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function updateUserById(id: string, user: User) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const allowedProperties = ['firstName', 'lastName', 'email'];
  const userProperties = Object.keys(user);

  if (userProperties.length < 1) {
    return undefined;
  }

  const difference = userProperties.filter(
    (prop) => !allowedProperties.includes(prop),
  );

  if (difference.length > 0) {
    return undefined;
  }

  let users: User[] = [];

  if ('firstName' in user) {
    users = await sql<User[]>`
      UPDATE users
        SET first_name = ${user.firstName}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('lastName' in user) {
    users = await sql<User[]>`
      UPDATE users
        SET last_name = ${user.lastName}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('email' in user) {
    users = await sql<User[]>`
      UPDATE users
        SET email = ${user.email}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function deleteUserById(id: string) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const users = await sql<User[]>`
    DELETE FROM users
      WHERE id = ${id}
      RETURNING *;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    SELECT * FROM sessions WHERE token = ${token};
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function deleteSessionByToken(token: string | undefined) {
  if (typeof token === 'undefined') return;
  await sql`
    DELETE FROM sessions WHERE token = ${token};
  `;
}

export async function deleteExpiredSessions() {
  await sql`
    DELETE FROM sessions WHERE expiry_timestamp < NOW();
  `;
}

export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *;
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

// Example of a database query with an Inner Join
export async function getUserBySessionToken(token: string | undefined) {
  if (typeof token === 'undefined') return undefined;

  const users = await sql<User[]>`
    SELECT
      users.id,
      users.first_name,
      users.last_name,
      users.slug,
      users.username
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      users.id = sessions.user_id;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function insertVocabList(list: string, id: number) {
  const lists = await sql<string[]>`
 
    INSERT INTO wordlists
      (list_name, user_id_num)
    VALUES
      (${list}, ${id})
    RETURNING *;
  `;

  return lists.map((u) => camelcaseKeys(u))[0];
}

export async function getVocabLists(id: number) {
  const lists = await sql<string[]>`
    SELECT * FROM wordlists
    WHERE 
    ${id} = wordlists.user_id_num;
  `;
  return lists.map((u) => camelcaseKeys(u));
}

export async function getVocabListsById(id: number) {
  const lists = await sql<string[]>`
    SELECT wordlists_id FROM wordlists
    WHERE 
${id} = wordlists.user_id_num;
  `;
  return lists.map((u) => camelcaseKeys(u));
}

// Not sure if this works
export async function deleteListById(id: string) {
  // Return undefined if the id is not
  // in the correct format
  // if (!/^\d+$/.test(id)) return undefined;

  const lists = await sql<string[]>`
    DELETE FROM wordlists
      WHERE 
        wordlists_id=${id} 
      RETURNING *;
    
  `;
  console.log('lists', lists);
  return lists.map((u) => camelcaseKeys(u))[0];
}

export async function insertWordsToVocabList(word: string, id: number) {
  const lists = await sql<{ word: string; id: number }[]>`
 
    INSERT INTO words
      (lang_1, list_id)
    VALUES
      (${word}, ${id})
    RETURNING *;
  `;

  return lists.map((u) => camelcaseKeys(u))[0];
}

export async function deleteWordsFromList(id: string) {
  const lists = await sql<string[]>`
 DELETE FROM words
  WHERE words_id=${id}
   RETURNING *;
  `;

  return lists.map((u) => camelcaseKeys(u))[0];
}

export async function getListBySessionToken(token: string | undefined) {
  if (typeof token === 'undefined') return undefined;

  const lists = await sql<string[]>`
    SELECT
      wordlists.id,
      wordlists.list_name
    FROM
    wordlists,
      sessions
    WHERE
      sessions.token = ${token} AND
      wordlists.user_id_num = sessions.user_id;
  `;

  console.log('lists from db', lists);

  return lists.map((u) => camelcaseKeys(u))[0];
}

export async function getWordsFromVocabList() {
  const lists = await sql<string[]>`
    SELECT lang_1
    FROM 
    words,
    wordlists
    WHERE 
    words.words_id = wordlists.id;
  `;
  return lists.map((u) => camelcaseKeys(u));
}
