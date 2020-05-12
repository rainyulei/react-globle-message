import React, { useEffect, useContext } from 'react';
import MessageContext from './MessageContext';
import ReactDOM from 'react-dom';
import MessageEL from './message';
const Provider = props => {
  // 使用时候的统一设置
  const { children, value } = props;
  // 默认设置
  const contextdefault = useContext(MessageContext);
  
  const myRef = React.createRef();
  // 使用时候的单一设置
  const success = options => {
    myRef.current.add({ ...options, className: 'success' });
  };
  const error = options => {
    myRef.current.add({ ...options, className: 'error' });
  };
  const defaultInfro = options => {
    myRef.current.add({ ...options, className: 'default' });
  };
  const warning = options => {
    myRef.current.add({ ...options, className: 'warning' });
  };
  const loading = options => {
    myRef.current.add({ ...options, className: 'loading' });
  };
  const remove = messageID => {
    myRef.current.remove(messageID);
  };
  const removeAll = () => {
    myRef.current.removeAll();
  };
  useEffect(() => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(
      // 合并默认设置和使用时候的统一设置
      <MessageEL ref={myRef} value={{ ...contextdefault, ...value }} />,
      div
    );
    return () => {
      removeAll();
      document.removeChild(div);
    };
  }, []);
  return (
    <MessageContext.Provider
      value={{
        ...value,
        functions: {
          success,
          error,
          default: defaultInfro,
          warning,
          loading,
          remove,
          removeAll,
        },
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default Provider;
