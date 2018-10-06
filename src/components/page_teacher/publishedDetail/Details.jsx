import React, { Component } from 'react'
import { browserHistory } from 'react-router';

import { Table, Input, Button, Icon, Spin } from 'antd';

export default class Details extends Component {
  state = {
    searchText: '',
    data: [],
    loading: false,
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
      const response = await fetch('/teacher/detail', fetchOption);
      const body = await response.json();
      this.setState({
        data: body,
        loading: true
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

        // return <Icon type="file-word" theme={text?"twoTone":"outlined"} />
        return text ? <a href={'http://localhost:5000/' + record.word}><Icon type="file-word" theme={"twoTone"} /></a> : <Icon type="file-word" theme={"outlined"} />
      },
    },
    {
      title: 'PPT',
      dataIndex: 'pptCommitted',
      key: 'pptCommitted',
      render: (text, record) => {
        return text ? <a href={'http://localhost:5000/' + record.ppt}><Icon type="file-ppt" theme={"twoTone"} /></a> : <Icon type="file-ppt" theme={"outlined"} />
      },
    },
    {
      title: 'Video',
      dataIndex: 'videoCommitted',
      key: 'videoCommitted',
      render: (text, record) => {
        return text ? <a href={'http://localhost:5000/' + record.video}><Icon type="video-camera" theme={"twoTone"} /></a> : <Icon type="video-camera" theme={"outlined"} />
      },
    },
    {
      title: '老师评价',
      dataIndex: 'teacherGrade',
      key: 'teacherGrade',
      render: (text, record) => {
        console.log(text)
        console.log(record)
        if (record.pptCommitted && record.wordCommitted && record.videoCommitted) {
          return !text ? <a
            onClick={(e) => {
              browserHistory.push({
                pathname: '/teacher/evaluate',
                query: {
                  role: 'teacher',
                  id:record.key
                }
              })
            }}
          >去评价</a> : <Icon type="check" theme="outlined" style={{ color: '#1890FF' }} />
        } else {
          return <span>去评价</span>
        }
      },
    }];
    if (!this.state.loading) {
      return <Spin
        style={{
          position: 'relative',
          left: '50%'
        }}
      />
    } else {
      return <Table
        columns={columns}
        dataSource={this.state.data.data} />;
    }
  }
}
