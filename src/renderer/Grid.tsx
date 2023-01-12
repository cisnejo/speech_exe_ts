import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ICommandProps from './ICommandProps';
import useFetch from './useFetch';
import ICommand from './ICommand';

// eslint-disable-next-line import/prefer-default-export
export const Grid: React.FC<ICommandProps> = ({
  serverData,
  setServerData,
}: ICommandProps) => {
  const [deletedRows, setDeletedRows] = useState([]);
  const { data, isPending, error } = useFetch('http://127.0.0.1:5000/records');
  const handleRowSelection = (ids: any) => {
    setDeletedRows(ids);
  };

  useEffect(() => {
    setServerData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  async function postData(url = '', bodyData = {}) {
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
      body: JSON.stringify(bodyData), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const HandleDelete = async () => {
    const idList = { id_list: deletedRows };
    if (idList.id_list.length > 0) {
      const response = await postData(`http://127.0.0.1:5000/deletes`, idList);

      if (response.status !== '400') {
        const commandList = await response.list;
        const parsedData = await JSON.parse(commandList);
        setServerData(parsedData);
        return null;
      }
      console.log(response);
      return null;
    }
    console.log('no data selected for deletion');
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
      flex: 1,
      editable: true,
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={serverData}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(itm) => handleRowSelection(itm)}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
      <Button onClick={HandleDelete}>Delete</Button>
    </Box>
  );
};
