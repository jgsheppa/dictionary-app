import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from './../components/Layout.tsx';
import { Basic, Combined, Animated, bounce } from '../styles/style';
import { Formik, Field, Form } from 'formik';
import React, { useRef } from 'react';
import { useRouter } from 'next/router';

const SignInPage = () => {
  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    const response = await fetch('/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return router.push('/private');
    }
  };
};

export default function Login() {
  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>Login</div>
        <div>
          <Formik
            initialValues={{ name: '', email: '' }}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <Field name="email" type="email" />
              <Field name="password" type="password" />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </Layout>
    </>
  );
}
