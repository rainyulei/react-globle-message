import React from 'react';
import Icon from './icon';
import { BaseTemplate, BaseTransation } from './baseTemplate';
const storeConfig = {
  max: 5, // 最多的数量
  thems: 'light', // drak
  delay: 2000, //默认delay 持续时间
  position: 'middle-top', // 默认出现的位置
  baseTemplate: BaseTemplate, // 默认的模板
  transation: BaseTransation, //动画
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
