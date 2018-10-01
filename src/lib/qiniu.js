import { UploaderBuilder } from 'qiniu4js'
import authStore from '../stores/authStore'

export default function(options) {
    const opts = {
        multiple: false,
        accept: ['.png', '.jpg', '.jpeg', '.gif'],
        domains: {
            'https': 'https://upload-z2.qiniup.com',
            'http': 'http://upload-z2.qiniup.com'
        },
        host: 'https://static.feddy.org',
        imageView: '',
        onTaskProgress () {},
        onTaskSuccess () {},
        onTaskFail () {},
        onReady () {},
        onStart () {},
        ...options
    }

    const {
        multiple, accept,
        domains,
        host, imageView,
        onTaskProgress, onTaskFail, onTaskSuccess, onReady, onStart
    } = opts

    const uploader = new UploaderBuilder()
        .domain(domains)
        .multiple(multiple)
        .accept(accept)
        .tokenFunc(async (setToken, task) => {
            const uptoken = await authStore.mkQiniuToken()
            console.warn(uptoken)
            setToken(uptoken)
        })
        .listener({
            onTaskSuccess(task) {
                const url = `${host}/${task.result.key}${imageView}`
                onTaskSuccess({
                    ...task.result,
                    name: task.file.name,
                    url
                }, task)
            },
            onTaskFail(task) { onTaskFail(task) },
            onTaskProgress(task) { onTaskProgress(task) },
            onReady,
            onStart
        })
        .build()

    return uploader
}
