import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { pick } from 'lodash'

import { Table, Tag, Switch, Button, Form, Input, Modal, Select, message } from 'antd'
import userForm from '../../forms/user'
import bindField from '../../lib/formFieldBindings'

const FormItem = Form.Item
const Option = Select.Option

window.uf = userForm

const statusTag = status => {
    const colors = {
        pending: 'green',
        active: 'blue',
        deleted: 'orange',
    }

    return <Tag color={colors[status]}>{status}</Tag>
}

@inject('userStore')
@observer
class UserList extends Component {

    constructor(props) {
        super(props)

        this.editUser = this.editUser.bind(this)

        this.state = {
            columns: [{
                title: 'Avatar',
                dataIndex: 'avatar',
                key: 'avatar',
                render: avatar => <img src={avatar} alt='Avatar' height="32"/>
            }, {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: 'Username',
                dataIndex: 'username',
                key: 'username'
            }, {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            }, {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: statusTag
            }, {
                title: 'Admin?',
                dataIndex: 'roles.admin',
                key: 'isAdmin',
                render: admin => admin && <Tag>Admin</Tag>
            }, {
                title: 'Editor?',
                dataIndex: 'roles.editor',
                key: 'isEditor',
                render: editor => editor && <Tag>Editor</Tag>
            }, {
                title: 'Actions',
                dataIndex: '_id',
                key: 'editing',
                render: (id, row) => <Button onClick={e => this.editUser(row)}>Edit</Button>
            }]
        }
    }

    async editUser(user) {
        this.props.userStore.openModal()
        userForm.update({
            ...pick(user, ['_id', 'username', 'email', 'roles', 'status'])
        })
    }

    closeModal() {
        this.props.userStore.closeModal()
    }

    async onSubmit(event) {
        event.preventDefault()
        try {
            await this.props.userStore.updateUser(userForm.values())

            message.success('SUCCESS')
            this.props.userStore.closeModal()
            userForm.clear()
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    render() {
        const $username = userForm.$('username')
        const $email = userForm.$('email')
        const $status = userForm.$('status')
        const $roles = userForm.$('roles')
        const { loading, userList } = this.props.userStore

        return (
            <div>
                <Table rowKey='_id' columns={this.state.columns} dataSource={userList} />
                <Modal
                    title="UPDATE USER"
                    visible={this.props.userStore.modalVisible}
                    onOk={this.onSubmit.bind(this)}
                    onCancel={e => this.props.userStore.closeModal()}
                >
                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <FormItem {...bindField($email)}>
                            <Input {...$email.bind()}/>
                        </FormItem>
                        <FormItem {...bindField($username)}>
                            <Input {...$username.bind()}/>
                        </FormItem>
                        <FormItem {...bindField($status)}>
                            <Select {...$status.bind()}>
                                <Option value='pending'>pending</Option>
                                <Option value='active'>active</Option>
                                <Option value='deleted'>deleted</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="ADMIN">
                            <Switch checked={$roles.value.admin} onChange={admin => $roles.set({ admin })}/>
                        </FormItem>
                        <FormItem label="EDITOR">
                            <Switch checked={$roles.value.editor} onChange={editor => $roles.set({ editor })}/>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" loading={loading} htmlType="submit">SAVE</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }

    componentDidMount() {
        this.props.userStore.listUser()
    }
}

export default UserList
