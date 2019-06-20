function compose(...funcs){
    return funcs.reduce((a, b) => data => b(a(data)))
}

function fn1(obj){
    console.log('fn1')
    return obj
}

function fn2(obj){
    console.log('fn2')
    return obj
}

function fn3(obj){
    console.log('fn3')
    return obj
}


const com = compose(fn1, fn2, fn3)

com(1)