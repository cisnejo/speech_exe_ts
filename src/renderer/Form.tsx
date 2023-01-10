import {
  Button,
  InputLabel,
  Input,
  FormControl,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from '@mui/material';
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

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await postData(
      'http://127.0.0.1:5000/handle_data',
      inputs
    );
    const parsedData = JSON.parse(response);
    setServerData(parsedData);
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={HandleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="commandName"
              required
              fullWidth
              id="commandName"
              label="Command Name"
              autoFocus
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  command_name: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="path"
              label="Path"
              name="path"
              autoComplete="family-name"
              value={inputs.path}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  path: e.target.value,
                }));
              }}
            />
            <Button
              // fullWidth
              variant="outlined"
              type="button"
              sx={{ mt: 1, ml: 1 }}
              onClick={() => {
                window.electron.ipcRenderer.sendMessage('ipc-example', []);
              }}
            >
              ...
            </Button>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add Command
        </Button>
      </Box>
    </>
  );
};
