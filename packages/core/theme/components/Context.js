import { createContext } from 'react';

var _createContext = createContext({
  mode: 'light'
}),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;

export { Consumer, Provider };