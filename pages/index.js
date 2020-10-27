import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Layout from './../components/Layout.tsx';
import { Basic, Combined, Animated, bounce } from '../styles/style';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm);

  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>Hello World!</div>
        <div>
          <input
            value={searchTerm}
            placeholder="Search for a term"
            onChange={handleTermChange}
          ></input>
          <Link href={`/${searchTerm}`}>
            <a>Search</a>
          </Link>
        </div>
        {/* <Link href={`/${searchTerm.text}`}></Link> */}
      </Layout>
    </>
  );
}
