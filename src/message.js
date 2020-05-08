/*
 * @Author: yu-lei 
 * @Date: 2020-05-05 13:55:38 
 * @Last Modified by:   yu-lei 
 * @Last Modified time: 2020-05-05 13:55:38 
 */
import React, { Component } from 'react';
import './index.css'

class MessageComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      messages: [],
      max: 5
    }
  }
  add = (options) => {
    let { id, messages } = this.state
    let layer = {
      id: id++,
      ...options
    }
    layer.timer = setTimeout(() => {
      this.remove(layer)
    }, 2000);
    messages.push(layer)
    this.setState({ id, messages })
  }
  remove = (layer) => {
    clearTimeout(layer.timer)
    let messages = this.state.messages.filter(item => item.id !== layer.id)
    this.setState({ messages })
  }
  render() {
    return (
      <ul>
        {this.state.messages.map(
          (item, index) => <li key={item.id} className="message">{item.message}</li>
        )}
      </ul>
    );
  }
}

export default MessageComponent;