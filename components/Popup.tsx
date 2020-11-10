import { useRouter } from 'next/router';
import React, { useState } from 'react';

type Props = {
  wordList;
  searchTerm;
  vocabLists;
  user;
  listId;
};

export default function Popup(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [newListName, setNewListName] = useState('');
  const [id, setId] = useState(props.user.id);
  console.log('this is the id', id);
  const [wordList, setWordList] = useState(props.vocabLists);
  const [list, setList] = useState([]);
  const [term, setTerm] = useState(props.searchTerm);
  const [checked, setChecked] = useState(false);

  console.log('is checked', checked);

  let wholeList = [...wordList];

  console.log('push', wordList);

  function handelSubmit() {
    wholeList.push({ listName: newListName });
    setWordList(wholeList);
  }

  function handleCheckBox(e, id) {
    if (e.target.id === id) {
      setChecked(!checked);
    }
  }

  return (
    <div className="modal">
      <div className="modal_content">
        {/* <span className="close" onClick={props.handleClick}></span> */}
        <h3>List</h3>
        <div>
          {wordList.map((name) => {
            return (
              <div key={name.id}>
                <input
                  type="checkbox"
                  checked={checked}
                  id={id}
                  value={name.value}
                  onChange={async (e) => {
                    e.preventDefault();

                    // let wordListId = name.id;
                    const listName = e.target.value;
                    const response = await fetch(`/api/words/${term}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': '*',
                      },
                      body: JSON.stringify({
                        listName,
                        id,
                      }),
                    });

                    const { success } = await response.json();

                    if (!success) {
                      setErrorMessage('Word not added to list!');
                    } else {
                      setErrorMessage('');
                      handleCheckBox(e.target.id, name.id);
                    }
                  }}
                />
                <label>{name.listName}</label>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const response = await fetch(`/api/words/${term}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept-Language': '*',
              },
              body: JSON.stringify({
                newListName,
                id,
              }),
            });

            const { success } = await response.json();

            if (!success) {
              setErrorMessage('Word not added to list!');
            } else {
              setErrorMessage('');
              handelSubmit();
            }
          }}
        >
          <label>
            New List:
            <input
              type="text"
              name="name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
