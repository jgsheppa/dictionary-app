import Head from 'next/head';
import Layout from './../components/Layout.tsx';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { verbStylesUnvollendet, verbStylesVollendet } from '../styles/style';

export default function Home(props) {
  const [word, setWord] = useState(props.data.def);
  console.log(word);

  if (!word) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          {word.map((entry) => {
            return (
              <div>
                <div
                  key={entry.id}
                  style={
                    verbStylesUnvollendet
                    // () => {
                    //   entry.asp === 'несов'
                    //     ? { verbStylesUnvollendet }
                    //     : { verbStylesVollendet };
                    // }
                    // if (entry.asp === 'несов') {
                    //   verbStylesUnvollendet;
                    // } else {
                    //   verbStylesVollendet;
                    // }
                  }
                >
                  {entry.tr.map((translation) => {
                    if (translation.pos === 'noun') {
                      return (
                        <div>
                          <div>{translation.text}</div>
                          <div>{translation.asp}</div>
                        </div>
                      );
                    } else if (translation.pos === 'verb') {
                      return (
                        <div style={verbStylesVollendet}>
                          <div>{translation.text}</div>
                          <div>{translation.asp}</div>
                        </div>
                      );
                    } else if (translation.pos === 'adjective') {
                      return (
                        <div>
                          <div>{translation.text}</div>
                          <div>{translation.asp}</div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const searchTerm = context.query.word;
  const key = process.env.customKey;

  const res = await fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${searchTerm}`,
  );
  const data = await res.json();

  return {
    props: {
      searchTerm,
      data,
    },
  };
}
