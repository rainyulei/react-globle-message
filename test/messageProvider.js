import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import MessageContext from '../src/component/MessageContext';
import PropTypes from 'prop-types';
import getPosition from '../src/component/getposition';

const MessageProvider = ({
  children,
  context,
  template,
  context,
  max,
  backGround,
  defaultPosition,
  defaultStyle,
  warningStyle,
  errorStyle,
  successStyle,
  loadingStyle,
  baseTemplatet,
  closeIcon,
  loadingIcon,
  successIcon,
  errorIcon,
  warningIcon,
  delay,
  ...props
}) => {
  const root = useRef(null);
  const [messages, setMessages] = useState();
  const messageContext = useRef(null);
  const timersRef = useRef();
  // 创建节点和 清除定时器
  useEffect(() => {
    root.current = document.createElement('div');
    root.current.id = 'message_rain_';
    document.body.appendChild(root.current);
    // 拷贝 timerID
    const effectTimersArray = timersRef.current;

    return () => {
      effectTimersArray.forEach(clearTimeout);
      if (root.current) document.body.removeChild(root.current);
    };
  }, []);
  const remove = useCallback(message => {
    setMessages(currentMessages => {
      const lengthBeforeRemove = currentMessages.length;
      const filteredMessages = currentMessages.filter(a => a.id !== message.id);
      // 如果删除前的长度大于删除后的长度    并且alert 配置内部有occlose 选项 就这姓这个方法
      if (
        lengthBeforeRemove > filteredMessage.length &&
        message.options.onClose
      ) {
        message.options.onClose();
      }
      return filteredMessages;
    }, []);
  });
  const getCurrentMessageID = () => {
    return `message_${new Date().getTime()}_${Math.floor(
      Math.random() * 1000
    )}`;
  };

  const groupBy = (array, fn) =>
    array.reduce((result, item) => {
      const key = fn(item);
      if (!result[key]) result[key] = [];
      result[key].push(item);
      return result;
    }, {});
  const removeAll = useCallback(() => {
    messageContext.current.messages.forEach(remove);
  }, [remove]);
  const addMessage = useCallback(
    (options = {}) => {
      const id = getCurrentMessageID();

      const messageOptions = {
        position: options.position || position,
        delay,
        type,
        ...options,
      };

      const message = {
        id,
        message: options.message,
        options: messageOptions,
      };

      message.close = () => remove(alert);

      if (message.options.delay) {
        const timerId = setTimeout(() => {
          remove(alert);

          timersRef.current.splice(timersRef.current.indexOf(timerId), 1);
        }, message.options.timeout);

        timersRef.current.push(timerId);
      }

      setMessages(state => state.concat(message));
      if (message.options.onStart) message.options.onStart(message);

      return message;
    },
    [position, remove, delay, type]
  );
  const success = useCallback(
    (options = {}) => {
      options.type = types.SUCCESS;
      return show(options);
    },
    [show]
  );
  const warning = useCallback(
    (options = {}) => {
      options.type = types.WARNING;
      return show(options);
    },
    [show]
  );
  const loading = useCallback(
    (options = {}) => {
      options.type = types.LOADING;
      return show(options);
    },
    [show]
  );

  const error = useCallback(
    (options = {}) => {
      options.type = types.ERROR;
      return show(options);
    },
    [show]
  );

  const info = useCallback(
    (options = {}) => {
      options.type = types.INFO;
      return show(options);
    },
    [show]
  );
  alertContext.current = {
    messages,
    addMessage,
    remove,
    removeAll,
    success,
    loading,
    warning,
    error,
    info,
  };
  const alertsByPosition = groupBy(alerts, alert => alert.options.position);
  return (
    <MessageContext.Provider value={alertContext}>
      {children}
      {root.current &&
        createPortal(
          <Fragment>
            {Object.keys(positions).map(key => {
              const position = positions[key];

              return (
                <TransitionGroup
                  appear
                  key={position}
                  options={{ position, containerStyle }}
                  component={Wrapper}
                  {...props}
                >
                  {alertsByPosition[position]
                    ? alertsByPosition[position].map(alert => (
                        <Transition type={transition} key={alert.id}>
                          <AlertComponent
                            style={{ margin: offset, pointerEvents: 'all' }}
                            {...alert}
                          />
                        </Transition>
                      ))
                    : null}
                </TransitionGroup>
              );
            })}
          </Fragment>,
          root.current
        )}
    </MessageContext.Provider>
  );
};
MessageProvider.PropTypes = {
  max: PropTypes.number,
  backGround: PropTypes.object,
  defaultPosition: PropTypes.object,
  defaultStyle: PropTypes.object,
  warningStyle: PropTypes.object,
  errorStyle: PropTypes.object,
  successStyle: PropTypes.object,
  loadingStyle: PropTypes.object,
  baseTemplate: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  closeIcon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  loadingIcon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  successIcon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  errorIcon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  warningIcon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  delay: PropTypes.number,
};
MessageProvider.defaultProps = {
  max: 5,
  backGround: {
    backgroundColor: '#f0f9eb',
  },
  defaultPosition: getPosition('middle-top'),
  defaultStyle: {
    color: '#3ac2bb',
  },
  warningStyle: {
    color: '#ecb10d',
  },
  errorStyle: {
    color: '#f03a2d',
  },
  successStyle: {
    color: '#59db3f',
  },
  loadingStyle: {
    color: '#3ac2bb',
  },
  baseTemplate: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  closeIcon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  loadingIcon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  successIcon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  errorIcon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  warningIcon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  delay: 2000,
};
export default MessageProvider;
