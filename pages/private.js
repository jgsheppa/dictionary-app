import React from 'react';
import { withIronSession } from 'next-iron-session';

const PrivatePage = ({ user }) => (
  <div>
    <h1>Hello {user.email}</h1>
    <p>Secret things live here...</p>
  </div>
);

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get('user');

    if (!user) {
      res.statusCode = 404;
      res.end();
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  {
    password: process.env.APPLICATION_SECRET,
    cookieName: 'MYSITECOOKIE',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  },
);

export default PrivatePage;
