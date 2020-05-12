import '@css/pages/home'

console.log('this is home 123456');

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