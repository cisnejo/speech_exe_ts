import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './App.css';
import { Table } from './Table';
import { Form } from './Form';
import { Grid } from './Grid';

export default function App() {
  const [serverData, setserverData] = useState([]);

  const OpenProgram = async () => {
    const response = await fetch('http://127.0.0.1:5000/');
    const data = await response.json();
    if (!data) {
      return console.log('command not listed');
    }
    return console.log(data);
  };

  return (
    <div>
      <Form serverData={serverData} setServerData={setserverData} />
      <Button onClick={() => OpenProgram()}>Speak</Button>
      <Grid serverData={serverData} setServerData={setserverData} />
    </div>
  );
}
