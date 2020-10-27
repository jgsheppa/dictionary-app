import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Layout from './../components/Layout.tsx';
import { Basic, Combined, Animated, bounce } from '../styles/style';
// import dotenv from 'dotenv';

// require('dotenv').config();

// dotenv.config();

// const key = process.env.YANDEXAPIKEY;
const key =
  'dict.1.1.20200929T091851Z.445db0450d9781cb.57bd96bd31734ca7fe6ee693c05278dda643a9a0';

const exCall = `https://dictionary.yandex.net/api/v1/dicservice/lookup?key=${key}&lang=en-ru&text=call`;

const fetchData = fetch(
  `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=call`,
  // {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  // },
)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data.def[1].tr[1]);
    return data.def[1].tr[1];
  })
  .catch(function (error) {
    console.log(error);
  });

console.log(fetchData);

async function getTranslations() {
  const entry = await fetchData;
  return entry.text;
}

const searchTerm = getTranslations();

console.log(searchTerm);

export default function Home() {
  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>Hello World!</div>
        <div>
          <input placeholder="Search for a term"></input>
          <button>Search</button>
        </div>
        {/* <Link href={`/${searchTerm.text}`}></Link> */}
      </Layout>
    </>
  );
}
