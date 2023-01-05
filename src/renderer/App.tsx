import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import { Table } from './Table';
import { Form } from './Form';

export default function App() {
  const [serverData, setserverData] = useState({ nodes: [] });

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
      <Button
        variant="outline-primary"
        type="button"
        onClick={() => OpenProgram()}
      >
        Speak
      </Button>
      <Table serverData={serverData} setServerData={setserverData} />
    </div>
  );
}
