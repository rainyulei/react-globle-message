import React from 'react';
import ReactDOM from 'react-dom';
import MessageEL from './component/message';
import MessageContext from './component/MessageContext';
class Msg {
  constructor() {
    this.myRef = React.createRef();
    const div = document.createElement('div');
    document.body.append(div);
     this.elen = ReactDOM.render(
        <MessageEL ref={this.myRef} />
      ,
      div
    );
  }
  success(options) {
    
    this.myRef.current.add({ ...options, className: 'success' });
  }
  error(options) {
    this.myRef.current.add({ ...options, className: 'error' });
  }
  default(options) {
    this.myRef.current.add({ ...options, className: 'default' });
  }
  warning(options) {
    this.myRef.current.add({ ...options, className: 'warning' });
  }
  locading(options) {
    this.myRef.current.add({ ...options, className: 'locading' });
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
export const ConfigContext = MessageContext;
