import React, { useState } from 'react';
import { render } from 'react-dom';

import { Message, ConfigContext } from '../../src/index';

const Demo = () => {
  const [st, setst] = useState(0);
  const handleSuccess = () => {
    Message.success({
      message: st + 1,
      closedable: true,
      onClose: item => {
        console.log(item);
      },
      onStart: item => {
        console.log(item);
      },
    });
    setst(st + 1);
  };

  return (
    <ConfigContext.Provider value={{backGround:'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',max:6}} >
      <div>
        <button onClick={handleSuccess}>success</button>
      </div>
    </ConfigContext.Provider>
  );
};

render(<Demo />, document.querySelector('#demo'));
