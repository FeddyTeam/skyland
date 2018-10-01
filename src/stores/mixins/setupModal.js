import { observable, action } from 'mobx'

export default function(target) {
    return class extends target {
        @observable modalVisible = false
        @action openModal() {
            console.log(this)
            if (this) this.modalVisible = true
        }
        @action closeModal() {
            console.log(this)
            if (this) this.modalVisible = false
        }
    }
}
