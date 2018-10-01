import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'

const fields = [{
    name: 'avatar',
    label: 'AVATAR',
    type: 'text'
}, {
    name: 'name',
    label: 'NAME',
    type: 'name'
}, {
    name: 'bio',
    label: 'BIO',
    type: 'bio'
}, {
    name: 'blog',
    label: 'BLOG',
    type: 'text'
}]

const plugins = { dvr: validatorjs }

export default new MobxReactForm({ fields }, { plugins })
