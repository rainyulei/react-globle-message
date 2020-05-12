import React from 'react';
import './baseTemplate.css';
export const BaseTemplate = props => {
  const { message, handleClosed, removeMessage, getmessageByid } = props;
  return (
    <div
      key={message.id}
      style={{ ...message.action.style, ...message.position }}
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
export const BaseTransation = ({ children, messageid }) => {
  return <div className='fadeInUp'> {children} </div>;
};
