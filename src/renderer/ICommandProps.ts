interface ICommandProps {
  serverData: object;
  setServerData: React.Dispatch<
    React.SetStateAction<{
      nodes: any[];
    }>
  >;
}

export default ICommandProps;
