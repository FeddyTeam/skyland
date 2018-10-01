import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'

/**
 * screen: String, // 1600x800
 * image: String, // 640x480
 * poster: String, // 600x800
 * thumbnail: String, // 256x256
 */

const fields = [{
    name: 'status',
    label: 'STATUS',
    type: 'text'
}, {
    name: 'level',
    label: 'LEVEL',
    type: 'text'
}, {
    name: 'category',
    label: 'CATEGORY',
    type: 'category'
}, {
    name: 'title',
    label: 'TITLE',
    type: 'text',
    rules: 'required|string|between:3,128'
}, {
    name: 'author',
    label: 'AUTHOR',
    type: 'text',
},  {
    name: 'content',
    label: 'CONTENT / DESCRIPTION',
    type: 'text',
}, {
    name: 'screen',
    label: 'LARGE IMAGE 1600x800',
    type: 'text',
}, {
    name: 'image',
    label: 'IMAGE 640x480',
    type: 'text',
},  {
    name: 'poster',
    label: 'POSTER 600x800',
    type: 'text',
}, {
    name: 'thumbnail',
    label: 'THUMBNAIL 256x256',
    type: 'text',
}, {
    name: 'link',
    label: 'LINK',
    type: 'text',
}, {
    name: 'color',
    label: 'THEME COLOR',
    type: 'color',
}, {
    name: '_id',
    label: 'ID',
    type: 'text'
}]

const plugins = { dvr: validatorjs }

export default new MobxReactForm({ fields }, { plugins })
