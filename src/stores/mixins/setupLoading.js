import { observable, action } from 'mobx'

export default function(target) {
    return class extends target {
        @observable loading = false
        @action.bound startProgress() {
            this.loading = true
        }
        @action.bound stopProgress() {
            this.loading = false
        }
    }
}
