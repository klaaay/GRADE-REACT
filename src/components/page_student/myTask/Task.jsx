import React, { Component } from 'react'

import { Card } from 'antd';

export default class Task extends Component {
  render() {
    const { title,publisher,content,publishTime,endTime } = this.props
    console.log(title)
    return (
      <Card
        title={title}
        extra={<a href="#">去完成</a>}
      >
        <p>发布老师:{publisher}</p>
        <p>作业内容:{content}</p>
        <p>开始时间:{publishTime}</p>
        <p>截至时间:{endTime}</p>
        <p>剩余天数:</p>
        <p>完成状态</p>
      </Card>
    );
  }
}
