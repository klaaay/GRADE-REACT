import React, { Component } from 'react'

import { connect } from 'react-redux'
import { browserHistory } from 'react-router';


import { Table, Input, Button, Icon, Spin, Tabs, Badge, Row, Col, Divider, Tag } from 'antd';

import ScoreCard from './scoreCard.jsx'

import './Details.less'

import ReactChart from 'react-chartjs'
import axios from 'axios'
var ReactDOM = require('react-dom');

var ReactHighcharts = require('react-highcharts');
// var HighchartsMore = require('highcharts-more');
var HighchartsExporting = require('highcharts-exporting');
HighchartsExporting(ReactHighcharts.Highcharts);


const PieChart = ReactChart.Pie;
const BarChart = ReactChart.Bar;

let PieChartData = [
  {
    value: 0,
    color: "#A8B3C5",
    highlight: "#A8B3C5",
    label: "未评价"
  },
  {
    value: 0,
    color: "#F7464A",
    highlight: "#F7464A",
    label: "不及格"
  },
  {
    value: 0,
    color: "#FDB45C",
    highlight: "#FDB45C",
    label: "及格"
  },
  {
    value: 0,
    color: "#317EF3",
    highlight: "#317EF3",
    label: "良好"
  },
  {
    value: 0,
    color: "#46BFBD",
    highlight: "#46BFBD",
    label: "优秀"
  }
]

let PieChartOptions = {
  //Boolean - Whether we should show a stroke on each segment
  segmentShowStroke: true,
  //String - The colour of each segment stroke
  segmentStrokeColor: "#fff",
  //Number - The width of each segment stroke
  segmentStrokeWidth: 2,
  //Number - The percentage of the chart that we cut out of the middle
  percentageInnerCutout: 50, // This is 0 for Pie charts
  //Number - Amount of animation steps
  animationSteps: 100,
  //String - Animation easing effect
  animationEasing: "easeOutBounce",
  //Boolean - Whether we animate the rotation of the Doughnut
  animateRotate: true,
  //Boolean - Whether we animate scaling the Doughnut from the centre
  animateScale: false
}

let BarChartData = {
  labels: ["未评价", "不及格", "及格", "良好", "优秀"],
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: [0, 0, 0, 0, 0]
    }
  ]
};

let BarChartOptions = {
  //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
  scaleBeginAtZero: true,

  //Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: true,

  //String - Colour of the grid lines
  scaleGridLineColor: "rgba(0,0,0,.05)",

  //Number - Width of the grid lines
  scaleGridLineWidth: 1,

  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  //Boolean - If there is a stroke on each bar
  barShowStroke: true,

  //Number - Pixel width of the bar stroke
  barStrokeWidth: 2,

  //Number - Spacing between each of the X value sets
  barValueSpacing: 5,

  //Number - Spacing between data sets within X values
  barDatasetSpacing: 1,
}

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

let config = {
};

class Details extends Component {
  state = {
    searchText: '',
    loading: false,
    GradeDoneTasks: [],
    GradeTasks: [],
    ChartData: [],
    Card: true,
    categories: [],
    series: []
  };


