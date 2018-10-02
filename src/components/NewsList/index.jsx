import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { Table, Tag, Button, message } from 'antd'

const levelTag = level => {
    const levelColors = {
        normal: 'blue',
        featured: 'orange',
        mustread: 'magenta',
        removed: '#ddd'
    }

    return <Tag color={levelColors[level]}>{level}</Tag>
}

const statusTag = status => {
    const statusColors = {
        draft: 'green',
        active: 'blue',
        deleted: '#ddd',
    }

    return <Tag color={statusColors[status]}>{status}</Tag>
}

@withRouter
@inject('newsStore')
@observer
class NewsList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            columns: [{
                title: 'Thumbnail',
                dataIndex: 'thumbnail',
                key: 'thumbnail',
                render: thumbnail => <img src={thumbnail} alt='Thumbnail' height="48"/>
            }, {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            }, {
                title: 'Author',
                dataIndex: 'author',
                key: 'author'
            }, {
                title: 'Content / Description',
                dataIndex: 'content',
                key: 'content',
                render: content => <div title={content}
                    style={{ maxWidth: '300px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'}}>{content}</div>
            }, {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
            }, {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: statusTag
            }, {
                title: 'Level',
                dataIndex: 'level',
                key: 'level',
                render: levelTag
            }, {
                title: 'By',
                dataIndex: 'user',
                key: 'user',
                render: user => <span>{user.name} @{user.username}</span>
            }, {
                title: 'Action',
                dataIndex: '_id',
                key: 'editing',
                render: _id => <Link to={`/news/edit/${_id}`}>Edit</Link>
            }]
        }
    }

    async createNews() {
        try {
            const newsID = await this.props.newsStore.createNews()

            this.props.history.replace(`/news/edit/${newsID}`)
        } catch (err) {
            message.error(err)
        }
    }

    componentDidMount() {
        this.props.newsStore.listNews()
    }

    render() {
        const { newsList, loading } = this.props.newsStore

        return (
            <div>
                <Table rowKey='_id' columns={this.state.columns} dataSource={newsList} />
                <Button loading={loading} onClick={this.createNews.bind(this)}>Create News</Button>
            </div>
        )
    }
}

export default NewsList
