import React from 'react';
import ReactDOM from 'react-dom';
import MessageComponent from './message';

class Msg {
  constructor() {
    let myRef = { current: '' };
    const div = document.createElement('div');
    document.body.append(div);
    ReactDOM.render(<MessageComponent ref={myRef} />, div);
    this.refs = myRef;
  }
  success(options) {
    this.refs.current.add(options);
  }
}

Msg.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new Msg();
    }
    return instance;
  };
})();

export const Message = Msg.getInstance();