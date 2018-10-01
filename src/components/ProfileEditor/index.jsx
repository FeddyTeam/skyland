import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import profileForm from '../../forms/profile'
import bindField from '../../lib/formFieldBindings'
import { Form, Input, Button, message } from 'antd'
import { PhotoUploader } from '..'

const FormItem = Form.Item

@inject('profileStore')
@observer
class ProfileEditor extends Component {

    async onSubmit(e) {
        e.preventDefault()
        try {
            await this.props.profileStore.updateProfile(profileForm.values())

            message.success('SUCCESS')
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    async componentDidMount() {
        await this.props.profileStore.getProfile()
        const { profile } = this.props.profileStore
        profileForm.update(profile)
    }

    render() {
        const { loading } = this.props.profileStore
        const $avatar = profileForm.$('avatar')
        const $name = profileForm.$('name')
        const $bio = profileForm.$('bio')
        const $blog = profileForm.$('blog')

        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <FormItem {...bindField($avatar)}>
                        <PhotoUploader imageView='?imageView2/1/w/512/q/75' {...$avatar.bind()} autoComplete='avatar'/>
                    </FormItem>

                    <FormItem {...bindField($name)}>
                        <Input {...$name.bind()} autoComplete='fullname'/>
                    </FormItem>
                    <FormItem {...bindField($bio)}>
                        <Input {...$bio.bind()} autoComplete='bio'/>
                    </FormItem>
                    <FormItem {...bindField($blog)}>
                        <Input {...$blog.bind()} autoComplete='blog'/>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" loading={loading} htmlType="submit">UPDATE YOUR PROFILE</Button>
                        {' '}
                        <Button>
                            <Link to="/profile">CANCEL</Link>
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default ProfileEditor
