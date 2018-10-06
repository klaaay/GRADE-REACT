import React, { Component } from 'react'
import { browserHistory } from 'react-router';

import axios from 'axios'

import { Card, message, Form, Button, Progress } from 'antd';

import './DoTask.less'

const FormItem = Form.Item;


export default class DoTask extends Component {
    state = {
        //Word
        selectedWord: null,
        percentWord: 0,
        wordFile: '',
        //PPT
        selectedPPT: null,
        percentPPT: 0,
        PPTFile: '',
        //Video
        selectedVideo: null,
        percentVideo: 0,
        VideoFile: ''
    }

    fileSelectedHandlerWord = event => {
        console.log(event.target.files[0])
        if (event.target.files[0].type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            message.error('文件类型错误,请上传.docx文件')
        } else {
            this.setState({
                selectedWord: event.target.files[0],
                wordFile: event.target.files[0].name
            })
        }
    }

    fileSelectedHandlerPPT = event => {
        console.log(event.target.files[0])
        if (event.target.files[0].type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
            message.error('文件类型错误,请上传.pptx文件')
        } else {
            this.setState({
                selectedPPT: event.target.files[0],
                PPTFile: event.target.files[0].name
            })
        }
    }

    fileSelectedHandlerVideo = event => {
        console.log(event.target.files[0])
        if (event.target.files[0].type !== 'video/mp4') {
            message.error('文件类型错误,请上传.mp4文件')
        } else {
            this.setState({
                selectedVideo: event.target.files[0],
                VideoFile: event.target.files[0].name
            })
        }
    }

    fileUploadHandlerWord = () => {
        const fdWord = new FormData();
        fdWord.append('taskWord', this.state.selectedWord)
        fdWord.append('userId', this.props.location.state.userId)
        fdWord.append('taskId', this.props.location.state.taskId)
        fdWord.append('id', this.props.location.state._id)
        axios.post('/student/word', fdWord, {
            onUploadProgress: progressEvent => {
                if (Math.round((progressEvent.loaded / progressEvent.total) * 100) === 100) {
                    message.success('Word上传成功')
                }
                this.setState({
                    percentWord: Math.round((progressEvent.loaded / progressEvent.total) * 100)
                })
            }
        }).then((res) => {
            console.log(res)
        })
    }

    fileUploadHandlerPPT = () => {
        const fdPPT = new FormData();
        fdPPT.append('taskPPT', this.state.selectedPPT)
        fdPPT.append('userId', this.props.location.state.userId)
        fdPPT.append('taskId', this.props.location.state.taskId)
        fdPPT.append('id', this.props.location.state._id)
        axios.post('/student/ppt', fdPPT, {
            onUploadProgress: progressEvent => {
                if (Math.round((progressEvent.loaded / progressEvent.total) * 100) === 100) {
                    message.success('PPT上传成功')
                }
                this.setState({
                    percentPPT: Math.round((progressEvent.loaded / progressEvent.total) * 100)
                })
            }
        }).then((res) => {
            console.log(res)
        })
    }

    fileUploadHandlerVideo = () => {
        const fdVideo = new FormData();
        fdVideo.append('taskVideo', this.state.selectedVideo)
        fdVideo.append('userId', this.props.location.state.userId)
        fdVideo.append('taskId', this.props.location.state.taskId)
        fdVideo.append('id', this.props.location.state._id)
        axios.post('/student/video', fdVideo, {
            onUploadProgress: progressEvent => {
                if (Math.round((progressEvent.loaded / progressEvent.total) * 100) === 100) {
                    message.success('Video上传成功')
                }
                this.setState({
                    percentVideo: Math.round((progressEvent.loaded / progressEvent.total) * 100)
                })
            }
        }).then((res) => {
            console.log(res)
        })
    }

    render() {
        let data = this.props.location.state;
        let { title, content } = data;

        return (
            <div id="doTask">
                <div className="task_info">
                    <Card
                        title={title}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <p>{content}</p>
                    </Card>
                </div>
                <div className="task_upload">
                    <Form>
                        <FormItem
                            label=""
                            labelCol={{ span: 0 }}
                            wrapperCol={{ span: 24 }}>
                            <input
                                type="file"
                                onChange={this.fileSelectedHandlerWord}
                                style={{ display: 'none' }}
                                ref={fileWord => this.fileWord = fileWord}
                            />
                            <Button
                                onClick={() => this.fileWord.click()}
                            >选择Word文件
                            </Button>
                            <Button
                                type="primary"
                                icon="upload"
                                onClick={this.fileUploadHandlerWord}
                                style={{ marginLeft: '20px' }}
                            >上传Word
                            </Button>
                            <p>{this.state.wordFile}</p>
                            <Progress percent={this.state.percentWord} />
                        </FormItem>
                        <FormItem
                            label=""
                            labelCol={{ span: 0 }}
                            wrapperCol={{ span: 24 }}>
                            <input
                                type="file"
                                onChange={this.fileSelectedHandlerPPT}
                                style={{ display: 'none' }}
                                ref={filePPT => this.filePPT = filePPT}
                            />
                            <Button
                                onClick={() => this.filePPT.click()}
                            >选择PPT文件
                            </Button>
                            <Button
                                type="primary"
                                icon="upload"
                                onClick={this.fileUploadHandlerPPT}
                                style={{ marginLeft: '20px' }}
                            >上传PPT
                            </Button>
                            <p>{this.state.PPTFile}</p>
                            <Progress percent={this.state.percentPPT} />
                        </FormItem>
                        <FormItem
                            label=""
                            labelCol={{ span: 0 }}
                            wrapperCol={{ span: 24 }}>
                            <input
                                type="file"
                                onChange={this.fileSelectedHandlerVideo}
                                style={{ display: 'none' }}
                                ref={fileVideo => this.fileVideo = fileVideo}
                            />
                            <Button
                                onClick={() => this.fileVideo.click()}
                            >选择Video文件
                            </Button>
                            <Button
                                type="primary"
                                icon="upload"
                                onClick={this.fileUploadHandlerVideo}
                                style={{ marginLeft: '20px' }}
                            >上传Video
                            </Button>
                            <p>{this.state.VideoFile}</p>
                            <Progress percent={this.state.percentVideo} />
                        </FormItem>
                        <FormItem
                            label=""
                            labelCol={{ span: 0 }}
                            wrapperCol={{ span: 24 }}>
                            <Button
                                type="primary"
                                block
                                onClick={(e) => {
                                    browserHistory.push({
                                        pathname: '/student/evaluate',
                                        query: {
                                            role: 'self',
                                            id: this.props.location.state._id
                                        }
                                    })
                                }}
                            >去自评</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
