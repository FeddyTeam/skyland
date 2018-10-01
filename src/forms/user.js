import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'

const fields = [{
    name: '_id',
    label: 'ID',
    type: 'id'
}, {
    name: 'email',
    label: 'EMAIL',
    type: 'email',
    rules: 'required|email|string|between:5,32'
}, {
    name: 'username',
    label: 'USERNAME',
    type: 'username',
    rules: 'required|string|between:3,24'
}, {
    name: 'status',
    label: 'STATUS',
}, {
    name: 'roles',
    label: 'Roles',
}]

const plugins = { dvr: validatorjs }

export default new MobxReactForm({ fields }, { plugins })
