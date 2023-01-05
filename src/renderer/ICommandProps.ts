interface ICommandProps {
  serverData: object;
  setServerData: React.Dispatch<
    React.SetStateAction<{
      nodes: never[];
    }>
  >;
}

export default ICommandProps;
