import { keyframes, css, Global } from '@emotion/core';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0 2rem;
        margin: 0;
        min-height: 100%;
        font-family: Roboto, sans-serif;
        font-size: 24px;
      }
    `}
  />
);

export const verbStylesUnvollendet = css`
  border: double;
  border-color: #fae36e;
`;

export const basicStyles = css`
  background-color: white;
  color: cornflowerblue;
  border: 1px solid lightgreen;
  border-right: none;
  border-bottom: none;
  box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
  transition: all 0.1s linear;
  margin: 3rem 0;
  padding: 1rem 0.5rem;
`;

export const registerFormStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const hoverStyles = css`
  &:hover {
    color: white;
    background-color: lightgray;
    border-color: aqua;
    box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
  }
`;
export const bounce = keyframes`
  from {
    transform: scale(1.01);
  };
  to {
    transform: scale(0.99);
  };
`;
