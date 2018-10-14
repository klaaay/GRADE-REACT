import React, { Component } from 'react'
// import { browserHistory } from 'react-router';

import axios from 'axios'

import { Card, message, Form, Button, Progress, Icon } from 'antd';

import './DoTask.less'

const FormItem = Form.Item;


export default class DoTask extends Component {
    state = {
        //Word
        selectedWord: null,
        percentWord: 0,
        wordFile: '',
        savedWord: '',
        wordCommitted: false,
        //PPT
        selectedPPT: null,
        percentPPT: 0,
        PPTFile: '',
        savedPPT: '',
        pptCommitted: false,
        //Video
        selectedVideo: null,
        percentVideo: 0,
        VideoFile: '',
        savedVideo: '',
        videoCommitted: false
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

    fileUploadHandlerWord = (action) => {
        const fdWord = new FormData();
        fdWord.append('taskWord', this.state.selectedWord)
        fdWord.append('userId', this.props.location.state.userId)
        fdWord.append('taskId', this.props.location.state.taskId)
        fdWord.append('id', this.props.location.state._id)
        fdWord.append('action', action)
        if (action === 'save') {
            axios.post('/student/word', fdWord, {
                onUploadProgress: progressEvent => {
                    this.setState({
                        percentWord: Math.round((progressEvent.loaded / progressEvent.total) * 100)
                    })
                }
            }).then((res) => {
                this.setState({
                    savedWord: this.state.wordFile
                })
                message.success(res.data.message)
            })
        } else if (action === 'commit') {
            if (!this.state.savedWord) {
                message.warning('请先所选保存文件');
            } else {
                axios.post('/student/word', fdWord)
                    .then((res) => {
                        this.setState({
                            percentWord: 100,
                            wordCommitted: true
                        })
                        message.success(res.data.message)
                    })
            }
        }
    }

    fileUploadHandlerPPT = (action) => {
        const fdPPT = new FormData();
        fdPPT.append('taskPPT', this.state.selectedPPT)
        fdPPT.append('userId', this.props.location.state.userId)
        fdPPT.append('taskId', this.props.location.state.taskId)
        fdPPT.append('id', this.props.location.state._id)
        fdPPT.append('action', action)
        if (action === 'save') {
            axios.post('/student/ppt', fdPPT, {
                onUploadProgress: progressEvent => {
                    this.setState({
                        percentPPT: Math.round((progressEvent.loaded / progressEvent.total) * 100)
                    })
                }
            }).then((res) => {
                message.success(res.data.message)
                this.setState({
                    savedPPT: this.state.PPTFile
                })
            })
        } else if (action === 'commit') {
            if (!this.state.savedPPT) {
                message.warning('请先所选保存文件');
            } else {
                axios.post('/student/ppt', fdPPT)
                    .then((res) => {
                        this.setState({
                            percentPPT: 100,
                            pptCommitted: true
                        })
                        message.success(res.data.message)
                    })
            }
        }
    }

    fileUploadHandlerVideo = (action) => {
        const fdVideo = new FormData();
        fdVideo.append('taskVideo', this.state.selectedVideo)
        fdVideo.append('userId', this.props.location.state.userId)
        fdVideo.append('taskId', this.props.location.state.taskId)
        fdVideo.append('id', this.props.location.state._id)
        fdVideo.append('action', action)
        if (action === 'save') {
            axios.post('/student/video', fdVideo, {
                onUploadProgress: progressEvent => {
                    this.setState({
                        percentVideo: Math.round((progressEvent.loaded / progressEvent.total) * 100)
                    })
                }
            }).then((res) => {
                message.success(res.data.message)
                this.setState({
                    savedVideo: this.state.VideoFile
                })
            })
        } else if (action === 'commit') {
            if (!this.state.savedVideo) {
                message.warning('请先所选保存文件');
            } else {
                axios.post('/student/video', fdVideo)
                    .then((res) => {
                        this.setState({
                            percentVideo: 100,
                            videoCommitted: true
                        })
                        message.success(res.data.message)
                    })
            }
        }
    }

    componentDidMount = () => {
        axios.post('/student/initialTaskInfo', { _id: this.props.location.state._id })
            .then(req => {
                const { data } = req;
                const { word, ppt, video, wordCommitted, pptCommitted, videoCommitted } = data.data;
                this.setState({
                    wordCommitted: wordCommitted,
                    pptCommitted: pptCommitted,
                    videoCommitted: videoCommitted
                })
                if (wordCommitted) {
                    this.setState({
                        percentWord: 100
                    })
                }
                if (pptCommitted) {
                    this.setState({
                        percentPPT: 100
                    })
                }
                if (videoCommitted) {
                    this.setState({
                        percentVideo: 100
                    })
                }
                if (word) {
                    this.setState({
                        savedWord: word.toString().split('\\')[2]
                    })
                }
                if (ppt) {
                    this.setState({
                        savedPPT: ppt.toString().split('\\')[2]
                    })
                }
                if (video) {
                    this.setState({
                        savedVideo: video.toString().split('\\')[2]
                    })
                }
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
                            label="Word"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            style={{ marginTop: '20px' }}
                        >
                            <div className="file_buttons">
                                <div className="file_button">
                                    <input
                                        type="file"
                                        onChange={this.fileSelectedHandlerWord}
                                        style={{ display: 'none' }}
                                        ref={fileWord => this.fileWord = fileWord}
                                    />
                                    <Button
                                        onClick={() => this.fileWord.click()}
                                        disabled={this.state.wordCommitted}
                                    >选择文件</Button>
                                </div>
                                <div className="file_button">
                                    <Button
                                        type="primary"
                                        onClick={() => { this.fileUploadHandlerWord('save') }}
                                        disabled={this.state.wordCommitted || !this.state.wordFile ? true : false}
                                    >保存</Button>
                                </div>
                                <div className="file_button">
                                    <Button
                                        type="primary"
                                        onClick={() => { this.fileUploadHandlerWord('commit') }}
                                        disabled={(this.state.wordCommitted) || (!this.state.savedWord && !this.state.wordFile) ? true : false}
                                    >提交</Button>
                                </div>
                            </div>
                            <Progress percent={this.state.percentWord} />
                        </FormItem>
                        <FormItem
                            label="PPT"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}>
                            <div className="file_buttons">
                                <div className="file_button">
                                    <input
                                        type="file"
                                        onChange={this.fileSelectedHandlerPPT}
                                        style={{ display: 'none' }}
                                        ref={filePPT => this.filePPT = filePPT}
                                    />
                                    <Button
                                        onClick={() => this.filePPT.click()}
                                        disabled={this.state.pptCommitted}
                                    >选择文件</Button>
                                </div>
                                <div className="file_button">
                                    <Button
                                        type="primary"
                                        onClick={() => { this.fileUploadHandlerPPT('save') }}
                                        disabled={this.state.pptCommitted || !this.state.PPTFile ? true : false}
                                    >保存</Button>
                                </div>
                                <div className="file_button">
                                    <Button
                                        type="primary"
                                        onClick={() => { this.fileUploadHandlerPPT('commit') }}
                                        disabled={(this.state.pptCommitted) || (!this.state.savedPPT && !this.state.PPTFile) ? true : false}
                                    >提交</Button>
                                </div>
                            </div>
                            <Progress percent={this.state.percentPPT} />
                        </FormItem>
                        <FormItem
                            label="Video"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}>
                            <div className="file_buttons">
                                <div className="file_button">
                                    <input
                                        type="file"
                                        onChange={this.fileSelectedHandlerVideo}
                                        style={{ display: 'none' }}
                                        ref={fileVideo => this.fileVideo = fileVideo}
                                    />
                                    <Button
                                        onClick={() => this.fileVideo.click()}
                                        disabled={this.state.videoCommitted}
                                    >选择文件</Button>
                                </div>
                                <div className="file_button">
                                    <Button
                                        type="primary"
                                        onClick={() => { this.fileUploadHandlerVideo('save') }}
                                        disabled={this.state.videoCommitted || !this.state.VideoFile ? true : false}
                                    >保存</Button>
                                </div>
                                <div className="file_button">
                                    <Button
                                        type="primary"
                                        onClick={() => { this.fileUploadHandlerVideo('commit') }}
                                        disabled={(this.state.videoCommitted) || (!this.state.savedVideo && !this.state.VideoFile) ? true : false}
                                    >提交</Button>
                                </div>
                            </div>
                            <Progress percent={this.state.percentVideo} />
                        </FormItem>
                    </Form>
                    <div className="info">
                        <div className="selected">
                            <p>已选择</p>
                            <p><Icon type="file-word" theme="twoTone" />:{this.state.wordFile}</p>
                            <p><Icon type="file-ppt" theme="twoTone" />:{this.state.PPTFile}</p>
                            <p><Icon type="video-camera" theme="twoTone" />:{this.state.VideoFile}</p>
                        </div>
                        <div className="saved">
                            <p>已保存</p>
                            <p><Icon type="file-word" theme="twoTone" />:{this.state.savedWord}</p>
                            <p><Icon type="file-ppt" theme="twoTone" />:{this.state.savedPPT}</p>
                            <p><Icon type="video-camera" theme="twoTone" />:{this.state.savedVideo}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
