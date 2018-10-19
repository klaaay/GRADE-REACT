import React, { Component } from 'react'

import { Card } from 'antd';

const gridStyle = {
  width: '50%',
  textAlign: 'center',
  height: '30px',
};

const gridStyleTeacher = {
  width: '50%',
  textAlign: 'center',
  height: '30px',
  background: '#E6F7FF'
};

const gridStyleSelf = {
  width: '50%',
  textAlign: 'center',
  height: '30px',
  background: '#F6FFED'
};

const gridStyleGroup = {
  width: '50%',
  textAlign: 'center',
  height: '30px',
  background: '#FFFBE6'
};

// const gridStyleGroupTips = {
//   width: '100%',
//   textAlign: 'center',
//   height: '30px',
//   background: 'white'
// };

export default class scoreCard extends Component {
  render() {
    const {
      title,
      teacherName,
      teacherGrade,
      selfName,
      selfGrade,
      groupGrade,
      // groupMemberOrigin,
      score
    } = this.props
    return (
      <Card
        title={title}
        style={{
          width: '280px',
          margin: '10px'
        }}
      >

        <Card.Grid style={gridStyleTeacher}>{teacherName}</Card.Grid>
        <Card.Grid style={gridStyleTeacher}>{teacherGrade ? teacherGrade : '未评价'}</Card.Grid>
        <Card.Grid style={gridStyleSelf}>{selfName}</Card.Grid>
        <Card.Grid style={gridStyleSelf}>{selfGrade ? selfGrade : '未评价'}</Card.Grid>
        {
          groupGrade.map((item, index) => {
            return <div key={index}>
              <Card.Grid style={gridStyleGroup}>{item.name}</Card.Grid>
              <Card.Grid style={gridStyleGroup}>{item.score}</Card.Grid>
            </div>
          })
        }
        <Card.Grid style={gridStyle}>总分</Card.Grid>
        <Card.Grid style={gridStyle}>{score}</Card.Grid>
        {/* <Card.Grid style={gridStyleGroupTips}>
          <span style={{ color: '#E6F7FF' }}>教师评分</span>
          <span style={{ color: '#F6FFED' }}>自评分数</span>
          <span style={{ color: '#FFFBE6' }}>互评分数</span>
        </Card.Grid> */}
        {/* <Card.Grid style={gridStyleGroupTips}>
          互评小组:{groupMemberOrigin.toString()}
        </Card.Grid> */}
      </Card>
    )
  }
}
