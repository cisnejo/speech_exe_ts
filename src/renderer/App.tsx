import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './App.css';
import { Table } from './Table';
import { Form } from './Form';
import { Grid } from './Grid';
import ICommandProps from './ICommandProps';
import ICommand from './ICommand';

export default function App() {
  const [serverData, setserverData] = useState<ICommand[]>([]);

  const OpenProgram = async () => {
    const response = await fetch('http://127.0.0.1:5000/open');
    const data = await response.json();
    if (!data) {
      return console.log('command not listed');
    }
    return console.log(data);
  };

  return (
    <div>
      <Button onClick={() => OpenProgram()}>Speak</Button>
      <Form serverData={serverData} setServerData={setserverData} />
      <Grid serverData={serverData} setServerData={setserverData} />
    </div>
  );
}
