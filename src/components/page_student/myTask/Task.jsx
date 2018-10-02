import React, { Component } from 'react'
import { browserHistory } from 'react-router';

import { Card } from 'antd';

export default class Task extends Component {
  render() {
    const { title, publisher, content, publishTime, endTime, restTime, outOfDate } = this.props
    console.log(restTime)
    var changeRestTime = restTime;
    if (changeRestTime === 'in a day') {
      changeRestTime = 'in 1 days'
    }
    return (
      <Card
        title={title}
        extra={outOfDate ? 
          (<span style={{ color: '#F5222D' }}>已过期</span>) : 
          (<span 
            style={{ color: '#40A9FF',cursor:'pointer' }}
            onClick={(e)=>{
              browserHistory.push({
                pathname:'/student/do',
                state:{
                  title:title,
                  content:content
                }
              })
            }}
          >去完成</span>)}
      >
        <p><span>发布老师:</span>{publisher}</p>
        <p><span>作业内容:</span>{content}</p>
        <p><span>开始时间:</span>{publishTime}</p>
        <p><span>截至时间:</span>{endTime}</p>
        {outOfDate ? <p></p> : <p><span>剩余时间:</span>
          <span
            style={
              (changeRestTime.split(" ")[2] === 'days' && changeRestTime.split(" ")[1]) > 3 ? { color: '#40A9FF' } : { color: '#F5222D' }
            }
          >
            {changeRestTime.split(" ")[2] === 'days' ? changeRestTime.split(" ")[1] + " 天" : changeRestTime.split(" ")[1] + " 小时"}
          </span></p>}
        <p><span>完成状态:</span></p>
      </Card>
    );
  }
}
