

function symmetric_difference(matrixA, matrixB){
    let temp = union(matrixA, matrixB)
    let res = []
    for (let i = 0; i < temp.length; i++)
        if (!matrixA.includes(temp[i]) || matrixB.includes(temp[i]))
            res.push[i]

    return res
}

function delDupl(set){
    let res = []
    for (let i = 0; i < set.length; i++)
        if(!res.includes(set[i].toUpperCase()) && set[i].length === 1 && set[i].match(/[a-z]/i))
            res.push(set[i].toUpperCase())
    return res
}

function entry(matrixA, matrixB){
    for (let i = 0; i < matrixA.length; i++)
       if (!matrixB.includes(matrixA[i])){
           console.log(matrixA[i])
           return 'False'
        }

    return 'True'
}

function union(matrixA, matrixB){
    let res = []
    for (let i = 0; i < matrixA.length; i++)
        res.push(matrixA[i])

    for (let i = 0; i < matrixB.length; i++)
        if (!res.includes(matrixB[i]))
            res.push(matrixB[i])
    return res
}

function toRes(arr){
    let res = '[' + arr[0] 
    for(let i = 1; i < arr.length; i++)
        res += ', ' + arr[i]
    
    return res + ']'
}

function solve(){
    let matrixA = delDupl(document.querySelector('.A').value.split(" "))
    document.querySelector('.mA').innerHTML += toRes(matrixA)
    let matrixB = delDupl(document.querySelector('.B').value.split(" "))
    document.querySelector('.mB').innerHTML += toRes(matrixB)

    let func 
    switch(document.querySelector("#select").value){
        case "union":
            document.querySelector('.res').textContent = toRes(union(matrixA, matrixB))
            break
        case "entry":
            document.querySelector('.res').textContent = entry(matrixA, matrixB)
            break
        case "symmetric difference":
            func = symmetric_difference
            break
        case "difference":
            func = difference
            break
        case "intersection":
            func = intersection
            break
    }
    document.querySelector('#result').style.display = 'unset'
    
}
// F G J Q
// L F H J I O P E