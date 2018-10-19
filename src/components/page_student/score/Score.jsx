import React, { Component } from 'react'

import { Card } from 'antd';


export default class Score extends Component {
  render() {
    const data_score = this.props.location.state;
    const { teacherGrade, selfGrade, groupMember, groupGrade, score, groupNumber } = data_score
    return (
      <Card title="成绩评价单"
        style={{
          maxHeight: '500px',
          overflow: 'auto'
        }}>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.85)',
            marginBottom: 16,
            fontWeight: 500,
          }}
        ></p>
        <Card
          type="inner"
          title="学生自评"
        >
          <p>{selfGrade ? selfGrade + '分' : '未评价'}</p>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="同学互评"
        >
          <p>小组人数:{groupNumber}</p>
          <p>剩余评价人数:{groupMember.length}</p>
          {/* <p>已评价组员分数:{groupGrade.length !== 0 ?
            (groupGrade.reduce((a, b) => {
              return a.score + '分 ' + b.score + '分 '
            }), ' ') : '没有组员评价'
          }</p> */}
          <p>小组成绩:{groupMember.length === 0 ? ((groupGrade.map(item => item.score).reduce((a, b) => a + b)) * 1.0 / groupNumber).toFixed(2) + '分' : '还有组员未评价'}</p>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="老师评价"
        >
          <p>{teacherGrade ? teacherGrade + '分' : '未评价'}</p>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="总成绩"
        >
          <p>{score ? score : '未校准'}</p>
        </Card>
      </Card>
    )
  }
}