  get_task_detail = async (id) => {
    let data = {
      id: id
    }
    let data_str = JSON.stringify(data);
    let fetchOption = {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
      body: data_str
    }
    try {
      const response = await fetch('http://localhost:5001/teacher/detail', fetchOption);
      const body = await response.json();
      let ChartData = body.ChartData;
      BarChartData.datasets[0].data = ChartData;
      PieChartData.forEach((item, index) => {
        item.value = ChartData[index]
      })
      console.log(body.data)
      let GradeDoneTasks = body.data.filter(item => (item.teacherGradeDone && item.selfGradeDone && item.groupGradeDone));
      this.setState({
        loading: true,
        GradeDoneTasks: GradeDoneTasks,
        GradeTasks: body.data
      })
      return body;
    } catch (e) {
      console.log(e)
    }
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  componentDidMount = () => {
    this.get_task_detail((document.location.search.split('=')[1]))
  }

  render() {
    const userId = localStorage.getItem('id')
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="搜索姓名"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>搜索</Button>
          <Button onClick={this.handleReset(clearFilters)}>重置</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="smile-o" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
            ))}
          </span>
        ) : text;
      },
    }, {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="搜索班级"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>搜索</Button>
          <Button onClick={this.handleReset(clearFilters)}>重置</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="smile-o" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.class.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
            ))}
          </span>
        ) : text;
      },
    }, {
      title: 'Word',
      dataIndex: 'wordCommitted',
      key: 'wordCommitted',
      render: (text, record) => {
        return text ? <a href={'http://localhost:5001/' + record.word}><Icon type="file-word" theme={"twoTone"} /></a> : <Icon type="file-word" theme={"outlined"} />
      },
    },
    {
      title: 'PPT',
      dataIndex: 'pptCommitted',
      key: 'pptCommitted',
      render: (text, record) => {
        return text ? <a href={'http://localhost:5001/' + record.ppt}><Icon type="file-ppt" theme={"twoTone"} /></a> : <Icon type="file-ppt" theme={"outlined"} />
      },
    },
    {
      title: 'Video',
      dataIndex: 'videoCommitted',
      key: 'videoCommitted',
      render: (text, record) => {
        return text ? <a href={'http://localhost:5001/' + record.video}><Icon type="video-camera" theme={"twoTone"} /></a> : <Icon type="video-camera" theme={"outlined"} />
      },
    },
    {
      title: '老师评价',
      dataIndex: 'teacherGradeDone',
      key: 'teacherGradeDone',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="搜索未评价"
            value={"搜索未评价"}
            disabled
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button
            type="primary"
            onClick={() => {
              setSelectedKeys([' '])
              setTimeout(
                this.handleSearch(selectedKeys, confirm), 0
              )
            }
            }
            ref={ele => this.searchButtonEval = ele}
          >搜索</Button>
          <Button onClick={this.handleReset(clearFilters)}>重置</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="smile-o" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => !record.teacherGradeDone,
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text, record) => {
        console.log(text)
        if (record.pptCommitted && record.wordCommitted && record.videoCommitted) {
          return !text ? <a
            onClick={(e) => {
              browserHistory.push({
                pathname: '/teacher/evaluate',
                query: {
                  role: 'teacher',
                  taskId: (document.location.search.split('=')[1]),
                  id: record.key,
                  userId: userId,
                  publisher: record.id.publisherId
                }
              })
            }}
          >去评价</a> : <Icon type="check" theme="outlined" style={{ color: '#1890FF' }} />
        } else {
          return <span>去评价</span>
        }
      },
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      render: (text, record) => {
        return text ? text : '未出分'
      },
    },
    ];
    if (!this.state.loading) {
      return <Spin
        style={{
          position: 'relative',
          left: '50%'
        }}
      />
    } else {
      return <Tabs onChange={callback} type="card" className="details_tabs"
        style={{
          maxHeight: '480px',
          overflow: 'auto'
        }}
      >
        <TabPane tab="作业总览" key="1">
          <Table
            bordered={true}
            columns={columns}
            dataSource={this.state.GradeTasks} />
        </TabPane>
        <TabPane tab="成绩详情" key="2">
          <Row>
            <Col span={18} push={1}>
              <Tag
                color="#E6F7FF"
                style={{
                  display: this.state.Card?'inline-block':'none',
                  marginTop: '20px',
                  color: '#aaa'
                }}
              >师评分数</Tag>
              <Tag
                color="#F6FFED"
                style={{
                  display: this.state.Card?'inline-block':'none',
                  marginTop: '20px',
                  color: '#aaa'
                }}
              >自评分数</Tag>
              <Tag
                color="#FFFBE6"
                style={{
                  display: this.state.Card?'inline-block':'none',
                  marginTop: '20px',
                  color: '#aaa'
                }}
              >组评分数</Tag>
            </Col>
            <Col span={6}>
              <Button.Group >
                <Button
                  style={
                    {
                      marginTop: '10px'
                    }
                  }
                  onClick={() => {
                    this.setState({
                      Card: true
                    })
                  }}
                >
                  <Icon type="profile"
                  />卡片显示
                </Button>
                <Button
                  style={
                    {
                      marginTop: '10px'
                    }
                  }
                  onClick={() => {
                    this.setState({
                      Card: false
                    }, () => {
                      axios.post('http://localhost:5001/teacher/detailChart', {
                        id: document.location.search.split('=')[1]
                      })
                        .then((res) => {
                          const { categories, series } = res.data;
                          config = {
                            chart: {
                              type: 'bar'
                            },
                            title: {
                              text: '成绩统计表'
                            },
                            subtitle: {
                              text: ''
                            },
                            xAxis: {
                              categories: categories,
                              title: {
                                text: null
                              }
                            },
                            yAxis: {
                              min: 0,
                              title: {
                                text: '分数',
                                align: 'high'
                              },
                              labels: {
                                overflow: 'justify'
                              }
                            },
                            tooltip: {
                              valueSuffix: ' 分'
                            },
                            plotOptions: {
                              bar: {
                                dataLabels: {
                                  enabled: true
                                }
                              },
                              series: {
                                stacking: 'normal'
                              }
                            },
                            legend: {
                              layout: 'vertical',
                              align: 'right',
                              verticalAlign: 'top',
                              x: -40,
                              y: 100,
                              floating: true,
                              borderWidth: 1,
                              backgroundColor: '#FFFFFF',
                              shadow: true
                            },
                            credits: {
                              enabled: false
                            },

                            series: series
                          };
                          ReactDOM.render(
                            <ReactHighcharts config={config}> </ReactHighcharts>,
                            document.getElementById('chartAll')
                          )
                        })
                    })
                  }}
                >
                  图表显示<Icon type="picture" />
                </Button>
              </Button.Group>
            </Col>
          </Row>
          <Divider />
          <div className="score_cards">
            {
              this.state.Card ? this.state.GradeTasks.map((item, index) => {
                return <ScoreCard
                  key={index}
                  title={item.id.title}
                  teacherName={item.id.publisher}
                  teacherGrade={item.teacherGrade}
                  selfName={item.name}
                  selfGrade={item.selfGrade}
                  groupGrade={item.groupGrade}
                  groupMemberOrigin={item.groupMemberOrigin}
                  score={item.score}
                />
              }) : <div id="chartAll" style={{ margin: '0 auto' }}></div>
            }
          </div>
        </TabPane>
        <TabPane tab="评价分析" key="3">
          <div className="statistics_result">
            <div className="chartPie">
              <PieChart data={PieChartData} options={PieChartOptions} width="400" height="400" />
              <div className="instruction">
                <Badge status="success" text="优秀(90-100分)" />
                <Badge status="processing" text="良好(70-90分)" />
                <Badge status="warning" text="及格(60-70分)" />
                <Badge status="error" text="不及格(0-60分)" />
                <Badge status="default" text="未评价" />
              </div>
            </div>
            <div className="chartBar">
              <BarChart data={BarChartData} options={BarChartOptions} width="400" height="400" />
            </div>
          </div>

        </TabPane>
      </Tabs>;
    }
  }
}

const mapStateToProps = (state) => ({
  userId: state.getIn(['login', 'id'])
})

export default connect(mapStateToProps)(Details)
