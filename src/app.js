import '@css/pages/index'

class Preson {
    name = '';
    gender = '';

    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }

    say () {
        console.log(`my name is ${ this.name }`);
    }
}

function getInfo () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    })
}


let name = '123',
    arr = [1, 2, 3, 4, 5, 6];

arr.forEach(item => {
    console.log(item);
})