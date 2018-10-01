import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { PhotoUploader } from '..'
import { Form, Input, Button, Select, Row, Col, message } from 'antd'
import newsForm from '../../forms/news'
import bindField from '../../lib/formFieldBindings'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

window.nf = newsForm

@inject('newsStore')
@observer
class NewsEditor extends Component {

    async onSubmit(e) {
        e.preventDefault()
        if (newsForm.hasError) return
        try {
            await this.props.newsStore.updateNews(newsForm.values())

            message.success('SUCCESS')
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const news = await this.props.newsStore.getNews(id)

        newsForm.update(news)
        newsForm.validate()
    }

    render() {
        const { loading, statusOptions, levelOptions, categoryOptions } = this.props.newsStore

        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <Row gutter={10}>
                        <Col span={8}>
                            <FormItem {...bindField(newsForm.$('category'))}>
                                <Select  {...newsForm.$('category').bind()}>
                                    {categoryOptions.map(opt => <Option value={opt} key={opt}>{opt}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...bindField(newsForm.$('level'))}>
                                <Select  {...newsForm.$('level').bind()}>
                                    {levelOptions.map(opt => <Option value={opt} key={opt}>{opt}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...bindField(newsForm.$('status'))}>
                                <Select  {...newsForm.$('status').bind()}>
                                    {statusOptions.map(opt => <Option value={opt} key={opt}>{opt}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>

                    <FormItem {...bindField(newsForm.$('title'))}>
                        <Input {...newsForm.$('title').bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem {...bindField(newsForm.$('author'))}>
                        <Input {...newsForm.$('author').bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem {...bindField(newsForm.$('content'))}>
                        <TextArea {...newsForm.$('content').bind()} autoComplete='off'/>
                    </FormItem>

                    <Row gutter={10}>
                        <Col span={8}>
                            <FormItem {...bindField(newsForm.$('screen'))}>
                                <PhotoUploader imageView='?imageView2/0/w/1600/h/800/q/5' {...newsForm.$('screen').bind()}/>
                                <Input style={{ maxWidth: '640px' }} {...newsForm.$('screen').bind()} autoComplete='off'/>
                                <div>
                                    <Button icon="link" target="_blank" href="https://developer.qiniu.com/dora/manual/1279/basic-processing-images-imageview2">七牛图片基本处理</Button>
                                    <Button icon="github" target="_blank" href="https://github.com/FeddyTeam/grgr/issues/1">讨论下图片尺寸</Button>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...bindField(newsForm.$('image'))}>
                                <PhotoUploader imageView='?imageView2/1/w/640/h/480' {...newsForm.$('image').bind()}/>
                                <Input {...newsForm.$('image').bind()} autoComplete='off'/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...bindField(newsForm.$('poster'))}>
                                <PhotoUploader imageView='?imageView2/1/w/600/h/800' {...newsForm.$('poster').bind()}/>
                                <Input {...newsForm.$('poster').bind()} autoComplete='off'/>
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem {...bindField(newsForm.$('thumbnail'))}>
                                <PhotoUploader imageView='?imageView2/1/w/256' {...newsForm.$('thumbnail').bind()}/>
                                <Input {...newsForm.$('thumbnail').bind()} autoComplete='off'/>
                            </FormItem>
                        </Col>
                    </Row>

                    <FormItem {...bindField(newsForm.$('link'))}>
                        <Input {...newsForm.$('link').bind()} autoComplete='off'/>
                    </FormItem>

                    <Row>
                        <Col span={8}>
                            <FormItem {...bindField(newsForm.$('color'))}>
                                <Input {...newsForm.$('color').bind()} autoComplete='off'/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            -
                        </Col>
                        <Col span={8}>
                            -
                        </Col>
                    </Row>

                    <FormItem>
                        <Button type="primary" loading={loading} htmlType="submit">SAVE</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default NewsEditor
