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

export default class scoreCard extends Component {
  render() {
    const {
      title,
      teacherName,
      teacherGrade,
      selfName,
      selfGrade,
      groupGrade,
      score
    } = this.props
    return (
      <Card
        title={title}
        style={{
          width: '200px',
          margin: '10px'
        }}
      >
        <Card.Grid style={gridStyleTeacher}>{teacherName}</Card.Grid>
        <Card.Grid style={gridStyleTeacher}>{teacherGrade}</Card.Grid>
        <Card.Grid style={gridStyleSelf}>{selfName}</Card.Grid>
        <Card.Grid style={gridStyleSelf}>{selfGrade}</Card.Grid>
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
      </Card>
    )
  }
}
