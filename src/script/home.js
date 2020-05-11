import '@css/pages/home'

console.log('this is home 123');

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