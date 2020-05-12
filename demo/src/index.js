import React, { useState, useContext } from 'react';
import { render } from 'react-dom';
import MessageContextProvider from '../../src/component/MessageProvider'
import { Message, ConfigContext } from '../../src/index';
import useMessage from '../../src/component/getcontext'
const Demo = () => {
  const [st, setst] = useState(0);
  const messagecontext = useMessage()
  const config = useContext(ConfigContext);

  const handleSuccess = () => {
    messagecontext.success({
      message: st + 1,
      closedable: true,
      onClose: item => {
        console.log(item);
      },
      onStart: item => {
        console.log(item);
      },
    })
    setst(st + 1);
  };
  const handleError = () => {
    messagecontext.error({
      message: st + 1,
      closedable: true,
      onClose: item => {
        console.log(item);
      },
      onStart: item => {
        console.log(item);
      },
    })
    setst(st + 1);
  };
  const handlewarning = () => {
    messagecontext.warning({
      message: st + 1,
      closedable: true,
      onClose: item => {
        console.log(item);
      },
      onStart: item => {
        console.log(item);
      },
    })
    setst(st + 1);
  };
  const handledefault = () => {
    messagecontext.default({
      message: st + 1,
      closedable: true,
      onClose: item => {
        console.log(item);
      },
      onStart: item => {
        console.log(item);
      },
    })
    setst(st + 1);
  };
  const handleloading = () => {
    messagecontext.loading({
      title:"我是一个兵",
      message: st + 1,
      closedable: true,
      onClose: item => {
        console.log(item);
      },
      onStart: item => {
        console.log(item);
      },
    })
    setst(st + 1);
  };
  const handleremove = () => {
    messagecontext.remove()
    setst(st + 1);
  };
  const handleremoveAll = () => {
    messagecontext.removeAll()
  };

  return (
    <div>
      <button onClick={handleSuccess}>success</button>
      <button onClick={handlewarning}>warning</button>
      <button onClick={handleloading}>loading</button>
      <button onClick={handleError}>error</button>
      <button onClick={handledefault}>default</button>
      <button onClick={ () =>{
       handleremove()
      }}>remove</button>
      <button onClick={handleremoveAll}>removeAll</button>
    </div>
  );
};

render(
  <MessageContextProvider
    value={{
      backGround: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
      max: 10,
    }}
  >
    <Demo/>
  </MessageContextProvider>,

  document.querySelector('#demo')
);
