import { useEffect, useState } from 'react';

export default function Form() {
  const [inputs, setInputs] = useState({ command_name: '', path: '' });
  window.electron.ipcRenderer.once('ipc-example', (path: any) => {
    setInputs((prevState) => ({
      ...prevState,
      path: path.filePaths[0],
    }));

    // eslint-disable-next-line no-console
    // console.log(arg);
  });

  const HandleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    const response = await postData(
      'http://127.0.0.1:5000/handle_data',
      inputs
    );
    console.log(response);
  };
  return (
    <form method="post">
      <label htmlFor="command_name">
        Command Name
        <input
          type="text"
          name="command_name"
          value={inputs.command_name}
          onChange={(e) => {
            setInputs((prevState) => ({
              ...prevState,
              command_name: e.target.value,
            }));
          }}
        />
      </label>

      <label htmlFor="command_name">
        <input
          type="text"
          name="path"
          value={inputs.path}
          onChange={(e) => {
            setInputs((prevState) => ({
              ...prevState,
              path: e.target.value,
            }));
          }}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('ipc-example', []);
        }}
      >
        button
      </button>
      <button type="submit" onClick={(e) => HandleSubmit(e)}>
        Add Command
      </button>
    </form>
  );
}
