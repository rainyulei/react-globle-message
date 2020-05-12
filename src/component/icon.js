import React from 'react';
import classnames from 'classnames';
import propsTypes from 'prop-types';
import './icon.css';

const scriptElem = document.createElement('script');
scriptElem.src = '//at.alicdn.com/t/font_1812706_635gb0n49lv.js';
document.body.appendChild(scriptElem);

function SuperIcon({ className, type, ...restProps }) {
  return (
    <svg
      className={classnames('icon', className)}
      aria-hidden='true'
      {...restProps}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}

SuperIcon.propsTypes = {
  type: propsTypes.string.isRequired,
  style: propsTypes.object,
};

const DefaultIcon = () => {
  return <SuperIcon type='iconprompt-fill' />;
};
const WarningIcon = () => {
  return <SuperIcon type='iconwarning-fill' />;
};
const SuccessIcon = () => {
  return <SuperIcon type='iconsuccess-fill' />;
};
const LoadingIcon = () => {
  return <SuperIcon type='iconexchangerate' />;
};
const CloseIcon = () => {
  return <SuperIcon type='iconclose' />;
};
const ErrorIcon = () => {
  return <SuperIcon type='iconreeor-fill' />;
};
export default {
  ErrorIcon,
  SuperIcon,
  DefaultIcon,
  WarningIcon,
  SuccessIcon,
  LoadingIcon,
  CloseIcon,
};
