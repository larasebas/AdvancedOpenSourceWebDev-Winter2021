var rando = function (){
    return Math.round(Math.random()*4)
}

function someElse(){
    return "ALooo"
}

// module.exports.rando = rando()
// module.exports.someElse = someElse()


module.exports = {rando:rando(), someElse:someElse()}
