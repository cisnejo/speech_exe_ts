interface ICommandProps {
  serverData: {
    nodes: never[];
  };
  setServerData: React.Dispatch<
    React.SetStateAction<{
      nodes: never[];
    }>
  >;
}

export default ICommandProps;
