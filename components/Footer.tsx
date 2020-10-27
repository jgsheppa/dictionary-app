import { Style } from '../util/types';

const footerStyles: Style = {
  padding: '20px',
  backgroundColor: '#000',
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
  color: 'white',
  textAlign: 'center',
};

export default function Footer() {
  return (
    <>
      <footer style={footerStyles}>Copyright 2020</footer>
    </>
  );
}
