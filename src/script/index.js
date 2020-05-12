import '@css/pages/index'

console.log([1,2,3].findIndex(x => x == 4))

console.log('abc123456'.padStart(10)) 

const alertMe = (msg) => {
    console.log(msg)
}

class Robot {
    constructor (msg) {
        this.message = msg
    }
    say () {
        alertMe(this.message)
    }
}
const marvin = new Robot('hello babel')
marvin.say()

if (module.hot) {
    module.hot.accept()
}