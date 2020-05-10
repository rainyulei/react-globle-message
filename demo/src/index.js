import React, { useState } from 'react';
import { render } from 'react-dom';

import { Message, ThemeContext } from '../../src';

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
    <ThemeContext.Provider >
      <div>
        <button onClick={handleSuccess}>success</button>
      </div>
    </ThemeContext.Provider>
  );
};

render(<Demo />, document.querySelector('#demo'));
