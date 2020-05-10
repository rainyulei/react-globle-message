import React from 'react'
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
export default React.createContext(storeConfig);
