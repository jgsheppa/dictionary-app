import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import cookies from 'js-cookie';
import { getImageUrl } from '../util/cookie';

const CLIENT_ID =
  '590521728726-33qsv0pqr8qfsta3knjeompp5b92tnpr.apps.googleusercontent.com';

export default function GoogleBtn() {
  const router = useRouter();
  const [error, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState({
    loggedIn: false,
    accessToken: '',
  });

  const [imageUrl, setImageUrl] = useState('');

  function googleLogin(response) {
    if (response.accessToken) {
      cookies.set('userImage', response.profileObj.imageUrl);
      setImageUrl(getImageUrl());
      setIsLoggedIn({
        loggedIn: true,
        accessToken: response.accessToken,
      });
    }
  }

  async function saveUserData(userGoogleData) {
    let userProfileInfo = userGoogleData.profileObj;
    const externalLoginType = userGoogleData.tokenObj.idpId;
    userProfileInfo['externalType'] = externalLoginType;

    const googleToken = userGoogleData.tokenObj.access_token;

    const response = await fetch('/api/authentication/googleLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userProfileInfo, googleToken }),
    });

    const { success } = await response.json();

    if (!success) {
      setErrorMessage('Login failed!');
    } else {
      setErrorMessage('');
      router.push('/');
    }
  }

  async function fullLogin(e) {
    googleLogin(e);
    await saveUserData(e);
  }

  function logout(response) {
    setIsLoggedIn({
      loggedIn: false,
      accessToken: '',
    });
  }

  function handleLoginFailure(response) {
    alert('Failed to log in');
  }

  function handleLogoutFailure(response) {
    alert('Failed to log out');
  }

  return (
    <div>
      {isLoggedIn.loggedIn ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                padding: '10px 30px',
                borderRadius: '4px',
                width: '300px',
                fontSize: '24px',
                color: '#666',
                cursor: 'pointer',
              }}
            >
              <img
                src="/google_svg.png"
                style={{ width: '36px', height: '36px', marginRight: '40px' }}
              ></img>
              Google Login{' '}
            </button>
          )}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={(e) => {
            fullLogin(e);
          }}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          responseType="code,token"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                padding: '10px 30px',
                borderRadius: '4px',
                width: '300px',
                fontSize: '24px',
                color: '#666',
                cursor: 'pointer',
              }}
            >
              <img
                src="/google_svg.png"
                style={{ width: '36px', height: '36px', marginRight: '40px' }}
              ></img>
              Google Login{' '}
            </button>
          )}
        />
      )}
    </div>
  );
}
