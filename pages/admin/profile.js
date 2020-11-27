import { css } from '@emotion/core';

const profileContainerStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 200px;

  aside {
    background-color: #ece9e9;
    height: 540px;
    margin-top: 32px;
  }

  .userInfoStyles {
    padding: 12px 20px;
    border-radius: 8px;
  }

  .userInfo {
    display: flex;
    flex-direction: column;

    label {
      margin-top: 8px;
      b {
        font-size: 20px;
        margin: 8px 0;
      }
    }

    p {
      font-size: 20px;
      margin: 0 0 16px;
    }
    input {
      padding: 4px 12px;
      border: solid 1px #8c8c8c;
      border-radius: 4px;
      font-size: 20px;
      width: 200px;
      margin: 8px 4px 0;
    }
    input:focus {
      outline: none !important;
      border: solid 2px #e02e2e;
      border-radius: 4px;
    }
  }

  .buttonContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    height: 100px;
  }
`;

const searchBarStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-bottom: solid 2px #666;
  padding: 0 0 28px;
`;

const h2Styles = css`
  font-size: 28px;
`;

const listOfVocabListsStyles = css`
  margin: 32px 0 0;
`;

const deleteButtonStyles = css`
  font-size: 16px;
  text-align: center;
  color: #fff;
  border: solid;
  border-radius: 5px;
  border-width: 2px;
  border-color: #6121c9;
  padding: 4px;
  background-color: #6121c9;
  cursor: pointer;
`;

const editButtonStyles = css`
  font-size: 16px;
  text-align: center;
  color: #fff;
  border: solid;
  border-radius: 5px;
  border-width: 2px;
  border-color: #6121c9;
  padding: 4px;
  background-color: #6121c9;
  cursor: pointer;
  margin-bottom: 8px;
`;

const buttonContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 16px;
`;
