/*
 * @Author: yu-lei
 * @Date: 2020-05-12 11:36:33
 * @Last Modified by: yu-lei
 * @Last Modified time: 2020-05-12 20:32:19
 */
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import filterObject from './helper';
const MessageEL = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([]);
  const [delMsh, setDelMsg] = useState(null);
  const [currentMsg, setCurrentMsg] = useState(null);
  const contextFig = props.value;
  console.log(contextFig);
  const timeridsRef = useRef();
  timeridsRef.current = [];
  /**
   * 手动关闭一条信息
   * @param { 关闭的信息 } item
   */
  const handleClosed = item => {
    removeMessage(item);
    item.onClose && item.onClose(item);
  };
  /**
   *  删除一条信息
   * @param { 删除的信息} newMessage
   */
  const removeMessage = newMessage => {
    setDelMsg(newMessage);
  };
  /**
   * 通过message id 获取message
   * @param {* messageID} messageID
   */
  const getmessageByid = messageID => {
    const messageArr = messages.filter(item => item.id === messageID);
    if ((messageArr.length = 0)) {
      return null;
    }
    return messageArr[0];
  };
  /**
   *  获取当前的最新的ID
   */
  const getCurrentMessageID = () => {
    return `message_${new Date().getTime()}_${Math.floor(
      Math.random() * 1000
    )}`;
  };
  useImperativeHandle(ref, () => ({
    /**
     * 添加一条信息
     */
    add: message => {
      let newMessages = [...messages];
      const newID = getCurrentMessageID();
      if (messages.length >= contextFig.max) {
        newMessages.shift();
      }
      // 获取classname 对应的配置
      const newConfig = filterObject(contextFig, message.className);
      // 重新覆盖配置
      const newMessage = {
        id: newID,
        ...newConfig,
        ...message,
      };
      console.log(newMessage);
      newMessages.push(newMessage);
      const configs = Object.keys(newMessage);
      const closedable = configs.includes('closedable')
        ? newMessage['closedable']
        : false;
      const delay = newMessage.delay || 2000;
      const onStart = configs.includes('onStart');
      // 定时关闭
      !closedable
        ? timeridsRef.current.push(
            window.setTimeout(() => {
              removeMessage(newMessage);
            }, delay)
          )
        : '';
      setMessages(newMessages);
      onStart ? setCurrentMsg(newMessage) : '';
    },
    /**
     *  删除 通过messageID
     */
    remove: messageid => {
      const message = getmessageByid(messageid);
      message ? removeMessage(message) : '';
    },
    /**
     *  删除所有
     */
    removeAll: () => {
      const timers = messages.map(item => {
        return item.timer ? item.timer : '';
      });
      timeridsRef.current.concat(timers);
      setDelMsg(null);
      setMessages([]);
    },
  }));
  // 新的message 渲染在界面上时启动的钩子
  /**
   * on start
   */
  useEffect(() => {
    function start(currentMsg) {
      typeof currentMsg.onStart === 'function'
        ? currentMsg.onStart(currentMsg)
        : '';
      setCurrentMsg(null);
    }
    if (currentMsg) {
      start(currentMsg);
    }
  }, [currentMsg]);
  // 有需要删除的钩子
  useEffect(() => {
    if (delMsh) {
      delMsh.timer ? timeridsRef.current.push(delMsh.timer) : '';
      setMessages(messages.filter(item => item.id !== delMsh.id));
      setDelMsg(null);
    }
    // 清除 删除后的 timer 定时器
    return () => {
      for (let i = 0; i < timeridsRef.current.length; i++) {
        const element = timeridsRef.current.shift();
        clearTimeout(element);
      }
    };
  }, [delMsh]);

  const node = (
    <div className='message-container'>
      {messages.map((item, index) => (
        <contextFig.baseTemplate
          key={item.id}
          message={item}
          handleClosed={handleClosed}
          getmessageByid={getmessageByid}
          removeMessage={removeMessage}
          getCurrentMessageID={getCurrentMessageID}
        />
      ))}
    </div>
  );
  /**
   *  根据template 渲染
   */
  if (contextFig && contextFig.baseTemplate) {
    return node;
  } else {
    return '';
  }
});
export default MessageEL;
