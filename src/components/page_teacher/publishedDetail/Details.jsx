import React, { Component } from 'react'

import { Table, Input, Button, Icon } from 'antd';

const data = [{
  key: '1',
  name: 'A',
  class: '软工161',
  word: '',
  ppt: '',
  video: '',
  t_evaluate: ''
}, {
  key: '2',
  name: 'A',
  class: '软工161',
  word: '',
  ppt: '',
  video: '',
  t_evaluate: ''
}, {
  key: '3',
  name: 'Jim Green',
  class: '软工162',
  word: '',
  ppt: '',
  video: '',
  t_evaluate: ''
}, {
  key: '4',
  name: 'Jim Red',
  class: '软工162',
  word: '',
  ppt: '',
  video: '',
  t_evaluate: ''
}];


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
      console.log(body);
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
    this.get_task_detail(document.location.search.split('=')[1])
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
      dataIndex: 'word',
      key: 'word',
      render: (text) => {
        return <Icon type="file-word" theme="outlined" />
      },
    },
    {
      title: 'PPT',
      dataIndex: 'ppt',
      key: 'ppt',
      render: (text) => {
        return <Icon type="file-ppt" theme="outlined" />
      },
    },
    {
      title: 'Video',
      dataIndex: 'video',
      key: 'video',
      render: (text) => {
        return <Icon type="video-camera" theme="outlined" />
      },
    },
    {
      title: '老师评价',
      dataIndex: 't_evaluate',
      key: 't_evaluate',
      render: (text) => {
        return <Icon type="check" theme="outlined" />
      },
    }
    ];
    return <Table
      // title='作业1'
      columns={columns}
      dataSource={data} />;
  }
}
