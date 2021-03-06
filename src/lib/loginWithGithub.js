// callback (token) => xxx

export default function(callback) {
    const w = window.open('/auth/github', 'Login with Github', 'menubar=no,resiziable=no,width=480,height=640')
    w.onbeforeunload = () => {
        const search = w.document.location.search
        const params = new Map()
        search.substr(1).split('&').forEach(one => {
            const [key, value] = one.split('=')
            params.set(key, value)
        })

        callback(params.get('token'))
    }
}