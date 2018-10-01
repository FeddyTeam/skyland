import { observable } from 'mobx'

export default function(target) {
    return class extends target {
        @observable skip = 0
        @observable limit = 32
        @observable sort = '-created'
    }
}
