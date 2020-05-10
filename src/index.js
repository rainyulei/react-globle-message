import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useContext,
} from 'react';
import ReactDOM from 'react-dom';
import './message.css';

const getPosition = position => {
  if (typeof posi === 'object') {
    return posi;
  } else if (typeof posi === 'string') {
    switch (posi) {
      case 'left-top':
        return {
          top: '2vh',
          left: '2vw',
        };
      case 'right-top':
        return {
          top: '2vh',
          right: '2vw',
        };
      case 'left-middle':
        return {
          top: '50vh',
          left: '2vw',
        };
      case 'middle-middle':
        return {
          top: '50vh',
          right: '50vw',
        };
      case 'right-middle':
        return {
          top: '50vh',
          right: '2vw',
        };
      case 'left-bottom':
        return {
          bottom: '2vh',
          left: '2vw',
        };
      case 'middle-bottom':
        return {
          bottom: '2vh',
          left: '50vw',
        };
      case 'right-bottom':
        return {
          bottom: '2vh',
          right: '2vw',
        };
      case 'middle-top':
      default:
        return {
          top: '2vh',
          right: '50vw',
        };
    }
  }
  return {
    top: '2vh',
    right: '50vw',
  };
};
//只暴露value、getType、focus给父级
const MessageEL = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([]);
  const [delMsh, setDelMsg] = useState(null);
  const [currentMsg, setCurrentMsg] = useState(null);
  const contextConfig = useContext(ThemeContext);
  const [position, setPosition] = useState(getPosition(contextConfig.position));
  const [max, setMax] = useState(contextConfig.max);
  const myref = useRef();
  myref.current = [];
  const removeMessage = newMessage => {
    setDelMsg(newMessage);
  };
  const getCurrentMessageID = () => {
    return `message_${new Date().getTime()}_${Math.floor(
      Math.random() * 1000
    )}`;
  };
  useImperativeHandle(ref, () => ({
    add: message => {
      let newMessages = [...messages];
      const newID = getCurrentMessageID();
      if (messages.length >= max) {
        newMessages.shift();
      }
      const newMessage = {
        id: newID,
        ...message,
        ...contextConfig,
      };
      newMessages.push(newMessage);
      const configs = Object.keys(newMessage);
      const closedable = configs.includes('closedable')
        ? newMessage['closedable']
        : false;
      const delay = newMessage.delay || contextConfig.delay || 2000;
      const onStart = configs.includes('onStart');

      // 没有 手动关闭选项就定时关闭
      !closedable
        ? myref.current.push(
            window.setTimeout(() => {
              removeMessage(newMessage);
            }, delay)
          )
        : '';
      setMessages(newMessages);
      onStart ? setCurrentMsg(newMessage) : '';
    },
    remove: message => {
      removeMessage(message);
    },
    destroy: () => {
      setMessages([]);
    },
  }));
  useEffect(() => {
    function start(currentMsg) {
      typeof currentMsg.onStart === 'function'
        ? currentMsg.onStart(currentMsg)
        : '';
      setCurrentMsg(null);
    }
    if (currentMsg) {
      console.log(currentMsg);
      start(currentMsg);
    }
  }, [currentMsg]);
  useEffect(() => {
    if (delMsh) {
      setMessages(messages.filter(item => item.id !== delMsh.id));
      setDelMsg(null);
    }
    return () => {
      for (let i = 0; i < myref.current.length; i++) {
        const element = myref.current.shift();
        clearTimeout(element);
      }
    };
  }, [delMsh]);
  const handleClosed = item => {
    removeMessage(item);
    item.onClose && item.onClose(item);
  };
  console.log(position);
  return (
    <ul className='message-container' style={{ ...position }}>
      {messages.map((item, index) => (
        <li
          key={item.id}
          style={item.style}
          className={item.className + ' message'}
        >
          {item.icon || ''}
          {item.title || ''}
          {item.message || ''}
          {item.closedable ? (
            item.closeIcon ? (
              <item.closeIcon
                onClick={() => {
                  handleClosed(item);
                }}
              />
            ) : (
              <span
                onClick={() => {
                  handleClosed(item);
                }}
              >
                关闭
              </span>
            )
          ) : (
            ''
          )}
        </li>
      ))}
    </ul>
  );
});

class Msg {
  constructor() {
    this.myRef = React.createRef();

    const div = document.createElement('div');
    document.body.append(div);
    ReactDOM.render(<MessageEL ref={this.myRef} />, div);
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

const DefaultIcon = type => {
  return <span type={type}></span>;
};

const storeConfig = {
  max: 5,
  thems: 'light', // drak
  delay: 2000,
  position: 'middle-top',
  backGround: '',
  default_Style: '',
  warning_Style: '',
  error_Style: '',
  success_Style: '',
  loading_Style: '',
  default_icon: DefaultIcon('default'),
  warning_icon: DefaultIcon('warning'),
  error_icon: DefaultIcon('error'),
  success_icon: DefaultIcon('success'),
  loading_icon: DefaultIcon('loading'),
  closeIcon: DefaultIcon('close'),
  baseTemplate: '',
};
export const ThemeContext = React.createContext(storeConfig);
export const Message = Msg.getInstance();
