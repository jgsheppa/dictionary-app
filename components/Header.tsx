import Head from 'next/head';
import Link from 'next/link';
import { Style } from '../util/types';

const headerStyles: Style = {
  margin: '0 10%',
};

const headerContainerStyles: Style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
  marginTop: '10px',
};

const navContainerStyles: Style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignContent: 'center',
  maxWidth: '600px',
};

const navStyles: Style = {
  fontSize: '24px',
  fontWeight: '300',
  marginLeft: '20px',
};

export default function Header() {
  return (
    <>
      <Head>
        <title>Trans-Diwan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header style={headerStyles}>
        <div style={headerContainerStyles}>
          <Link href="/">
            <a style={navStyles}>TransDiwan</a>
          </Link>
          <div style={navContainerStyles}>
            <Link href="/">
              <a style={navStyles}>Word of the Day</a>
            </Link>
            <Link href="/login">
              <a style={navStyles}>Log In</a>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
