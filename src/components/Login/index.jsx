import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button, message } from 'antd'
import loginForm from '../../forms/login'
import bindField from '../../lib/formFieldBindings'
import loginWithGithub from '../../lib/loginWithGithub'

const FormItem = Form.Item

@inject('authStore')
@observer
class Login extends Component {

    async onSubmit(e) {
        e.preventDefault()
        if (loginForm.hasError) return
        try {
            await this.props.authStore.login(loginForm.values())
            message.success('WELCOME BACK')
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    render() {
        const $email = loginForm.$('email')
        const $password = loginForm.$('password')
        const { loading, setToken, startProgress, stopProgress } = this.props.authStore

        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <FormItem {...bindField($email)}>
                        <Input {...$email.bind()} autoComplete='email'/>
                    </FormItem>
                    <FormItem {...bindField($password)}>
                        <Input {...$password.bind()} autoComplete='current-password'/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" loading={loading} htmlType="submit">LOGIN</Button>
                        {' '}
                        <Button icon="github" loading={loading} onClick={e => {
                            e.preventDefault()
                            startProgress()
                            loginWithGithub(token => {
                                stopProgress()
                                setToken(token)
                            })
                        }}>Login with Github</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Login
