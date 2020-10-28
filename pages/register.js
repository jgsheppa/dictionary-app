import Head from 'next/head';
import Layout from './../components/Layout.tsx';
import { Formik, Field, Form } from 'formik';
import { registerFormStyles } from '../styles/style';
import { css } from '@emotion/core';

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
              <div>
                <div className="registerFormStyles">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter a Valid E-mail Address"
                  />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Create a Password"
                  />
                  {/* <Field name="password" type="password" /> */}
                  <button type="submit">Submit</button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </Layout>
    </>
  );
}
