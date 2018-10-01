import React, { Component } from 'react'
import { Icon, message } from 'antd'
import qiniu from '../../lib/qiniu'

import './style.css'

class PhotoUploader extends Component {
    constructor(props) {
        super(props)

        this.start = this.start.bind(this)
        this.uploading = this.uploading.bind(this)
        this.success = this.success.bind(this)
        this.clear = this.clear.bind(this)

        this.state = {
            loading: false,
            name: '',
            progress: 0,
            error: false
        }
    }

    clear() {
        this.setState({
            loading: false,
            name: '',
            progress: 0,
            error: false
        })
    }

    start({ name }) {
        this.setState({
            loading: false,
            name,
            progress: 0,
            error: false
        })
    }

    uploading({ progress }) {
        this.setState({
            loading: true,
            progress
        })
    }

    success({ name, url }) {
        this.setState({
            loading: false,
            name,
            progress: 0,
            error: false
        })
    }

    uploadImage() {
        const onChange = typeof this.props.onChange === 'function' ? this.props.onChange : () => {}
        const uploader = qiniu({
            multiple: true,
            imageView: this.props.imageView || '',
            onStart: tasks => {
                this.start({ name: tasks[0].file.name, loading: true })
                onChange('')
            },
            onTaskSuccess: result => {
                this.success(result)
                onChange(result.url, result)
            },
            onTaskProgress: task => {
                this.uploading({ progress: task.progress })
            },
            onTaskFail: task => {
                message.error('Something Wrong?')
                this.setState({
                    loading: false,
                    progress: 0,
                    error: true
                })
            }
        })

        uploader.chooseFile()
    }

    render() {
        const { loading } = this.state

        return (
            <div className='photo-uploader' onClick={this.uploadImage.bind(this)}>
                {this.props.value?
                    <img src={this.props.value} alt='Uploader Preview'/> :
                    <div>
                        <Icon type={loading ? 'loading' : 'plus'} />
                    </div>
                }
            </div>

        )
    }
}

export default PhotoUploader
