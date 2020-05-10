import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
    useContext,
  } from 'react';
  import ReactDOM from 'react-dom';
  import  ThemeContext  from './MessageContext';
  import './message.css';
  import getPosition from './getposition'
  
  //只暴露value、getType、focus给父级
  const MessageEL = forwardRef((props, ref) => {
    const [messages, setMessages] = useState([]);
    const [delMsh, setDelMsg] = useState(null);
    const [currentMsg, setCurrentMsg] = useState(null);
    const contextConfig = useContext(ThemeContext);
    console.log(contextConfig);
    const [config, setConfig] = useState(() => {
      return {
        position: getPosition(contextConfig.position),
        max: contextConfig.max,
        backGround: contextConfig.backGround,
        defaultStyle: contextConfig.defaultStyle,
        warningStyle: contextConfig.warningStyle,
        errorStyle: contextConfig.errorStyle,
        successStyle: contextConfig.successStyle,
        loadingStyle: contextConfig.loadingStyle,
        baseTemplate: contextConfig.mabaseTemplatex,
        //TODO
      };
    });
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
        if (messages.length >= config.max) {
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
        // start 钩子
        // TODO  钩子 信息简化
        const message = {
          id: currentMsg.id,
          title: currentMsg.title,
          message: currentMsg.message,
        };
        typeof currentMsg.onStart === 'function'
          ? currentMsg.onStart(message)
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
        // 清除timeout
        for (let i = 0; i < myref.current.length; i++) {
          const element = myref.current.shift();
          clearTimeout(element);
        }
      };
    }, [delMsh]);
    const handleClosed = item => {
      removeMessage(item);
      // onclose钩子
      //TODO  信息简化
      const message = {
        id: item.id,
        title: item.title,
        message: item.message,
      };
      item.onClose && item.onClose(message);
    };
    console.log(config);
    return (
      <ul
        className='message-container'
        style={{ ...config.position }}
        style={{ background: config.baseColor }}
      >
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
  
export default MessageEL
