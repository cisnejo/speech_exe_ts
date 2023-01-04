import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getTheme,
} from '@table-library/react-table-library/chakra-ui';

import { useEffect, useState } from 'react';

interface ICommand {
  id: number;
  command: string;
  path: string;
}
export default function Table() {
  const [serverData, setserverData] = useState({ nodes: [] });

  useEffect(() => {
    async function GetData() {
      const response = await fetch('http://127.0.0.1:5000/records');
      const data = await response.json();
      const parsedData = JSON.parse(data);
      setserverData({ nodes: parsedData });
    }
    GetData();
  }, []);
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
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={serverData} theme={theme} />
    </>
  );
}
