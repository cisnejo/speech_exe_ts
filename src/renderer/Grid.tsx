import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Alert,
  CircularProgress,
  LinearProgress,
  Snackbar,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ICommandProps from './ICommandProps';
import ICommand from './ICommand';
import useFetch from './useFetch';
import usePost from './usePost';

interface CommandList {
  list: string;
}
// eslint-disable-next-line import/prefer-default-export
export const Grid: React.FC<ICommandProps> = ({
  serverData,
  setServerData,
}: ICommandProps) => {
  const [deletedRows, setDeletedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const { data: getData, isPending } = useFetch(
    'http://127.0.0.1:5000/records'
  );
  const { postData } = usePost('http://127.0.0.1:5000/deletes', {
    id_list: deletedRows,
  });
  const handleRowSelection = (ids: any) => {
    setDeletedRows(ids);
  };

  useEffect(() => {
    setServerData(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  const HandleDelete = async () => {
    const idList = { id_list: deletedRows };
    if (idList.id_list.length > 0) {
      const commandList = (await postData(idList)) as unknown as CommandList;
      const parsedData = await JSON.parse(commandList.list);
      setServerData(parsedData);
      setOpen(true);
    }

    return null;
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
        loading={isPending}
        components={{
          LoadingOverlay: LinearProgress,
        }}
      />
      <Button onClick={HandleDelete}>Delete</Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Item(s) deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};
