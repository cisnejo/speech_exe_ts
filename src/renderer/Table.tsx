import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getTheme,
} from '@table-library/react-table-library/chakra-ui';
import { useEffect } from 'react';
import ICommandProps from './ICommandProps';

interface ICommand {
  id: number;
  command: string;
  path: string;
}

// eslint-disable-next-line import/prefer-default-export
export const Table: React.FC<ICommandProps> = ({
  serverData,
  setServerData,
}: ICommandProps) => {
  useEffect(() => {
    async function GetData() {
      const response = await fetch('http://127.0.0.1:5000/records');
      const data = await response.json();
      const parsedData = JSON.parse(data);
      setServerData({ nodes: parsedData });
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
    setServerData({ nodes: parsedData });
    return null;
  };

  const customTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(customTheme);

  const COLUMNS = [
    {
      label: 'ID',
      renderCell: (item: ICommand) => item.id,
    },
    { label: 'Command', renderCell: (item: ICommand) => item.command },
    {
      label: 'Path',
      renderCell: (item: ICommand) => item.path,
    },
    {
      label: 'Delete',
      renderCell: (item: ICommand) => (
        <button type="button" onClick={() => DeleteItem(item.id)}>
          X
        </button>
      ),
    },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={serverData} theme={theme} />
    </>
  );
};
