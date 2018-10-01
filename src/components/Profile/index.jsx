import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'

@inject('profileStore')
@observer
class Profile extends Component {

    render() {
        const { profile } = this.props.profileStore

        return (
            <div>
                <Card
                    title={profile.name}
                    cover={<img src={profile.avatar} alt="Avatar"/>}
                    style={{ width: 240 }}>
                    <p>Username: {profile.username}</p>
                    <p>Name: {profile.name}</p>
                    <p>Blog: {profile.blog}</p>
                </Card>

                <Link to="/profile/edit">EDIT PROFILE</Link>
            </div>
        )
    }
}

export default Profile
