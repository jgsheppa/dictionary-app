import { Style } from '../util/types';
import React from 'react';

const footerStyles: Style = {
  padding: '16px',
  backgroundColor: '#6121c9',
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
      <footer style={footerStyles}>Copyright 2020 - Powered by Yandex</footer>
    </>
  );
}
