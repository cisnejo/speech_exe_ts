import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import ICommandProps from './ICommandProps';

interface ICommand {
  id: number;
  command: string;
  path: string;
}

// eslint-disable-next-line import/prefer-default-export
export const Grid: React.FC<ICommandProps> = ({
  serverData,
  setServerData,
}: ICommandProps) => {
  const [deletedRows, setDeletedRows] = useState<any[]>([]);

  const handleRowSelection = (e: any) => {
    setDeletedRows([
      ...deletedRows,
      ...serverData.filter((r: any) => r.id === e.data.id),
    ]);
  };
  const handlePurge = () => {
    setServerData(
      serverData.filter(
        (r: any) => deletedRows.filter((sr) => sr.id === r.id).length < 1
      )
    );
  };
  useEffect(() => {
    async function GetData() {
      const response = await fetch('http://127.0.0.1:5000/records');
      const data = await response.json();
      const parsedData = JSON.parse(data);
      setServerData(parsedData);
      console.log(parsedData);
    }
    GetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const DeleteItem = async (id: number) => {
    const response = await postData(`http://127.0.0.1:5000/delete/${id}`);
    const parsedData = JSON.parse(response);
    setServerData(parsedData);
    return null;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'command',
      headerName: 'Command Name',
      width: 150,
      editable: true,
    },
    {
      field: 'path',
      headerName: 'Path',
      width: 150,
      editable: true,
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={serverData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};
