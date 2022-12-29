import { useEffect, useReducer, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

const Hello = () => {
  const [inputs, setInputs] = useState({ command_name: '', path: '' });
  const [tableRows, setTableRows] = useState([]);

  // useEffect(() => {
  //   // calling IPC exposed from preload script
  //   window.electron.ipcRenderer.once('ipc-example', (arg) => {
  //     // eslint-disable-next-line no-console
  //     console.log(arg);
  //   });
  //   window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
  // }, []);

  const TableRows = (parsed_data: any) => {
    return parsed_data.map((command_data: any, index: number) => {
      return (
        <tr key={command_data.command}>
          <td>{command_data.command}</td>
          <td>{command_data.path}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    async function GetData() {
      const response = await fetch('http://127.0.0.1:5000/records');
      const data = await response.json();
      const parsedData = JSON.parse(data);
      setTableRows(TableRows(parsedData));
    }
    GetData();
  }, []);

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
  const HandleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const response = await postData(
      'http://127.0.0.1:5000/handle_data',
      inputs
    );
    console.log(response);
  };

  const OpenProgram = async () => {
    const response = await fetch('http://127.0.0.1:5000/');
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>

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
          Path{' '}
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

        <button type="submit" onClick={(e) => HandleSubmit(e)}>
          Add Command
        </button>
      </form>
      <button type="button" onClick={() => OpenProgram()}>
        Speak
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
