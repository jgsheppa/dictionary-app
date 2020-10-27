import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from './../components/Layout.tsx';
import { Basic, Combined, Animated, bounce } from '../styles/style';
import { Formik, Field, Form } from 'formik';

export default function Login() {
  return (
    <>
      <Head>
        <title>TransDiwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>Register</div>
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
              <Field name="password" type="password" />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </Layout>
    </>
  );
}
