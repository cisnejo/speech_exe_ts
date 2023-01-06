import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import ICommandProps from './ICommandProps';

// eslint-disable-next-line import/prefer-default-export
export const Form: React.FC<ICommandProps> = ({
  setServerData,
}: ICommandProps) => {
  const [inputs, setInputs] = useState({ command_name: '', path: '' });

  useEffect(() => {
    window.electron.ipcRenderer.on('ipc-example', (path: any) => {
      setInputs((prevState) => ({
        ...prevState,
        path: path.filePaths[0],
      }));
    });
  }, []);

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

    const parsedData = JSON.parse(response);
    setServerData(parsedData);
  };
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="command_name">Command Name </InputLabel>
        <Input
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
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="command_name">Path</InputLabel>
        <Input
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
        <Button
          type="button"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('ipc-example', []);
          }}
        >
          ...
        </Button>
      </FormControl>
      <Button type="submit" onClick={(e) => HandleSubmit(e)}>
        Add Command
      </Button>
    </>
  );
};
