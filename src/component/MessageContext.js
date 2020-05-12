import React from 'react';
import Icon from './icon';
import './message.css';
const BaseTemplate = props => {
  const { message ,handleClosed,removeMessage,getmessageByid } = props;
  return (
    <div
      key={message.id}
      style={message.action.style}
      className={message.className + ' message'}
      onClick={e => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        message.onClick && message.onClick(message);
      }}
    >
      <span style={{ marginRight: '1vw', display: 'inline-block' }}>
        <message.action.icon />
      </span>
      {message.message ? <span>{message.message}</span> : ''}
      {message.closedable ? (
        <span
          className='message__closeIcon'
          onClick={e => {
            e.nativeEvent.stopImmediatePropagation();
            e.stopPropagation();
            handleClosed(message);
          }}
        >
          <message.closeIcon />
        </span>
      ) : (
        ''
      )}
    </div>
  );
};
const storeConfig = {
  max: 5, // 最多的数量
  thems: 'light', // drak
  delay: 2000, //默认delay 持续时间
  position: 'middle-top', // 默认出现的位置
  baseTemplate: BaseTemplate, // 默认的模板
  transation: '', //动画
  default: {
    style: {
      background: '#f0f9eb',
      color: '#3ac2bb',
    },
    icon: Icon.DefaultIcon,
  },
  warning: {
    style: {
      background: '#f0f9eb',
      color: '#ecb10d',
    },
    icon: Icon.WarningIcon,
  },
  error: {
    style: {
      background: '#f0f9eb',
      color: '#f03a2d',
    },
    icon: Icon.ErrorIcon,
  },
  loading: {
    style: {
      background: '#f0f9eb',
      color: '#3ac2bb',
    },
    icon: Icon.LoadingIcon,
  },
  success: {
    style: {
      background: '#f0f9eb',
      color: '#59db3f',
    },
    icon: Icon.SuccessIcon,
  },
  closeIcon: Icon.CloseIcon,
};
export default React.createContext(storeConfig);
