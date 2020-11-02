import { useRouter } from 'next/router';
import React, { useState } from 'react';

type Props = {
  handleClick;
  wordList;
  searchTerm;
  vocabLists;
  user;
};

export default function Popup(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [newListName, setNewListName] = useState('');
  const [id, setId] = useState(props.user.id);
  const [wordList, setWordList] = useState(props.vocabLists);
  const totalList = [...wordList, { newListName }];

  console.log('vocab', totalList);

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={props.handleClick}></span>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const response = await fetch(`/api/words/${props.searchTerm}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ newListName, id }),
            });

            const { success } = await response.json();

            if (!success) {
              setErrorMessage('Login failed!');
            } else {
              setErrorMessage('');
              // router.push(props.redirectDestination);
            }
          }}
        >
          <h3>List</h3>
          <div>
            {wordList.map((name) => {
              return (
                <div key={name.id}>
                  <input type="checkbox" />
                  <div>{name.listName}</div>
                </div>
              );
            })}
          </div>
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
