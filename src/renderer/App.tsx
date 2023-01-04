import { useEffect, useReducer, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Table from './Table';
import Form from './Form';

export default function App() {
  // useEffect(() => {
  //   // calling IPC exposed from preload script
  //   window.electron.ipcRenderer.once('ipc-example', (arg) => {
  //     // eslint-disable-next-line no-console
  //     console.log(arg);
  //   });
  //   window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
  // }, []);

  const OpenProgram = async () => {
    const response = await fetch('http://127.0.0.1:5000/');
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <Form />
      <button type="button" onClick={() => OpenProgram()}>
        Speak
      </button>
      <Table />
    </div>
  );
}
