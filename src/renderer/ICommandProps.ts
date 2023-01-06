import ICommand from './ICommand';

interface ICommandProps {
  serverData: ICommand[];
  setServerData: React.Dispatch<React.SetStateAction<ICommand[]>>;
}

export default ICommandProps;
