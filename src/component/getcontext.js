import React, { useContext } from 'react';
import MessageContext from './MessageContext';
const useMessage = () => {
  const context = useContext(MessageContext);
  return context.functions;
};
export default useMessage;
