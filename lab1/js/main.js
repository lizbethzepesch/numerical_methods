var A = []
var B = []

function createCopy(A) {
    let copy = []
    for (const arr of A) 
        copy.push([...arr])
    
    return copy
}

function check(a, b){
    A = []
    B = []
    for (let i = 0; i < a.length; i++)
        if (!a.includes(i))
            A.push(i.toUpperCase())
    for (let i = 0; i < b.length; i++)
        if (!b.includes(i))
            B.push(i.toUpperCase())
}




function entry(matrixA, matrixB){
    for (let i of matrixA)
       if (!matrixB.includes(i))
           return 'False'

    return 'True'
}

function union(matrixA, matrixB){
    res = createCopy(matrixA)
    for (let i of matrixB)
        if (!res.includes(i))
            res.append(i)
    return res
}


function main(){
    myA = [21, 9, 10, 7, 1, 2, 3, 3, 1, 7]
    myB = [21, 9, 10, 7, 0, 5, 14, 14, 9 ,10]
    myA1 = [21, 9, 10, 7, 1, 2, 3]
    myB1 = [21, 9, 10, 7, 0, 5, 14]
    myA, myB = check_input(myA, myB)
    console.log(myA)
    console.log(myB)
}

main()